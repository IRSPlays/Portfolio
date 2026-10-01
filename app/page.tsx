import SmoothScroll from "@/components/SmoothScroll";
import PawCursor from "@/components/PawCursor";
import SoundFX from "@/components/SoundFX";
import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import RoadToV3 from "@/components/RoadToV3";
import AsiriveSpotlight from "@/components/AsiriveSpotlight";
import Proof from "@/components/Proof";
import ArsenalMarquee from "@/components/ArsenalMarquee";
import ProjectGrid from "@/components/ProjectGrid";
import NowPanel from "@/components/NowPanel";
import SecretLab from "@/components/SecretLab";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <PawCursor />
      <SoundFX />
      <SiteNav />
      <main>
        <Hero />
        <About />
        <RoadToV3 />
        <AsiriveSpotlight />
        <Proof />
        <ArsenalMarquee />
        <ProjectGrid />
        <NowPanel />
        <SecretLab />
        <Contact />
      </main>
    </>
  );
}
