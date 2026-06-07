import Link from "next/link";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">RepoPilot</h2>

            <p className="text-zinc-400 mt-2">
              AI-powered GitHub repository & issue analysis platform.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-zinc-400">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>

            <Link href="/dashboard" className="hover:text-white transition">
              Dashboard
            </Link>

            <Link href="/login" className="hover:text-white transition">
              Login
            </Link>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              className="text-zinc-400 hover:text-white transition"
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              className="text-zinc-400 hover:text-white transition"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-800 mt-8 pt-6 text-center text-zinc-500 text-sm">
          © {new Date().getFullYear()} RepoPilot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
