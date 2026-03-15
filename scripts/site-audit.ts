import { writeFile } from "node:fs/promises";

const BASE_URL = process.env.AUDIT_BASE_URL ?? "https://www.moq3.com";
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

type UrlStatus = {
  url: string;
  status: number;
};

type AuditResult = {
  baseUrl: string;
  sitemapUrl: string;
  fetchedAt: string;
  totals: {
    urls: number;
    ok: number;
    redirects: number;
    clientErrors: number;
    serverErrors: number;
  };
  sitemapStatuses: UrlStatus[];
  brokenInternalLinks: UrlStatus[];
  internalLinkCount: number;
};

async function fetchText(url: string) {
  const response = await fetch(url, {
    headers: { "user-agent": "MOQ3-Audit/1.0" },
  });
  const text = await response.text();
  return { response, text };
}

function extractSitemapUrls(xml: string) {
  const urls: string[] = [];
  const re = /<loc>(.*?)<\/loc>/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(xml))) {
    urls.push(match[1]);
  }
  return urls;
}

function normalizeLink(href: string) {
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
    return null;
  }
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return href;
  }
  if (href.startsWith("//")) {
    return `https:${href}`;
  }
  if (href.startsWith("/")) {
    return `${BASE_URL}${href}`;
  }
  return null;
}

function extractInternalLinks(html: string) {
  const links = new Set<string>();
  const re = /href=\"(.*?)\"/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) {
    const normalized = normalizeLink(match[1]);
    if (normalized && normalized.startsWith(BASE_URL)) {
      links.add(normalized);
    }
  }
  return Array.from(links);
}

async function withConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>,
) {
  const results: R[] = [];
  let index = 0;

  async function run() {
    while (index < items.length) {
      const current = index++;
      results[current] = await worker(items[current]);
    }
  }

  const runners = Array.from({ length: Math.min(limit, items.length) }, run);
  await Promise.all(runners);
  return results;
}

async function main() {
  const sitemap = await fetchText(SITEMAP_URL);
  const urls = extractSitemapUrls(sitemap.text);

  const statuses = await withConcurrency(urls, 8, async (url) => {
    const response = await fetch(url, {
      headers: { "user-agent": "MOQ3-Audit/1.0" },
    });
    return { url, status: response.status };
  });

  const okUrls = statuses.filter((item) => item.status >= 200 && item.status < 300);
  const htmlPages = await withConcurrency(okUrls, 6, async (item) => {
    const { text } = await fetchText(item.url);
    return { url: item.url, html: text };
  });

  const internalLinks = new Set<string>();
  htmlPages.forEach((page) => {
    extractInternalLinks(page.html).forEach((link) => internalLinks.add(link));
  });

  const internalStatuses = await withConcurrency(
    Array.from(internalLinks),
    8,
    async (url) => {
      const response = await fetch(url, {
        headers: { "user-agent": "MOQ3-Audit/1.0" },
      });
      return { url, status: response.status };
    },
  );

  const brokenInternalLinks = internalStatuses.filter((item) => item.status >= 400);

  const result: AuditResult = {
    baseUrl: BASE_URL,
    sitemapUrl: SITEMAP_URL,
    fetchedAt: new Date().toISOString(),
    totals: {
      urls: statuses.length,
      ok: statuses.filter((item) => item.status >= 200 && item.status < 300).length,
      redirects: statuses.filter((item) => item.status >= 300 && item.status < 400).length,
      clientErrors: statuses.filter((item) => item.status >= 400 && item.status < 500).length,
      serverErrors: statuses.filter((item) => item.status >= 500).length,
    },
    sitemapStatuses: statuses,
    brokenInternalLinks,
    internalLinkCount: internalLinks.size,
  };

  const report = [
    `# MOQ3 Site Audit`,
    ``,
    `Base URL: ${BASE_URL}`,
    `Sitemap URL: ${SITEMAP_URL}`,
    `Fetched at: ${result.fetchedAt}`,
    ``,
    `## Summary`,
    `- Total sitemap URLs: ${result.totals.urls}`,
    `- OK (2xx): ${result.totals.ok}`,
    `- Redirects (3xx): ${result.totals.redirects}`,
    `- Client errors (4xx): ${result.totals.clientErrors}`,
    `- Server errors (5xx): ${result.totals.serverErrors}`,
    `- Internal links checked: ${result.internalLinkCount}`,
    `- Broken internal links: ${brokenInternalLinks.length}`,
    ``,
    `## Broken internal links`,
    ...brokenInternalLinks.map((item) => `- ${item.status} ${item.url}`),
    ``,
    `## Sitemap non-200`,
    ...statuses
      .filter((item) => item.status >= 300)
      .map((item) => `- ${item.status} ${item.url}`),
  ].join("\n");

  await writeFile("reports/site-audit.json", JSON.stringify(result, null, 2));
  await writeFile("reports/site-audit.md", report);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
