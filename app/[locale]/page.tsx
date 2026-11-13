import ServicesShowcase from "../components/services/showcase/ServicesShowcase";
import AboutUs from "../components/AboutUs";
import PartnerShipCard from "../components/PartnerShipCard";
import OurClients from "../components/OurClients";
import SuccessStory from "../components/SuccessStory";
import EventsSection from "../components/EventsSection";
import Innovation from "../components/Innovation";
import HomeHero from "../components/homePageComponents/HomeHero";
import { getCollection, getEntry } from "@/lib/cms/server";
import { byOrder, toCounters } from "@/lib/cms/siteContent";

export default async function Home() {
  // Admin-edited: banner numbers and Our Work cards (built-in content if none saved)
  const [home, ourWork] = await Promise.all([getEntry("siteContent", "home"), getCollection("ourWork")]);
  return (
    <div className="flex flex-col">
      <section className="snap-section">
        <HomeHero counters={toCounters(home?.data)} />
      </section>
      <section className="snap-section">
        <ServicesShowcase />
      </section>
      <section className="snap-section">
        <AboutUs />
      </section>
      {/* <section className="snap-section">
        <PartnerShipCard />
      </section> */}
      <section className="snap-section">
        <OurClients />
      </section>
      <section id="success-stories" className="snap-section">
        <SuccessStory docs={ourWork?.length ? byOrder(ourWork) : undefined} />
      </section>
      <section className="snap-section">
        <EventsSection />
      </section>
      {/* <section className="snap-section">
        <Innovation />
      </section> */}
    </div>
  );
}

// Events come from Firebase: rebuild this page at most once a minute so new posts show up
export const revalidate = 60;
