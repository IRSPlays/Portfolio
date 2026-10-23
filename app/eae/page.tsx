import SmoothScroll from "@/components/SmoothScroll";
import EaeChrome from "@/components/eae/EaeChrome";
import Cover from "@/components/eae/Cover";
import Brief from "@/components/eae/Brief";
import Cortex from "@/components/eae/Cortex";
import Record from "@/components/eae/Record";
import Work from "@/components/eae/Work";
import Craft from "@/components/eae/Craft";
import Team from "@/components/eae/Team";
import Finale from "@/components/eae/Finale";

export default function EaePage() {
  return (
    <>
      <SmoothScroll />
      <EaeChrome />
      <main>
        <Cover />
        <Brief />
        <Cortex />
        <Record />
        <Work />
        <Craft />
        <Team />
        <Finale />
      </main>
    </>
  );
}
