"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <FaGithub className="text-blue-500" />

          <h1 className="text-2xl font-bold text-white">
            RepoPilot
          </h1>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-zinc-300 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-white"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}