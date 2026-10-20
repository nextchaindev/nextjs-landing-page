import { EN_PLANS } from "@/content/en/plans"
import { EN_PROJECT_SERVICES } from "@/content/en/projectPricing"
import { formatPrice } from "@/content/plans"
import { getDictionary } from "@/i18n/dictionaries"
import { ENABLED_LOCALES } from "@/i18n/config"
import { SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

/**
 * /en/pricing.md — English price list as plain text for AI agents comparing products on a
 * customer's behalf. Generated from the same data as the English pricing page.
 * Returns 404 until English is enabled (NEXT_PUBLIC_ENABLED_LOCALES includes en).
 */
export function GET() {
  if (!ENABLED_LOCALES.includes("en")) return new Response("Not found", { status: 404 })

  const { contact } = getDictionary("en")

  const plans = EN_PLANS.map((plan) => {
    const features = plan.features.map((feature) => `  - ${feature}`)
    const limits = plan.limits.map((limit) => `  - ${limit}`)
    return [
      `## ${plan.name}${plan.popular ? " (most popular)" : ""}`,
      `- Price: ${formatPrice(plan.monthlyPrice, "en")}/month`,
      `- For: ${plan.tagline}`,
      "- Includes:",
      ...features,
      "- Notes:",
      ...limits,
    ].join("\n")
  }).join("\n\n")

  const projects = Object.values(EN_PROJECT_SERVICES)
    .map((service) => {
      const packages = service.packages.map((pkg) => `  - ${pkg.name}: ${pkg.price} — ${pkg.description}`)
      return [`## ${service.name} (per project)`, ...packages].join("\n")
    })
    .join("\n\n")

  const body = `# Pricing — Nextchain.site

Currency: USD. Prices exclude applicable taxes. Monthly plans have no setup fee and are billed monthly.
Details: ${SITE_URL}/en/pricing

# Monthly website plans

${plans}

# Project-based services

${projects}

Custom quotes: ${contact.email} | ${contact.phone}
`

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
