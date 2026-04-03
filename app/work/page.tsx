"use client";

import { useState } from "react";
import Link from "next/link";

type Filter = "All" | "Software" | "Design";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  type: "Software" | "Design";
  year: string;
  tags: string[];
  description: string;
  role: string;
  status: "Live" | "Concept" | "Agency" | "Active" | "Now";
}

const projects: Project[] = [
  {
    id: 6,
    title: "Logary",
    subtitle: "Game logging and social companion app.",
    type: "Software",
    year: "2026",
    tags: ["Mobile", "Social", "Gaming"],
    description: "A mobile application designed to log your gaming sessions, track your backlog, and connect with other players. Currently in active development.",
    role: "Founder",
    status: "Now",
  },
  {
    id: 2,
    title: "Morf",
    subtitle: "Freelancer Studio.",
    type: "Software",
    year: "2026",
    tags: ["Mobile", "Social", "Gaming"],
    description: "",
    role: "Founder",
    status: "Now",
  },
  {
    id: 3,
    title: "Voidframe",
    subtitle: "Visual identity for a generative art studio.",
    type: "Design",
    year: "2024",
    tags: ["Identity", "Typography", "Motion"],
    description: "A complete brand system around structured randomness. Wordmark, color system, motion language for a studio working at the edge of code and art.",
    role: "Designer",
    status: "Live",
  },
  {
    id: 4,
    title: "Terrain",
    subtitle: "Procedural landscape visualization in the browser.",
    type: "Software",
    year: "2023",
    tags: ["Three.js", "WebGL", "React"],
    description: "Generate realistic terrain from real elevation data. Built for pre-visualizing photography locations before a 6-hour drive.",
    role: "Developer",
    status: "Live",
  },
];

const statusColor: Record<string, string> = {
  Live: "#34c759",
  Concept: "#ff9f0a",
  Agency: "#8e8e93",
  Now: "#0071e3",
  Active: "#5ac8fa",
};

export default function Work() {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);

  const filtered = projects.filter((p) => filter === "All" || p.type === filter);

  return (
    <main
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#d2d2d7]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-[13px] text-[#1d1d1f] hover:text-[#0071e3] transition-colors">
            ← ACC
          </Link>
          <div className="flex gap-1 bg-[#f5f5f7] rounded-full p-1">
            {(["All", "Software", "Design"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-1 rounded-full text-[13px] transition-all duration-200"
                style={{
                  background: filter === f ? "white" : "transparent",
                  color: filter === f ? "#1d1d1f" : "#6e6e73",
                  boxShadow: filter === f ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
                  fontWeight: filter === f ? 500 : 400,
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <span className="text-[13px] text-[#b0b0b5]">{filtered.length}</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-16 pb-6">
        <h1 className="text-[40px] md:text-[56px] font-semibold text-[#1d1d1f] tracking-tight leading-tight mb-3">
          Work.
        </h1>
        <p className="text-[19px] text-[#6e6e73] font-light mb-16">
          Designing and building things that work.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-32">
        <div className="divide-y divide-[#e5e5ea]">
          {filtered.map((project) => (
            <div key={project.id}>
              <button
                className="w-full text-left py-6 group"
                onClick={() => setOpen(open === project.id ? null : project.id)}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="text-[22px] font-semibold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                        {project.title}
                      </span>
                      <span
                        className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                        style={{
                          color: statusColor[project.status],
                          background: statusColor[project.status] + "18",
                        }}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-[15px] text-[#6e6e73]">{project.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-6 shrink-0 pt-1">
                    <span className="text-[13px] text-[#b0b0b5] hidden md:block">{project.year}</span>
                    <span
                      className="text-[20px] text-[#b0b0b5] group-hover:text-[#0071e3] transition-all duration-200"
                      style={{ transform: open === project.id ? "rotate(45deg)" : "none" }}
                    >
                      +
                    </span>
                  </div>
                </div>
              </button>

              <div
                className="overflow-hidden transition-all duration-350"
                style={{
                  maxHeight: open === project.id ? "320px" : "0px",
                  opacity: open === project.id ? 1 : 0,
                }}
              >
                <div className="pb-8 grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <p className="text-[17px] text-[#1d1d1f] leading-relaxed font-light">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[12px] bg-[#f5f5f7] text-[#6e6e73] px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4 pt-1">
                    <div>
                      <p className="text-[11px] text-[#b0b0b5] uppercase tracking-wider mb-1">Role</p>
                      <p className="text-[14px] text-[#1d1d1f]">{project.role}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#b0b0b5] uppercase tracking-wider mb-1">Type</p>
                      <p className="text-[14px] text-[#1d1d1f]">{project.type}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#b0b0b5] uppercase tracking-wider mb-1">Year</p>
                      <p className="text-[14px] text-[#1d1d1f]">{project.year}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}