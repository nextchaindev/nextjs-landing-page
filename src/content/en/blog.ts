import type { BlogPostTexts } from "../blog"
import { formatPrice, getFreeSubdomainExample, getPlans, getStartingPrice } from "../plans"
import { getProjectServices } from "../projectPricing"

const AUTHOR = "The Nextchain Team"
const PLANS = getPlans("en")
const STARTING_PRICE = getStartingPrice("en")
const FREE_SUBDOMAIN_EXAMPLE = getFreeSubdomainExample("en")
const CORPORATE_FROM = getProjectServices("en").corporate.packages[0].price

export const EN_BLOG_TEXTS: BlogPostTexts = {
  "chi-phi-thiet-ke-landing-page": {
    slug: "landing-page-design-cost",
    title: "What Does Landing Page Design Cost Include? How to Calculate It, With a Checklist",
    metaTitle: "Landing Page Design Cost",
    description:
      "The costs of building a landing page: design, content, domain, hosting and maintenance. Compares paying once with a monthly plan and gives a checklist for choosing a provider.",
    category: "Cost",
    author: AUTHOR,
    answer: `Landing page cost is made up of design, content and development, a domain and hosting (paid every year), and the edits and maintenance that come afterwards. There are two ways to pay: once, then look after it yourself, or a monthly plan that includes design, hosting, updates and maintenance. Nextchain.site uses the monthly plan, from ${STARTING_PRICE}/month with no setup fee.`,
    keyTakeaways: [
      "Don't compare design prices alone. Ask about the domain, hosting, number of edits and how long support lasts.",
      "A landing page for a short campaign can use a basic plan. A page that will run ads for a long time deserves tracking and conversion work.",
      "Advertising spend is a separate cost and is not part of the design price.",
    ],
    sections: [
      {
        heading: "What costs make up a landing page?",
        bullets: [
          "Design: layout, colors and images that match your brand.",
          "Content: headline, benefits and calls to action. Many providers charge separately for writing.",
          "Development and responsive layout: a page that looks right on phones and loads quickly.",
          "Integrations: contact form, WhatsApp, Google Analytics, ad pixels and email marketing tools.",
          "Domain and hosting: paid yearly, and either billed separately or bundled into a maintenance plan.",
          "Edits and maintenance: how many free changes you get and how long support lasts after handover.",
        ],
      },
      {
        heading: "What is each cost paying for?",
        table: {
          head: ["Item", "When you pay", "Notes"],
          rows: [
            ["Design & content", "Once, at the start", "Layout, copywriting and the number of design options"],
            ["Domain", "Yearly", "Ask whose name the domain is registered under"],
            ["Hosting & SSL", "Monthly or yearly", "Affects speed and reliability"],
            ["Edits & updates", "Per request or per plan", "Number of free edits and turnaround time"],
            ["Maintenance & backups", "Recurring", "Often forgotten when you pay once"],
          ],
        },
      },
      {
        heading: "How does Nextchain.site charge for a landing page?",
        paragraphs: [
          `Nextchain.site sells landing pages on a monthly plan from ${STARTING_PRICE}, with no setup fee. The monthly fee covers design, content writing, hosting, SSL, maintenance and the number of edits in your plan. For a domain, you can use the free address ${FREE_SUBDOMAIN_EXAMPLE} or buy your own and have Nextchain connect it. The ${PLANS[0].name} plan at ${formatPrice(PLANS[0].monthlyPrice, "en")}/month suits a single landing page. The ${PLANS[1].name} plan at ${formatPrice(PLANS[1].monthlyPrice, "en")}/month is for a website of up to 5 pages with a blog.`,
        ],
      },
      {
        heading: "Why do landing page prices vary so much?",
        paragraphs: [
          "A landing page built from a ready-made template and one designed from scratch involve very different amounts of work. The factors that change the price are how much the design is customized, who writes the content, how many animations there are, how many tools need to be connected and how long support lasts after handover.",
          "A low price is not necessarily a problem. Still, check that the page loads fast on a phone, that form submissions reach the right person, and that you control the domain.",
        ],
      },
      {
        heading: "Pay once or pay monthly?",
        paragraphs: [
          "If the landing page is for a single campaign, paying once is enough. If the page is a long-term way to get customers and you need to change content often (prices, promotions, images), a monthly management plan means you don't have to deal with the technical side yourself.",
        ],
      },
      {
        heading: "Checklist before choosing a landing page provider",
        bullets: [
          "Does the price include the domain, hosting and SSL?",
          "How many free edits do you get? How are further edits charged?",
          "Who writes the content? Do you need to prepare it first?",
          "Will they set up Google Analytics and track form submissions?",
          "Whose name is the domain registered under?",
        ],
      },
    ],
    faqs: [
      {
        q: "Why do some providers charge so little for a landing page?",
        a: "Often it is because they use ready-made templates, don't write the content, offer few edits, or leave out the domain, hosting and maintenance. Compare the total cost over 1 to 2 years rather than just the starting price.",
      },
      {
        q: "Does the landing page price include running ads?",
        a: "No. The advertising budget you pay to Google or Meta is a separate cost.",
      },
    ],
    relatedLinks: [
      { href: "/dich-vu/thiet-ke-landing-page", label: "Landing page design service" },
      { href: "/bang-gia", label: "Pricing for all services" },
      { href: "/blog/landing-page-khac-website-doanh-nghiep", label: "How is a landing page different from a business website?" },
    ],
  },
  "landing-page-khac-website-doanh-nghiep": {
    slug: "landing-page-vs-business-website",
    title: "How Is a Landing Page Different From a Business Website? Which One to Choose",
    metaTitle: "Landing Page or Business Website?",
    description:
      "Compares a landing page and a business website on purpose, number of pages, SEO, cost and timeline, with guidance on choosing based on your business goal.",
    category: "Comparison",
    author: AUTHOR,
    answer:
      "A landing page is a single page built for one specific goal, usually collecting customer details from an ad. A business website has several pages that present the company, its services and news in full, which suits building credibility and getting customers from Google. Running ads for one product: choose a landing page. Need a lasting online presence and SEO: choose a website.",
    keyTakeaways: [
      "A landing page is built for conversions. A website is built for credibility and long-term SEO.",
      "Many businesses use both: a website as the base and a landing page for each campaign.",
      "A small business just starting out can begin with a landing page and expand it into a website later.",
    ],
    sections: [
      {
        heading: "Landing page vs. business website comparison",
        table: {
          head: ["Criteria", "Landing page", "Business website"],
          rows: [
            ["Goal", "One action: leave details, call, sign up", "A full introduction that builds credibility"],
            ["Pages", "1 page", "5 to 15+ pages"],
            ["Navigation", "Minimal menu so visitors stay on the page", "Full menu with many sub-pages"],
            ["SEO", "Limited, suited to a few keywords", "Better: one page per service"],
            ["Content to prepare", "Little: one message, one offer", "A lot: each service, an about page, articles"],
            ["Cost at Nextchain", `Monthly plan from ${STARTING_PRICE}, no setup fee`, `Per project, from ${CORPORATE_FROM}`],
          ],
        },
      },
      {
        heading: "When should you choose a landing page?",
        bullets: [
          "Running Google or Facebook ads for one product, course or event.",
          "Launching a real estate project or a limited-time promotion.",
          "A small business that has just opened and needs a page to get customers quickly.",
        ],
      },
      {
        heading: "When should you choose a business website?",
        bullets: [
          "Customers (especially B2B) research thoroughly before getting in touch.",
          "You offer several services and want each one to be found on Google.",
          "You need to post news, job openings or projects regularly.",
        ],
      },
      {
        heading: "Can you start with a landing page and upgrade later?",
        paragraphs: [
          "Yes. Many service businesses start with one landing page to appear on Google, then add a page for each service and a blog as demand grows. The important thing is to keep the same domain so nothing you have built is lost.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can a landing page show up on Google?",
        a: "Yes, but with only one page it usually suits just the brand name and a few main keywords.",
      },
      {
        q: "Can a business website replace a landing page when running ads?",
        a: "You can send ads to a service page on your website, but a dedicated landing page usually converts better because it has fewer distractions.",
      },
    ],
    relatedLinks: [
      { href: "/dich-vu/thiet-ke-landing-page", label: "Landing page design" },
      { href: "/dich-vu/thiet-ke-website-doanh-nghiep", label: "Business website design" },
      { href: "/blog/chi-phi-thiet-ke-landing-page", label: "Landing page design cost" },
    ],
  },
  "website-spa-can-nhung-gi": {
    slug: "spa-website-checklist",
    title: "What Pages and Features Does a Spa Website Need? A Checklist for Spa Owners",
    metaTitle: "What Pages Does a Spa Website Need?",
    description:
      "The pages and features a spa website should have: a service menu, a page for each treatment, a gallery, booking and a blog. Includes common mistakes to avoid.",
    category: "Spa",
    author: AUTHOR,
    answer:
      "A spa website needs at least: a home page that shows the space and signature services, a service menu with prices, a dedicated page for each main treatment, a gallery of real photos, and a booking button (a form or WhatsApp) that stays visible on phones. A skincare blog is an extra that helps the spa show up more often on Google.",
    keyTakeaways: [
      "Spa customers decide on three things: whether you offer the service they want, roughly what it costs and what the place looks like.",
      "Give each main treatment its own page so customers can find exactly that on Google.",
      "Use only real photos of your spa. Before-and-after photos need the client's consent.",
    ],
    sections: [
      {
        heading: "The essential pages of a spa website",
        table: {
          head: ["Page", "Main content", "Purpose"],
          rows: [
            ["Home", "The space, signature services, address, booking button", "First impression, leading visitors to book"],
            ["Service menu", "Treatments by group, duration, price", "Answers the question “how much?”"],
            ["Individual service pages", "Process, benefits, notes, price", "SEO for each service"],
            ["Gallery", "Treatment rooms, team, products", "Builds trust"],
            ["Contact / Booking", "Form, WhatsApp, map, opening hours", "Conversion"],
          ],
        },
      },
      {
        heading: "Features worth having",
        bullets: [
          "Call and WhatsApp buttons fixed to the corner of the phone screen.",
          "A short booking form: name, phone number, service and preferred time.",
          "A Google Maps embed and clear opening hours.",
          "Fast loading: compressed images and no heavy video at the top of the page.",
          "Promotion details that are easy to change each month.",
        ],
      },
      {
        heading: "Common mistakes on spa websites",
        bullets: [
          "Using only stock photos from the internet with no real photos of the spa.",
          "An outdated price list that differs from real prices, which costs customers' trust.",
          "Putting every service on one long page that is hard to read and hard to rank on Google.",
          "Not stating the address clearly, so customers have to message to ask.",
        ],
      },
      {
        heading: "Does a small spa need a website if it already has Facebook and WhatsApp?",
        paragraphs: [
          "Facebook and WhatsApp work well for looking after regular customers, but posts get buried quickly and rarely appear when a new customer searches “skincare spa near me” on Google. A website is the one place for fixed information such as services, prices and address, and it is the destination for all your other channels.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does a spa website need automatic online booking?",
        a: "For a small spa, a booking request form plus WhatsApp is often enough, since the owner still needs to confirm the time slot. Automatic booking suits spas with many therapists and a full schedule.",
      },
      {
        q: "Should I show service prices on the website?",
        a: "Yes, show the price or a price range. Customers who know the cost beforehand get in touch with clearer intent, and you get fewer messages that only ask about prices.",
      },
    ],
    relatedLinks: [
      { href: "/giai-phap/website-spa", label: "Website solution for spas" },
      { href: "/mau-website/spa", label: "Spa website templates" },
      { href: "/bang-gia", label: "Pricing" },
    ],
  },
  "lam-website-theo-goi-thang-hay-tra-mot-lan": {
    slug: "monthly-plan-vs-one-time-website",
    title: "Monthly Plan or One-Time Payment for a Website: Which Should You Choose?",
    metaTitle: "Monthly Plan or Pay Once for a Website?",
    description:
      "Compares two ways to get a website: paying once and paying monthly. Pros and cons, hidden costs and which suits a small business.",
    category: "Cost",
    author: AUTHOR,
    answer:
      "Paying once suits you if someone on your side will manage the website or you rarely need to change the content. A monthly plan suits busy owners who want someone to handle design, updates, maintenance and technical support on an ongoing basis, with a lower upfront cost.",
    keyTakeaways: [
      "A website you pay for once still has yearly costs: the domain, hosting, bug fixes and updates.",
      "A monthly plan turns a large upfront cost into a regular payment, with update services included.",
      "Whichever you choose, ask who owns the domain and the content if you stop working together.",
    ],
    sections: [
      {
        heading: "Quick comparison",
        table: {
          head: ["Criteria", "Pay once", "Monthly plan"],
          rows: [
            ["Upfront cost", "Higher", "Low (only the first month's fee)"],
            ["Content updates", "Do it yourself or pay each time", "Included within the plan's scope"],
            ["Maintenance & backups", "Handle yourself or hire separately", "Included"],
            ["Best for", "Having technical staff and few changes", "Busy owners who change things often"],
          ],
        },
      },
      {
        heading: "Hidden costs of a pay-once website",
        bullets: [
          "Yearly renewal of the domain and hosting.",
          "Fixing problems when plugins or browsers update.",
          "Changing prices, services or images when you can't do it yourself.",
          "A website that slowly goes stale because nobody updates the content.",
        ],
      },
      {
        heading: "Questions to ask before signing up for a monthly plan",
        bullets: [
          "How many updates do you get each month? What is the turnaround time?",
          "Is there a setup fee? What is the minimum commitment?",
          "How much notice is needed to cancel? What happens to the content and domain?",
          "Will work outside the plan be quoted before it starts?",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a monthly plan more expensive in the long run?",
        a: "It depends on how you compare. If you include the hosting, maintenance and time spent updating content on a pay-once website, the gap is often smaller than you expect. Compare total cost over 2 to 3 years.",
      },
      {
        q: "Which model does Nextchain.site use?",
        a: `Landing pages and websites for small businesses: a monthly plan from ${STARTING_PRICE}, with no setup fee, including updates and maintenance. Corporate websites, online stores and software: priced per project, see the Pricing page.`,
      },
    ],
    relatedLinks: [
      { href: "/bang-gia", label: "Service and monthly plan pricing" },
      { href: "/dich-vu/quan-tri-website-theo-thang", label: "Monthly website management" },
      { href: "/chinh-sach-huy-dich-vu", label: "Cancellation policy" },
    ],
  },
  "website-hay-facebook-cho-kinh-doanh-nho": {
    slug: "website-or-facebook-page",
    title: "Already Have a Facebook Page: Does a Small Business Still Need a Website?",
    metaTitle: "Have a Facebook Page, Need a Website?",
    description:
      "Compares a Facebook Page and a website for spas, salons, cafes and homestays: where customers find you, who owns the data, cost and when to build a website.",
    category: "Comparison",
    author: AUTHOR,
    answer:
      "A Facebook Page helps you stay in touch with regular customers. A website helps new customers find you on Google and trust you before they get in touch. If your customers search for things like “spa near me” or “homestay in [city]”, or check prices before they visit, have both: the website as the official source of information and the Facebook Page for daily posts and conversation.",
    keyTakeaways: [
      "A Facebook Page and a website don't replace each other. Each does a different job.",
      "Facebook posts get pushed down over time. A website keeps your prices, services and address in a fixed, easy-to-find place.",
      "The website and domain belong to you. A Facebook Page depends on the platform's policies.",
      `A website for a small business can now start from ${STARTING_PRICE}/month, with no large upfront payment.`,
    ],
    sections: [
      {
        heading: "How are a Facebook Page and a website different?",
        table: {
          head: ["Criteria", "Facebook Page", "Website"],
          rows: [
            ["How new customers find you", "Mostly through friends sharing and ads", "Through Google, Google Maps and shared links"],
            ["Service info and prices", "Inside posts, easily buried", "Dedicated pages in a fixed place"],
            ["Brand image", "Looks like every other Page", "Designed around your own colors and style"],
            ["Ownership", "Depends on Facebook's policies and your account", "You own the domain and the content"],
            ["Receiving inquiries", "Messages and comments", "Forms, call buttons and WhatsApp, sent straight to you"],
            ["Cost", "Free to create, paid if you run ads", "Design fee or monthly plan, plus domain and hosting"],
          ],
        },
      },
      {
        heading: "When is a Facebook Page enough?",
        bullets: [
          "You are still testing your product and have no fixed location or price list yet.",
          "Almost all your customers come from referrals and message you directly.",
          "You don't yet have time to answer inquiries from a new channel.",
        ],
      },
      {
        heading: "When should you have a website?",
        bullets: [
          "Customers usually search Google before choosing: spas, dentists, homestays, restaurants, training centers.",
          "You run Google ads and need a clear landing page to measure results.",
          "Customers keep asking the same questions about prices, opening hours and address.",
          "You want to look more professional when dealing with partners and business customers.",
          "You worry about losing a channel if your Facebook Page account runs into problems.",
        ],
      },
      {
        heading: "How do you use a website and a Facebook Page together?",
        paragraphs: [
          "The website holds the official information: services, prices, photos, address and how to book. The Facebook Page is for new posts, promotions and talking with customers.",
          "In each Facebook post, link to the service page or price page on your website. On the website, add WhatsApp and Facebook buttons and a form so customers can pick the way of contacting you that they are used to.",
        ],
      },
      {
        heading: "How much does a website for a small business cost?",
        paragraphs: [
          `There are two common ways: pay once for the design and then handle hosting and updates yourself, or pay monthly for a full-service plan. Nextchain.site offers monthly plans from ${STARTING_PRICE}, with no setup fee, a free address like ${FREE_SUBDOMAIN_EXAMPLE} or your own domain.`,
        ],
      },
    ],
    faqs: [
      {
        q: "If I have a website, should I drop my Facebook Page?",
        a: "No. A Facebook Page is still a good channel for staying in touch with regular customers and posting daily content. The website adds what new customers search for and your official information.",
      },
      {
        q: "Will a website help me show up on Google Maps?",
        a: "Google Maps shows listings from your Google Business Profile. Adding your website link to that profile helps customers see more information and get in touch more easily.",
      },
      {
        q: "I'm not technical. Can I manage a website myself?",
        a: "With a Nextchain monthly plan, you just send the changes you want and the Nextchain team makes the updates, within the number of edits in your plan.",
      },
    ],
    relatedLinks: [
      { href: "/giai-phap", label: "Websites by industry" },
      { href: "/bang-gia", label: "Monthly plan pricing" },
      { href: "/so-sanh/tu-lam-hay-thue-tron-goi", label: "DIY or done-for-you?" },
    ],
  },
  "website-nha-hang-khach-can-thay-gi": {
    slug: "restaurant-website-essentials",
    title: "Restaurant Website: What Should Customers See as Soon as the Page Opens?",
    metaTitle: "What a Restaurant Website Needs: Checklist",
    description:
      "A customer opening a restaurant website on a phone needs to see dishes, prices, address and how to book right away. A checklist for the first screen, menu, reservations and branches.",
    category: "Restaurant",
    author: AUTHOR,
    answer:
      "When a customer opens a restaurant website, they should get answers to four questions without much scrolling: what the restaurant serves, roughly what it costs, where it is and when it opens, and how to book a table. Put these four things on the first screen on mobile, and leave the rest, such as the brand story or private events, further down.",
    keyTakeaways: [
      "The first screen on mobile matters most: signature dishes, price range, address, opening hours and a booking button.",
      "The menu must be readable text with prices, not just a photo of the printed menu.",
      "Keep the booking form short: date, time, party size and phone number. State that the restaurant will call or message on WhatsApp to confirm.",
      "Information on the website must match Google Maps and your Facebook Page, especially opening hours and phone number.",
    ],
    sections: [
      {
        heading: "Why do customers visit a restaurant website?",
        paragraphs: [
          "Most customers open a restaurant website when they already know the name: they saw it on Google Maps, someone recommended it or they came across a post. They don't want a long introduction. They are quickly checking whether the place fits their next meal.",
          "So an effective restaurant website helps customers decide fast and get in touch easily. It doesn't need the most animations.",
        ],
      },
      {
        heading: "What should the first screen on mobile contain?",
        bullets: [
          "A photo of a signature dish or the real dining space. Don't use stock photos from the internet.",
          "One line saying what the restaurant serves: “Mushroom hotpot and charcoal grill”, “Home-style cooking” and so on.",
          "A rough price range, for example the usual spend per person.",
          "A short address and today's opening hours.",
          "A “Book a table” button and a call or WhatsApp button that stay visible while scrolling.",
        ],
      },
      {
        heading: "How should the menu be presented?",
        table: {
          head: ["Do", "Avoid"],
          rows: [
            ["Group dishes: starters, mains, hotpot, drinks and so on", "One long list with no groups"],
            ["A text menu with a price for each dish", "Only a photo of the printed menu (hard to read, can't zoom)"],
            ["Note portion size or how many people larger dishes serve", "Making customers guess how many people a dish feeds"],
            ["Real photos for bestsellers", "Internet photos that don't match the real dish"],
            ["Show the date prices were last updated", "Old prices that nobody fixed after a price increase"],
          ],
        },
      },
      {
        heading: "Reservations: form, phone call or WhatsApp?",
        paragraphs: [
          "Most small and mid-sized restaurants don't need an automated booking system. A short form that sends requests to the restaurant's WhatsApp or email, plus a call button, is enough for the restaurant to confirm proactively and arrange seating.",
        ],
        bullets: [
          "The form only asks for: date, time, party size, name, phone number and a note (birthday, high chair and so on).",
          "After submission, say something like “We'll call or message you on WhatsApp within 30 minutes to confirm”, and do exactly that.",
          "For parties and large groups, add a separate section with set menus and the capacity of each area.",
          "If you need table management or online deposits, that is separate software. Keep it apart from the introduction website.",
        ],
      },
      {
        heading: "How should a restaurant with several branches organize its site?",
        bullets: [
          "Give each branch its own section or page: address, opening hours, phone number and a directions button.",
          "Have the booking button ask which branch the customer wants.",
          "If menus or prices differ between branches, note it clearly to avoid confusion.",
        ],
      },
      {
        heading: "Checklist before putting a restaurant website online",
        bullets: [
          "Open the site on a phone: you can see the dishes, prices, address, opening hours and booking button without much scrolling.",
          "Tap the call, WhatsApp and directions buttons to check they all open correctly.",
          "Submit a test booking and confirm the right person receives it.",
          "Opening hours, phone number and address match Google Maps and your Facebook Page.",
          "Prices on the menu are the current prices.",
          "Someone is responsible for updating the site when dishes or prices change or the restaurant closes for a holiday.",
        ],
      },
      {
        heading: "How much does a restaurant website cost?",
        paragraphs: [
          `A restaurant website with a menu, reservations and branches doesn't have to be a big project. Nextchain.site builds it on a monthly plan from ${STARTING_PRICE}, with no setup fee, including design, hosting and menu updates within the number of edits in your plan. You can use a free address like ${FREE_SUBDOMAIN_EXAMPLE} or connect your own domain.`,
        ],
      },
    ],
    faqs: [
      {
        q: "If a restaurant already has Google Maps and a Facebook Page, does it still need a website?",
        a: "Google Maps helps customers find you and a Facebook Page helps you chat and post new dishes. A website is where the menu, prices, branches and reservations sit in an easy-to-read form, and it is the link you add to Google Maps so customers can see more.",
      },
      {
        q: "Should I post a photo of the printed menu on the website?",
        a: "You can add one, but don't rely on the photo alone. A text menu is easier to read on a phone, can be zoomed and makes price updates faster.",
      },
      {
        q: "Can the website take deposits or online payments?",
        a: "An introduction website usually only takes booking requests for the restaurant to confirm. Deposits, payments or table management need a separate system, quoted per project.",
      },
    ],
    relatedLinks: [
      { href: "/giai-phap/website-nha-hang", label: "Website solution for restaurants" },
      { href: "/mau-website/nha-hang", label: "Restaurant website templates" },
      { href: "/bang-gia", label: "Monthly plan pricing" },
    ],
  },
  "website-homestay-7-thong-tin-khach-can": {
    slug: "homestay-website-7-things",
    title: "7 Things Guests Want to See Before Asking About a Homestay Room",
    metaTitle: "Homestay Website: 7 Things Guests Need",
    description:
      "Guests asking about a homestay room want the nightly rate, capacity, real photos, location, amenities, policies and how to book. A checklist for a homestay website that takes direct bookings.",
    category: "Homestay",
    author: AUTHOR,
    answer:
      "Before sending a message, guests want to know 7 things: the nightly rate, how many people the room sleeps, real photos of each room, the location and how to get there, amenities, check-in/check-out, deposit and cancellation policies, and how to book. A homestay website that covers all 7 cuts down on repeated messages and helps you win direct bookings alongside booking platforms.",
    keyTakeaways: [
      "List the nightly rate for weekdays and weekends, with a note on holiday surcharges.",
      "Each room type needs its own capacity, bed type and real photos.",
      "The deposit and cancellation policy must be stated before a guest transfers any money.",
      "The room inquiry form only needs arrival date, departure date, number of guests and phone number. Reply on WhatsApp as fast as you can.",
    ],
    sections: [
      {
        heading: "Why does a homestay need a website when it is on Booking and Airbnb?",
        paragraphs: [
          "Booking platforms help new guests find you, but every booking costs a commission and it is hard to stay in touch with past guests. A website is where returning guests, referred guests and people who saw your Facebook Page can book directly with you.",
          "A website doesn't replace booking platforms. It complements them, and it only works if it answers the questions guests usually message you about.",
        ],
      },
      {
        heading: "7 things guests want to see before asking about a room",
        table: {
          head: ["Information", "How to present it"],
          rows: [
            ["1. Nightly rate", "Weekday and weekend rates; note holiday surcharges and extra-guest fees"],
            ["2. Capacity", "Maximum guests, bed types, whether an extra mattress can be added"],
            ["3. Real photos of each room", "Bedroom, bathroom and view, taken in daylight, no stock photos from the internet"],
            ["4. Location and how to get there", "Distance to the center, whether cars can get there or only motorbikes, a directions button"],
            ["5. Amenities", "Kitchen, BBQ, parking, hot water, heating or air conditioning, wifi"],
            ["6. Policies", "Check-in/check-out times, deposit amount, cancellation terms, children, pets"],
            ["7. How to book", "An arrival date, departure date and guest count form, plus WhatsApp and call buttons"],
          ],
        },
      },
      {
        heading: "How should the rooms page be laid out?",
        bullets: [
          "One block per room type: room name, photos, capacity, bed type, nightly rate.",
          "An “Ask about this room” button right under each room type, with the room name pre-filled in the form.",
          "If you rent the whole property to groups, give it its own section with total capacity and the whole-property rate.",
          "State what the rate includes: breakfast, drinking water, transfers. This avoids confusion at payment.",
        ],
      },
      {
        heading: "Policies: write them clearly to avoid disputes",
        paragraphs: [
          "Most misunderstandings between homestay owners and guests come from deposits and cancellations. Write the policies in short, specific sentences, and repeat them when you confirm a booking on WhatsApp.",
        ],
        bullets: [
          "Check-in and check-out times; whether early check-in or late check-out is possible and what it costs.",
          "The deposit amount to hold a room and the deadline for sending it.",
          "How far ahead a guest must cancel to get the deposit back, and what happens with last-minute cancellations.",
          "Rules on children, pets, smoking and quiet hours.",
        ],
      },
      {
        heading: "Room inquiries: form or WhatsApp?",
        paragraphs: [
          "Offer both. A form lets guests send everything in one go (arrival date, departure date, number of guests), while WhatsApp is good for quick conversation and sending photos. A homestay website usually just takes requests so the owner can confirm availability. If you need an automatic room calendar or online payments, that is a separate system.",
        ],
      },
      {
        heading: "Checklist before putting a homestay website online",
        bullets: [
          "Open it on a phone: you immediately see the best photo, the starting rate and the room inquiry button.",
          "Every room type has photos, capacity and a rate.",
          "The deposit and cancellation policies are somewhere easy to see, not only in the footer.",
          "Submit a test inquiry and confirm that it arrives on WhatsApp or email.",
          "Address and phone number match Google Maps and your booking platforms.",
          "Someone updates rates for seasons and holidays.",
        ],
      },
      {
        heading: "How much does a homestay website cost?",
        paragraphs: [
          `A homestay website that presents rooms, amenities and policies and takes room inquiries doesn't have to be a big project. Nextchain.site builds it on a monthly plan from ${STARTING_PRICE}, with no setup fee, including design, hosting and updates to rates and photos within the number of edits in your plan. You can use a free address like ${FREE_SUBDOMAIN_EXAMPLE} or connect your own domain.`,
        ],
      },
    ],
    faqs: [
      {
        q: "Does a homestay website show available rooms automatically?",
        a: "An introduction website usually doesn't manage availability. Guests send a request for their dates, and the owner checks and confirms on WhatsApp or by phone. An automatic room calendar or a connection to booking platforms is separate software, quoted per project.",
      },
      {
        q: "Should I show prices publicly on the website?",
        a: "Yes, show reference nightly rates for weekdays and weekends. Guests who see the price first ask about rooms that fit their needs. For holiday periods you can write “contact us” along with the dates it applies.",
      },
      {
        q: "Does a small homestay with just 2 to 3 rooms need a website?",
        a: "A single page may be enough: photos, each room with its rate, policies and a room inquiry button. The one-page landing page plan suits this size.",
      },
    ],
    relatedLinks: [
      { href: "/giai-phap/website-homestay", label: "Website solution for homestays" },
      { href: "/mau-website/homestay", label: "Homestay website templates" },
      { href: "/bang-gia", label: "Monthly plan pricing" },
    ],
  },
  "toi-uu-google-maps-cho-nha-hang-spa": {
    slug: "google-maps-for-restaurants-and-spas",
    title: "Optimizing Google Maps for Restaurants and Spas: 7 Things Owners Can Do Themselves",
    metaTitle: "Optimize Google Maps for Restaurants, Spas",
    description:
      "7 things that help restaurants, spas and homestays show up more clearly on Google Maps: verify your profile, pick the right category, opening hours, real photos, reviews, posts and a website.",
    category: "Marketing",
    author: AUTHOR,
    answer:
      "People searching for “restaurants near me” or “spa near me” often choose a place straight from Google Maps. To make your listing show up and get chosen, you need to: verify your Google Business Profile, pick the right primary category, keep opening hours accurate, post real photos, ask customers for reviews and reply to them, update your posts, and link a website with complete information. Most of this is free and you can do it yourself.",
    keyTakeaways: [
      "Google Maps ranking depends on relevance, distance and prominence. You can't buy an organic position.",
      "The name on your profile must be your real business name. Stuffing keywords into the name can get the profile suspended.",
      "Don't buy reviews or give gifts in exchange for 5-star reviews. Google prohibits this.",
      "A website with a menu, prices and opening hours that match your profile helps customers decide faster after they find you on the map.",
    ],
    sections: [
      {
        heading: "How does Google Maps rank local businesses?",
        paragraphs: [
          "According to Google's public guidance, local results are based mainly on three factors: relevance (how well your profile matches what the person searched for), distance (how far your business is from the searcher) and prominence (how well known your business is, including the number and quality of reviews and information on the web).",
          "You can't change distance, but you can do a lot for the other two. The seven steps below are in the order you should do them.",
        ],
      },
      {
        heading: "1. Create and verify your Google Business Profile",
        bullets: [
          "Go to business.google.com and search for your business name. If someone else has already created a profile for it, request ownership instead of creating a new one.",
          "Complete the verification step Google offers (video, phone, email or postcard). An unverified profile has limited editing and visibility.",
          "Use a business email and add at least one backup manager so you don't lose access.",
        ],
      },
      {
        heading: "2. Fill in the right name, category and basic details",
        table: {
          head: ["Field", "Do", "Avoid"],
          rows: [
            ["Name", "Exactly the name on your sign", "“Seaside Restaurant – Best and Cheapest Seafood Downtown”"],
            ["Primary category", "The closest match: “Seafood restaurant”, “Skin care spa”", "A generic category or one from the wrong industry"],
            ["Secondary categories", "Add a few that accurately describe what you offer", "Adding categories for services you don't provide"],
            ["Address, phone", "Identical to your website, Facebook Page and sign", "Writing it differently in each place"],
            ["Description", "What you offer, for whom, what makes you different", "Repeated keywords, links, promotions"],
          ],
        },
      },
      {
        heading: "3. Keep opening hours accurate",
        bullets: [
          "Update regular hours, and special hours for holidays a few days in advance.",
          "A customer who arrives to find the place closed while Maps says it's open has a bad experience and may leave a bad review.",
          "If you close temporarily, use the temporarily closed status rather than deleting the profile.",
        ],
      },
      {
        heading: "4. Post real photos and update them regularly",
        bullets: [
          "A photo of the storefront helps customers recognize the place when they arrive.",
          "Photos of the real space, food or services, taken in good light. No stock photos from the internet.",
          "Restaurants: add the menu or photos of dishes. Spas: photos of treatment rooms. Homestays: photos of each room.",
          "Add new photos from time to time, especially when you change the menu or the space.",
        ],
      },
      {
        heading: "5. Ask for reviews the right way and reply to every review",
        paragraphs: [
          "Reviews are what customers read most before choosing a place. Ask real customers for reviews using your profile's review link (found in your profile management page), for example with a QR code printed at the counter or included in a thank-you message.",
        ],
        bullets: [
          "Don't buy reviews, don't ask friends to write fake ones and don't give gifts in exchange for good reviews.",
          "Reply to both good and bad reviews, politely and specifically. For a bad review: apologize, explain how you will fix it and invite them to contact you directly.",
          "Don't argue or reveal a customer's personal information in your reply.",
        ],
      },
      {
        heading: "6. Use posts and product or service listings",
        bullets: [
          "Post updates: new dishes, offers this month, events, with a photo and a button linking to your website.",
          "Fill in the products/services section or the menu with reference prices, if your profile supports it.",
          "Choose attributes that are true for you: parking, wifi, card payments and so on.",
        ],
      },
      {
        heading: "7. Link a website that has complete information and matches your profile",
        paragraphs: [
          "Many customers tap the website link on a Google Maps profile to look at the menu, prices or rooms before calling. The website should answer those questions right away on a phone and have call, WhatsApp, booking or appointment buttons.",
          "The name, address, phone number and opening hours on the website must match your Google profile. Consistent information across places helps both customers and Google trust that it is the same business.",
        ],
      },
      {
        heading: "Monthly checklist for business owners",
        bullets: [
          "Are your opening hours and holiday hours correct?",
          "Have you replied to all new reviews?",
          "Did you add at least a few new photos and one post this month?",
          "Do the menu and prices on your profile and website match?",
          "Does the website link on your profile still work?",
        ],
      },
      {
        heading: "When should you ask someone to do it for you?",
        paragraphs: [
          `If you don't have time to keep it updated, Nextchain offers a Marketing & SEO service that includes optimizing your Google Business Profile, content and regular reports. If you don't have a website yet, a monthly plan from ${STARTING_PRICE} gives you a page with your menu, prices and bookings to link from Google Maps. Nextchain does not promise any particular ranking, because Google decides rankings.`,
        ],
      },
    ],
    faqs: [
      {
        q: "Can I pay to be at the top of Google Maps?",
        a: "You can't buy an organic position. You can run Google ads to appear in the ad placements, but your organic ranking depends on relevance, distance and prominence.",
      },
      {
        q: "Does adding keywords to my business name on Google Maps help me rank?",
        a: "No, don't do it. Google's guidelines require the name to reflect your real business name, and adding keywords can get your profile edited or suspended.",
      },
      {
        q: "How long until my profile shows up better?",
        a: "There is no fixed timeline. It usually takes several weeks to several months of regular updates and a build-up of real reviews before you see a clear change.",
      },
    ],
    relatedLinks: [
      { href: "/dich-vu/marketing-seo", label: "Marketing & SEO service" },
      { href: "/giai-phap/website-nha-hang", label: "Restaurant websites" },
      { href: "/giai-phap/website-spa", label: "Spa websites" },
    ],
  },
}
