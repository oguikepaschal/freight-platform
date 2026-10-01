import type { Metadata } from "next";
import { ServiceIndustryTemplate, contentCta, contentImage, type ServiceIndustryContent } from "@freight/ui";
import { localePath } from "@/lib/locale/config";
import { getLocale } from "@/lib/locale/server";

export const metadata: Metadata = {
  title: "Perishables | Meridian Freight",
  description:
    "Temperature-controlled logistics for fresh food, produce and flowers. Time-critical cold chain handling built to protect shelf life from pickup to delivery.",
};

export default async function PerishablesPage() {
  const locale = await getLocale();
  const cta = contentCta("perishables");

  const content: ServiceIndustryContent = {
    name: "Perishables",
    monogram: "PR",
    monogramTagline: "Fresh food, produce & flowers logistics",
    image: contentImage("perishables"),
    headline: "Logistics built for cargo with a shelf life.",
    intro:
      "Fresh food, produce, and flowers don't wait. Every hour in transit counts against ripeness and freshness, and a warm dock or a missed connection can cost you the whole load. We plan each move around the clock your product is on, with temperature-controlled handling and a close eye on quality at every handoff.",
    heroChecklist: [
      "Temperature-controlled transport for food and fresh produce",
      "Time-critical routing to protect shelf life",
      "Careful handling for flowers and delicate fresh goods",
      "Quality checks at every handoff",
    ],
    valuePropHeading: "Why choose perishables logistics with us",
    valuePropDescription:
      "When your product is fresh, timing and temperature decide what arrives. We build our processes around keeping the cold chain unbroken and the transit short, so your goods reach grocers, florists, and distributors in the condition they were shipped.",
    valuePropItems: [
      {
        title: "Unbroken cold chain",
        description:
          "Chilled and frozen options matched to what you ship, kept consistent from pickup through every transfer to final delivery.",
      },
      {
        title: "Transit-time focus",
        description:
          "Routes and connections planned around how quickly your product loses freshness, with priority on the fastest workable path.",
      },
      {
        title: "Care for fresh goods",
        description:
          "Handling and loading suited to the ripeness and fragility of produce and flowers, not generic dry-freight practice.",
      },
      {
        title: "Inspection at handoff",
        description:
          "Condition checks when cargo changes hands, so problems are caught early and you know how your shipment is faring along the way.",
      },
    ],
    benefitsDescription:
      "Built for fresh supply chains, from weekly grocery replenishment to last-minute florist orders.",
    benefits: [
      {
        icon: "❄️",
        title: "Cold chain handling",
        description: "Chilled and frozen transport options matched to the needs of your food and fresh products.",
      },
      {
        icon: "⏱️",
        title: "Speed to shelf",
        description: "Time-critical planning that shortens the journey and protects the shelf life you have left on arrival.",
      },
      {
        icon: "🥬",
        title: "Fresh produce care",
        description:
          "Loading and handling that respects ripeness and fragility, so fruit and vegetables arrive ready to sell.",
      },
      {
        icon: "💐",
        title: "Flowers and florist deliveries",
        description: "Gentle, well-timed handling for cut flowers and delicate arrangements headed to florists and retailers.",
      },
      {
        icon: "🔍",
        title: "Quality checks at handoff",
        description: "Condition inspections each time cargo changes hands, giving you an early view of how your goods are holding up.",
      },
    ],
    ctaHeading: "Ready to move your next perishable shipment?",
    ctaDescription:
      "Talk to a specialist who understands the timing and temperature your fresh food, produce, or flowers need to arrive in good condition.",
    primaryCta: { label: cta.label, href: localePath(locale, cta.href) },
    secondaryCta: { label: "Track shipment", href: localePath(locale, "/track") },
  };

  return <ServiceIndustryTemplate content={content} />;
}
