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
  { chipClass: string; bar: number; label: string; barColor: string }
> = {
  beginner:     { chipClass: "dash-chip-emerald", barColor: "#34d399", bar: 25,  label: "Beginner" },
  easy:         { chipClass: "dash-chip-emerald", barColor: "#34d399", bar: 35,  label: "Easy" },
  intermediate: { chipClass: "dash-chip-amber",   barColor: "#fbbf24", bar: 60,  label: "Intermediate" },
  advanced:     { chipClass: "dash-chip-orange",  barColor: "#fb923c", bar: 80,  label: "Advanced" },
  expert:       { chipClass: "dash-chip-red",     barColor: "#f87171", bar: 100, label: "Expert" },
};

function getDifficulty(raw: string) {
  const key = raw?.toLowerCase?.() ?? "";
  const found =
    DIFFICULTY[key] ??
    DIFFICULTY[Object.keys(DIFFICULTY).find((k) => key.includes(k)) ?? ""];
  return found ?? { chipClass: "dash-chip-blue", barColor: "#3b82f6", bar: 50, label: raw };
}

/* ── Section wrapper ── */
function Section({
  icon: Icon,
  title,
  children,
  accent = "#3b82f6",
  className = "",
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <div
      className={`dash-card p-5 space-y-3 ${className}`}
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <div className="flex items-center gap-2.5">
        <div className="dash-section-icon">
          <Icon size={13} />
        </div>
        <h3 className="dash-section-title">{title}</h3>
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
      {/* ── Purpose + Difficulty side by side on md+ ── */}
      <div className="grid md:grid-cols-3 gap-3">
        <Section icon={Target} title="Project Purpose" accent="#3b82f6" className="md:col-span-2">
          <p className="dash-text-body">{analysis.projectPurpose}</p>
        </Section>

        <Section icon={Gauge} title="Difficulty Level" accent="#f59e0b">
          <div className="flex flex-col gap-3">
            <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full w-fit ${diff.chipClass}`}>
              <CheckCircle2 size={12} />
              {diff.label}
            </span>

            <div>
              <div className="flex justify-between text-[10px] mb-1.5 font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
                <span>Beginner</span>
                <span>Expert</span>
              </div>
              <div className="dash-progress-track">
                <div
                  className="dash-progress-fill"
                  style={{
                    width: `${diff.bar}%`,
                    background: `linear-gradient(to right, ${diff.barColor}99, ${diff.barColor})`,
                  }}
                />
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ── Tech Stack ── */}
      <Section icon={Layers} title="Tech Stack" accent="#8b5cf6">
        <div className="flex flex-wrap gap-2">
          {analysis.techStack?.map((tech: string, i: number) => (
            <span key={i} className="dash-chip">
              <span className="dash-chip-dot" />
              {tech}
            </span>
          ))}
        </div>
      </Section>

      {/* ── Architecture + Folder Explanation side by side on lg+ ── */}
      <div className="grid lg:grid-cols-2 gap-3">
        <Section icon={NetworkIcon} title="Architecture" accent="#06b6d4">
          <p className="dash-text-body">{analysis.architecture}</p>
        </Section>

        <Section icon={FolderOpen} title="Folder Explanation" accent="#14b8a6">
          <p className="dash-text-body whitespace-pre-line">{analysis.folderExplanation}</p>
        </Section>
      </div>
    </div>
  );
}