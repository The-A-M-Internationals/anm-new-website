/**
 * What the admin portal can edit, per Firestore collection. Field keys match what the site reads.
 * `ar` = the Arabic twin field. `alsoAr` / `alsoKey` = legacy duplicate keys some components read,
 * written with the same value so every part of the site stays in sync.
 */
export type FieldType = "text" | "textarea" | "markdown" | "image" | "bool" | "tags" | "link" | "number";

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  ar?: string;          // Arabic field key (same type)
  alsoAr?: string;      // extra Arabic key written with the same value (legacy)
  alsoKey?: string;     // extra English key written with the same value (legacy)
  required?: boolean;
  help?: string;
  folder?: string;      // image uploads: Storage folder
};

export type CollectionSchema = {
  /** Firestore collection (or, for `single`, the tab id) */
  id: string;
  title: string;
  singular: string;
  /** Field shown as each item's name in the list */
  nameKey: string;
  fields: Field[];
  /** Special editors rendered above the fields */
  eventDates?: boolean;
  /** List is sorted by the `order` field (1 = first) */
  ordered?: boolean;
  /** One fixed set of details stored at siteContent/{single} instead of a list */
  single?: string;
  /** Short note shown at the top of the tab */
  intro?: string;
};

/** Where an item lives in Firestore */
export const collectionOf = (s: CollectionSchema) => (s.single ? "siteContent" : s.id);

const POSITION: Field = { key: "order", label: "Position", type: "number", help: "1 = first. Lower numbers show first." };

