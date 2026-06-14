import { useState, useMemo } from "react";
import {
  FolderOpen,
  Folder,
  FileText,
  ChevronRight,
  FolderTree,
  File,
  FileCode,
  FileJson,
  Image,
  BookOpen,
  Settings,
} from "lucide-react";

type RepositoryTreeProps = {
  tree: any[];
};

/* ── Build nested tree from flat path array ── */
type TreeNode = {
  name: string;
  path: string;
  type: "file" | "dir";
  children: Record<string, TreeNode>;
};

function buildTree(items: any[]): Record<string, TreeNode> {
  const root: Record<string, TreeNode> = {};

  for (const item of items) {
    const rawPath: string = item.path ?? item;
    const parts = rawPath.split("/");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;
      if (!current[part]) {
        current[part] = {
          name: part,
          path: parts.slice(0, i + 1).join("/"),
          type: isLast ? (item.type === "blob" ? "file" : "dir") : "dir",
          children: {},
        };
      }
      // if we see it as a dir at some point, keep it a dir
      if (!isLast) current[part].type = "dir";
      current = current[part].children;
    }
  }

  return root;
}

/* ── File icon by extension ── */
const EXT_ICONS: Record<string, { Icon: React.ElementType; color: string }> = {
  ts:     { Icon: FileCode, color: "text-blue-400"    },
  tsx:    { Icon: FileCode, color: "text-blue-400"    },
  js:     { Icon: FileCode, color: "text-yellow-400"  },
  jsx:    { Icon: FileCode, color: "text-yellow-400"  },
  json:   { Icon: FileJson, color: "text-amber-400"   },
  md:     { Icon: BookOpen, color: "text-slate-300"   },
  mdx:    { Icon: BookOpen, color: "text-slate-300"   },
  yml:    { Icon: Settings, color: "text-rose-400"    },
  yaml:   { Icon: Settings, color: "text-rose-400"    },
  png:    { Icon: Image,    color: "text-purple-400"  },
  jpg:    { Icon: Image,    color: "text-purple-400"  },
  svg:    { Icon: Image,    color: "text-pink-400"    },
  txt:    { Icon: FileText, color: "text-slate-400"   },
  sh:     { Icon: FileCode, color: "text-emerald-400" },
  py:     { Icon: FileCode, color: "text-green-400"   },
  go:     { Icon: FileCode, color: "text-cyan-400"    },
  rs:     { Icon: FileCode, color: "text-orange-400"  },
  css:    { Icon: FileCode, color: "text-sky-400"     },
  html:   { Icon: FileCode, color: "text-orange-300"  },
};

function getFileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  return EXT_ICONS[ext] ?? { Icon: File, color: "text-slate-500" };
}

/* ── Dot colour for file ext badge ── */
const EXT_DOT: Record<string, string> = {
  ts: "bg-blue-400", tsx: "bg-blue-400",
  js: "bg-yellow-400", jsx: "bg-yellow-400",
  json: "bg-amber-400",
  md: "bg-slate-400", mdx: "bg-slate-400",
  yml: "bg-rose-400", yaml: "bg-rose-400",
  py: "bg-green-400", go: "bg-cyan-400",
  rs: "bg-orange-400", sh: "bg-emerald-400",
  css: "bg-sky-400", html: "bg-orange-300",
};

