import Hero from "../components/homePageComponents/Hero";
import Services from "../components/Services";
import AboutUs from "../components/AboutUs";
import PartnerShipCard from "../components/PartnerShipCard";
import SuccessStory from "../components/SuccessStory";
import Events from "../components/Events";
import Innovation from "../components/Innovation";

export default function Home() {
  return (
    <div >
      <Hero />
      <Services />
      <AboutUs />
      {/* <PartnerShipCard /> */}
      <SuccessStory />
      <Events />
      <Innovation />
    </div>
  );
}