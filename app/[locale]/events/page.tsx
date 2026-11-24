import type { Metadata } from "next";
import EventsPage from "./EventsPage";
import { getCollection } from "@/lib/cms/server";

export const metadata: Metadata = {
  title: "Events | The A&M Internationals",  description:
    "Connect with industry leaders, learn from experts, and be part of our social impact initiatives.",
};

// Events come from Firebase: rebuild this page at most once a minute so new posts show up
export const revalidate = 60;

export default async function Page() {
  return <EventsPage events={await getCollection("events")} />;
}