export const SCHEMAS: CollectionSchema[] = [
  {
    id: "events",
    title: "Events",
    singular: "event",
    nameKey: "title",
    eventDates: true,
    fields: [
      { key: "title", ar: "titleAr", label: "Title", type: "text", required: true },
      { key: "description", ar: "descriptionAr", label: "Description", type: "textarea", required: true },
      { key: "location", ar: "locationAr", label: "Venue", type: "text" },
      { key: "timeRange", ar: "timeRangeAr", label: "Hours", type: "text", help: "e.g. 10 am – 5 pm. Leave empty to hide." },
      { key: "imageSrc", label: "Photo", type: "image", folder: "events", help: "Optional. Without a photo the card shows the dates on a navy panel." },
      { key: "buttonText", ar: "buttonTextAr", label: "Button text", type: "text", help: "Optional, e.g. Book a meeting. Empty = Register now." },
      { key: "buttonLink", label: "Button link", type: "link", help: "Optional. A site page like /contact#form, or a full https:// link. Empty = the registration form." },
      { key: "externalLink", label: "Recording link (after the event)", type: "link", help: "Shown as Watch Recording once the event is over." },
    ],
  },
  {
    id: "articles",
    title: "Blog articles",
    singular: "article",
    nameKey: "title",
    fields: [
      { key: "title", ar: "titleAr", alsoAr: "title_ar", label: "Title", type: "text", required: true },
      { key: "description", ar: "descriptionAr", alsoAr: "description_ar", label: "Summary", type: "textarea", required: true },
      { key: "category", ar: "categoryAr", alsoAr: "category_ar", label: "Category", type: "text" },
      { key: "authors", ar: "authorsAr", alsoAr: "authors_ar", label: "Author(s)", type: "text" },
      { key: "readTime", ar: "readTimeAr", alsoAr: "readTime_ar", label: "Read time", type: "text", help: "e.g. 5 min read" },
      { key: "tags", ar: "tagsAr", alsoAr: "tags_ar", label: "Filter tags", type: "tags",
        help: "Comma separated. Blog filters use: Oracle EPM, ESG Reporting, AI for EPM, Company News" },
      { key: "imageSrc", alsoKey: "imageUrl", label: "Image", type: "image", folder: "articles" },
      { key: "externalLink", label: "Article link", type: "link", help: "Where Read more goes (full https:// link)." },
      { key: "featureArticle", label: "Featured article (shown at the top of the Blogs page)", type: "bool" },
    ],
  },
  {
    id: "jobs",
    title: "Job posts",
    singular: "job",
    nameKey: "title",
    fields: [
      { key: "title", ar: "titleAr", label: "Job title", type: "text", required: true },
      { key: "department", ar: "departmentAr", label: "Department", type: "text" },
      { key: "location", ar: "locationAr", label: "Location", type: "text", help: "e.g. Remote, Ajman" },
      { key: "type", ar: "typeAr", label: "Type", type: "text", help: "e.g. Full-time" },
      { key: "description", ar: "descriptionAr", label: "Description", type: "markdown", required: true,
        help: "Supports simple formatting: **bold**, - bullet lists, blank line = new paragraph." },
    ],
  },
  {
    id: "home",
    single: "home",
    title: "Home: counters",
    singular: "counters",
    nameKey: "clients",
    intro: "The three numbers in the home page banner. Leave a box empty to keep the current number.",
    fields: [
      { key: "clients", label: "Clients (shown as 26+)", type: "number" },
      { key: "projects", label: "Projects (shown as 40+)", type: "number" },
      { key: "countries", label: "Countries", type: "number" },
    ],
  },
  {
    id: "ourWork",
    title: "Home: Our Work",
    singular: "project",
    nameKey: "client",
    ordered: true,
    intro: "Project cards in the home page Our Work section. Empty spots up to 3 show \"More projects coming soon\".",
    fields: [
      { key: "client", ar: "clientAr", label: "Client name", type: "text", required: true },
      { key: "title", ar: "titleAr", label: "Project title", type: "text", required: true, help: "Best under 40 characters (shows up to 2 lines)." },
      { key: "description", ar: "descriptionAr", label: "Short description", type: "textarea", required: true, help: "One sentence, best under 110 characters (shows up to 3 lines)." },
      { key: "industry", ar: "industryAr", label: "Tag", type: "text", help: "1–2 words, e.g. Oracle EPM. Longer tags are cut off." },
      { key: "badge", ar: "badgeAr", label: "Status badge", type: "text", help: "e.g. Delivered. Leave empty to hide." },
      { key: "imageSrc", label: "Photo (English page)", type: "image", folder: "our-work" },
      { key: "imageSrcAr", label: "Photo (Arabic page)", type: "image", folder: "our-work", help: "Optional. Empty = same photo as English." },
      POSITION,
    ],
  },
  {
    id: "founders",
    title: "Founders",
    singular: "founder",
    nameKey: "name",
    ordered: true,
    intro: "Founder cards on the Business page.",
    fields: [
      { key: "name", ar: "nameAr", label: "Name", type: "text", required: true },
      { key: "tagline", ar: "taglineAr", label: "Line under the name", type: "text" },
      { key: "role", ar: "roleAr", label: "Role", type: "text", help: "e.g. Founder, The A&M Internationals" },
      { key: "bio", ar: "bioAr", label: "Bio", type: "textarea" },
      { key: "imageSrc", label: "Photo", type: "image", folder: "team", required: true, help: "Portrait photo works best." },
      POSITION,
    ],
  },
  {
    id: "team",
    title: "Team",
    singular: "team member",
    nameKey: "name",
    ordered: true,
    intro: "Our Team grid on the Business page.",
    fields: [
      { key: "name", ar: "nameAr", label: "Name", type: "text", required: true, help: "Arabic is optional; empty = English name." },
      { key: "role", ar: "roleAr", label: "Role", type: "text", help: "Short works best, e.g. EPM Consultant." },
      { key: "imageSrc", label: "Photo", type: "image", folder: "team", required: true, help: "Portrait (3:4) photo works best." },
      POSITION,
    ],
  },
  {
    id: "contact",
    single: "contact",
    title: "Contact details",
    singular: "contact details",
    nameKey: "email",
    intro: "Shown on the Contact page and in the footer of every page. Leave a box empty to keep the current value.",
    fields: [
      { key: "phone", label: "Phone", type: "text", help: "e.g. +971 564783478" },
      { key: "email", label: "Email", type: "text", help: "e.g. am@theaminternationals.com" },
      { key: "whatsapp", label: "WhatsApp number", type: "text", help: "e.g. +971 56 478 3478" },
      { key: "hours", ar: "hoursAr", label: "Working hours", type: "text", help: "e.g. Mon–Sat, 9 AM–6 PM GST" },
      { key: "office", ar: "officeAr", label: "Office address", type: "textarea" },
      { key: "mapLink", label: "Google Maps link", type: "link" },
    ],
  },
];
