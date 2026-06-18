"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileActions from "@/components/profile/ProfileActions";

import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import "@/styles/dashboard.css";

function GridBackground() {
  return (
    <div className="rp-grid-bg" aria-hidden="true">
      <div className="rp-grid-lines" />
      <div className="rp-radial-fade" />
    </div>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    repositoriesAnalyzed: 0,
    issuesAnalyzed: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/profile/stats");
        setStats(response.data.stats);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  if (!user) return null;

  return (
    <div className="rp-page">
      <Navbar />

      <section className="relative">
        <GridBackground />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-5 sm:space-y-6 z-10">
          <ProfileHeader name={user.name} email={user.email} />

          <div className="grid md:grid-cols-2 gap-8">
            <ProfileInfo email={user.email} createdAt={user.createdAt} />

            <ProfileStats
              repositoriesAnalyzed={stats.repositoriesAnalyzed}
              issuesAnalyzed={stats.issuesAnalyzed}
              loading={loadingStats}
            />
          </div>

          <ProfileActions />
        </div>
      </section>

      <Footer />
    </div>
  );
}