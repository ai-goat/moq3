import type { Metadata } from "next";

import { SectionHeading } from "@/components/ui/section-heading";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact MOQ3",
  description:
    "Contact MOQ3 for corrections, official link updates, partnerships, and exam data feedback.",
  canonical: "/contact",
});

export default function ContactPage() {
  return (
    <div className="shell py-14">
      <SectionHeading
        eyebrow="Contact"
        title="Reach the MOQ3 team"
        description="For corrections, data updates, or partnerships, write to the address below."
      />
      <div className="mt-8 max-w-3xl text-base leading-8 text-slate-600">
        <p>
          Email:{" "}
          <a
            className="font-semibold text-blue-700 underline"
            href="mailto:stellarfusiondynamics@gmail.com"
          >
            stellarfusiondynamics@gmail.com
          </a>
        </p>
        <p className="mt-6">
          We respond to correction requests and official link updates as quickly as
          possible.
        </p>
      </div>
    </div>
  );
}
