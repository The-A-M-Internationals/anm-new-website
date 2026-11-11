/**
 * What the admin portal can edit, per Firestore collection. Field keys match what the site reads.
 * `ar` = the Arabic twin field. `alsoAr` / `alsoKey` = legacy duplicate keys some components read,
 * written with the same value so every part of the site stays in sync.
 */
export type FieldType = "text" | "textarea" | "markdown" | "image" | "bool" | "tags" | "link";

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
  id: "events" | "articles" | "jobs";
  title: string;
  singular: string;
  /** Field shown as each item's name in the list */
  nameKey: string;
  fields: Field[];
  /** Special editors rendered above the fields */
  eventDates?: boolean;
};

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
        help: "Comma separated. Blog filters use: EPM Strategy, Cloud, Data Analytics, Cybersecurity, AI & Machine Learning, CSR, Company News" },
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
];
