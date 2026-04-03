"use client";

import { useState } from "react";

export default function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      className="text-[11px] text-[#b0b0b5] hover:text-[#1d1d1f] transition-colors font-mono py-1 px-2 -mr-2"
    >
      {copied ? "copied ✓" : "copy"}
    </button>
  );
}