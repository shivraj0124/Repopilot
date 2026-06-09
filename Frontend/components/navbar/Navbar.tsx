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
  HiOutlineBookOpen,
  HiOutlineLightningBolt,
} from "react-icons/hi";

// ─── tiny cookie helper (no dependency needed) ───────────────────────────────
function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

// ─── parse a JWT payload without a library ───────────────────────────────────
function parseJwt(token: string) {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export default function Navbar() {
  const [user, setUser] = useState(null);       // { name, email, avatar? }
  const [theme, setTheme] = useState("dark");   // "dark" | "light"
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ── read auth token from cookie on mount ──────────────────────────────────
  useEffect(() => {
    const token = getCookie("token"); // adjust cookie name if needed
    if (token) {
      const payload = parseJwt(token);
      if (payload) {
        setUser({
          name: payload.name || payload.username || "Developer",
          email: payload.email || "",
          avatar: payload.avatar || null,
        });
      }
    }
  }, []);

  // ── apply theme to <html> ─────────────────────────────────────────────────
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

  // ── scroll shadow ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── logout ────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    deleteCookie("token"); // adjust name if different
    setUser(null);
    setDropOpen(false);
    window.location.href = "/";
  };

  // ── avatar initials fallback ──────────────────────────────────────────────
  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const isLight = theme === "light";

  return (
    <>
      {/* ── global theme CSS variables injected once ── */}
      <style>{`
        :root[data-theme="dark"] {
          --bg-nav:       rgba(5, 8, 20, 0.92);
          --border-nav:   rgba(30, 60, 120, 0.35);
          --logo-text:    #ffffff;
          --nav-link:     #94a3b8;
          --nav-link-h:   #e2e8f0;
          --drop-bg:      #0d1628;
          --drop-border:  rgba(30, 60, 120, 0.5);
          --drop-item:    #94a3b8;
          --drop-item-h:  #e2e8f0;
          --drop-hbg:     rgba(37, 99, 235, 0.12);
          --badge-bg:     rgba(37, 99, 235, 0.15);
          --badge-text:   #60a5fa;
          --shadow-nav:   0 8px 32px rgba(0,0,0,0.5);
          --dot:          #3b82f6;
        }
        :root[data-theme="light"] {
          --bg-nav:       rgba(248, 250, 255, 0.95);
          --border-nav:   rgba(147, 197, 253, 0.4);
          --logo-text:    #0f172a;
          --nav-link:     #475569;
          --nav-link-h:   #0f172a;
          --drop-bg:      #ffffff;
          --drop-border:  rgba(147, 197, 253, 0.5);
          --drop-item:    #475569;
          --drop-item-h:  #0f172a;
          --drop-hbg:     rgba(37, 99, 235, 0.07);
          --badge-bg:     rgba(37, 99, 235, 0.08);
          --badge-text:   #2563eb;
          --shadow-nav:   0 4px 24px rgba(37,99,235,0.08);
          --dot:          #2563eb;
        }

        .rp-nav {
          background: var(--bg-nav);
          border-bottom: 1px solid var(--border-nav);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .rp-nav.scrolled { box-shadow: var(--shadow-nav); }

        .rp-logo-text { color: var(--logo-text); }
        .rp-nav-link  { color: var(--nav-link); transition: color 0.2s; }
        .rp-nav-link:hover { color: var(--nav-link-h); }

        /* theme toggle pill */
        .rp-theme-btn {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 8px;
          color: var(--nav-link);
          background: var(--badge-bg);
          border: 1px solid var(--border-nav);
          cursor: pointer; transition: color 0.2s, background 0.2s;
        }
        .rp-theme-btn:hover { color: var(--nav-link-h); background: var(--drop-hbg); }

        /* avatar button */
        .rp-avatar-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 4px 10px 4px 4px;
          border-radius: 10px;
          border: 1px solid var(--border-nav);
          background: var(--badge-bg);
          cursor: pointer; transition: background 0.2s;
        }
        .rp-avatar-btn:hover { background: var(--drop-hbg); }
        .rp-avatar-btn .name {
          font-size: 0.8125rem; font-weight: 500;
          color: var(--logo-text); max-width: 110px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .rp-avatar-btn .chevron { color: var(--nav-link); transition: transform 0.2s; }
        .rp-avatar-btn.open .chevron { transform: rotate(180deg); }

        /* avatar circle */
        .rp-avatar {
          width: 28px; height: 28px; border-radius: 7px;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem; font-weight: 700; color: #fff;
          flex-shrink: 0; overflow: hidden;
        }
        .rp-avatar img { width: 100%; height: 100%; object-fit: cover; }

        /* dropdown */
        .rp-drop {
          position: absolute; top: calc(100% + 10px); right: 0;
          min-width: 220px;
          background: var(--drop-bg);
          border: 1px solid var(--drop-border);
          border-radius: 12px;
          box-shadow: 0 20px 48px rgba(0,0,0,0.28);
          overflow: hidden;
          transform-origin: top right;
          animation: dropIn 0.18s ease;
          z-index: 100;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: scale(0.95) translateY(-6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }

        .rp-drop-header {
          padding: 14px 16px;
          border-bottom: 1px solid var(--drop-border);
        }
        .rp-drop-email {
          font-size: 0.73rem; color: var(--drop-item);
          margin-top: 2px; word-break: break-all;
        }
        .rp-drop-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 16px;
          font-size: 0.8125rem; color: var(--drop-item);
          cursor: pointer; text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .rp-drop-item:hover {
          background: var(--drop-hbg); color: var(--drop-item-h);
        }
        .rp-drop-item.danger:hover { background: rgba(239,68,68,0.08); color: #f87171; }
        .rp-drop-divider { height: 1px; background: var(--drop-border); margin: 4px 0; }

        /* status dot */
        .rp-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--dot); flex-shrink: 0;
          box-shadow: 0 0 6px var(--dot);
        }

        /* get started btn */
        .rp-cta {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: #fff; font-size: 0.8125rem; font-weight: 600;
          padding: 8px 18px; border-radius: 8px;
          border: 1px solid rgba(96,165,250,0.25);
          transition: opacity 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 12px rgba(37,99,235,0.35);
          white-space: nowrap;
        }
        .rp-cta:hover { opacity: 0.9; box-shadow: 0 4px 20px rgba(37,99,235,0.5); }
      `}</style>

      <nav className={`rp-nav sticky top-0 z-50 ${scrolled ? "scrolled" : ""}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[60px] flex items-center justify-between gap-4">

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

          {/* ── Center nav links (desktop) ── */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "/explore",  label: "Explore",  Icon: HiOutlineCode },
              { href: "/issues",   label: "Issues",   Icon: HiOutlineLightningBolt },
              { href: "/docs",     label: "Docs",     Icon: HiOutlineBookOpen },
            ].map(({ href, label, Icon }) => (
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
          <div className="flex items-center gap-2.5">

            {/* Theme toggle */}
            <button onClick={toggleTheme} className="rp-theme-btn" aria-label="Toggle theme">
              {isLight
                ? <HiOutlineMoon className="text-base" />
                : <HiOutlineSun  className="text-base" />}
            </button>

            {user ? (
              /* ── Logged-in: avatar dropdown ── */
              <div className="relative">
                <button
                  onClick={() => setDropOpen((p) => !p)}
                  className={`rp-avatar-btn ${dropOpen ? "open" : ""}`}
                  aria-expanded={dropOpen}
                >
                  <div className="rp-avatar">
                    {user.avatar
                      ? <img src={user.avatar} alt={user.name} />
                      : initials}
                  </div>
                  <span className="name hidden sm:block">{user.name}</span>
                  <HiOutlineChevronDown className="chevron text-sm" />
                </button>

                {dropOpen && (
                  <>
                    {/* click-outside overlay */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropOpen(false)}
                    />
                    <div className="rp-drop z-50">
                      {/* header */}
                      <div className="rp-drop-header">
                        <div className="flex items-center gap-2.5">
                          <div className="rp-avatar" style={{ width: 34, height: 34, borderRadius: 9 }}>
                            {user.avatar
                              ? <img src={user.avatar} alt={user.name} />
                              : initials}
                          </div>
                          <div>
                            <p className="text-[0.8rem] font-semibold" style={{ color: "var(--logo-text)" }}>
                              {user.name}
                            </p>
                            {user.email && (
                              <p className="rp-drop-email">{user.email}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* items */}
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
                        <button
                          onClick={handleLogout}
                          className="rp-drop-item danger w-full text-left"
                        >
                          <HiOutlineLogout className="text-sm flex-shrink-0" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* ── Logged-out ── */
              <>
                <Link
                  href="/login"
                  className="rp-nav-link hidden sm:block text-[0.8125rem] font-medium px-3 py-1.5 rounded-lg hover:bg-[var(--drop-hbg)] transition-colors"
                >
                  Sign in
                </Link>
                <Link href="/register" className="rp-cta">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}