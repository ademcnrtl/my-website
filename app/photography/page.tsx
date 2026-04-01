"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Category = "All" | "Space" | "Nature";

interface Photo {
  id: number;
  src: string;
  category: "Space" | "Nature";
  title: string;
  location: string;
  year: string;
}

export default function Photography() {
  const [active, setActive] = useState<Category>("All");
  const [selected, setSelected] = useState<Photo | null>(null);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .order("id", { ascending: false });

      if (data) {
        setPhotos(data as Photo[]);
      }
      setLoading(false);
    }
    fetchPhotos();
  }, []);

  const filtered = photos.filter((p) => active === "All" || p.category === active);

  const counts = {
    All: photos.length,
    Space: photos.filter((p) => p.category === "Space").length,
    Nature: photos.filter((p) => p.category === "Nature").length,
  };

  return (
    <main
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#d2d2d7]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-[13px] text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
          >
            ← ACC
          </Link>
          <div className="flex gap-1 bg-[#f5f5f7] rounded-full p-1">
            {(["All", "Space", "Nature"] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-4 py-1 rounded-full text-[13px] transition-all duration-200"
                style={{
                  background: active === cat ? "white" : "transparent",
                  color: active === cat ? "#1d1d1f" : "#6e6e73",
                  boxShadow: active === cat ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
                  fontWeight: active === cat ? 500 : 400,
                }}
              >
                {cat}
                <span className="ml-1.5 text-[11px] opacity-50">
                  {loading ? "-" : counts[cat]}
                </span>
              </button>
            ))}
          </div>
          <span className="text-[13px] text-[#b0b0b5]">
            {loading ? "Yükleniyor..." : `${filtered.length} frames`}
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <h1 className="text-[40px] md:text-[56px] font-semibold text-[#1d1d1f] tracking-tight leading-tight mb-2">
          Photography.
        </h1>
        <p className="text-[19px] text-[#6e6e73] font-light">
          Between the cosmos and the earth.
        </p>
      </div>

      <div
        className="max-w-6xl mx-auto px-6 pb-28"
        style={{
          columns: "clamp(240px, 28vw, 360px)",
          columnGap: "10px",
        }}
      >
        {filtered.map((photo, i) => (
          <div
            key={`${photo.id}-${i}`}
            className="group relative mb-[10px] overflow-hidden rounded-lg bg-[#f5f5f7] cursor-pointer"
            style={{ breakInside: "avoid" }}
            onClick={() => setSelected(photo)}
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full block transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              draggable={false}
            />
            <div
              className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 65%)",
              }}
            >
              <p className="text-white text-[14px] font-medium leading-tight">
                {photo.title}
              </p>
              <p className="text-white/55 text-[11px] mt-0.5">
                {photo.location} · {photo.year}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-16"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-5xl w-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.src}
              alt={selected.title}
              className="w-full max-h-[80vh] object-contain rounded-lg"
              draggable={false}
            />
            <div className="flex items-center justify-between mt-4 px-1">
              <div>
                <p className="text-white text-[16px] font-medium">
                  {selected.title}
                </p>
                <p className="text-white/45 text-[12px] mt-0.5">
                  {selected.category} · {selected.location} · {selected.year}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-white/35 hover:text-white text-[20px] leading-none transition-colors ml-8"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}