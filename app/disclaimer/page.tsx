import type { Metadata } from "next";

import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Accuracy and official verification disclaimer for MOQ3.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="shell py-14">
      <SectionHeading
        eyebrow="Disclaimer"
        title="Information disclaimer"
        description="Please verify all critical information on official sources."
      />
      <div className="mt-8 max-w-3xl text-base leading-8 text-slate-600">
        <p>
          MOQ3 aggregates exam updates and cutoff insights for convenience. We do
          not represent any examination authority. Always confirm final dates,
          eligibility, and results on the official exam portal.
        </p>
        <p className="mt-6">
          If you find an issue, contact us through the email listed on the contact
          page so we can correct it quickly.
        </p>
      </div>
    </div>
  );
}
