import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | A&M Internationals",
  description:
    "Get in touch with A&M Internationals to learn how we can help your business thrive in the global market.",
};

export default function Page() {
  return <ContactPage />;
}