type RepositoryAnalysisCardProps = {
  analysis: any;
};

export default function RepositoryAnalysisCard({
  analysis,
}: RepositoryAnalysisCardProps) {
  if (!analysis) return null;

  return (
    <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
      {/* Project Purpose */}
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Project Purpose
        </h3>

        <p className="text-zinc-300">
          {analysis.projectPurpose}
        </p>
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Tech Stack
        </h3>

        <div className="flex flex-wrap gap-2">
          {analysis.techStack?.map(
            (
              tech: string,
              index: number
            ) => (
              <span
                key={index}
                className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>

      {/* Architecture */}
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Architecture
        </h3>

        <p className="text-zinc-300">
          {analysis.architecture}
        </p>
      </div>

      {/* Folder Explanation */}
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Folder Explanation
        </h3>

        <p className="text-zinc-300">
          {analysis.folderExplanation}
        </p>
      </div>

      {/* Difficulty */}
      <div>
        <h3 className="text-xl font-semibold mb-2">
          Difficulty
        </h3>

        <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-sm">
          {analysis.difficulty}
        </span>
      </div>
    </div>
  );
}