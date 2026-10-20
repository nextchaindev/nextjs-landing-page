import type { Faq } from "../faqs"
import { EN_PLANS } from "./plans"
import { formatPrice } from "../plans"

const STARTING_PRICE = formatPrice(Math.min(...EN_PLANS.map((plan) => plan.monthlyPrice)), "en")

export const EN_GENERAL_FAQS: Faq[] = [
  {
    q: "What is Nextchain.site?",
    a: "An all-in-one monthly service for landing pages and websites for small businesses: the Nextchain team designs, writes the content, publishes and manages your website. We also take on corporate websites, online stores, custom design, Marketing & SEO and software development as projects.",
  },
  {
    q: "Do I need to design or code anything myself?",
    a: "No. You send us your business information, choose from the design we prepare and approve the content. Nextchain handles everything technical.",
  },
  {
    q: "What does it cost?",
    a: `Landing pages and websites for small businesses are billed monthly from ${STARTING_PRICE}, with no setup fee, using your own domain or a free address. Corporate websites (from $1,490), online stores (from $2,190), custom design, Marketing & SEO and software are priced per project. Prices exclude applicable taxes. See the Pricing page for details.`,
  },
  {
    q: "Is the website optimized for SEO?",
    a: "Yes, we cover technical SEO: unique titles and descriptions for each page, a sitemap, structured data, loading speed and mobile display. Nextchain does not guarantee a specific ranking on Google.",
  },
  {
    q: "What happens to my website and data if I stop using the service?",
    a: "Notice periods and the handover of content and your domain are covered by our cancellation policy. The English version of the policy is being prepared; we are happy to explain the details when you contact us.",
  },
]

export const EN_PRICING_FAQS: Faq[] = [
  {
    q: "Is there a setup fee for the monthly plans?",
    a: "No. Design, content writing, hosting and initial SEO work are all included in the monthly fee.",
  },
  {
    q: "Do I need to buy a domain?",
    a: "Not required. Your website can use a free address like your-brand.nextchain.site. If you already own a domain or want your own (.com and others), register it with a domain provider and Nextchain will connect it for you. The domain fee is paid directly to the provider.",
  },
  {
    q: "What does the monthly fee include?",
    a: "Hosting, SSL, technical maintenance, backups and the number of content edits listed for each plan.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Upgrades apply from the next billing period; extra work such as adding a new page is quoted before we start.",
  },
  {
    q: "How do I pay?",
    a: "By credit/debit card or international bank transfer, billed monthly in advance. Prices exclude applicable taxes, and we can issue an invoice for your business.",
  },
  {
    q: "What if I cancel?",
    a: "Notice periods and the handover of content and your domain are covered by our cancellation policy. The English version is being prepared; we will explain the details when you contact us.",
  },
]
