/**
 * Our Clients — content
 * ------------------------------------------------------------------
 * TBC Corporation is a real engagement (copy taken from the existing spotlight).
 * Every other entry is an ILLUSTRATIVE PLACEHOLDER: invented names and figures for
 * layout only. They render with an "Illustrative" tag; replace them with real,
 * approved clients (or delete them) before going live.
 */

export type Accent = "blue" | "emerald" | "gold";

export type ClientMetric = { value: string; label: string };

export type Client = {
  id: string;
  name: string;
  /** Short wordmark shown when no logo file is provided */
  wordmark: string;
  /** Optional logo path in /public, e.g. "/tbc-logo.png" */
  logo?: string;
  sector: string;
  region: string;
  /** One-line headline for the engagement */
  engagement: string;
  summary: string;
  outcomes?: string[];
  metrics: ClientMetric[];
  scope: string;
  accent: Accent;
  featured?: boolean;
  /** true = invented content for layout only; shows an "Illustrative" tag */
  placeholder?: boolean;
  href?: string;
};

export const CLIENTS: Client[] = [
  {
    id: "tbc",
    name: "TBC Corporation",
    wordmark: "TBC",
    logo: "/tbc-logo.png",
    sector: "Automotive · Retail & Wholesale",
    region: "North America",
    engagement: "Oracle EPM Multi-Entity Financial Consolidation",
    summary:
      "North American leader in automotive tire marketing and retail distribution, operating Midas, Big O Tires, and Tire Kingdom. We architected and deployed Oracle EPM to unify financial close, planning, and multi-entity governance across its nationwide retail and wholesale operations.",
    outcomes: [
      "Oracle EPM Multi-Entity Financial Consolidation",
      "Automated Intercompany Transaction Reconciliation",
      "Unified Rollups Across 2,000+ Retail & Wholesale Footprints",
    ],
    metrics: [
      { value: "2,000+", label: "retail & wholesale footprints unified" },
      { value: "Unified", label: "multi-entity close, planning & governance" },
    ],
    scope: "Oracle EPM Implementation",
    accent: "gold",
    featured: true,
    href: "/contact#form",
  },
  {
    id: "northmere",
    name: "Northmere Logistics Group",
    wordmark: "NORTHMERE",
    sector: "Logistics & Supply Chain",
    region: "GCC",
    engagement: "Planning & Budgeting Cloud",
    summary: "Driver-based budgeting across 14 operating entities, replacing 40+ linked spreadsheets.",
    metrics: [
      { value: "6 → 2 wks", label: "budget cycle" },
      { value: "14", label: "entities modelled" },
    ],
    scope: "EPBCS · Workforce",
    accent: "blue",
    placeholder: true,
  },
  {
    id: "aurelian",
    name: "Aurelian Health Systems",
    wordmark: "AURELIAN",
    sector: "Healthcare",
    region: "United Kingdom",
    engagement: "Account Reconciliation",
    summary: "Auto-matching for high-volume bank and intercompany reconciliations with full audit trail.",
    metrics: [
      { value: "82%", label: "auto-matched" },
      { value: "100%", label: "audit traceability" },
    ],
    scope: "ARCS · Transaction Matching",
    accent: "emerald",
    placeholder: true,
  },
  {
    id: "vantrell",
    name: "Vantrell Industries",
    wordmark: "VANTRELL",
    sector: "Manufacturing",
    region: "India",
    engagement: "Profitability & Cost Management",
    summary: "Product and plant-level margin visibility with allocation rules finance can own.",
    metrics: [
      { value: "3.2×", label: "faster allocations" },
      { value: "9", label: "plants in one model" },
    ],
    scope: "PCMCS · EDM",
    accent: "blue",
    placeholder: true,
  },
  {
    id: "solenne",
    name: "Solenne Hospitality",
    wordmark: "SOLENNE",
    sector: "Hospitality",
    region: "Europe",
    engagement: "Narrative Reporting",
    summary: "Board packs and management reports generated straight from the consolidated close.",
    metrics: [
      { value: "5 days", label: "earlier board pack" },
      { value: "1", label: "source of truth" },
    ],
    scope: "Narrative Reporting · FCCS",
    accent: "emerald",
    placeholder: true,
  },
];
