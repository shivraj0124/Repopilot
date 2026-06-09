type RepositoryTreeProps = {
  tree: any[];
};

export default function RepositoryTree({
  tree,
}: RepositoryTreeProps) {
  if (!tree.length) return null;

  return (
    <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Repository Structure
      </h2>

      <div className="max-h-[500px] overflow-y-auto bg-zinc-950 rounded-xl p-4 border border-zinc-800">
        <div className="space-y-2 text-sm font-mono">
          {tree.slice(0, 150).map(
            (
              item: any,
              index: number
            ) => (
              <div
                key={index}
                className="text-zinc-300 hover:text-white transition"
              >
                {item.path}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}