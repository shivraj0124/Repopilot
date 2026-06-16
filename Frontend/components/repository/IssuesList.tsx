import { useState } from "react";
import {
  CircleDot,
  MessageSquare,
  ExternalLink,
  Sparkles,
  Loader2,
  AlertCircle,
  GitMerge,
  Clock,
  Gauge,
  FileCode,
  Map,
  CheckCircle2,
  ChevronDown,
  Tag,
} from "lucide-react";

type IssuesListProps = {
  issues: any[];
  loadingIssueId: number | null;
  handleIssueAnalyze: (issueNumber: number) => void;
  issueAnalyses: Record<number, any>;
};

/* ── difficulty colour helper ── */
function diffStyle(raw: string) {
  const d = raw?.toLowerCase() ?? "";
  if (d.includes("beginner") || d.includes("easy")) return { chip: "dash-chip-emerald", dotClass: "bg-emerald-400" };
  if (d.includes("intermediate")) return { chip: "dash-chip-amber", dotClass: "bg-amber-400" };
  if (d.includes("advanced")) return { chip: "dash-chip-orange", dotClass: "bg-orange-400" };
  if (d.includes("expert")) return { chip: "dash-chip-red", dotClass: "bg-red-400" };
  return { chip: "dash-chip-blue", dotClass: "bg-blue-400" };
}

/* ── Section block inside analysis panel ── */
function AnalysisSection({
  icon: Icon,
  title,
  accent = "#3b82f6",
  children,
}: {
  icon: React.ElementType;
  title: string;
  accent?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5" style={{ "--accent": accent } as React.CSSProperties}>
      <div className="flex items-center gap-2">
        <div className="dash-section-icon" style={{ width: 24, height: 24 }}>
          <Icon size={12} />
        </div>
        <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          {title}
        </h4>
      </div>
      {children}
    </div>
  );
}

/* ── label badge accent rotation ── */
const LABEL_ACCENTS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#f43f5e"];

