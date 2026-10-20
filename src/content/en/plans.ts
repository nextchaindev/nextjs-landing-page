import type { Plan } from "../plans"

/**
 * English monthly plans. Prices are fixed USD amounts (not converted from VND/KRW).
 * Keep the structure identical to ../plans.ts (edit both together).
 */
export const EN_FREE_SUBDOMAIN_EXAMPLE = "your-brand.nextchain.site"

export const EN_PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "A one-page landing page that introduces your business and collects inquiries",
    monthlyPrice: 29,
    features: [
      "1 landing page designed for your industry",
      `Free address ${EN_FREE_SUBDOMAIN_EXAMPLE} or connect your own domain`,
      "Fast hosting with SSL certificate (https)",
      "Inquiry form, click-to-call and messaging buttons",
      "Basic SEO: titles, descriptions, sitemap, Google Maps",
      "2 content edits per month",
    ],
    limits: ["Blog not included"],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "A multi-page website for businesses with several services",
    monthlyPrice: 79,
    popular: true,
    features: [
      "Up to 5 pages: home, services, pricing, gallery, contact",
      "A dedicated page for each main service",
      "2 blog posts per month written by Nextchain; you approve before publishing",
      "5 content edits per month",
      "Monthly report on visits and inquiries",
    ],
    limits: ["Everything in the Starter plan"],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "For businesses with many services or locations, or that sell products",
    monthlyPrice: 149,
    features: [
      "Up to 10 pages, with a dedicated page for each location",
      "Product catalog of up to 50 items: photos, descriptions, prices, order inquiry button",
      "4 blog posts per month",
      "Unlimited small edits, handled with priority within 1 business day",
    ],
    limits: ["Everything in the Growth plan", "Shopping cart & online payments: quoted per project"],
  },
]
