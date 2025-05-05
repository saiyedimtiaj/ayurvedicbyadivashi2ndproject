import ActionButton from "@/components/ActionButton";
import CombineSections from "@/components/CombineSections";
import Faq from "@/components/FAQ";
import Footer from "@/components/Footer";
import HeadingText from "@/components/HeadingText";
import Hero from "@/components/Hero";
import SocialIcon from "@/components/SocialIcons";

export default function Home() {
  return (
    <>
      <SocialIcon />
      <Hero />
      <HeadingText />
      <ActionButton />
      <Faq />
      <CombineSections />
      <Footer />
    </>
  );
}
