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
import Preloader from "@/components/motion/Preloader";
import WorldBackground from "@/components/motion/WorldBackground";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Bridge from "@/components/motion/Bridge";

export default function Home() {
  return (
    <>
      <Preloader />
      <WorldBackground />
      <SmoothScroll />
      <PawCursor />
      <SoundFX />
      <ScrollProgress />
      <SiteNav />
      <main>
        <Hero />
        <Bridge text="Enough noise." accent="Meet the human behind the fox." />
        <About />
        <Bridge text="It didn't start polished." accent="Every version failed first." />
        <RoadToV3 />
        <Bridge text="Version three became a company." />
        <AsiriveSpotlight />
        <Bridge text="Big claims need" accent="receipts." />
        <Proof />
        <Bridge text="And this is what it all runs on." />
        <ArsenalMarquee />
        <Bridge text="Plus everything else I couldn't stop building." />
        <ProjectGrid />
        <Bridge text="So what's happening" accent="right now?" />
        <NowPanel />
        <Bridge text="Okay. Time to play." />
        <SecretLab />
        <Bridge text="Found something fun?" accent="Let's talk." />
        <Contact />
      </main>
    </>
  );
}
