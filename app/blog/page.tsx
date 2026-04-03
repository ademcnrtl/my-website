import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export default async function Blog() {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, created_at, read_time")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#d2d2d7]/50">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-[13px] text-[#1d1d1f] hover:text-[#0071e3] transition-colors">
            ← ACC
          </Link>
          <span className="text-[13px] text-[#b0b0b5] font-light">
            {posts?.length || 0} Yazı
          </span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 pt-24 pb-12 border-b border-[#e5e5ea]/50">
        <h1 className="text-[40px] md:text-[56px] font-semibold tracking-tight leading-tight mb-3">
          Kelimeler.
        </h1>
        <p className="text-[19px] text-[#6e6e73] font-light">
          Düşüncelerin, deneyimlerin ve mühendisliğin kağıda dökülmüş hali.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-12">
          {posts?.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex items-center gap-3 mb-3">
                  <time className="text-[12px] uppercase tracking-wider text-[#b0b0b5] font-medium">
                    {new Date(post.created_at).toLocaleDateString("tr-TR", { month: "long", year: "numeric" })}
                  </time>
                  <span className="w-1 h-1 rounded-full bg-[#d2d2d7]"></span>
                  <span className="text-[12px] uppercase tracking-wider text-[#b0b0b5] font-medium">
                    {post.read_time} dk okuma
                  </span>
                </div>
                <h2 className="text-[24px] md:text-[28px] font-semibold text-[#1d1d1f] mb-3 group-hover:text-[#0071e3] transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-[17px] text-[#6e6e73] leading-relaxed font-serif font-light">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}