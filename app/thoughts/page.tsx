import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ThoughtCard from "@/components/ThoughtCard";

export const revalidate = 60;

export default async function Thoughts({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentFilter = resolvedParams.filter || "all";

  let query = supabase.from("thoughts").select("*").eq("published", true).order("created_at", { ascending: false });

  if (currentFilter !== "all") {
    query = query.eq("type", currentFilter);
  }

  const { data: thoughts } = await query;

  const filters = [
    { id: "all", label: "All" },
    { id: "code", label: "Code" },
    { id: "note", label: "Quote" },
    { id: "video", label: "Video" },
  ];

  return (
    <main className="min-h-screen bg-white pb-32 relative selection:bg-[#0071e3] selection:text-white">
      <header className="absolute top-0 w-full z-40 bg-white/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none border-b border-[#f5f5f7] md:border-none">
        <div className="max-w-2xl mx-auto px-5 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="text-[13px] font-medium tracking-wide text-[#8e8e93] hover:text-[#1d1d1f] transition-colors p-2 -ml-2">
            ← ACC
          </Link>
          <span className="text-[12px] md:text-[13px] text-[#b0b0b5] font-light">
            {thoughts?.length || 0} entries
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-5 md:px-6 pt-28 md:pt-32 pb-16 md:pb-20">
        <h1 className="text-[36px] md:text-[56px] font-semibold text-[#1d1d1f] tracking-tight leading-tight mb-3">
          Thoughts.
        </h1>
        <p className="text-[17px] md:text-[19px] text-[#6e6e73] font-light leading-relaxed">
          Developer logs, quotes, and signals from the noise.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-5 md:px-6">
        {!thoughts?.length && (
          <div className="py-20 text-[15px] font-light text-[#b0b0b5] text-center">
            Nothing found under this filter.
          </div>
        )}
        {thoughts?.map((thought) => (
          <ThoughtCard key={thought.id} thought={thought} />
        ))}
      </div>
      <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto flex justify-center">
        <div className="flex items-center p-1.5 bg-white/80 backdrop-blur-xl border border-black/[0.08] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-x-auto hide-scrollbar">
          {filters.map((f) => (
            <Link
              key={f.id}
              href={`/thoughts${f.id === "all" ? "" : `?filter=${f.id}`}`}
              className="px-4 md:px-5 py-2 md:py-2 rounded-full text-[13px] transition-all duration-300 select-none whitespace-nowrap"
              style={{
                backgroundColor: currentFilter === f.id ? "#1d1d1f" : "transparent",
                color: currentFilter === f.id ? "#ffffff" : "#6e6e73",
                fontWeight: currentFilter === f.id ? 500 : 400,
              }}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}