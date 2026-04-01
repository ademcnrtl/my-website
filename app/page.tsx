"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const QUOTES = [
  `"The only way to do great work is to love what you do." — Steve Jobs`,
  `"The future is in the skies." — Mustafa Kemal Atatürk`,
  `"I am not interested in past successes. I focus on the future." — Kenzo Tsujimoto (Capcom)`
];

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fadeQuote, setFadeQuote] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeQuote(false);

      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
        setFadeQuote(true);
      }, 500);

    }, 4500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  return (
    <main
      className="min-h-screen bg-white flex flex-col relative selection:bg-[#0071e3] selection:text-white"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(10px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div className="mb-16 flex flex-col items-center">
          <p className="text-[13px] tracking-[0.18em] text-[#999] uppercase select-none">
            Adem Can Certel
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-2.5 mt-5 px-3.5 py-1.5 rounded-full border border-[#e5e5ea] bg-[#f5f5f7]/50 hover:bg-[#f5f5f7] transition-all duration-300 shadow-sm hover:shadow"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34c759] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34c759]"></span>
            </span>
            <span className="text-[12px] font-medium text-[#6e6e73] group-hover:text-[#1d1d1f] transition-colors">
              Building Logary
            </span>
          </button>
        </div>

        <h1
          className="font-semibold text-[#1d1d1f] leading-[1.07] tracking-tight max-w-3xl mb-8"
          style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)" }}
        >
          Making the complex <br className="hidden md:block" />
          feel{" "}
          <span className="italic font-light text-[#6e6e73]">simple.</span>
        </h1>

        <p className="text-[#6e6e73] font-light leading-relaxed mb-20 max-w-lg"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)" }}>
          Developer. Designer. Photographer.<br className="hidden md:block" />
          Storyteller through games and light.
        </p>

        <nav className="flex flex-wrap gap-x-10 gap-y-4 justify-center">
          {[
            { href: "/work", label: "Work" },
            { href: "/photography", label: "Photography" },
            { href: "/about", label: "About" },
            { href: "/thoughts", label: "Thoughts" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[17px] text-[#0071e3] hover:underline underline-offset-2"
              style={{ textDecorationThickness: "1px" }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <footer className="pb-10 text-center h-12 flex items-center justify-center">
        <p
          className="text-[12px] text-[#b0b0b5] italic transition-opacity duration-500 ease-in-out px-6"
          style={{ opacity: fadeQuote ? 1 : 0 }}
        >
          {QUOTES[quoteIndex]}
        </p>
      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-[#ffffff] rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-black/[0.04] w-full max-w-[440px] p-8 md:p-10 overflow-hidden animate-in fade-in zoom-in-95 duration-300 text-left">

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#f2f2f7] text-[#8e8e93] hover:text-[#1d1d1f] hover:bg-[#e5e5ea] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <h2 className="text-[24px] font-semibold text-[#1d1d1f] tracking-tight mb-4">
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
                <li className="flex items-start gap-2.5 text-[15px] text-[#6e6e73] font-light">
                  <span className="text-[#1d1d1f] mt-1.5 opacity-60">•</span>
                  Seamless backlog & progress tracking
                </li>
                <li className="flex items-start gap-2.5 text-[15px] text-[#6e6e73] font-light">
                  <span className="text-[#1d1d1f] mt-1.5 opacity-60">•</span>
                  In-depth ratings and review system
                </li>
                <li className="flex items-start gap-2.5 text-[15px] text-[#6e6e73] font-light">
                  <span className="text-[#1d1d1f] mt-1.5 opacity-60">•</span>
                  Connecting a curated community of players
                </li>
              </ul>
            </div>

            <p className="text-[15px] text-[#6e6e73] leading-relaxed mb-8 font-light pb-8 border-b border-[#e5e5ea]">
              We are building the technical infrastructure that powers exceptional experiences for passionate gamers.
            </p>

            <div className="mb-5">
              <p className="text-[15px] font-medium text-[#1d1d1f] leading-snug">
                Want to level up your gaming journal? Let's explore Logary.
              </p>
            </div>

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

              <a
                href="mailto:hello@ademcan.cert@gmail.com"
                className="w-full bg-[#f2f2f7] hover:bg-[#e5e5ea] text-[#1d1d1f] text-[15px] font-medium py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2.5"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                Contact Developer
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}