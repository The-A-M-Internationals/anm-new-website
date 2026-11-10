import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | The A&M Internationals",
  description:
      "Get in touch with The A&M Internationals to learn how we can help your business thrive in the global market.",};

export default function Page() {
  return <ContactPage />;
}