/* ── Single issue card ── */
function IssueCard({
  issue,
  loadingIssueId,
  handleIssueAnalyze,
  analysis,
}: {
  issue: any;
  loadingIssueId: number | null;
  handleIssueAnalyze: (n: number) => void;
  analysis: any;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLoading = loadingIssueId === issue.number;
  const hasAnalysis = !!analysis;

  if (hasAnalysis && !expanded) setExpanded(true);

  const diff = analysis ? diffStyle(analysis.difficulty ?? "") : null;

  return (
    <div className={`rounded-xl overflow-hidden transition-all duration-200 ${hasAnalysis ? "dash-card-active" : "dash-card"}`}>
      {/* ── Issue header ── */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          {/* icon */}
          <div className={`mt-0.5 ${hasAnalysis ? "dash-icon-badge-blue" : "dash-icon-badge"}`}>
            <CircleDot size={14} />
          </div>

          <div className="flex-1 min-w-0">
            {/* number + title */}
            <div className="flex flex-wrap items-start gap-x-2 gap-y-1">
              <span className="text-[11px] font-mono mt-0.5 flex-shrink-0" style={{ color: "var(--text-faint)" }}>
                #{issue.number}
              </span>
              <h3 className="text-sm font-semibold leading-snug" style={{ color: "var(--heading)" }}>
                {issue.title}
              </h3>
            </div>

            {/* meta row */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {issue.comments > 0 && (
                <span className="flex items-center gap-1 text-[11px]" style={{ color: "var(--text-faint)" }}>
                  <MessageSquare size={11} />
                  {issue.comments} {issue.comments === 1 ? "comment" : "comments"}
                </span>
              )}

              {issue.labels?.slice(0, 3).map((label: any, i: number) => {
                const accent = LABEL_ACCENTS[i % LABEL_ACCENTS.length];
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border"
                    style={{
                      background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                      borderColor: `color-mix(in srgb, ${accent} 25%, transparent)`,
                      color: accent,
                    }}
                  >
                    <Tag size={9} />
                    {typeof label === "string" ? label : label.name}
                  </span>
                );
              })}
            </div>
          </div>

          {/* right side actions */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            <a
              href={issue.url ?? issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="dash-icon-btn"
              title="View on GitHub"
            >
              <ExternalLink size={13} />
            </a>

            {hasAnalysis && (
              <button
                onClick={() => setExpanded((p) => !p)}
                className="dash-icon-btn-blue cursor-pointer"
                title={expanded ? "Collapse" : "Expand"}
              >
                <ChevronDown size={13} className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
              </button>
            )}
          </div>
        </div>

        {/* ── Analyze button ── */}
        {!hasAnalysis && (
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => handleIssueAnalyze(issue.number)}
              disabled={isLoading || loadingIssueId !== null}
              className="dash-analyze-btn cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ padding: "8px 16px", fontSize: "0.75rem", borderRadius: "10px" }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>
                  <Sparkles size={12} />
                  Analyze with AI
                </>
              )}
            </button>

            {isLoading && (
              <span className="text-xs animate-pulse" style={{ color: "var(--text-faint)" }}>
                Running AI analysis…
              </span>
            )}
          </div>
        )}

        {/* analysed badge */}
        {hasAnalysis && !expanded && (
          <div className="mt-3 flex items-center gap-2">
            <CheckCircle2 size={12} style={{ color: "var(--blue)" }} />
            <span className="text-xs" style={{ color: "color-mix(in srgb, var(--blue) 85%, transparent)" }}>
              AI analysis ready — click to expand
            </span>
          </div>
        )}
      </div>

      {/* ── Analysis panel ── */}
      {hasAnalysis && expanded && (
        <div className="dash-issue-panel px-4 sm:px-5 py-5 space-y-5">

          {/* Problem + Root Cause side by side on md+ */}
          <div className="grid md:grid-cols-2 gap-4">
            <AnalysisSection icon={AlertCircle} title="Problem" accent="#f43f5e">
              <p className="dash-text-body !text-xs leading-relaxed">{analysis.problem}</p>
            </AnalysisSection>
            <AnalysisSection icon={GitMerge} title="Root Cause" accent="#8b5cf6">
              <p className="dash-text-body !text-xs leading-relaxed">{analysis.rootCause}</p>
            </AnalysisSection>
          </div>

          {/* Difficulty + Time */}
          <div className="flex flex-wrap gap-4">
            <AnalysisSection icon={Gauge} title="Difficulty" accent="#f59e0b">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${diff!.chip}`}>
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${diff!.dotClass}`} />
                {analysis.difficulty}
              </span>
            </AnalysisSection>

            {analysis.estimatedTime && (
              <AnalysisSection icon={Clock} title="Estimated Time" accent="#10b981">
                <span className="dash-chip-emerald inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full">
                  <Clock size={11} />
                  {analysis.estimatedTime}
                </span>
              </AnalysisSection>
            )}
          </div>

          {/* Relevant Files */}
          {analysis.relevantFiles?.length > 0 && (
            <AnalysisSection icon={FileCode} title="Relevant Files" accent="#06b6d4">
              <div className="flex flex-wrap gap-1.5">
                {analysis.relevantFiles.map((file: string, i: number) => (
                  <span key={i} className="dash-chip font-mono !text-[11px]" style={{ padding: "5px 10px" }}>
                    <FileCode size={10} style={{ color: "var(--blue)" }} className="flex-shrink-0" />
                    {file}
                  </span>
                ))}
              </div>
            </AnalysisSection>
          )}

          {/* Contribution Roadmap */}
          {analysis.roadmap?.length > 0 && (
            <AnalysisSection icon={Map} title="Contribution Roadmap" accent="#3b82f6">
              <ol className="space-y-2">
                {analysis.roadmap.map((step: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="dash-step-num mt-0.5">{i + 1}</span>
                    <span className="dash-text-body !text-xs leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </AnalysisSection>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main component ── */
export default function IssuesList({
  issues,
  loadingIssueId,
  handleIssueAnalyze,
  issueAnalyses,
}: IssuesListProps) {
  const [filter, setFilter] = useState<"all" | "analyzed" | "unanalyzed">("all");

  if (!issues.length) return null;

  const analyzedCount = Object.keys(issueAnalyses).length;

  const filtered = issues.filter((issue) => {
    if (filter === "analyzed") return !!issueAnalyses[issue.number];
    if (filter === "unanalyzed") return !issueAnalyses[issue.number];
    return true;
  });

  return (
    <div className="mt-4 space-y-3">

      {/* ── Header row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-0.5">
        <div className="flex items-center gap-2.5">
          <CircleDot size={15} style={{ color: "var(--blue)" }} />
          <span className="text-sm font-semibold" style={{ color: "var(--heading)" }}>Open Issues</span>
          <span className="dash-badge">{issues.length}</span>
          {analyzedCount > 0 && <span className="dash-badge-blue">{analyzedCount} analysed</span>}
        </div>

        {/* Filter pills */}
        <div className="dash-pill-group">
          {(["all", "analyzed", "unanalyzed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`dash-pill ${filter === f ? "dash-pill-active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Issue list ── */}
      <div className="space-y-2">
        {filtered.map((issue) => (
          <IssueCard
            key={issue.number}
            issue={issue}
            loadingIssueId={loadingIssueId}
            handleIssueAnalyze={handleIssueAnalyze}
            analysis={issueAnalyses[issue.number]}
          />
        ))}

        {filtered.length === 0 && (
          <div className="dash-empty" style={{ padding: "48px 24px" }}>
            <CircleDot size={24} style={{ color: "var(--text-faint)", marginBottom: 8 }} />
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>No {filter} issues</p>
          </div>
        )}
      </div>
    </div>
  );
}