import type { IndustryTexts } from "../industries"

/**
 * English industry solution texts. Keys are the Vietnamese (source) slugs.
 * Keep the structure identical to ../industries.ts (same number of problems, pages and faqs).
 */
export const EN_INDUSTRY_TEXTS: IndustryTexts = {
  "website-spa": {
    slug: "spa-website",
    name: "Spa Website",
    shortName: "spa",
    audience: "Spas, beauty clinics and skin care studios",
    imageAlt: "Facial treatment at a spa",
    metaTitle: "Spa Website Design, All-in-One Monthly Plan",
    metaDescription:
      "A spa website with a service menu, gallery and booking requests by form and WhatsApp. Nextchain designs, publishes and updates it every month, so you don't have to.",
    h1: "Spa website design: a clear service menu and easy booking requests",
    intro:
      "People looking for a spa usually want to know three things before they message: whether you offer the treatment they need, roughly what it costs and what the place looks like. Our spa website answers all three on a phone screen, then leads visitors to your booking button.",
    problems: [
      {
        title: "Prices are scattered across social media posts",
        desc: "Customers scroll through many posts or message you about each treatment. A website puts your price list on one page that is easy to read and easy to update.",
      },
      {
        title: "New customers can't find your spa on Google",
        desc: "A social media page rarely shows up when someone searches for “facial spa near me”. A separate page for each main service helps Google understand what you do.",
      },
      {
        title: "You don't have time to build a website yourself",
        desc: "Send us your information and photos. Nextchain designs the site, writes the content, publishes it and updates it when your services change.",
      },
    ],
    pages: [
      { title: "Home", desc: "An introduction to the spa, featured services, photos of the space and a booking button." },
      { title: "Service menu", desc: "Grouped by treatment: skin care, massage, scalp care and more." },
      { title: "Service pages", desc: "The process, duration, approved prices and what to know before the treatment." },
      { title: "Gallery", desc: "Photos of the space, treatment rooms and team supplied by the spa." },
      { title: "Booking request", desc: "A short form and a WhatsApp button; requests are sent to the spa owner." },
      { title: "Skin care blog", desc: "Guides drafted by Nextchain and approved by the spa before publishing (depending on plan)." },
    ],
    faqs: [
      {
        q: "Can the spa website take bookings automatically?",
        a: "The website receives booking requests by form and WhatsApp and sends them to the spa owner to confirm. Automatic time-slot booking needs a separate integration, so please contact us to check.",
      },
      {
        q: "Do I have to write the service descriptions myself?",
        a: "No. Send us the service names, prices and a few notes, and Nextchain writes the descriptions. You approve them before publishing.",
      },
      {
        q: "Can I post before-and-after photos?",
        a: "We only publish photos supplied by the spa and approved by the customers shown in them. Nextchain does not use images from the internet as result photos.",
      },
    ],
  },
  "website-salon": {
    slug: "salon-website",
    name: "Salon Website",
    shortName: "salon",
    audience: "Hair salons and barber shops",
    imageAlt: "Interior of a modern hair salon",
    metaTitle: "Hair Salon and Barber Website, Monthly Plan",
    metaDescription:
      "A website for hair salons and barbers: a portfolio of styles, prices by service group and booking requests. Nextchain designs it and manages it on a monthly plan.",
    h1: "Salon website: show your work, post clear prices, get bookings faster",
    intro:
      "Customers mostly choose a salon by looking at its work. Our salon website puts your portfolio first, with prices grouped by service so customers know the cost before they visit.",
    problems: [
      {
        title: "Great work gets buried in social media feeds",
        desc: "The portfolio on your website is sorted by cut, color and style, so customers can find the look they want again.",
      },
      {
        title: "Customers keep messaging to ask about prices",
        desc: "A public price list by service group helps filter inquiries and saves you time answering them.",
      },
      {
        title: "You sell hair care products but have nowhere to show them",
        desc: "The Professional plan includes a product catalog page with photos, descriptions, prices and an order inquiry button.",
      },
    ],
    pages: [
      { title: "Home", desc: "Your salon's style, featured work, address and opening hours." },
      { title: "Portfolio", desc: "A gallery of your work sorted by service." },
      { title: "Price list", desc: "Cuts, color, perms, washes, treatments and more by group, with notes on extra charges." },
      { title: "Team", desc: "Introduce your lead stylists and their specialties (optional)." },
      { title: "Booking", desc: "A booking request form, a call button and a WhatsApp button." },
      { title: "Products", desc: "A catalog of the products your salon sells (Professional plan)." },
    ],
    faqs: [
      {
        q: "What if my salon has several locations?",
        a: "Each location can have its own page with its address, opening hours and map. The scope depends on the plan you choose.",
      },
      {
        q: "I want to add new photos of my work often.",
        a: "Send the photos to Nextchain and the team will add them to your portfolio within the number of edits included in your plan.",
      },
      {
        q: "Can the website sell products online?",
        a: "The product pages currently show your products and receive order inquiries. A shopping cart and online payment need to be discussed separately before we commit.",
      },
    ],
  },
  "website-homestay": {
    slug: "homestay-website",
    name: "Homestay Website",
    shortName: "homestay",
    audience: "Homestays, villas, guesthouses and serviced apartments",
    imageAlt: "Wooden homestay among pine forest and mountains",
    metaTitle: "Homestay and Villa Website, Monthly Plan",
    metaDescription:
      "A homestay website that presents your rooms, amenities and policies and takes room inquiries directly. It complements Booking and Airbnb; Nextchain designs and manages it.",
    h1: "Homestay website: present your rooms fully and take direct inquiries",
    intro:
      "Booking.com and Airbnb help guests find you, but every booking costs a commission and it is hard to stay in touch with past guests. Your own website is where returning guests can ask about rooms directly and learn more about your place.",
    problems: [
      {
        title: "You depend entirely on booking platforms",
        desc: "Your own website is a channel for repeat guests, referrals and people who search for your homestay by name.",
      },
      {
        title: "Room information is inconsistent",
        desc: "Each room type has its own page with photos, capacity, amenities and policies, all updated in one place.",
      },
      {
        title: "Guests want to know about the area",
        desc: "Articles about nearby sights and places to eat help guests plan their trip and give them another reason to choose you.",
      },
    ],
    pages: [
      { title: "Home", desc: "The space, location, highlights and a button to ask about rooms." },
      { title: "Rooms", desc: "Each room type with photos, capacity, amenities and a reference price." },
      { title: "Amenities & policies", desc: "Check-in and check-out times, deposits, cancellations, pets and more." },
      { title: "Location", desc: "A map, directions and distances to nearby attractions." },
      { title: "Room inquiry", desc: "A form for arrival and departure dates and number of guests, plus a WhatsApp button." },
      { title: "Travel guide", desc: "Articles about things to do around your homestay (depending on plan)." },
    ],
    faqs: [
      {
        q: "Can a homestay website replace Booking.com?",
        a: "We wouldn't think of it as a replacement. The website is an extra direct channel, suited to repeat guests and people who search for your homestay by name; booking platforms still help you reach new guests.",
      },
      {
        q: "Does the website show room availability in real time?",
        a: "At the moment the website receives room inquiries for you to confirm. Syncing room calendars with other platforms needs to be discussed separately.",
      },
      {
        q: "Can I take deposits through the website?",
        a: "The website shows deposit payment instructions according to your own policy. Online payment needs to be checked before we commit.",
      },
    ],
  },
  "website-nail": {
    slug: "nail-salon-website",
    name: "Nail Salon Website",
    shortName: "nail salon",
    audience: "Nail salons, lash studios and hand and foot care",
    imageAlt: "Nail technician working on a customer's nails in a salon",
    metaTitle: "Nail Salon Website Design, Monthly Plan",
    metaDescription:
      "A nail salon website with a gallery of nail designs, prices by service and a WhatsApp booking button. Nextchain designs it, posts new designs and updates it every month.",
    h1: "Nail salon website: show your best designs and let customers pick and book",
    intro:
      "Customers who come in for nails have often chosen a design already, usually by saving a photo online and then asking whether the salon can do it. Your website collects the designs your salon has done, grouped by style, with a price for each service, so customers can choose and then message you on WhatsApp to book a time.",
    problems: [
      {
        title: "Beautiful designs are scattered across social media albums",
        desc: "The website groups designs by style: gel polish, acrylic, nail art, rhinestones, pedicure. Customers browse quickly and can screenshot a design to send you on WhatsApp.",
      },
      {
        title: "Customers ask for the price of each design by message",
        desc: "The price list shows the base price and extras (added art, rhinestones, removing old nails), so you get fewer messages that only ask about prices.",
      },
      {
        title: "New customers don't know where you are or when you open",
        desc: "Your address, opening hours, map and directions button sit at the bottom of every page, and one tap opens the maps app.",
      },
    ],
    pages: [
      { title: "Home", desc: "Featured designs, this month's offer, address and a booking button." },
      { title: "Design gallery", desc: "Real photos of your work sorted by style and color; new designs are added according to your plan." },
      { title: "Price list", desc: "Prices by service: gel polish, acrylic, extensions, pedicure, lash extensions." },
      { title: "Booking", desc: "A form to choose a service and preferred time, plus a WhatsApp button for sending a reference photo." },
      { title: "Contact", desc: "Address, map, opening hours and phone number." },
    ],
    faqs: [
      {
        q: "Can I send you new design photos to post on the website?",
        a: "Yes. Send the photos on WhatsApp and Nextchain will add them to the right group, within the number of edits included in your plan.",
      },
      {
        q: "Can you use nail photos from the internet?",
        a: "The website only shows photos supplied by the salon or that the salon has the right to use, so customers see the salon's real work.",
      },
      {
        q: "Where do I get notified when a customer books?",
        a: "Booking requests are sent to your salon's WhatsApp or email so you can confirm the time with the customer.",
      },
    ],
  },
  "website-quan-ca-phe": {
    slug: "cafe-website",
    name: "Cafe Website",
    shortName: "cafe",
    audience: "Cafes, bubble tea shops and bakeries",
    imageAlt: "Bright cafe interior with a coffee bar and menu board",
    metaTitle: "Cafe Website Design, Monthly Plan",
    metaDescription:
      "A cafe website with a priced menu, photos of the space, opening hours and map directions. Nextchain designs it and updates your menu and offers every month.",
    h1: "Cafe website: a menu with prices, photos of your space, easy directions",
    intro:
      "Before visiting a new cafe, people usually want to know three things: what it sells, roughly what it costs and whether it is comfortable to sit in. Your cafe website answers all three on a phone, with a directions button that takes people straight to your door.",
    problems: [
      {
        title: "The menu is only at the counter, so customers can't see it first",
        desc: "The website menu has photos and prices by drink group, and you can change it when you add a new item or raise a price.",
      },
      {
        title: "Customers look for a place to work or meet friends",
        desc: "Real photos of the space plus details on wifi, power outlets, parking and air-conditioned rooms help customers decide to visit.",
      },
      {
        title: "Offers are only posted on a personal social media page",
        desc: "The offers section of the website is updated monthly and links to WhatsApp or the delivery app your cafe uses.",
      },
    ],
    pages: [
      { title: "Home", desc: "Photos of the space, featured items, opening hours and a directions button." },
      { title: "Menu", desc: "Drinks and baked goods by group, with photos and prices." },
      { title: "The space", desc: "Photos of the seating areas and amenities: wifi, power outlets, parking." },
      { title: "Offers", desc: "This month's promotions, changed within the number of edits in your plan." },
      { title: "Contact & table booking", desc: "Map, phone number, WhatsApp and a booking form for larger groups." },
    ],
    faqs: [
      {
        q: "I already sell through delivery apps. Do I still need a website?",
        a: "Delivery apps serve customers ordering takeaway. A website helps people find your cafe by name and see the space before they visit, and it can link to your delivery app.",
      },
      {
        q: "Is there a charge for changing the menu or prices?",
        a: "Menu and price changes count toward the monthly edits included in your plan. Anything beyond that is quoted before we start.",
      },
      {
        q: "Can the website take table bookings?",
        a: "There is a booking form that sends requests to your cafe's WhatsApp or email so you can confirm with the customer.",
      },
    ],
  },
  "website-nha-hang": {
    slug: "restaurant-website",
    name: "Restaurant Website",
    shortName: "restaurant",
    audience: "Restaurants, barbecue and hot pot places and family eateries",
    imageAlt: "Diner viewing a barbecue restaurant website on a phone at the table",
    metaTitle: "Restaurant Website Design, Monthly Plan",
    metaDescription:
      "A restaurant website with a menu with photos and prices, a booking form sent to WhatsApp, a section for parties and events, and directions for each location. Nextchain designs it and updates it monthly.",
    h1: "Restaurant website: an appealing menu, quick bookings, easy to find",
    intro:
      "People choosing a restaurant for a family dinner, a client meal or a team outing usually look at the dishes, the price range and the atmosphere first. Your restaurant website puts all of that behind one link, with a booking form so you can plan seating ahead.",
    problems: [
      {
        title: "Customers call just to ask about prices and dishes",
        desc: "The website menu has photos, prices and portion notes. Customers check it first, so calls are mostly for bookings.",
      },
      {
        title: "Bookings for large groups and company events get missed",
        desc: "The booking form captures the date, time, party size and special requests, and sends them to WhatsApp or email so you can confirm with the customer.",
      },
      {
        title: "With several locations, customers go to the wrong address",
        desc: "Each location has its own address, opening hours, phone number and directions button.",
      },
    ],
    pages: [
      { title: "Home", desc: "Signature dishes, the space, opening hours and an always-visible booking button." },
      { title: "Menu", desc: "Dishes by group, with photos, prices and notes on portion size or spice level." },
      { title: "Booking", desc: "A form to choose date, time and party size; requests are sent to your restaurant's WhatsApp or email." },
      { title: "Parties & events", desc: "Set menus for birthdays and company gatherings, and the capacity of each area." },
      { title: "Locations", desc: "The address, opening hours and directions for each location." },
      { title: "Offers", desc: "This month's promotions, updated within the number of edits in your plan." },
    ],
    faqs: [
      {
        q: "Can the website replace a reservation system or POS?",
        a: "No. The booking form sends a request for you to confirm manually; the website does not manage free tables or payments. If you need to connect a reservation system or POS, Nextchain quotes it separately as a project.",
      },
      {
        q: "What if my restaurant has several locations?",
        a: "Each location has its own page or section with its address, opening hours and map. The number of locations shown depends on the plan you choose.",
      },
      {
        q: "Is there a charge for seasonal menu and price changes?",
        a: "Menu and price changes count toward the monthly edits included in your plan. Anything beyond that is quoted before we start.",
      },
    ],
  },
  "website-nha-khoa": {
    slug: "dental-clinic-website",
    name: "Dental Clinic Website",
    shortName: "dental clinic",
    audience: "Dental clinics and oral care providers",
    imageAlt: "Illustration of a treatment room at a dental clinic",
    metaTitle: "Dental Clinic Website Design, All-in-One",
    metaDescription:
      "A dental clinic website with service pages, doctor profiles and an appointment request form. Nextchain handles content, design and operation within the scope of your plan.",
    h1: "Dental clinic website: clear services and easy appointment requests",
    intro:
      "People looking for a dental clinic want to understand the doctors, the services, reference costs and how to get in touch before they book. Nextchain organizes that information so it is easy to read on a phone; the clinic checks and approves all professional content.",
    problems: [
      {
        title: "Services are hard to compare",
        desc: "Check-ups, treatments and care are split into groups, with notes on indications and approved reference prices.",
      },
      {
        title: "Not enough information about the team",
        desc: "Doctor pages show qualifications and experience based on the records the clinic provides.",
      },
      {
        title: "Patients ask about appointments through many channels",
        desc: "The form and the call and messaging buttons lead to the person in charge, who confirms the appointment. The site does not simulate available time slots.",
      },
    ],
    pages: [
      { title: "Services", desc: "Separate pages for the service groups that fit the clinic's specialties." },
      { title: "Team", desc: "Doctor information, certificates and verified photos." },
      { title: "Reference costs", desc: "Prices and the conditions that apply, without promising treatment results." },
      { title: "Appointment request", desc: "A request form, phone number, map and opening hours." },
    ],
    faqs: [
      {
        q: "Does the website confirm appointments automatically?",
        a: "The basic plan receives requests for the clinic to confirm. Automatic scheduling and syncing with clinic software need a survey and a separate quote.",
      },
      {
        q: "Who approves the professional content?",
        a: "The clinic is responsible for checking professional information, certificates, prices and consent to use photos before anything is published.",
      },
    ],
  },
  "landing-page-bat-dong-san": {
    slug: "real-estate-landing-page",
    name: "Real Estate Landing Page",
    shortName: "real estate",
    audience: "Real estate sales agencies and development projects",
    imageAlt: "Illustrative layout of an apartment project landing page",
    metaTitle: "Real Estate Landing Page Design, All-in-One",
    metaDescription:
      "A landing page for a real estate project with an overview, legal status, floor plans and an inquiry form. The project owner confirms the content before it is published.",
    h1: "Real estate landing page: clear project information, consultations that match what buyers need",
    intro:
      "People looking at a project want to understand the location, the product, the schedule and the transaction terms before they leave their contact details. The landing page should present sourced, up-to-date information and give a clear way to get in touch on a phone.",
    problems: [
      {
        title: "Information is scattered",
        desc: "We gather location, floor plans, amenities and progress from materials that are approved for publication.",
      },
      {
        title: "Forms don't capture enough context",
        desc: "The form asks about unit type, budget and timing, if your sales team has a process to handle them.",
      },
      {
        title: "Prices and legal status change",
        desc: "The page shows update dates, information sources and who approved it. It does not promise returns or state legal status that has not been confirmed.",
      },
    ],
    pages: [
      { title: "Overview", desc: "Verified location, project type and what sets it apart." },
      { title: "Products", desc: "Floor plans, areas and reference prices where publication is permitted." },
      { title: "Legal status & progress", desc: "Sourced documents and milestones supplied by the project owner." },
      { title: "Request a consultation", desc: "A short form, a data policy and handover to the person in charge." },
    ],
    faqs: [
      {
        q: "Can we run ads right away?",
        a: "Content, image rights and the advertising platform's policies need to be checked before publishing. Ad spend is not included in the design price.",
      },
      {
        q: "Can the data be connected to a CRM?",
        a: "We can review the data flow and integrate with the CRM you use. The cost is quoted in advance.",
      },
    ],
  },
  "landing-page-khoa-hoc": {
    slug: "course-landing-page",
    name: "Course Landing Page",
    shortName: "course",
    audience: "Training centers and enrollment teams",
    imageAlt: "Illustrative layout of a course enrollment website",
    metaTitle: "Course Landing Page Design, All-in-One",
    metaDescription:
      "An enrollment landing page for a course with the curriculum, schedule, tuition and an inquiry form. Nextchain handles content, design, publishing and updates.",
    h1: "Course landing page: a clear program and quick sign-up for a consultation",
    intro:
      "Parents and students want to know what they will learn, who will teach them, when it starts and what it costs. An enrollment page should answer these questions before it asks for contact details, instead of only placing a form at the top.",
    problems: [
      {
        title: "Ads don't give enough information",
        desc: "The page brings together the learning goals, who the course suits, the content and the start dates.",
      },
      {
        title: "People keep asking about tuition again",
        desc: "State the fee and the terms of any time-limited offers clearly, so advisors don't give wrong information.",
      },
      {
        title: "Sign-ups end up on the wrong course",
        desc: "The form records the course or schedule the person is interested in, so staff can respond to what they actually need.",
      },
    ],
    pages: [
      { title: "Program", desc: "Goals, course content and entry requirements." },
      { title: "Instructors", desc: "Verified instructor profiles and experience." },
      { title: "Schedule & tuition", desc: "Start dates, format of study, tuition and policies." },
      { title: "Request a consultation", desc: "A short form that sends the course of interest to the right enrollment team." },
    ],
    faqs: [
      {
        q: "Can the page accept tuition payments online?",
        a: "The landing page plan receives consultation requests. A payment gateway or student management needs a survey and a separate quote.",
      },
      {
        q: "Who provides the course information?",
        a: "The center provides the actual program, tuition and schedule. Nextchain edits how it is presented, and the center approves it.",
      },
    ],
  },
}
