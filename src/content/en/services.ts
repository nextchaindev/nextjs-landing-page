import type { ServiceTexts } from "../services"
import { getFreeSubdomainExample, getStartingPrice } from "../plans"
import { getProjectServices } from "../projectPricing"

const STARTING_PRICE = getStartingPrice("en")
const FREE_SUBDOMAIN_EXAMPLE = getFreeSubdomainExample("en")
const PROJECT_PRICES = getProjectServices("en")
const CORPORATE_PRICE = PROJECT_PRICES.corporate.packages[0].price
const ECOMMERCE_PRICE = PROJECT_PRICES.ecommerce.packages[0].price
const CUSTOM_PRICE = PROJECT_PRICES.custom.packages[0].price
const MARKETING_PRICE = PROJECT_PRICES.marketing.packages[0].price
const SOFTWARE_PRICE = PROJECT_PRICES.software.packages[0].price

export const EN_SERVICE_TEXTS: ServiceTexts = {
  "thiet-ke-landing-page": {
    slug: "landing-page",
    name: "All-in-One Landing Page",
    metaTitle: "All-in-one landing page design, billed monthly",
    metaDescription: `All-in-one landing pages from ${STARTING_PRICE}/month with no setup fee: industry-specific design, hosting, SSL, SEO and updates. Use your own domain or a free address.`,
    h1: "All-in-one landing page design, managed monthly",
    summary: `Nextchain builds all-in-one landing pages for small businesses. You send your information, choose one of 3 design options we prepare and approve the content; Nextchain publishes the page, connects your domain, sets up SEO and updates it every month. From ${STARTING_PRICE}/month with no setup fee, using your own domain or the free address ${FREE_SUBDOMAIN_EXAMPLE}.`,
    audience: "Spas, salons, homestays and local service businesses",
    imageAlt: "Apartment project landing page designed by Nextchain",
    benefits: [
      {
        title: "No design skills needed",
        desc: "You send your information and approve the result. Nextchain handles the layout, content and technical work.",
      },
      {
        title: "3 options to choose from",
        desc: "The Nextchain team prepares three design directions using your business's real content so you can compare and choose.",
      },
      {
        title: "Always kept up to date",
        desc: "Changing prices, adding services, replacing photos: send a request and Nextchain does it within your monthly plan.",
      },
    ],
    deliverables: [
      "3 design options using your real content",
      "Writing of the introduction, services and calls to action",
      "Contact form, call button and WhatsApp button",
      `Free address ${FREE_SUBDOMAIN_EXAMPLE} or connection to your own domain`,
      "Hosting and SSL certificate (https)",
      "Titles, descriptions, sitemap and structured data",
      "Monthly content updates according to your plan",
    ],
    notIncluded: [
      "Purchase and renewal fees for your own domain (if you use one)",
      "Google/Facebook advertising spend",
      "On-site photography",
      "A guaranteed ranking on Google",
    ],
    faqs: [
      {
        q: "How is a landing page different from a multi-page website?",
        a: "A landing page is a single page focused on one goal, usually collecting inquiries. A multi-page website has separate pages for each service, a blog and detailed information, which suits you better if you want customers to find each service on Google.",
      },
      {
        q: "Is there a setup fee for the monthly plan?",
        a: "No. You only pay the monthly fee for your plan, which includes design, hosting, SSL and content updates.",
      },
      {
        q: "Do I need to buy a domain?",
        a: `Not required. You can use the free address ${FREE_SUBDOMAIN_EXAMPLE}, or buy your own domain (.com and others) and Nextchain will connect it for you.`,
      },
      {
        q: "What happens to my landing page if I cancel the monthly plan?",
        a: "The handover of content and your domain is covered by our cancellation policy. Contact us and we will explain the details.",
      },
    ],
    related: [
      { href: "/blog/chi-phi-thiet-ke-landing-page", label: "What does landing page design cost?" },
      { href: "/giai-phap/website-spa", label: "Landing page for spas" },
      { href: "/mau-website", label: "Website templates by industry" },
    ],
  },
  "thiet-ke-website-doanh-nghiep": {
    slug: "corporate-website",
    name: "Corporate Website",
    metaTitle: "Professional corporate website design",
    metaDescription: `Corporate website design from ${CORPORATE_PRICE}: 5-15+ pages, content management, blog, multilingual support and SEO. Build brand credibility and get found on Google.`,
    h1: "Corporate website design: brand credibility and customers who find you on Google",
    summary: `Nextchain's corporate website presents your company, services, projects and news across separate pages, with a content management system. From ${CORPORATE_PRICE} for 5-7 pages, completed in 7-30 days depending on size, with multilingual support and SEO.`,
    audience: "Service, manufacturing, education, construction and B2B companies",
    imageAlt: "Training center enrollment website designed by Nextchain",
    benefits: [
      {
        title: "Build trust with customers",
        desc: "Clear information about your company, services and team reassures customers and partners before they get in touch.",
      },
      {
        title: "One page per service",
        desc: "A dedicated page for each service helps Google show the right page when customers search for that specific service.",
      },
      {
        title: "Post your own news",
        desc: "A simple admin area lets you publish news, job openings and new projects without a developer.",
      },
    ],
    deliverables: [
      "Home, About, Services, Projects, News and Contact pages",
      "Content management system",
      "Google Maps and contact form",
      "Multilingual (Premium and above)",
      "On-page SEO, sitemap and structured data",
      "Training on using the admin area",
    ],
    notIncluded: ["Company photography", "A guaranteed ranking on Google"],
    faqs: [
      {
        q: "How many pages does a corporate website need?",
        a: "A small business usually needs a home page, About, Services, a blog and Contact. If you offer several services, it is best to give each its own page.",
      },
      {
        q: "Does the website support more than one language?",
        a: "Premium supports 2 languages and Professional supports 3 or more.",
      },
    ],
    related: [
      { href: "/blog/landing-page-khac-website-doanh-nghiep", label: "Landing page or corporate website?" },
      { href: "/dich-vu/quan-tri-website-theo-thang", label: "Monthly website management" },
    ],
  },
  "thiet-ke-website-ban-hang": {
    slug: "ecommerce-website",
    name: "E-commerce Website",
    metaTitle: "Professional e-commerce website design",
    metaDescription: `E-commerce website design from ${ECOMMERCE_PRICE}: shopping cart, online payment, order and inventory management, discount codes and product SEO. Sell 24/7 without depending on marketplaces.`,
    h1: "E-commerce website design: sell 24/7 without relying on marketplaces",
    summary: `Nextchain builds online stores with a shopping cart, online payment, and order and inventory management. From ${ECOMMERCE_PRICE} for up to 100 products, completed in 10-45 days depending on the package. Small shops that only need to showcase products can use the monthly Professional plan.`,
    audience: "Fashion, cosmetics, food and home goods shops, and retail brands",
    imageAlt: "Product showcase website interface",
    benefits: [
      {
        title: "A sales channel of your own",
        desc: "You don't depend entirely on marketplaces, and you keep your customers' contact details so you can follow up with them.",
      },
      {
        title: "Products found on Google",
        desc: "Each product gets its own page with a suitable title, description and structured data.",
      },
      {
        title: "Updates handled for you",
        desc: "Adding products, changing prices, replacing photos: Nextchain does it within your package.",
      },
    ],
    deliverables: [
      "Categories, product pages, shopping cart and checkout",
      "Payment gateway and shipping integration",
      "Order, inventory and customer management",
      "Discount codes and promotions (Premium and above)",
      "Product SEO, sitemap and structured data",
      "Sales reports",
    ],
    notIncluded: [
      "Payment gateway and shipping fees charged by each provider",
      "Entering your full product catalog (quoted separately)",
    ],
    faqs: [
      {
        q: "Should I build a website if I already sell on marketplaces?",
        a: "Marketplaces help you reach new customers; a website helps you build your brand, keep repeat customers and present your products in more detail. Many shops use both.",
      },
      {
        q: "How many products can I list?",
        a: "Basic allows up to 100 products; Premium and Professional have no limit.",
      },
    ],
    related: [
      { href: "/giai-phap/website-salon", label: "Salon website with a product page" },
      { href: "/bang-gia", label: "Professional plan" },
    ],
  },
  "thiet-ke-website-theo-yeu-cau": {
    slug: "custom-website",
    name: "Custom Design",
    metaTitle: "Custom website design",
    metaDescription: `Custom website design from ${CUSTOM_PRICE}: business analysis, unique UI/UX, custom features, admin panel, and API and third-party integrations.`,
    h1: "Custom website design: your own features for your own business processes",
    summary: `When ready-made templates are not enough, Nextchain analyzes your business processes and builds a website with its own interface and features: booking, customer portals, internal admin tools and API integrations. From ${CUSTOM_PRICE}, taking 14-60+ days depending on complexity.`,
    audience: "Businesses with specific processes, and service platforms",
    imageAlt: "Custom-designed limousine booking landing page",
    benefits: [
      {
        title: "Built around your process",
        desc: "Features are designed around how your business actually runs, rather than forced into a template.",
      },
      {
        title: "Approve before we build",
        desc: "The interface and user flow are approved on design mockups before development starts.",
      },
      {
        title: "Room to grow",
        desc: "Clear technical documentation makes it possible to add features as your business grows.",
      },
    ],
    deliverables: [
      "Requirements analysis and feature specification",
      "Interface design and user flow",
      "Development and third-party system integration",
      "Testing and technical documentation",
    ],
    notIncluded: ["Infrastructure and third-party service fees (quoted at actual cost)"],
    faqs: [
      {
        q: "How do I find out the exact cost?",
        a: "After a requirements analysis session, Nextchain sends you a feature specification and a quote broken down by item.",
      },
      {
        q: "Who owns the source code?",
        a: "This is agreed clearly in the contract before work begins.",
      },
    ],
    related: [
      { href: "/dich-vu/phat-trien-phan-mem", label: "Software development" },
      { href: "/quy-trinh", label: "How we work" },
    ],
  },
  "marketing-seo": {
    slug: "marketing-seo",
    name: "Marketing & SEO",
    metaTitle: "Marketing & website SEO services",
    metaDescription: `SEO and online marketing from ${MARKETING_PRICE}: keyword research, on-page and technical SEO, content, Google Business Profile, Google Ads and regular reports.`,
    h1: "Marketing & SEO: bring your website to the right customers",
    summary: `Nextchain handles technical SEO, content and advertising so your website gets visitors and conversions. Packages start from ${MARKETING_PRICE} and include keyword research, on-page optimization, Google Business Profile setup, Google Analytics and regular reports. Nextchain does not guarantee a specific ranking.`,
    audience: "Businesses that already have a website and want more customers from Google and ads",
    imageAlt: "Restaurant website displayed on a phone",
    benefits: [
      {
        title: "Customers come to you",
        desc: "SEO helps your website appear when customers search for exactly what you offer, a more lasting source of customers than ads.",
      },
      {
        title: "Content that answers real questions",
        desc: "Articles answer customers' questions directly, with structured data and consistent information, which makes them easier for Google to show and cite.",
      },
      {
        title: "Transparent reporting",
        desc: "Track visits, search queries and inquiries through Google Analytics and Search Console.",
      },
    ],
    deliverables: [
      "Keyword research based on search intent",
      "On-page and technical SEO (speed, sitemap, schema)",
      "Google Business Profile, Analytics and Search Console",
      "Fact-checked blog content",
      "Ad setup and monitoring (within the agreed scope)",
      "Regular reports",
    ],
    notIncluded: [
      "Advertising budget paid to Google/Meta",
      "Buying backlinks or tactics that violate Google's policies",
      "Mass-producing thin pages just to get indexed",
    ],
    faqs: [
      {
        q: "How long does SEO take to show results?",
        a: "It usually takes a few months to see a clear change in organic traffic, depending on the level of competition and the starting condition of your website.",
      },
      {
        q: "Do you guarantee a top 1 ranking on Google?",
        a: "No. Nextchain commits to the work items and transparent reporting, not to a specific ranking.",
      },
    ],
    related: [
      { href: "/blog/website-spa-can-nhung-gi", label: "Example: what does a spa website need?" },
      { href: "/dich-vu/thiet-ke-website-doanh-nghiep", label: "Corporate website" },
    ],
  },
  "phat-trien-phan-mem": {
    slug: "software-development",
    name: "Software Development",
    metaTitle: "Custom software development",
    metaDescription: `Custom web and mobile software and application development from ${SOFTWARE_PRICE}: business analysis, development, API integration, security, user permissions and maintenance.`,
    h1: "Software development built around your business processes",
    summary: `Nextchain develops web and mobile applications and management systems around your company's own processes: dashboards, internal CRM, booking and data management. From ${SOFTWARE_PRICE}, taking 7-30+ days depending on scale, with maintenance after delivery.`,
    audience: "Businesses digitizing their processes, and startups building a first version",
    imageAlt: "SaaS data management dashboard developed by Nextchain",
    benefits: [
      {
        title: "Automate repetitive work",
        desc: "Replace spreadsheets and manual processes with a system that has user permissions, history and reports.",
      },
      {
        title: "Data in one place",
        desc: "Connect the tools you already use through APIs so your data is not scattered.",
      },
      {
        title: "Security & permissions",
        desc: "User permissions and backups are set according to how sensitive your data is.",
      },
    ],
    deliverables: [
      "Business analysis and specification",
      "Web / mobile application",
      "API and data integration",
      "User permissions and security",
      "Maintenance after delivery",
    ],
    notIncluded: ["App Store / Google Play publishing fees", "Cloud infrastructure fees"],
    faqs: [
      {
        q: "Should I build custom software or use existing software?",
        a: "If existing software meets most of your needs, use it. Custom software makes sense when your process is specific, or when long-term subscription costs would exceed the cost of building.",
      },
    ],
    related: [
      { href: "/dich-vu/thiet-ke-website-theo-yeu-cau", label: "Custom website design" },
      { href: "/lien-he", label: "Contact us for a consultation" },
    ],
  },
}