/* ── Single tree node row ── */
function TreeNodeRow({
  node,
  depth,
  defaultOpen,
}: {
  node: TreeNode;
  depth: number;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const hasChildren = Object.keys(node.children).length > 0;
  const isDir = node.type === "dir" || hasChildren;
  const indent = depth * 16;

  const { Icon, color } = isDir
    ? { Icon: open ? FolderOpen : Folder, color: "text-blue-400" }
    : getFileIcon(node.name);

  const ext = node.name.split(".").pop()?.toLowerCase() ?? "";
  const dotColor = EXT_DOT[ext];

  const sortedChildren = useMemo(
    () =>
      Object.values(node.children).sort((a, b) => {
        // dirs first, then files
        const aIsDir = a.type === "dir" || Object.keys(a.children).length > 0;
        const bIsDir = b.type === "dir" || Object.keys(b.children).length > 0;
        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;
        return a.name.localeCompare(b.name);
      }),
    [node.children]
  );

  return (
    <div>
      <div
        className={`
          group flex items-center gap-1.5 py-[3px] px-2 rounded-md cursor-pointer
          text-slate-400 hover:text-slate-100 hover:bg-slate-800/50
          transition-colors duration-100
          ${isDir ? "font-medium" : "font-normal"}
        `}
        style={{ paddingLeft: `${8 + indent}px` }}
        onClick={() => isDir && setOpen((o) => !o)}
      >
        {/* chevron for dirs */}
        {isDir ? (
          <ChevronRight
            size={12}
            className={`flex-shrink-0 text-slate-600 group-hover:text-slate-400 transition-transform duration-150 ${
              open ? "rotate-90" : ""
            }`}
          />
        ) : (
          <span className="w-3 flex-shrink-0" />
        )}

        {/* icon */}
        <Icon size={14} className={`flex-shrink-0 ${color}`} />

        {/* name */}
        <span className="text-xs truncate">{node.name}</span>

        {/* ext dot for files */}
        {!isDir && dotColor && (
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ml-auto ${dotColor} opacity-60`} />
        )}
      </div>

      {/* children */}
      {isDir && open && sortedChildren.length > 0 && (
        <div className="relative">
          {/* indent guide line */}
          <div
            className="absolute top-0 bottom-0 w-px bg-slate-800/80"
            style={{ left: `${14 + indent}px` }}
          />
          {sortedChildren.map((child) => (
            <TreeNodeRow
              key={child.path}
              node={child}
              depth={depth + 1}
              defaultOpen={depth < 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Stats bar ── */
function countNodes(nodes: Record<string, TreeNode>): { files: number; dirs: number } {
  let files = 0, dirs = 0;
  function walk(n: Record<string, TreeNode>) {
    for (const node of Object.values(n)) {
      if (node.type === "dir" || Object.keys(node.children).length > 0) {
        dirs++;
        walk(node.children);
      } else {
        files++;
      }
    }
  }
  walk(nodes);
  return { files, dirs };
}

/* ── Main component ── */
export default function RepositoryTree({ tree }: RepositoryTreeProps) {
  const [search, setSearch] = useState("");

  const rootNodes = useMemo(() => buildTree(tree), [tree]);
  const { files, dirs } = useMemo(() => countNodes(rootNodes), [rootNodes]);

  /* flat filtered list for search mode */
  const filteredPaths = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return tree
      .map((item) => (typeof item === "string" ? item : item.path))
      .filter((p: string) => p.toLowerCase().includes(q))
      .slice(0, 80);
  }, [search, tree]);

  const sortedRoots = useMemo(
    () =>
      Object.values(rootNodes).sort((a, b) => {
        const aDir = a.type === "dir" || Object.keys(a.children).length > 0;
        const bDir = b.type === "dir" || Object.keys(b.children).length > 0;
        if (aDir && !bDir) return -1;
        if (!aDir && bDir) return 1;
        return a.name.localeCompare(b.name);
      }),
    [rootNodes]
  );

  if (!tree.length) return null;

  return (
    <div className="mt-4 rounded-xl border border-slate-800/70 bg-slate-900/40 overflow-hidden">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3.5 border-b border-slate-800/70 bg-slate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
            <FolderTree size={13} className="text-blue-400" />
          </div>
          <span className="text-sm font-semibold text-slate-200">Repository Structure</span>
          <div className="flex items-center gap-2 ml-1">
            <span className="text-[11px] bg-slate-800 border border-slate-700/50 text-slate-400 px-2 py-0.5 rounded-md">
              {dirs} folders
            </span>
            <span className="text-[11px] bg-slate-800 border border-slate-700/50 text-slate-400 px-2 py-0.5 rounded-md">
              {files} files
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
            width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search files…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-52 pl-8 pr-3 py-1.5 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs text-slate-300 placeholder-slate-600 outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/10 transition-all"
          />
        </div>
      </div>

      {/* ── Tree / Search results ── */}
      <div className="max-h-[480px] overflow-y-auto p-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800">
        {search.trim() ? (
          /* flat search results */
          filteredPaths.length > 0 ? (
            <div className="space-y-px">
              {filteredPaths.map((p: string, i: number) => {
                const name = p.split("/").pop() ?? p;
                const { Icon, color } = getFileIcon(name);
                const ext = name.split(".").pop()?.toLowerCase() ?? "";
                const dotColor = EXT_DOT[ext];
                // highlight matched segment
                const q = search.toLowerCase();
                const idx = p.toLowerCase().indexOf(q);
                const before = p.slice(0, idx);
                const match  = p.slice(idx, idx + search.length);
                const after  = p.slice(idx + search.length);
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-colors"
                  >
                    <Icon size={13} className={`flex-shrink-0 ${color}`} />
                    <span className="text-xs font-mono truncate">
                      {before}
                      <span className="text-blue-400 bg-blue-500/10 rounded px-0.5">{match}</span>
                      {after}
                    </span>
                    {dotColor && (
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ml-auto ${dotColor} opacity-60`} />
                    )}
                  </div>
                );
              })}
              {tree.length > 80 && (
                <p className="text-center text-[11px] text-slate-600 pt-2 pb-1">
                  Showing top 80 results
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <File size={24} className="text-slate-700 mb-2" />
              <p className="text-sm text-slate-500">No files match "{search}"</p>
            </div>
          )
        ) : (
          /* tree view */
          <div className="space-y-px font-mono">
            {sortedRoots.map((node) => (
              <TreeNodeRow
                key={node.path}
                node={node}
                depth={0}
                defaultOpen={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="px-4 py-2.5 border-t border-slate-800/70 bg-slate-900/60 flex items-center justify-between">
        <span className="text-[11px] text-slate-600">
          {tree.length > 150 ? `Showing first 150 of ${tree.length} entries` : `${tree.length} entries total`}
        </span>
        <div className="flex items-center gap-3">
          {Object.keys(EXT_DOT).slice(0, 5).map((ext) => (
            <span key={ext} className="flex items-center gap-1 text-[10px] text-slate-600">
              <span className={`w-1.5 h-1.5 rounded-full ${EXT_DOT[ext]}`} />
              .{ext}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}