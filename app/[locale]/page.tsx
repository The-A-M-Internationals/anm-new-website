import Services from "../components/Services";
import AboutUs from "../components/AboutUs";
import PartnerShipCard from "../components/PartnerShipCard";
import SuccessStory from "../components/SuccessStory";
import Events from "../components/Events";
import Innovation from "../components/Innovation";
import HomeHero from "../components/homePageComponents/HomeHero";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="snap-section">
        <HomeHero />
      </section>
      <section className="snap-section">
        <Services />
      </section>
      <section className="snap-section">
        <AboutUs />
      </section>
      {/* <section className="snap-section">
        <PartnerShipCard />
      </section> */}
      <section className="snap-section">
        <SuccessStory />
      </section>
      <section className="snap-section">
        <Events />
      </section>
      {/* <section className="snap-section">
        <Innovation />
      </section> */}
    </div>
  );
}