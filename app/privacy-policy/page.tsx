import type { Metadata } from "next";

import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MOQ3 handles data, analytics, and privacy protections.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="shell py-14">
      <SectionHeading
        eyebrow="Privacy"
        title="Privacy Policy"
        description="A clear summary of how MOQ3 handles data and analytics."
      />
      <div className="mt-8 max-w-3xl text-base leading-8 text-slate-600">
        <p>
          MOQ3 is built to be lightweight and privacy-aware. We do not sell user
          data or run invasive tracking.
        </p>
        <p className="mt-6">
          Analytics are used to understand which pages are helpful and to improve
          performance. If analytics are enabled, data is processed in aggregate.
        </p>
        <p className="mt-6">
          For questions or removal requests, contact us through the email on the
          contact page.
        </p>
      </div>
    </div>
  );
}
