"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getThoughts, type Thought, type ThoughtType } from "@/lib/thoughts";

type Filter = "all" | ThoughtType;

const TYPE_LABELS: Record<ThoughtType, string> = {
  note: "QUOTE",
  video: "VIDEO",
  code: "CODE",
};

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  const time = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const dayMonth = date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  return `${time} • ${dayMonth}`;
}

function CardHeader({ thought }: { thought: Thought }) {
  return (
    <div className="flex items-center justify-between mb-5 select-none">
      <span className="text-[11px] font-semibold tracking-[0.2em] text-[#b0b0b5] uppercase">
        {TYPE_LABELS[thought.type]}
      </span>
      <span className="text-[13px] text-[#b0b0b5] font-light">
        {formatDate(thought.created_at)}
      </span>
    </div>
  );
}

function NoteCard({ thought }: { thought: Thought }) {
  const isTwitter = thought.url?.includes("x.com") || thought.url?.includes("twitter.com");

  return (
    <div className="mb-24 group">
      <CardHeader thought={thought} />
      <div>
        {thought.title && (
          <p className="text-[18px] md:text-[20px] font-medium text-[#1d1d1f] mb-3 leading-snug tracking-tight">
            {thought.title}
          </p>
        )}
        {thought.body && (
          <p className="text-[17px] md:text-[19px] text-[#6e6e73] leading-relaxed font-light">
            {thought.body}
          </p>
        )}
        {thought.url && (
          <a
            href={thought.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-[14px] font-medium text-[#0071e3] hover:text-[#0077ed] transition-colors"
          >
            {isTwitter ? "View on X" : "Read more"} ↗
          </a>
        )}
        <Tags tags={thought.tags} />
      </div>
    </div>
  );
}

function VideoCard({ thought }: { thought: Thought }) {
  const ytId = thought.url ? getYouTubeId(thought.url) : null;
  return (
    <div className="mb-24 group">
      <CardHeader thought={thought} />
      <div>
        {thought.title && (
          <p className="text-[18px] md:text-[20px] font-medium text-[#1d1d1f] mb-4 leading-snug tracking-tight">
            {thought.title}
          </p>
        )}
        {ytId && (
          <div
            className="rounded-[16px] overflow-hidden bg-black/5 w-full shadow-sm border border-black/5"
            style={{ aspectRatio: "16/9", maxWidth: "680px" }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${ytId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}
        {thought.body && (
          <p className="text-[16px] text-[#6e6e73] leading-relaxed font-light mt-4">
            {thought.body}
          </p>
        )}
        <Tags tags={thought.tags} />
      </div>
    </div>
  );
}


function CodeCard({ thought }: { thought: Thought }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    if (!thought.body) return;
    navigator.clipboard.writeText(thought.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mb-24 group">
      <CardHeader thought={thought} />
      <div>
        {thought.title && (
          <p className="text-[18px] md:text-[20px] font-medium text-[#1d1d1f] mb-4 leading-snug tracking-tight">
            {thought.title}
          </p>
        )}
        {thought.body && (
          <div className="relative">
            {/* Görseldeki gibi açık tonlu, hafif ve temiz kod bloğu */}
            <div className="bg-[#f9f9fb] rounded-[16px] overflow-hidden border border-[#f0f0f0] transition-colors">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#f0f0f0]">
                <span className="text-[11px] text-[#b0b0b5] font-mono tracking-wider uppercase">
                  {thought.language ?? "code"}
                </span>
                <button
                  onClick={copy}
                  className="text-[11px] text-[#b0b0b5] hover:text-[#1d1d1f] transition-colors font-mono"
                >
                  {copied ? "copied ✓" : "copy"}
                </button>
              </div>
              <pre className="px-5 py-5 overflow-x-auto text-[13px] leading-[1.7] text-[#6e6e73] font-mono">
                <code>{thought.body}</code>
              </pre>
            </div>
          </div>
        )}
        <Tags tags={thought.tags} />
      </div>
    </div>
  );
}

function Tags({ tags }: { tags: string[] | null }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-[12px] text-[#8e8e93] font-light tracking-wide before:content-['#']"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function ThoughtCard({ thought }: { thought: Thought }) {
  switch (thought.type) {
    case "note": return <NoteCard thought={thought} />;
    case "video": return <VideoCard thought={thought} />;
    case "code": return <CodeCard thought={thought} />;
    default: return null;
  }
}

export default function Thoughts() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getThoughts()
      .then(setThoughts)
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "all" ? thoughts : thoughts.filter((t) => t.type === filter);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "code", label: "Code" },
    { id: "note", label: "Quote" },
    { id: "video", label: "Video" },
  ];

  return (
    <main
      className="min-h-screen bg-white pb-32 relative selection:bg-[#0071e3] selection:text-white"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <header className="absolute top-0 w-full z-40">
        <div className="max-w-2xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-[13px] font-medium tracking-wide text-[#8e8e93] hover:text-[#1d1d1f] transition-colors"
          >
            ← ACC
          </Link>
          <span className="text-[13px] text-[#b0b0b5] font-light">
            {loading ? "..." : `${thoughts.length} entries`}
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-[40px] md:text-[56px] font-semibold text-[#1d1d1f] tracking-tight leading-tight mb-3">
          Thoughts.
        </h1>
        <p className="text-[19px] text-[#6e6e73] font-light">
          Developer logs, quotes, and signals from the noise.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6">
        {loading && (
          <div className="py-20 text-[15px] font-light text-[#b0b0b5] text-center">
            Loading signals...
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="py-20 text-[15px] font-light text-[#b0b0b5] text-center">
            Nothing found under this filter.
          </div>
        )}
        {!loading &&
          filtered.map((thought) => (
            <ThoughtCard key={thought.id} thought={thought} />
          ))}
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center p-1.5 bg-white/80 backdrop-blur-xl border border-black/[0.08] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="px-5 py-2 rounded-full text-[13px] transition-all duration-300 select-none"
              style={{
                backgroundColor: filter === f.id ? "#1d1d1f" : "transparent",
                color: filter === f.id ? "#ffffff" : "#6e6e73",
                fontWeight: filter === f.id ? 500 : 400,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}