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

export default function ProfilePage() {
  const { user } = useAuth();

  const [stats, setStats] =
    useState({
      repositoriesAnalyzed: 0,
      issuesAnalyzed: 0,
    });

  useEffect(() => {
    const fetchStats =
      async () => {
        const response =
          await api.get(
            "/profile/stats"
          );

        setStats(
          response.data.stats
        );
      };

    fetchStats();
  }, []);

  if (!user) return null;

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <ProfileHeader
          name={user.name}
          email={user.email}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <ProfileInfo
            name={user.name}
            email={user.email}
            createdAt={
              user.createdAt
            }
          />

          <ProfileStats
            repositoriesAnalyzed={
              stats.repositoriesAnalyzed
            }
            issuesAnalyzed={
              stats.issuesAnalyzed
            }
          />
        </div>

        <ProfileActions />
      </div>

      <Footer />
    </>
  );
}