import type { Metadata } from "next";

import { SectionHeading } from "@/components/ui/section-heading";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use",
  description:
    "Terms governing the use of MOQ3 result intelligence pages, official links, and exam update content.",
  canonical: "/terms",
});

export default function TermsPage() {
  return (
    <div className="shell py-14">
      <SectionHeading
        eyebrow="Terms"
        title="Terms of Use"
        description="Use of MOQ3 implies acceptance of these terms."
      />
      <div className="mt-8 max-w-3xl text-base leading-8 text-slate-600">
        <p>
          MOQ3 provides exam result and cutoff information for public reference.
          While we strive for accuracy, users should verify details using official
          sources before making decisions.
        </p>
        <p className="mt-6">
          Content may be updated, corrected, or removed based on official notices
          and verified changes.
        </p>
        <p className="mt-6">
          Automated access that degrades service quality is not permitted.
        </p>
      </div>
    </div>
  );
}
