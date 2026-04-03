import Link from "next/link";
import LogaryTrigger from "@/components/LogaryTrigger";

const QUOTES = [
  `"The only way to do great work is to love what you do." — Steve Jobs`,
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col relative selection:bg-[#0071e3] selection:text-white">
      <div className="flex-1 flex flex-col items-center justify-center px-5 md:px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out fill-mode-both delay-150">
        <div className="mb-12 md:mb-16 flex flex-col items-center">
          <p className="text-[12px] md:text-[13px] tracking-[0.2em] text-[#999] uppercase select-none">
            Adem Can Certel
          </p>
          <LogaryTrigger />
        </div>

        <h1 className="font-semibold text-[#1d1d1f] leading-[1.05] tracking-tight max-w-[90vw] md:max-w-3xl mb-6 md:mb-8 text-[clamp(2.5rem,8vw,5.5rem)]">
          Making the complex <br className="hidden sm:block" />
          feel{" "}
          <span className="italic font-light text-[#6e6e73]">simple.</span>
        </h1>

        <p className="text-[#6e6e73] font-light leading-relaxed mb-16 md:mb-20 max-w-[85vw] md:max-w-lg text-[clamp(1.05rem,3vw,1.3rem)]">
          Developer. Designer. Photographer.<br className="hidden sm:block" />
          Storyteller through games and light.
        </p>

        <nav className="flex flex-wrap gap-x-6 gap-y-5 md:gap-x-10 justify-center">
          {[
            { href: "/work", label: "Work" },
            { href: "/photography", label: "Photography" },
            { href: "/about", label: "About" },
            { href: "/thoughts", label: "Thoughts" },
            { href: "/blog", label: "Blog" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[16px] md:text-[17px] text-[#0071e3] hover:underline underline-offset-4 py-2 md:py-0 transition-all"
              style={{ textDecorationThickness: "1px" }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <footer className="pb-8 md:pb-10 text-center h-auto md:h-12 flex items-center justify-center animate-in fade-in duration-1000 delay-500 fill-mode-both">
        <p className="text-[11px] md:text-[12px] text-[#b0b0b5] italic px-6 max-w-sm md:max-w-none leading-relaxed">
          {QUOTES[0]}
        </p>
      </footer>
    </main>
  );
}