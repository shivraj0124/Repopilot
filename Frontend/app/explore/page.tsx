"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

import api from "@/lib/axios";

import {
  Star,
  GitFork,
  ExternalLink,
} from "lucide-react";

export default function ExplorePage() {
  const [repositories, setRepositories] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchRepositories =
    async () => {
      try {
        const response =
          await api.get(
            "/explore/repositories"
          );

        setRepositories(
          response.data.repositories
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Explore Repositories
          </h1>

          <p className="text-zinc-400 mt-4 text-lg">
            Discover trending GitHub
            repositories powered by AI.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 animate-pulse"
              >
                <div className="h-6 bg-zinc-800 rounded w-2/3 mb-4"></div>

                <div className="space-y-2">
                  <div className="h-4 bg-zinc-800 rounded"></div>

                  <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
                </div>

                <div className="flex gap-3 mt-6">
                  <div className="h-6 w-16 bg-zinc-800 rounded-full"></div>

                  <div className="h-6 w-16 bg-zinc-800 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Repository Cards */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repo) => (
              <div
                key={repo.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500 transition"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {repo.name}
                  </h2>

                  <a
                    href={repo.url}
                    target="_blank"
                  >
                    <ExternalLink
                      size={18}
                      className="text-zinc-400 hover:text-white"
                    />
                  </a>
                </div>

                <p className="text-zinc-400 mt-4 leading-relaxed min-h-[72px]">
                  {repo.description}
                </p>

                <div className="flex items-center gap-4 mt-6 text-sm text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Star size={16} />
                    {repo.stars}
                  </div>

                  <div className="flex items-center gap-1">
                    <GitFork size={16} />
                    {repo.forks}
                  </div>

                  {repo.language && (
                    <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full">
                      {repo.language}
                    </span>
                  )}
                </div>

                <a
                  href={`/dashboard?repo=${repo.url}`}
                  className="block w-full mt-6 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold text-center"
                >
                  Analyze Repository
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}