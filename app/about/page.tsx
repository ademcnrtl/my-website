"use client";

import Link from "next/link";

const beliefs = [
  "Details aren't details. They make the design.",
  "Simplicity is the hardest thing to achieve.",
  "The best tools disappear. You only notice the work.",
  "Most things can be cut. What remains matters more.",
];

const stack: [string, string[]][] = [
  ["Languages", ["TypeScript", "Swift",]],
  ["Frontend", ["Next.js", "React", "Tailwind CSS", "Framer Motion"]],
  ["Backend", ["Node.js", "FastAPI", "PostgreSQL", "Supabase"]],
  ["Creative", ["Figma", "After Effects", "Lightroom"]],
];

const offScreen = [
  ["Training", "Strength & conditioning (6 days a week)"],
  ["Photography", "Chasing dark skies and landscapes"],
  ["Gaming", "Immersed in story-driven experiences"],
  ["Focus", "Building systems, shaping pixels"],
];

export default function About() {
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
          <a
            href="mailto:ademcan.cert@gmail.com"
            className="text-[13px] text-[#0071e3] hover:underline"
          >
            Get in touch
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6">
        <div className="pt-16 pb-24 border-b border-[#e5e5ea]">
          <h1 className="text-[40px] md:text-[64px] font-semibold text-[#1d1d1f] tracking-tight leading-tight mb-8 max-w-2xl">
            I make things with care.
          </h1>
          <p className="text-[19px] md:text-[21px] text-[#6e6e73] font-light max-w-xl leading-relaxed">
            Developer, designer, and photographer based in Turkey. I write code, design things, shoot the night sky, and lose myself in story-driven games.
          </p>
        </div>

        <div className="py-20 border-b border-[#e5e5ea]">
          <h2 className="text-[13px] uppercase tracking-wider text-[#b0b0b5] mb-10">
            What I believe
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {beliefs.map((b, i) => (
              <div
                key={i}
                className="bg-[#f5f5f7] rounded-2xl px-7 py-6"
              >
                <p className="text-[19px] text-[#1d1d1f] font-light leading-snug">
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-20 border-b border-[#e5e5ea]">
          <h2 className="text-[13px] uppercase tracking-wider text-[#b0b0b5] mb-10">
            Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stack.map(([category, items]) => (
              <div key={category}>
                <p className="text-[13px] font-medium text-[#1d1d1f] mb-3">{category}</p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="text-[14px] text-[#6e6e73]">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-20 border-b border-[#e5e5ea]">
          <h2 className="text-[13px] uppercase tracking-wider text-[#b0b0b5] mb-10">
            Beyond the screen
          </h2>
          <div className="divide-y divide-[#e5e5ea] max-w-lg">
            {offScreen.map(([type, item]) => (
              <div key={item} className="flex items-center justify-between py-4">
                <p className="text-[15px] text-[#1d1d1f]">{item}</p>
                <p className="text-[12px] text-[#b0b0b5] capitalize ml-6">{type}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-24 text-center max-w-xl mx-auto">
          <h2 className="text-[32px] md:text-[48px] font-semibold text-[#1d1d1f] tracking-tight mb-4">
            Let's make something.
          </h2>
          <p className="text-[17px] text-[#6e6e73] font-light mb-10">
            Open to software projects, design work, and creative collaborations.
          </p>
          <a
            href="mailto:ademcan.cert@gmail.com"
            className="inline-block bg-[#0071e3] hover:bg-[#0077ed] text-white text-[15px] font-medium px-7 py-3 rounded-full transition-colors"
          >
            ademcan.cert@gmail.com
          </a>
          <div className="flex justify-center gap-8 mt-10">
            {[
              { name: "GitHub", url: "https://github.com/ademcnrtl" },
              { name: "Twitter(X)", url: "https://x.com/ademcertel" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[13px] text-[#6e6e73] hover:text-[#0071e3] transition-colors"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}