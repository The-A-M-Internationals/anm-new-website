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
      <section className="snap-section"><Hero /></section>
      <section className="snap-section"><Services /></section>
      <section className="snap-section"><AboutUs /></section>
      {/* <PartnerShipCard /> */}
      <section className="snap-section"><SuccessStory /></section>
      <section className="snap-section"><Events /></section>
      <section className="snap-section"><Innovation /></section>
    </div>
  );
}