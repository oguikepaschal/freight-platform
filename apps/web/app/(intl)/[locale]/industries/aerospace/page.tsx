import type { Metadata } from "next";
import { ServiceIndustryTemplate, contentCta, contentImage, type ServiceIndustryContent } from "@freight/ui";
import { localePath } from "@/lib/locale/config";
import { getLocale } from "@/lib/locale/server";

export const metadata: Metadata = {
  title: "Aerospace | Meridian Freight",
  description:
    "Time-critical AOG response and secure logistics for aircraft parts, tooling, and MRO supply. Specialized handling for oversized, high-value, and dangerous-goods aerospace cargo.",
};

export default async function AerospacePage() {
  const locale = await getLocale();
  const cta = contentCta("aerospace");

  const content: ServiceIndustryContent = {
    name: "Aerospace",
    monogram: "AE",
    monogramTagline: "AOG response & MRO supply logistics",
    image: contentImage("aerospace"),
    headline: "Logistics built for parts that keep aircraft in the air.",
    intro:
      "When an aircraft is grounded, every hour counts, and aerospace cargo rarely fits standard freight handling. From urgent AOG parts to oversized components and regulated materials, we coordinate each move around the urgency, value, and handling requirements your cargo demands.",
    heroChecklist: [
      "Time-critical response for aircraft-on-ground shipments",
      "Secure handling for high-value aircraft parts and tooling",
      "Dangerous-goods coordination for regulated aerospace materials",
      "Reliable supply movements for maintenance, repair, and overhaul",
    ],
    valuePropHeading: "Why choose aerospace logistics with us",
    valuePropDescription:
      "Aerospace shipments don't tolerate delays or improvised handling. We build our processes around the urgency, value, and regulatory requirements of this cargo, so the part you need arrives secure, documented, and as fast as the situation demands.",
    valuePropItems: [
      {
        title: "AOG urgency",
        description:
          "Priority coordination for grounded-aircraft situations, built around getting the right part moving as quickly as the situation demands.",
      },
      {
        title: "Oversized and high-value parts",
        description:
          "Handling matched to engines, components, and tooling that are too large, too delicate, or too valuable for standard freight.",
      },
      {
        title: "Dangerous-goods handling",
        description:
          "Paperwork and packaging prepared to the standard regulated aerospace materials require, reducing delays at carriers and customs.",
      },
      {
        title: "MRO supply coordination",
        description:
          "Planned and recurring movements of parts and tooling between suppliers, maintenance facilities, and operators, with a single point of contact.",
      },
    ],
    benefitsDescription:
      "Built for the demands of aerospace supply chains, from one urgent part to ongoing maintenance and overhaul programs.",
    benefits: [
      {
        icon: "🚨",
        title: "AOG response",
        description: "Fast, prioritized coordination when a grounded aircraft is waiting on a single part.",
      },
      {
        icon: "✈️",
        title: "Oversized part handling",
        description: "Loading, securing, and transport options built around large components that standard freight can't take.",
      },
      {
        icon: "🔒",
        title: "High-value cargo care",
        description: "Secure handling and clear handoff records for parts and tooling where loss or damage is costly.",
      },
      {
        icon: "⚠️",
        title: "Dangerous-goods support",
        description: "Documentation and packaging prepared with the level of detail regulated aerospace materials require.",
      },
      {
        icon: "🔧",
        title: "MRO supply support",
        description:
          "A team that understands maintenance supply chains, coordinating parts and tooling movements on your behalf.",
      },
    ],
    ctaHeading: "Ready to move your next aerospace shipment?",
    ctaDescription:
      "Talk to a specialist who understands the urgency and handling your aircraft parts, tooling, or MRO supply requires.",
    primaryCta: { label: cta.label, href: localePath(locale, cta.href) },
    secondaryCta: { label: "Track shipment", href: localePath(locale, "/track") },
  };

  return <ServiceIndustryTemplate content={content} />;
}
