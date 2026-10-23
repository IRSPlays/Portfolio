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
import CypherWalker from "@/components/motion/CypherWalker";
import ChapterBreak from "@/components/motion/ChapterBreak";

export default function Home() {
  return (
    <>
      <Preloader />
      <WorldBackground />
      <SmoothScroll />
      <PawCursor />
      <SoundFX />
      <ScrollProgress />
      <CypherWalker />
      <SiteNav />
      <main>
        <Hero />
        <ChapterBreak words={["Failing with honour", "Pain-first engineering", "Built in Singapore"]} tone="coral" />
        <About />
        <RoadToV3 />
        <AsiriveSpotlight />
        <Proof />
        <ArsenalMarquee />
        <ChapterBreak words={["The build pile", "Ship it anyway", "Controlled chaos"]} tone="teal" tilt={1.2} base={3} />
        <ProjectGrid />
        <NowPanel />
        <SecretLab />
        <ChapterBreak words={["Let's build something loud", "Cypher approves", "Say hi"]} tone="amber" />
        <Contact />
      </main>
    </>
  );
}
