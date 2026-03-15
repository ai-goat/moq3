import type { Metadata } from "next";

import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "About MOQ3",
  description:
    "Learn how MOQ3 organizes exam results, cutoff intelligence, and exam updates for faster discovery.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="shell py-14">
      <SectionHeading
        eyebrow="About"
        title="Why MOQ3 exists"
        description="We build fast, trustworthy exam result pages with clear timelines and official links."
      />
      <div className="mt-8 max-w-3xl text-base leading-8 text-slate-600">
        <p>
          MOQ3 focuses on exam result intelligence: verified timelines, cutoff
          analysis, and structured insights that make it easier for candidates to
          find exactly what they need. We prioritize speed, clarity, and SEO so
          every page is accessible in high-traffic windows.
        </p>
        <p className="mt-6">
          The platform is built for scale, with programmatic pages per exam, year,
          and category. We track updates, compile historical statistics, and keep
          the experience clean and minimal.
        </p>
      </div>
    </div>
  );
}
