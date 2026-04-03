import { type Thought, type ThoughtType } from "@/lib/thoughts";
import CopyButton from "./CopyButton";

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
    <div className="flex items-center justify-between mb-4 md:mb-5 select-none">
      <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.2em] text-[#b0b0b5] uppercase">
        {TYPE_LABELS[thought.type]}
      </span>
      <span className="text-[12px] md:text-[13px] text-[#b0b0b5] font-light">
        {formatDate(thought.created_at)}
      </span>
    </div>
  );
}

function Tags({ tags }: { tags: string[] | null }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-4 md:mt-5">
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

function NoteCard({ thought }: { thought: Thought }) {
  const isTwitter = thought.url?.includes("x.com") || thought.url?.includes("twitter.com");

  return (
    <div className="mb-20 md:mb-24 group">
      <CardHeader thought={thought} />
      <div>
        {thought.title && (
          <p className="text-[18px] md:text-[20px] font-medium text-[#1d1d1f] mb-3 leading-snug tracking-tight">
            {thought.title}
          </p>
        )}
        {thought.body && (
          <p className="text-[16px] md:text-[19px] text-[#6e6e73] leading-relaxed font-light">
            {thought.body}
          </p>
        )}
        {thought.url && (
          <a
            href={thought.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-[14px] md:text-[15px] font-medium text-[#0071e3] hover:text-[#0077ed] transition-colors py-1"
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
    <div className="mb-20 md:mb-24 group">
      <CardHeader thought={thought} />
      <div>
        {thought.title && (
          <p className="text-[18px] md:text-[20px] font-medium text-[#1d1d1f] mb-3 md:mb-4 leading-snug tracking-tight">
            {thought.title}
          </p>
        )}
        {ytId && (
          <div
            className="rounded-[12px] md:rounded-[16px] overflow-hidden bg-black/5 w-full shadow-sm border border-black/5"
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
          <p className="text-[15px] md:text-[16px] text-[#6e6e73] leading-relaxed font-light mt-4">
            {thought.body}
          </p>
        )}
        <Tags tags={thought.tags} />
      </div>
    </div>
  );
}

function CodeCard({ thought }: { thought: Thought }) {
  return (
    <div className="mb-20 md:mb-24 group">
      <CardHeader thought={thought} />
      <div>
        {thought.title && (
          <p className="text-[18px] md:text-[20px] font-medium text-[#1d1d1f] mb-3 md:mb-4 leading-snug tracking-tight">
            {thought.title}
          </p>
        )}
        {thought.body && (
          <div className="relative">
            <div className="bg-[#f9f9fb] rounded-[12px] md:rounded-[16px] overflow-hidden border border-[#f0f0f0] transition-colors">
              <div className="flex items-center justify-between px-4 md:px-5 py-2.5 md:py-3 border-b border-[#f0f0f0]">
                <span className="text-[10px] md:text-[11px] text-[#b0b0b5] font-mono tracking-wider uppercase">
                  {thought.language ?? "code"}
                </span>
                <CopyButton textToCopy={thought.body} />
              </div>
              <pre className="px-4 md:px-5 py-4 md:py-5 overflow-x-auto text-[12px] md:text-[13px] leading-[1.6] md:leading-[1.7] text-[#6e6e73] font-mono">
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

export default function ThoughtCard({ thought }: { thought: Thought }) {
  switch (thought.type) {
    case "note": return <NoteCard thought={thought} />;
    case "video": return <VideoCard thought={thought} />;
    case "code": return <CodeCard thought={thought} />;
    default: return null;
  }
}