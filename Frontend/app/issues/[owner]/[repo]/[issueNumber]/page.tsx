"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

import api from "@/lib/axios";

import {
  AlertCircle,
  Clock,
  Folder,
  GitBranch,
} from "lucide-react";

export default function AnalyzeIssuePage() {
  const params = useParams();

  const owner = params.owner as string;
  const repo = params.repo as string;
  const issueNumber =
    params.issueNumber as string;

  const [loading, setLoading] =
    useState(true);

  const [data, setData] =
    useState<any>(null);

  const fetchIssueAnalysis =
    async () => {
      try {
        setLoading(true);

        const repoUrl = `https://github.com/${owner}/${repo}`;

        const response =
          await api.post(
            "/issues/analyze",
            {
              repoUrl,
              issueNumber,
            }
          );

        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchIssueAnalysis();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />

        <div className="max-w-5xl mx-auto px-6 py-12 animate-pulse">
          <div className="h-10 bg-zinc-800 rounded w-2/3 mb-8"></div>

          <div className="space-y-4">
            <div className="h-4 bg-zinc-800 rounded"></div>
            <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
            <div className="h-4 bg-zinc-800 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />

        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-bold">
            Failed to load issue analysis
          </h1>
        </div>

        <Footer />
      </div>
    );
  }

  const { issue, analysis } = data;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-blue-400 mb-3">
                {owner}/{repo}
              </p>

              <h1 className="text-4xl font-bold leading-tight">
                #{issue.number}{" "}
                {issue.title}
              </h1>

              <div className="flex gap-3 mt-6 flex-wrap">
                <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                  {issue.state}
                </span>

                <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm">
                  Author: {issue.author}
                </span>
              </div>
            </div>

            <a
              href={issue.url}
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold"
            >
              Open on GitHub
            </a>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-8">
          <h2 className="text-3xl font-bold">
            AI Issue Analysis
          </h2>

          {/* Problem */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={20} />

              <h3 className="text-2xl font-semibold">
                Problem
              </h3>
            </div>

            <p className="text-zinc-300 leading-relaxed">
              {analysis.problem}
            </p>
          </div>

          {/* Root Cause */}
          <div>
            <h3 className="text-2xl font-semibold mb-3">
              Root Cause
            </h3>

            <p className="text-zinc-300 leading-relaxed">
              {analysis.rootCause}
            </p>
          </div>

          {/* Difficulty + Time */}
          <div className="flex gap-6 flex-wrap">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <h3 className="font-semibold mb-3">
                Difficulty
              </h3>

              <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                {analysis.difficulty}
              </span>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} />

                <h3 className="font-semibold">
                  Estimated Time
                </h3>
              </div>

              <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
                {analysis.estimatedTime}
              </span>
            </div>
          </div>

          {/* Relevant Files */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Folder size={20} />

              <h3 className="text-2xl font-semibold">
                Relevant Files
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {analysis.relevantFiles?.map(
                (
                  file: string,
                  index: number
                ) => (
                  <span
                    key={index}
                    className="bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-xl text-sm"
                  >
                    {file}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Roadmap */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GitBranch size={20} />

              <h3 className="text-2xl font-semibold">
                Contribution Roadmap
              </h3>
            </div>

            <div className="space-y-4">
              {analysis.roadmap?.map(
                (
                  step: string,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="flex gap-4 bg-zinc-950 border border-zinc-800 rounded-xl p-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <p className="text-zinc-300 flex-1">
                      {step}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}