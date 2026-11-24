"use client";

import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_CONTACT, type ContactInfo } from "@/lib/cms/siteContent";

/** Contact details from the admin portal, available to the footer and the Contact page */
const Ctx = createContext<ContactInfo>(DEFAULT_CONTACT);

export function ContactInfoProvider({ value, children }: { value: ContactInfo; children: ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useContactInfo = () => useContext(Ctx);

/** Localised hours / office text, or undefined to keep the built-in wording */
export function useContactText(locale: string) {
  const c = useContactInfo();
  const ar = locale === "ar";
  return {
    hours: (ar ? c.hoursAr || c.hours : c.hours) || undefined,
    office: (ar ? c.officeAr || c.office : c.office) || undefined,
  };
}
