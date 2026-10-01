import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { label: "about", href: "#about" },
  { label: "asirive", href: "#asirive" },
  { label: "arsenal", href: "#arsenal" },
  { label: "projects", href: "#projects" },
  { label: "lab", href: "#lab" },
  { label: "contact", href: "#contact" },
];

export default function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <nav className="mx-auto mt-3 flex h-12 w-[min(860px,94vw)] items-center justify-between gap-3 rounded-full border-[3px] border-line bg-card/85 px-4 shadow-[4px_5px_0_var(--shadowc)] backdrop-blur-md">
        <a href="#top" className="micro flex-1 shrink-0 font-bold text-ink">
          HAZIQ <span className="text-teal">//</span> CYPHER
        </a>
        <ul className="hidden items-center gap-4 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="micro text-inksoft transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-1 shrink-0 justify-end">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
