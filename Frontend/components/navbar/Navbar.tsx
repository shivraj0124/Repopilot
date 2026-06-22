"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import {
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineChevronDown,
  HiOutlineCode,
  HiOutlineLightningBolt,
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import "@/styles/dashboard.css"
function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

const NAV_LINKS = [
  { href: "/explore", label: "Repositories", Icon: HiOutlineCode },
  { href: "/issues",  label: "Issues",       Icon: HiOutlineLightningBolt },
];

export default function Navbar() {
  const [theme, setTheme]       = useState("dark");
  const [dropOpen, setDropOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, isLoggedIn } = useAuth();

  /* ── theme ── */
  useEffect(() => {
    const saved = localStorage.getItem("rp-theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("rp-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  /* ── scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── close menu on resize to desktop ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLogout = () => {
    deleteCookie("token");
    setDropOpen(false);
    setMenuOpen(false);
    window.location.href = "/";
  };

  const initials = user?.name
    ? user.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const isLight = theme === "light";

  return (
    <>
     
      {/* ════════════ NAV BAR ════════════ */}
      <nav className={`rp-nav sticky top-0 z-50 ${scrolled ? "scrolled" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[60px] flex items-center justify-between gap-3">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-900/40">
              <FaGithub className="text-white text-base" />
            </div>
            <span className="rp-logo-text text-[1.1rem] font-bold tracking-tight">
              Repo<span className="text-blue-500">Pilot</span>
            </span>
            <span
              className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "var(--badge-bg)", color: "var(--badge-text)" }}
            >
              <span className="rp-dot" />
              BETA
            </span>
          </Link>

          {/* ── Desktop centre links ── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label, Icon }) => (
              <Link
                key={label}
                href={href}
                className="rp-nav-link flex items-center gap-1.5 text-[0.8125rem] font-medium px-3 py-1.5 rounded-lg hover:bg-[var(--drop-hbg)] transition-colors"
              >
                <Icon className="text-sm" />
                {label}
              </Link>
            ))}
          </div>

          {/* ── Right side ── */}
          <div className="flex items-center gap-2">

            {/* Theme toggle */}
            <button onClick={toggleTheme} className="rp-theme-btn" aria-label="Toggle theme">
              {isLight ? <HiOutlineMoon className="text-base" /> : <HiOutlineSun className="text-base" />}
            </button>

            {/* Desktop auth */}
            {isLoggedIn ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setDropOpen((p) => !p)}
                  className={`rp-avatar-btn ${dropOpen ? "open" : ""}`}
                  aria-expanded={dropOpen}
                >
                  <div className="rp-avatar">{initials}</div>
                  <span className="name">{user?.name}</span>
                  <HiOutlineChevronDown className="chevron text-sm" />
                </button>

                {dropOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setDropOpen(false)} />
                    <div className="rp-drop z-50">
                      <div className="rp-drop-header">
                        <div className="flex items-center gap-2.5">
                          <div className="rp-avatar" style={{ width: 34, height: 34, borderRadius: 9 }}>
                            {initials}
                          </div>
                          <div>
                            <p className="text-[0.8rem] font-semibold" style={{ color: "var(--logo-text)" }}>
                              {user?.name}
                            </p>
                            {user?.email && <p className="rp-drop-email">{user.email}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="py-1">
                        <Link href="/dashboard" className="rp-drop-item" onClick={() => setDropOpen(false)}>
                          <HiOutlineCode className="text-sm flex-shrink-0" />
                          Dashboard
                        </Link>
                        <Link href="/profile" className="rp-drop-item" onClick={() => setDropOpen(false)}>
                          <HiOutlineUser className="text-sm flex-shrink-0" />
                          Profile
                        </Link>
                        <div className="rp-drop-divider" />
                        <button onClick={handleLogout} className="rp-drop-item danger w-full text-left">
                          <HiOutlineLogout className="text-sm flex-shrink-0" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/login"
                  className="rp-nav-link text-[0.8125rem] font-medium px-3 py-1.5 rounded-lg hover:bg-[var(--drop-hbg)] transition-colors"
                >
                  Login
                </Link>
                <Link href="/register" className="rp-cta">
                  Get Started
                </Link>
              </div>
            )}

            {/* ── Hamburger (mobile only) ── */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="rp-hamburger md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <HiOutlineX className="text-lg" /> : <HiOutlineMenu className="text-lg" />}
            </button>
          </div>
        </div>

        {/* ════════════ MOBILE MENU PANEL ════════════ */}
        {menuOpen && (
          <div className="rp-mobile-menu md:hidden px-4 pb-4 pt-2">

            {/* User info (if logged in) */}
            {isLoggedIn && (
              <div className="flex items-center gap-3 py-4 border-b" style={{ borderColor: "var(--border-nav)" }}>
                <div className="rp-mobile-avatar">{initials}</div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: "var(--logo-text)" }}>
                    {user?.name}
                  </p>
                  <p className="text-xs truncate" style={{ color: "var(--nav-link)" }}>
                    {user?.email}
                  </p>
                </div>
              </div>
            )}

            {/* Nav links */}
            <div className="py-2">
              {NAV_LINKS.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="rp-mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="rp-mobile-icon">
                    <Icon className="text-sm" style={{ color: "var(--badge-text)" }} />
                  </span>
                  {label}
                </Link>
              ))}

              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="rp-mobile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="rp-mobile-icon">
                      <HiOutlineCode className="text-sm" style={{ color: "var(--badge-text)" }} />
                    </span>
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="rp-mobile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="rp-mobile-icon">
                      <HiOutlineUser className="text-sm" style={{ color: "var(--badge-text)" }} />
                    </span>
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="rp-mobile-link danger w-full text-left"
                  >
                    <span className="rp-mobile-icon">
                      <HiOutlineLogout className="text-sm" style={{ color: "#f87171" }} />
                    </span>
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 pt-4">
                  <Link
                    href="/login"
                    className="rp-mobile-link !border-none !pb-0"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="rp-mobile-icon">
                      <HiOutlineUser className="text-sm" style={{ color: "var(--badge-text)" }} />
                    </span>
                    Login
                  </Link>
                  <Link href="/register" className="rp-cta-full" onClick={() => setMenuOpen(false)}>
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}