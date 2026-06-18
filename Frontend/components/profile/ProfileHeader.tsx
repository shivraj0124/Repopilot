"use client";

import { ShieldCheck } from "lucide-react";
import "@/styles/dashboard.css";
type Props = {
  name: string;
  email: string;
};

export default function ProfileHeader({ name, email }: Props) {
  return (
    <div className="dash-card p-5 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 text-center sm:text-left">
        <div className="profile-avatar w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold mx-auto sm:mx-0 flex-shrink-0">
          {name?.charAt(0)?.toUpperCase()}
        </div>

        <div className="min-w-0">
          <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
            <h1 className="profile-name text-2xl sm:text-3xl font-bold truncate">{name}</h1>
            <span className="profile-badge">
              <ShieldCheck size={11} />
              Verified
            </span>
          </div>
          <p className="profile-email text-sm sm:text-base mt-1 break-all">{email}</p>
        </div>
      </div>
    </div>
  );
}