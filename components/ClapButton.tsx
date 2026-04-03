"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ClapButton({ postId, initialLikes }: { postId: string, initialLikes: number }) {
    const [likes, setLikes] = useState(initialLikes);
    const [userClaps, setUserClaps] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const CLAP_LIMIT = 5;

    const handleClap = async () => {
        if (userClaps >= CLAP_LIMIT || isAnimating) return;

        setIsAnimating(true);
        const newLocalClaps = userClaps + 1;
        setUserClaps(newLocalClaps);

        setLikes(prev => prev + 1);

        const { error } = await supabase
            .from("blog_posts")
            .update({ likes: likes + 1 })
            .eq("id", postId);

        if (error) {
            setLikes(prev => prev - 1);
            setUserClaps(prev => prev - 1);
        }

        setTimeout(() => setIsAnimating(false), 400);
    };

    return (
        <div className="flex flex-col items-center justify-center mt-20 mb-10 select-none">
            <button
                onClick={handleClap}
                disabled={userClaps >= CLAP_LIMIT}
                className={`
          group flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all duration-300 shadow-sm
          ${userClaps >= CLAP_LIMIT
                        ? "bg-[#f5f5f7] border-[#d2d2d7] cursor-not-allowed opacity-80"
                        : "bg-white border-[#e5e5ea] hover:bg-[#f5f5f7] hover:shadow active:scale-95"}
          ${isAnimating ? "scale-110 border-[#0071e3]" : ""}
        `}
            >
                <div className={`relative w-6 h-6 flex items-center justify-center transition-all duration-300 
          ${isAnimating ? "rotate-12 scale-110" : "rotate-0"}`}>

                    <div className={`
            absolute w-3 h-5 rounded-full border-[1.5px] rotate-[-25deg] translate-x-[-2px]
            transition-all duration-300 
            ${userClaps >= CLAP_LIMIT ? "border-[#1d1d1f] bg-[#1d1d1f]" :
                            isAnimating ? "border-[#0071e3] bg-[#0071e3]/20" : "border-[#8e8e93] group-hover:border-[#1d1d1f]"}
          `} />

                    <div className={`
            absolute w-3 h-5 rounded-full border-[1.5px] rotate-[25deg] translate-x-[2px]
            transition-all duration-300 
            ${userClaps >= CLAP_LIMIT ? "border-[#1d1d1f] bg-[#1d1d1f]" :
                            isAnimating ? "border-[#0071e3] bg-[#0071e3]/20" : "border-[#8e8e93] group-hover:border-[#1d1d1f]"}
          `} />
                </div>

                <span className={`text-[16px] font-medium transition-colors 
          ${userClaps >= CLAP_LIMIT ? "text-[#1d1d1f]" : isAnimating ? "text-[#0071e3]" : "text-[#1d1d1f]"}`}>
                    {likes}
                </span>
            </button>

            {userClaps > 0 && (
                <p className="text-[11px] text-[#8e8e93] mt-3 tracking-tight font-light animate-fade-in">
                    {userClaps < CLAP_LIMIT ? `${userClaps} / ${CLAP_LIMIT} alkış` : "Maksimum desteğe ulaşıldı. Teşekkürler."}
                </p>
            )}
        </div>
    );
}