import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "@/styles/dashboard.css"

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

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">

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

          {/* Link groups */}
          <div className="flex gap-12 sm:gap-16">
            {LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="footer-col-title mb-3">{group.title}</p>
                <ul className="space-y-2.5">
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
        </div>

        {/* Bottom row */}
        <div className="footer-divider border-t mt-10 pt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="footer-copyright">
            © {new Date().getFullYear()} RepoPilot
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="footer-icon-link"
            >
              <FaGithub size={15} />
            </a>
            <a
              href="https://linkedin.com"
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