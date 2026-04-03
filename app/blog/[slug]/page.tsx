import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ClapButton from "@/components/ClapButton";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const now = new Date().toISOString();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .eq("published", true)
    .lte("published_at", now)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white selection:bg-[#0071e3] selection:text-white" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <header className="absolute top-0 w-full z-40 bg-white/90 backdrop-blur-md md:bg-transparent md:backdrop-blur-none border-b border-[#f5f5f7] md:border-none">
        <div className="max-w-2xl mx-auto px-6 h-14 md:h-20 flex items-center">
          <Link href="/blog" className="text-[13px] font-medium tracking-wide text-[#8e8e93] hover:text-[#1d1d1f] transition-colors py-2 -ml-2">
            ← Back to Articles
          </Link>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-6 pt-28 md:pt-40 pb-32">
        <header className="mb-12 md:mb-16 border-b border-[#e5e5ea]/50 pb-10">
          <h1 className="text-[32px] md:text-[44px] font-semibold tracking-tight text-[#1d1d1f] leading-[1.15] mb-5 md:mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-[12px] md:text-[13px] text-[#8e8e93] font-light uppercase tracking-wider">
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
            </time>
            <span>·</span>
            <span>{post.read_time} min read</span>
          </div>
        </header>

        <div className="prose prose-lg md:prose-xl max-w-none text-[#333336]
          prose-p:text-[#333336] prose-p:leading-[1.8] prose-p:font-light 
          prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-[#1d1d1f] 
          prose-strong:text-[#1d1d1f] prose-strong:font-medium
          prose-a:text-[#0071e3] prose-a:no-underline hover:prose-a:underline 
          prose-img:rounded-2xl prose-img:shadow-sm">

          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="rounded-xl overflow-hidden my-6 shadow-md border border-black/10">
                    <div className="bg-[#1e1e1e] px-4 py-2 text-[11px] text-[#858585] font-mono uppercase tracking-wider border-b border-white/5 select-none">
                      {match[1]}
                    </div>
                    <SyntaxHighlighter
                      {...props}
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ margin: 0, padding: '1.5rem', background: '#1e1e1e', fontSize: '14px' }}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className="bg-[#f5f5f7] text-[#1d1d1f] px-1.5 py-0.5 rounded-md font-mono text-[0.9em]" {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="mt-20 border-t border-[#f5f5f7] pt-10">
          <ClapButton postId={post.id} initialLikes={post.likes || 0} />
        </div>
      </article>
    </main>
  );
}