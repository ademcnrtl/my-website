"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function LogaryTrigger() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="group flex items-center gap-2.5 mt-4 md:mt-5 px-3.5 py-2 md:py-1.5 rounded-full border border-[#e5e5ea] bg-[#f5f5f7]/50 hover:bg-[#f5f5f7] transition-all duration-300 shadow-sm hover:shadow"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34c759] opacity-60"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34c759]"></span>
        </span>
        <span className="text-[13px] md:text-[12px] font-medium text-[#6e6e73] group-hover:text-[#1d1d1f] transition-colors">
          Building Logary
        </span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-[#ffffff] rounded-[24px] md:rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-black/[0.04] w-full max-w-[440px] p-7 md:p-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#f2f2f7] text-[#8e8e93] hover:text-[#1d1d1f] hover:bg-[#e5e5ea] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <h2 className="text-[22px] md:text-[24px] font-semibold text-[#1d1d1f] tracking-tight mb-3 md:mb-4">
              Building Logary
            </h2>

            <p className="text-[15px] text-[#6e6e73] leading-relaxed mb-6 font-light">
              I am currently focused on building <span className="font-medium text-[#1d1d1f] underline"><Link href="https://logary.app" target="_blank" rel="noopener noreferrer">Logary</Link></span>, a meticulously designed mobile application that serves as your definitive digital gaming journal.
            </p>

            <div className="mb-6">
              <h3 className="text-[15px] font-medium text-[#1d1d1f] mb-3">
                Features:
              </h3>
              <ul className="space-y-2.5 ml-1">
                {["Seamless backlog & progress tracking", "In-depth ratings and review system", "Connecting a curated community of players"].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] md:text-[15px] text-[#6e6e73] font-light">
                    <span className="text-[#1d1d1f] mt-1.5 opacity-60">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[14px] md:text-[15px] text-[#6e6e73] leading-relaxed mb-6 md:mb-8 font-light pb-6 md:pb-8 border-b border-[#e5e5ea]">
              We are building the technical infrastructure that powers exceptional experiences for passionate gamers.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="https://logary.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-[15px] font-medium py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2.5 shadow-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                Visit Website
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}