import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | The A&M internationals",
  description:
      "Get in touch with The A&M internationals to learn how we can help your business thrive in the global market.",};

export default function Page() {
  return <ContactPage />;
}