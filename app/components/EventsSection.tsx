import Events from "./Events";
import { getCollection } from "@/lib/cms/server";

/** Server wrapper: loads the events before the page is sent, so the section never shows "Loading" */
export default async function EventsSection() {
  return <Events docs={await getCollection("events")} />;
}
