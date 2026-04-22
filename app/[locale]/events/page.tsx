import type { Metadata } from "next";
import EventsPage from "./EventsPage";

export const metadata: Metadata = {
  title: "Events | A&M International",
  description:
    "Connect with industry leaders, learn from experts, and be part of our social impact initiatives.",
};

export default function Page() {
  return <EventsPage />;
}