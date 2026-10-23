import Link from "next/link";
import CypherMascot from "@/components/CypherMascot";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <CypherMascot emotion="puzzled" size={260} showSpeech speechText="Wrong turn. Cypher checked the map, judged it 1/10, and kept walking." />
      <h1 className="text-[clamp(3rem,10vw,7rem)] font-extrabold leading-none">404</h1>
      <p className="max-w-md text-lg text-inksoft">
        Failing with honour includes 404s. The fox is unimpressed by this missing route.
      </p>
      <Link href="/" className="btn-squish btn-solid">
        teleport home
      </Link>
    </main>
  );
}
