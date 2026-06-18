"use client";

import Link from "next/link";
import { LayoutDashboard, Compass, CircleDot } from "lucide-react";
import "@/styles/dashboard.css";
export default function ProfileActions() {
  const actions = [
    { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
    { href: "/explore",   label: "Explore",   Icon: Compass },
    { href: "/issues",    label: "Issues",    Icon: CircleDot },
  ];

  return (
    <div className="dash-card p-5 sm:p-6">
      <h2 className="profile-section-title mb-5">Quick Actions</h2>

      <div className="flex flex-col sm:flex-row gap-3">
        {actions.map(({ href, label, Icon }) => (
          <Link key={href} href={href} className="profile-action-link">
            <Icon size={15} />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}