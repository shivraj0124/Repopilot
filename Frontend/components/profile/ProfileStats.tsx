"use client";

import { GitBranch, CircleDot } from "lucide-react";
import "@/styles/dashboard.css";
type Props = {
  repositoriesAnalyzed: number;
  issuesAnalyzed: number;
  loading?: boolean;
};

export default function ProfileStats({ repositoriesAnalyzed, issuesAnalyzed, loading }: Props) {
  return (
    <div className="dash-card p-5 sm:p-6">
      <h2 className="profile-section-title mb-5">Statistics</h2>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="profile-stat-card">
          <div className="profile-stat-icon">
            <GitBranch size={15} />
          </div>
          <p className="profile-stat-label">Repositories</p>
          {loading ? (
            <div className="dash-skel h-8 w-12 mt-1.5" />
          ) : (
            <p className="profile-stat-value">{repositoriesAnalyzed}</p>
          )}
        </div>

        <div className="profile-stat-card">
          <div className="profile-stat-icon">
            <CircleDot size={15} />
          </div>
          <p className="profile-stat-label">Issues</p>
          {loading ? (
            <div className="dash-skel h-8 w-12 mt-1.5" />
          ) : (
            <p className="profile-stat-value">{issuesAnalyzed}</p>
          )}
        </div>
      </div>
    </div>
  );
}