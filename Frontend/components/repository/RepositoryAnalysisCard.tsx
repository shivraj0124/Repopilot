import {
  Target,
  Layers,
  NetworkIcon,
  FolderOpen,
  Gauge,
  CheckCircle2,
} from "lucide-react";

type RepositoryAnalysisCardProps = {
  analysis: any;
};

/* ── difficulty config ── */
const DIFFICULTY: Record<
  string,
  { color: string; bg: string; border: string; bar: number; label: string }
> = {
  beginner: {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    bar: 25,
    label: "Beginner",
  },
  easy: {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/25",
    bar: 35,
    label: "Easy",
  },
  intermediate: {
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/25",
    bar: 60,
    label: "Intermediate",
  },
  advanced: {
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/25",
    bar: 80,
    label: "Advanced",
  },
  expert: {
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/25",
    bar: 100,
    label: "Expert",
  },
};

function getDifficulty(raw: string) {
  const key = raw?.toLowerCase?.() ?? "";
  return (
    DIFFICULTY[key] ??
    DIFFICULTY[
      Object.keys(DIFFICULTY).find((k) => key.includes(k)) ?? "intermediate"
    ] ?? {
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/25",
      bar: 50,
      label: raw,
    }
  );
}

/* ── Section wrapper ── */
function Section({
  icon: Icon,
  title,
  children,
  accent = "blue",
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  accent?: string;
}) {
  const accentMap: Record<string, string> = {
    blue:   "bg-blue-500/10 border-blue-500/20 text-blue-400",
    violet: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    cyan:   "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    teal:   "bg-teal-500/10 border-teal-500/20 text-teal-400",
    amber:  "bg-amber-500/10 border-amber-500/20 text-amber-400",
  };
  const cls = accentMap[accent] ?? accentMap.blue;
  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 space-y-3 hover:border-slate-700/80 transition-colors duration-200">
      <div className="flex items-center gap-2.5">
        <div className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 ${cls}`}>
          <Icon size={13} />
        </div>
        <h3 className="text-sm font-semibold text-slate-200 tracking-wide">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function RepositoryAnalysisCard({ analysis }: RepositoryAnalysisCardProps) {
  if (!analysis) return null;

  const diff = getDifficulty(analysis.difficulty ?? "");

  return (
    <div className="mt-4 space-y-3">
      {/* ── Top card: purpose + difficulty side by side on md+ ── */}
      <div className="grid md:grid-cols-3 gap-3">
        {/* Project Purpose — takes 2 cols */}
        <div className="md:col-span-2">
          <Section icon={Target} title="Project Purpose" accent="blue">
            <p className="text-sm text-slate-400 leading-relaxed">{analysis.projectPurpose}</p>
          </Section>
        </div>

        {/* Difficulty */}
        <Section icon={Gauge} title="Difficulty Level" accent="amber">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full border ${diff.color} ${diff.bg} ${diff.border}`}
              >
                <CheckCircle2 size={12} />
                {diff.label}
              </span>
            </div>
            {/* progress bar */}
            <div>
              <div className="flex justify-between text-[10px] text-slate-600 mb-1.5 font-medium uppercase tracking-wider">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    diff.bar <= 35
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                      : diff.bar <= 60
                      ? "bg-gradient-to-r from-amber-500 to-amber-400"
                      : diff.bar <= 80
                      ? "bg-gradient-to-r from-orange-500 to-orange-400"
                      : "bg-gradient-to-r from-red-500 to-red-400"
                  }`}
                  style={{ width: `${diff.bar}%` }}
                />
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ── Tech Stack ── */}
      <Section icon={Layers} title="Tech Stack" accent="violet">
        <div className="flex flex-wrap gap-2">
          {analysis.techStack?.map((tech: string, i: number) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/60 hover:border-blue-500/40 hover:bg-blue-500/5 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-150 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
              {tech}
            </span>
          ))}
        </div>
      </Section>

      {/* ── Architecture ── */}
      <Section icon={NetworkIcon} title="Architecture" accent="cyan">
        <p className="text-sm text-slate-400 leading-relaxed">{analysis.architecture}</p>
      </Section>

      {/* ── Folder Explanation ── */}
      <Section icon={FolderOpen} title="Folder Explanation" accent="teal">
        <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">
          {analysis.folderExplanation}
        </p>
      </Section>
    </div>
  );
}