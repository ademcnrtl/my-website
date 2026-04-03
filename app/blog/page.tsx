import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Blog({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const postsPerPage = 5;

  const { count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact", head: true })
    .eq("published", true);

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, created_at, read_time")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);

  const totalPages = Math.ceil((count || 0) / postsPerPage);

  return (
    <main className="min-h-screen bg-white selection:bg-[#0071e3] selection:text-white">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[#f5f5f7]">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-[13px] font-medium text-[#86868b] hover:text-[#1d1d1f] transition-colors">
            ← ACC
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-[11px] tracking-widest text-[#b0b0b5] uppercase">
              Archive {count || 0}
            </span>
          </div>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-6 pt-20 pb-16">
        <h1 className="text-[48px] md:text-[64px] font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.1] mb-4">
          Articles.
        </h1>
        <p className="text-[19px] md:text-[21px] text-[#86868b] font-light leading-relaxed max-w-lg">
          Notes from the intersection of design, code, and the night light.
        </p>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-20">
        <div className="flex flex-col border-t border-[#f5f5f7]">
          {/* YAZI VARSA LİSTELE */}
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.slug} className="group border-b border-[#f5f5f7] py-10 md:py-12">
                <div className="flex flex-col">
                  <Link href={`/blog/${post.slug}`} className="inline-block w-fit">
                    <h2 className="text-[22px] md:text-[26px] font-semibold text-[#1d1d1f] mb-3 hover:text-[#0071e3] transition-colors tracking-tight leading-tight cursor-pointer">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-[16px] md:text-[17px] text-[#6e6e73] leading-relaxed font-light mb-5 select-none">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-[12px] text-[#b0b0b5] font-medium tracking-wide select-none">
                    <time>
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-[#d2d2d7]"></span>
                    <span>{post.read_time} min read</span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="py-24 text-center">
              <p className="text-[17px] text-[#1d1d1f] font-medium mb-1">
                The archive is currently silent.
              </p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <nav className="flex items-center justify-center gap-8 pt-16">
            {currentPage > 1 ? (
              <Link
                href={`/blog?page=${currentPage - 1}`}
                className="text-[14px] text-[#0071e3] hover:underline underline-offset-4"
              >
                Previous
              </Link>
            ) : (
              <span className="text-[14px] text-[#d2d2d7] cursor-not-allowed">Previous</span>
            )}

            <span className="text-[13px] text-[#86868b] font-medium">
              Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                className="text-[14px] text-[#0071e3] hover:underline underline-offset-4"
              >
                Next
              </Link>
            ) : (
              <span className="text-[14px] text-[#d2d2d7] cursor-not-allowed">Next</span>
            )}
          </nav>
        )}
      </section>
    </main>
  );
}