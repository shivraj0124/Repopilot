"use client";

import Link from "next/link";

export default function ProfileActions() {
  return (
    <div className="dash-card p-6">
      <h2 className="text-xl font-semibold mb-5">
        Quick Actions
      </h2>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/dashboard"
          className="explore-btn-primary"
        >
          Dashboard
        </Link>

        <Link
          href="/explore"
          className="explore-btn-primary"
        >
          Explore
        </Link>

        <Link
          href="/issues"
          className="explore-btn-primary"
        >
          Issues
        </Link>
      </div>
    </div>
  );
}