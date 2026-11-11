import { WaveDivider } from "@/components/decor/WaveDivider";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WaveDivider from="cream" to="white" />
      <HowItWorks />
      <WaveDivider from="white" to="cream" />
      <Pricing />
      <WaveDivider from="cream" to="white" />
      <Gallery />
      <WaveDivider from="white" to="cream" />
      <Team />
      <WaveDivider from="cream" to="white" />
      <Faq />
      <WaveDivider from="white" to="cream" />
      <Contact />
    </>
  );
}
