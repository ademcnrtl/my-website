import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white selection:bg-[#0071e3] selection:text-white" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <header className="absolute top-0 w-full z-40 bg-white/90 backdrop-blur-md md:bg-transparent md:backdrop-blur-none border-b border-[#f5f5f7] md:border-none">
        <div className="max-w-2xl mx-auto px-6 h-14 md:h-20 flex items-center">
          <Link href="/blog" className="text-[13px] font-medium tracking-wide text-[#8e8e93] hover:text-[#1d1d1f] transition-colors py-2 -ml-2">
            ← Yazılara Dön
          </Link>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-6 pt-28 md:pt-40 pb-32">
        <header className="mb-12 md:mb-16 border-b border-[#e5e5ea]/50 pb-10">
          <h1 className="text-[32px] md:text-[44px] font-semibold tracking-tight text-[#1d1d1f] leading-[1.15] mb-5 md:mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-[12px] md:text-[13px] text-[#8e8e93] font-light uppercase tracking-wider">
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
            </time>
            <span>·</span>
            <span>{post.read_time} min read</span>
          </div>
        </header>
        <div 
          className="prose prose-lg md:prose-xl max-w-none prose-p:text-[#333336] prose-p:leading-[1.8] prose-p:font-light prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-[#1d1d1f] prose-a:text-[#0071e3] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </main>
  );
}