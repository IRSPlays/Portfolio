import Link from "next/link";
import FoxMascot from "@/components/FoxMascot";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <FoxMascot mood="suspicious" size={220} />
      <h1 className="text-[clamp(3rem,10vw,7rem)] font-extrabold leading-none">404</h1>
      <p className="max-w-md text-lg text-inksoft">
        Wrong turn. Cypher checked the map, judged it 1/10, and kept walking. Failing with honour includes 404s.
      </p>
      <Link href="/" className="btn-squish btn-solid">
        teleport home
      </Link>
    </main>
  );
}
