import Services from "../components/Services";
import AboutUs from "../components/AboutUs";
import PartnerShipCard from "../components/PartnerShipCard";
import SuccessStory from "../components/SuccessStory";
import Events from "../components/Events";
import Innovation from "../components/Innovation";
import HomeHero from "../components/homePageComponents/HomeHero";

export default function Home() {
  return (
    <div >
      <HomeHero />
      <Services />
      <AboutUs />
      {/* <PartnerShipCard /> */}
      <SuccessStory />
      <Events />
      {/* <Innovation />*/}
    </div>
  );
}