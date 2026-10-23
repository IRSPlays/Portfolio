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
    <header className="fixed inset-x-0 top-0 z-[80] pointer-events-none">
      <nav className="pointer-events-auto mx-auto mt-3.5 flex h-14 w-[min(1120px,94vw)] items-center justify-between gap-4 rounded-full border-[3px] border-line bg-card/95 backdrop-blur-md px-5 sm:px-6 shadow-[5px_6px_0_var(--shadowc)]">
        {/* Brand / Logo */}
        <a
          href="#top"
          className="shrink-0 font-display text-sm sm:text-base font-extrabold tracking-tight text-ink hover:text-teal transition-colors"
        >
          HAZIQ <span className="font-mono text-teal text-xs font-bold">//</span> CYPHER
        </a>

        {/* Center Nav Links */}
        <ul className="hidden items-center gap-1 xl:gap-2 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-[0.73rem] font-bold uppercase tracking-wider text-inksoft hover:text-ink hover:bg-bg2/70 px-2.5 py-1 rounded-full transition-all"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-2.5">
          <a
            href={resume.cvHref}
            className="flex items-center gap-1 rounded-full border-2 border-line bg-card hover:bg-bg2 active:scale-95 transition-all px-3 py-1 font-mono text-xs font-bold shadow-[2px_2px_0_var(--shadowc)] hover:shadow-[3px_3px_0_var(--shadowc)] text-ink"
          >
            <span>{resume.label}</span>
          </a>
          <ThemeToggle className="flex items-center gap-1.5 rounded-full border-2 border-line bg-card hover:bg-bg2 active:scale-95 transition-all px-3 py-1 font-mono text-xs font-bold shadow-[2px_2px_0_var(--shadowc)] hover:shadow-[3px_3px_0_var(--shadowc)] text-ink" />
        </div>
      </nav>
    </header>
  );
}
