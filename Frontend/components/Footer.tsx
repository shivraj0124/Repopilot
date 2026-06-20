import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "@/styles/dashboard.css";
const LINK_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Explore", href: "/explore" },
      { label: "Issues", href: "/issues" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="rp-footer">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Top: brand + link columns, locked into an explicit grid */}
        <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_1fr] gap-10">

          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="footer-logo-mark">
                <FaGithub className="text-white text-xs" />
              </span>
              <span className="footer-brand-name text-base font-semibold">
                Repo<span className="footer-brand-accent">Pilot</span>
              </span>
            </Link>
            <p className="footer-tagline mt-3 leading-relaxed">
              AI-powered analysis for GitHub repositories and issues.
            </p>
          </div>

          {/* Each link group is its own grid cell — title and list can never separate */}
          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="footer-col-title mb-4">{group.title}</p>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="footer-divider border-t mt-10 pt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="footer-copyright">
            © {new Date().getFullYear()} RepoPilot
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/shivraj0124/Repopilot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="footer-icon-link"
            >
              <FaGithub size={15} />
            </a>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="footer-icon-link"
            >
              <FaLinkedin size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}