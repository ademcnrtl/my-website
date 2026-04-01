"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  getThoughts,
  createThought,
  deleteThought,
  togglePublished,
  type Thought,
  type ThoughtType,
} from "@/lib/thoughts";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "changeme";

const TYPE_OPTIONS: ThoughtType[] = ["note", "video", "code"];

const LANGUAGE_OPTIONS = [
  "typescript", "javascript", "python", "rust", "swift",
  "bash", "sql", "json", "css", "html",
];

const EMPTY_THOUGHT_FORM = {
  type: "note" as ThoughtType,
  title: "",
  body: "",
  url: "",
  language: "typescript",
  tags: "",
  published: true,
};

type AdminTab = "thoughts" | "photos";
type PhotoCategory = "Space" | "Nature" | "Gaming";

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  const [activeTab, setActiveTab] = useState<AdminTab>("thoughts");

  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loadingThoughts, setLoadingThoughts] = useState(false);
  const [thoughtForm, setThoughtForm] = useState(EMPTY_THOUGHT_FORM);
  const [savingThought, setSavingThought] = useState(false);
  const [thoughtSuccess, setThoughtSuccess] = useState(false);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoCategory, setPhotoCategory] = useState<PhotoCategory>("Space");
  const [photoLocation, setPhotoLocation] = useState("");
  const [photoYear, setPhotoYear] = useState("");
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [photoMessage, setPhotoMessage] = useState("");

  function login() {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      loadThoughts();
    } else {
      setPwError(true);
    }
  }

  async function loadThoughts() {
    setLoadingThoughts(true);
    try {
      const data = await getThoughts();
      setThoughts(data);
    } catch (error) {
      console.error("Datalar yüklenirken hata oluştu:", error);
    } finally {
      setLoadingThoughts(false);
    }
  }

  async function handleThoughtSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSavingThought(true);
    try {
      await createThought({
        type: thoughtForm.type,
        title: thoughtForm.title || null,
        body: thoughtForm.body || null,
        url: thoughtForm.url || null,
        language: thoughtForm.type === "code" ? thoughtForm.language : null,
        tags: thoughtForm.tags ? thoughtForm.tags.split(",").map((t) => t.trim()).filter(Boolean) : null,
        published: thoughtForm.published,
      });
      setThoughtForm(EMPTY_THOUGHT_FORM);
      setThoughtSuccess(true);
      setTimeout(() => setThoughtSuccess(false), 2000);
      loadThoughts();
    } catch (error: any) {
      alert("Gönderim başarısız oldu! Supabase hatası: " + (error?.message || JSON.stringify(error)));
    } finally {
      setSavingThought(false);
    }
  }

  async function handleThoughtRemove(id: string) {
    if (!confirm("Bu düşünceyi silmek istediğine emin misin?")) return;
    try {
      await deleteThought(id);
      loadThoughts();
    } catch (error: any) {
      alert("Silme işlemi başarısız: " + (error?.message || "Bilinmeyen hata"));
    }
  }

  async function handleThoughtToggle(id: string, current: boolean) {
    try {
      await togglePublished(id, !current);
      loadThoughts();
    } catch (error: any) {
      alert("Durum değiştirilemedi: " + (error?.message || "Bilinmeyen hata"));
    }
  }

  const handlePhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoFile) return setPhotoMessage("Lütfen bir fotoğraf seçin.");

    setSavingPhoto(true);
    setPhotoMessage("");

    try {
      const fileExt = photoFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-photos")
        .upload(fileName, photoFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("portfolio-photos")
        .getPublicUrl(fileName);

      const src = publicUrlData.publicUrl;

      const { error: dbError } = await supabase
        .from("photos")
        .insert([{ title: photoTitle, category: photoCategory, location: photoLocation, year: photoYear, src }]);

      if (dbError) throw dbError;

      setPhotoMessage("Fotoğraf başarıyla eklendi! ✓");
      setPhotoFile(null);
      setPhotoTitle("");
      setPhotoLocation("");
      setPhotoYear("");
      setTimeout(() => setPhotoMessage(""), 3000);
    } catch (error: any) {
      setPhotoMessage(`Hata: ${error.message}`);
    } finally {
      setSavingPhoto(false);
    }
  };

  if (!authed) {
    return (
      <main className="min-h-screen bg-[#f5f5f7] flex items-center justify-center" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
        <div className="bg-white rounded-2xl shadow-sm p-10 w-full max-w-sm">
          <h1 className="text-[22px] font-semibold text-[#1d1d1f] mb-1">Admin</h1>
          <p className="text-[13px] text-[#6e6e73] mb-6">Central control panel</p>
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setPwError(false); }}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Password"
            className="w-full border border-[#d2d2d7] rounded-lg px-4 py-2.5 text-[15px] text-[#1d1d1f] outline-none focus:border-[#0071e3] transition-colors mb-3"
          />
          {pwError && <p className="text-[12px] text-red-500 mb-3">Wrong password.</p>}
          <button onClick={login} className="w-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-[15px] font-medium py-2.5 rounded-lg transition-colors">
            Enter
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <header className="bg-white border-b border-[#d2d2d7] px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-[17px] font-semibold text-[#1d1d1f]">Dashboard</h1>

          <div className="flex gap-1 bg-[#f5f5f7] rounded-lg p-1 border border-[#d2d2d7]/50">
            <button
              onClick={() => setActiveTab("thoughts")}
              className="px-6 py-1.5 rounded-md text-[13px] transition-all duration-200"
              style={{
                background: activeTab === "thoughts" ? "white" : "transparent",
                color: activeTab === "thoughts" ? "#1d1d1f" : "#6e6e73",
                boxShadow: activeTab === "thoughts" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                fontWeight: activeTab === "thoughts" ? 500 : 400,
              }}
            >
              Thoughts
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className="px-6 py-1.5 rounded-md text-[13px] transition-all duration-200"
              style={{
                background: activeTab === "photos" ? "white" : "transparent",
                color: activeTab === "photos" ? "#1d1d1f" : "#6e6e73",
                boxShadow: activeTab === "photos" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                fontWeight: activeTab === "photos" ? 500 : 400,
              }}
            >
              Photography
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {activeTab === "thoughts" && (
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-[17px] font-semibold text-[#1d1d1f] mb-6">New thought</h2>
              <form onSubmit={handleThoughtSubmit} className="space-y-4">

                <div>
                  <label className="block text-[12px] text-[#6e6e73] mb-1.5 uppercase tracking-wide">Type</label>
                  <div className="flex gap-1 bg-[#f5f5f7] rounded-lg p-1">
                    {TYPE_OPTIONS.map((t) => (
                      <button key={t} type="button" onClick={() => setThoughtForm((f) => ({ ...f, type: t }))} className="flex-1 py-1.5 rounded-md text-[13px] transition-all" style={{ background: thoughtForm.type === t ? "white" : "transparent", color: thoughtForm.type === t ? "#1d1d1f" : "#6e6e73", fontWeight: thoughtForm.type === t ? 500 : 400, boxShadow: thoughtForm.type === t ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] text-[#6e6e73] mb-1.5 uppercase tracking-wide">Title</label>
                  <input type="text" value={thoughtForm.title} onChange={(e) => setThoughtForm((f) => ({ ...f, title: e.target.value }))} placeholder="Optional title" className="w-full border border-[#d2d2d7] rounded-lg px-3 py-2 text-[14px] text-[#1d1d1f] outline-none focus:border-[#0071e3] transition-colors" />
                </div>

                {(thoughtForm.type === "note" || thoughtForm.type === "code") && (
                  <div>
                    <label className="block text-[12px] text-[#6e6e73] mb-1.5 uppercase tracking-wide">{thoughtForm.type === "code" ? "Code" : "Body"}</label>
                    <textarea value={thoughtForm.body} onChange={(e) => setThoughtForm((f) => ({ ...f, body: e.target.value }))} placeholder={thoughtForm.type === "code" ? "Paste your code here..." : "Write something..."} rows={thoughtForm.type === "code" ? 8 : 4} className="w-full border border-[#d2d2d7] rounded-lg px-3 py-2 text-[14px] text-[#1d1d1f] outline-none focus:border-[#0071e3] transition-colors resize-none" style={{ fontFamily: thoughtForm.type === "code" ? "monospace" : "inherit" }} />
                  </div>
                )}

                {(thoughtForm.type === "video" || thoughtForm.type === "note") && (
                  <div>
                    <label className="block text-[12px] text-[#6e6e73] mb-1.5 uppercase tracking-wide">
                      {thoughtForm.type === "video" ? "YouTube URL" : "Link (Twitter, Haber vb.)"}
                    </label>
                    <input type="url" value={thoughtForm.url} onChange={(e) => setThoughtForm((f) => ({ ...f, url: e.target.value }))} placeholder={thoughtForm.type === "video" ? "https://youtube.com/watch?v=..." : "https://x.com/..."} className="w-full border border-[#d2d2d7] rounded-lg px-3 py-2 text-[14px] text-[#1d1d1f] outline-none focus:border-[#0071e3] transition-colors" />
                  </div>
                )}

                {thoughtForm.type === "code" && (
                  <div>
                    <label className="block text-[12px] text-[#6e6e73] mb-1.5 uppercase tracking-wide">Language</label>
                    <select value={thoughtForm.language} onChange={(e) => setThoughtForm((f) => ({ ...f, language: e.target.value }))} className="w-full border border-[#d2d2d7] rounded-lg px-3 py-2 text-[14px] text-[#1d1d1f] outline-none focus:border-[#0071e3] bg-white transition-colors">
                      {LANGUAGE_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                )}

                {thoughtForm.type === "video" && (
                  <div>
                    <label className="block text-[12px] text-[#6e6e73] mb-1.5 uppercase tracking-wide mt-4">Note (optional)</label>
                    <textarea value={thoughtForm.body} onChange={(e) => setThoughtForm((f) => ({ ...f, body: e.target.value }))} placeholder="Say something about it..." rows={3} className="w-full border border-[#d2d2d7] rounded-lg px-3 py-2 text-[14px] text-[#1d1d1f] outline-none focus:border-[#0071e3] transition-colors resize-none" />
                  </div>
                )}

                <div>
                  <label className="block text-[12px] text-[#6e6e73] mb-1.5 uppercase tracking-wide">Tags</label>
                  <input type="text" value={thoughtForm.tags} onChange={(e) => setThoughtForm((f) => ({ ...f, tags: e.target.value }))} placeholder="games, code, clip (comma separated)" className="w-full border border-[#d2d2d7] rounded-lg px-3 py-2 text-[14px] text-[#1d1d1f] outline-none focus:border-[#0071e3] transition-colors" />
                </div>

                <div className="flex items-center gap-3">
                  <input type="checkbox" id="published" checked={thoughtForm.published} onChange={(e) => setThoughtForm((f) => ({ ...f, published: e.target.checked }))} className="w-4 h-4 rounded accent-[#0071e3]" />
                  <label htmlFor="published" className="text-[14px] text-[#1d1d1f]">Publish immediately</label>
                </div>

                <button type="submit" disabled={savingThought} className="w-full bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-50 text-white text-[15px] font-medium py-2.5 rounded-lg transition-colors">
                  {savingThought ? "Saving..." : thoughtSuccess ? "Saved ✓" : "Add thought"}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="px-6 py-4 border-b border-[#f5f5f7]">
                <h2 className="text-[17px] font-semibold text-[#1d1d1f]">All thoughts</h2>
              </div>
              {loadingThoughts && <div className="px-6 py-10 text-[14px] text-[#b0b0b5] text-center">Loading...</div>}
              {!loadingThoughts && thoughts.length === 0 && <div className="px-6 py-10 text-[14px] text-[#b0b0b5] text-center">No thoughts yet.</div>}
              <ul className="divide-y divide-[#f5f5f7]">
                {thoughts.map((t) => (
                  <li key={t.id} className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide" style={{ background: "#e5e5ea", color: "#1d1d1f" }}>{t.type}</span>
                        {!t.published && <span className="text-[10px] text-[#ff9f0a]">Draft</span>}
                      </div>
                      <p className="text-[14px] text-[#1d1d1f] truncate">{t.title ?? t.body?.slice(0, 60) ?? t.url ?? "—"}</p>
                      <p className="text-[12px] text-[#b0b0b5] mt-0.5">{new Date(t.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button onClick={() => handleThoughtToggle(t.id, t.published)} className="text-[12px] text-[#6e6e73] hover:text-[#0071e3] transition-colors">{t.published ? "Unpublish" : "Publish"}</button>
                      <button onClick={() => handleThoughtRemove(t.id)} className="text-[12px] text-[#ff3b30] hover:opacity-70 transition-opacity">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "photos" && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-[17px] font-semibold text-[#1d1d1f] mb-6">Upload Photo</h2>

            <form onSubmit={handlePhotoSubmit} className="flex flex-col gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                className="text-sm text-[#6e6e73] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#f5f5f7] file:text-[#1d1d1f] hover:file:bg-[#e5e5ea] cursor-pointer transition-colors"
              />

              <input type="text" placeholder="Title (e.g., Andromeda Rise)" value={photoTitle} onChange={(e) => setPhotoTitle(e.target.value)} required className="w-full border border-[#d2d2d7] rounded-lg px-3 py-2.5 text-[14px] text-[#1d1d1f] outline-none focus:border-[#0071e3] transition-colors" />

              <select value={photoCategory} onChange={(e) => setPhotoCategory(e.target.value as PhotoCategory)} className="w-full border border-[#d2d2d7] rounded-lg px-3 py-2.5 text-[14px] text-[#1d1d1f] outline-none focus:border-[#0071e3] bg-white transition-colors">
                <option value="Space">Space</option>
                <option value="Nature">Nature</option>
                <option value="Gaming">Gaming</option>
              </select>

              <input type="text" placeholder="Location (e.g., Anatolia, Elden Ring)" value={photoLocation} onChange={(e) => setPhotoLocation(e.target.value)} required className="w-full border border-[#d2d2d7] rounded-lg px-3 py-2.5 text-[14px] text-[#1d1d1f] outline-none focus:border-[#0071e3] transition-colors" />

              <input type="text" placeholder="Year (e.g., 2024)" value={photoYear} onChange={(e) => setPhotoYear(e.target.value)} required className="w-full border border-[#d2d2d7] rounded-lg px-3 py-2.5 text-[14px] text-[#1d1d1f] outline-none focus:border-[#0071e3] transition-colors" />

              <button type="submit" disabled={savingPhoto} className="mt-2 w-full bg-[#1d1d1f] text-white py-2.5 rounded-lg font-medium text-[15px] hover:bg-black transition-colors disabled:opacity-50">
                {savingPhoto ? "Uploading..." : "Publish Photo"}
              </button>

              {photoMessage && (
                <p className={`text-center text-[13px] mt-2 ${photoMessage.includes("Hata") ? "text-red-500" : "text-[#0071e3]"}`}>
                  {photoMessage}
                </p>
              )}
            </form>
          </div>
        )}

      </div>
    </main>
  );
}