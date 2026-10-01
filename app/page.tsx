import SmoothScroll from "@/components/SmoothScroll";
import PawCursor from "@/components/PawCursor";
import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AsiriveSpotlight from "@/components/AsiriveSpotlight";
import ArsenalMarquee from "@/components/ArsenalMarquee";
import ProjectGrid from "@/components/ProjectGrid";
import SecretLab from "@/components/SecretLab";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <PawCursor />
      <SiteNav />
      <main>
        <Hero />
        <About />
        <AsiriveSpotlight />
        <ArsenalMarquee />
        <ProjectGrid />
        <SecretLab />
        <Contact />
      </main>
    </>
  );
}
