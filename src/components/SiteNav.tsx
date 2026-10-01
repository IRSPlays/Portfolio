import ThemeToggle from "@/components/ThemeToggle";
import { resume } from "@/data/content";

const links = [
  { label: "about", href: "#about" },
  { label: "road", href: "#road" },
  { label: "asirive", href: "#asirive" },
  { label: "arsenal", href: "#arsenal" },
  { label: "projects", href: "#projects" },
  { label: "now", href: "#now" },
  { label: "lab", href: "#lab" },
  { label: "contact", href: "#contact" },
];

export default function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <nav className="mx-auto mt-3 flex h-12 w-[min(1000px,96vw)] items-center justify-between gap-3 rounded-full border-[3px] border-line bg-card px-4 shadow-[4px_5px_0_var(--shadowc)]">
        <a href="#top" className="micro shrink-0 font-bold text-ink">
          HAZIQ <span className="text-teal">//</span> CYPHER
        </a>
        <ul className="hidden items-center gap-3 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="micro text-inksoft transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
          <a href={resume.cvHref} className="btn-squish px-3 py-1.5">
            <span className="micro font-bold">{resume.label}</span>
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
