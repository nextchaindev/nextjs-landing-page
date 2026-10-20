import { COMPANY_NAME, CONTACT } from "@/lib/site"
import { getFreeSubdomainExample } from "@/content/plans"
import type { LegalTexts } from "../legal"

const FREE_SUBDOMAIN_EXAMPLE = getFreeSubdomainExample("en")

// DRAFT translation (#27): do not publish before legal review. The Vietnamese version is the original.
export const EN_LEGAL_TEXTS: LegalTexts | null = {
  lastUpdatedLabel: "Last updated",
  originalNotice:
    "This translation is provided for convenience only. The Vietnamese version is the original and prevails if there is any discrepancy between the two.",
  dateLocale: "en-US",
  terms: {
    title: "Terms of Service",
    intro:
      "Terms for Nextchain.site's monthly website design and management service: fees, payment, content approval responsibility and the scope of SEO.",
    sections: [
      {
        heading: "Scope",
        paragraphs: [
          `These terms apply to the monthly website design, publishing and management service provided by ${COMPANY_NAME} through Nextchain.site. If a contract or quotation signed with a customer differs from these terms, the contract or quotation prevails.`,
        ],
      },
      {
        heading: "Fees and payment",
        paragraphs: [
          "Monthly plans (landing page, small business website) are billed monthly. There is no setup fee and no minimum term. Website, software, and Marketing & SEO projects are billed according to a project quotation. Fees and benefits are stated on the Pricing page and in the quotation sent to the customer.",
          "Work outside the scope of a plan is quoted in advance and is carried out only if the customer agrees.",
        ],
      },
      {
        heading: "Content and approval responsibility",
        paragraphs: [
          "The customer provides information and images and is responsible for having the right to use those materials. Nextchain helps draft content and checks it before sending it to the customer for approval.",
          "Content is published only after the customer confirms it. The customer is responsible for the accuracy of the prices, services and commitments published on its website.",
        ],
      },
      {
        heading: "SEO and business results",
        paragraphs: [
          "Nextchain carries out the technical SEO items described in the plan. Nextchain does not guarantee any specific search engine ranking or any increase in revenue.",
        ],
      },
      {
        heading: "Suspension and termination",
        paragraphs: [
          "Cancellation of the service and the handover of content and domains are governed by the Cancellation Policy.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Please send any questions about these terms to ${CONTACT.email}.`],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro:
      "What information Nextchain.site collects, what it is used for, how it is stored, and your rights over your personal data.",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "When you submit a consultation request: your full name, email, phone number and the content of your message.",
          "When you visit the website: anonymous usage data through Google Analytics, Google Tag Manager and Microsoft Clarity (pages viewed, device, traffic source). Forms are protected by Google reCAPTCHA.",
        ],
      },
      {
        heading: "How we use it",
        paragraphs: [
          "To contact you for consultation, send quotations, provide the services you have signed up for, and improve the website experience. We do not sell personal information to third parties.",
        ],
      },
      {
        heading: "Storage and security",
        paragraphs: [
          "Consultation request data is stored on the infrastructure of our database service provider, and only the relevant staff can access it.",
        ],
      },
      {
        heading: "Data on customer websites",
        paragraphs: [
          "For websites that Nextchain operates for customers, information submitted by visitors through forms is passed to the website owner. The website owner is responsible for using that data for the proper purpose.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          `You may ask to view, correct or delete your personal information by sending an email to ${CONTACT.email}.`,
        ],
      },
    ],
  },
  cancellation: {
    title: "Cancellation Policy",
    intro:
      "How to cancel a monthly website plan at Nextchain.site, how fees already paid are handled, and the handover of content, domains and data.",
    sections: [
      {
        heading: "How to request cancellation",
        paragraphs: [
          `Send a cancellation request by email to ${CONTACT.email} or through the support channel agreed with us. The notice period and the date billing stops follow each customer's contract or quotation.`,
        ],
      },
      {
        heading: "Fees already paid",
        paragraphs: [
          "Monthly plans have no minimum term. The notice period before you stop using the service, and any refund for the period currently in use, are stated in the contract.",
          "Nextchain sends you the contract to read before you sign. No fee applies that is not in the contract.",
        ],
      },
      {
        heading: "Content and images",
        paragraphs: [
          "Text content and images provided by the customer belong to the customer. On cancellation, the customer may ask for a copy of the content within the agreed period.",
        ],
      },
      {
        heading: "Domains",
        paragraphs: [
          `A custom domain registered by the customer belongs to the customer. Nextchain only configures the connection, and on cancellation the customer keeps the domain. A free address such as ${FREE_SUBDOMAIN_EXAMPLE} belongs to the Nextchain system and stops working when the service ends.`,
        ],
      },
      {
        heading: "Website after cancellation",
        paragraphs: [
          "The website stops operating on Nextchain infrastructure after the service end date. Request data submitted by visitors is handed over on request before it is deleted.",
        ],
      },
    ],
  },
}
