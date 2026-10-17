import { CheckCircle2, Info } from "lucide-react"
import ContactButton from "@/components/marketing/ContactButton"
import Reveal from "@/components/marketing/Reveal"
import { MOBILE_CAROUSEL, MOBILE_CAROUSEL_ITEM } from "@/components/marketing/carousel"
import { formatPrice, getPlans } from "@/content/plans"
import { cn } from "@/components/ui/utils"
import { getDictionary } from "@/i18n/dictionaries"
import type { Locale } from "@/i18n/config"

/** Monthly plans for landing pages & small businesses. Pass `planIds` to show a subset. */
export default function PricingCards({ planIds, locale = "vi" }: { planIds?: string[]; locale?: Locale }) {
  const { pricing } = getDictionary(locale)
  const allPlans = getPlans(locale)
  const plans = planIds ? allPlans.filter((plan) => planIds.includes(plan.id)) : allPlans
  const price = (value: number) => formatPrice(value, locale)

  return (
    <>
      <div className={cn(MOBILE_CAROUSEL, "pt-8", plans.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 max-w-[860px] mx-auto")}>
        {plans.map((plan, idx) => (
          <Reveal key={plan.id} delay={idx * 0.1} className={cn(MOBILE_CAROUSEL_ITEM, plan.popular && "md:scale-105")}>
            <article
              id={plan.id}
              className={cn(
                "relative flex flex-col h-full bg-white rounded-2xl border-2 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
                plan.popular ? "border-[#ffb86a]" : "border-gray-200",
              )}>
              {plan.popular && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-linear-to-r from-[#FFB900] to-[#FF8904] text-white text-xs font-semibold px-6 py-2 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap">
                  {pricing.popular}
                </span>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">{pricing.planTitle.replace("{name}", plan.name)}</h3>
                <p className="mt-2 text-sm text-gray-500 font-medium">{plan.tagline}</p>
                <p className="mt-5">
                  <span className="text-3xl lg:text-4xl font-bold text-primary">{price(plan.monthlyPrice)}</span>
                  <span className="text-gray-500 font-medium">{pricing.perMonth}</span>
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {pricing.perDay.replace("{price}", price(Math.ceil(plan.monthlyPrice / 30 / 100) * 100))}
                </p>
                <p className="mt-2 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-gray-700">
                  {pricing.terms}
                </p>
              </div>

              <ul className="mt-8 space-y-4 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm font-medium text-gray-800 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
                {plan.limits.map((limit) => (
                  <li key={limit} className="flex gap-3 text-sm text-gray-500">
                    <Info className="w-5 h-5 shrink-0" />
                    {limit}
                  </li>
                ))}
              </ul>

              <ContactButton
                label={pricing.register.replace("{name}", plan.name)}
                variant={plan.popular ? "primary" : "outline"}
                context={pricing.interest.replace("{name}", plan.name).replace("{price}", price(plan.monthlyPrice))}
                className="mt-8 w-full"
              />
            </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-10 text-center text-sm md:text-base text-gray-600">
        <strong className="text-gray-900">{pricing.noSetupFee}</strong>
        {pricing.footerLine1}
        <br />
        {pricing.footerLine2}
      </p>
    </>
  )
}
