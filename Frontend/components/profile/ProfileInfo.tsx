"use client";

import { Mail, Calendar } from "lucide-react";
import "@/styles/dashboard.css";
type Props = {
  email: string;
  createdAt: string;
};

export default function ProfileInfo({ email, createdAt }: Props) {
  const joined = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div className="dash-card p-5 sm:p-6">
      <h2 className="profile-section-title mb-5">Personal Information</h2>

      <div className="space-y-4">
        <div className="profile-field-row flex items-start gap-3">
          <Mail size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="profile-field-label">Email</p>
            <p className="profile-field-value">{email}</p>
          </div>
        </div>

        <div className="profile-field-row flex items-start gap-3">
          <Calendar size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="profile-field-label">Joined</p>
            <p className="profile-field-value">{joined}</p>
          </div>
        </div>
      </div>
    </div>
  );
}