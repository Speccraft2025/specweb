"use client";

import { ArrowRight, Clock } from "lucide-react";

const posts = [
  {
    category: "Artist Development",
    title: "How Independent Artists Grow in Africa: The Playbook",
    excerpt:
      "From WhatsApp links to playlist placements — a practical guide to building an audience in East Africa without a major label budget.",
    readTime: "6 min read",
    date: "Jun 2025",
    color: "from-yellow-600/20",
  },
  {
    category: "Music Marketing",
    title: "Music Marketing Strategies That Actually Work in 2025",
    excerpt:
      "Forget what worked in 2019. The platforms, algorithms, and consumer behaviors that drive growth for African artists right now.",
    readTime: "8 min read",
    date: "May 2025",
    color: "from-purple-600/20",
  },
  {
    category: "Distribution",
    title: "The Complete Release Rollout Guide for African Artists",
    excerpt:
      "Step-by-step: from mastering to Spotify editorial submission. Everything you need to execute a professional release campaign.",
    readTime: "10 min read",
    date: "May 2025",
    color: "from-green-600/20",
  },
  {
    category: "Behind the Scenes",
    title: "Inside Spec Craft: How We Produced 400+ Songs",
    excerpt:
      "A behind-the-scenes look at our studio process, artist workflow, and the philosophy behind every session we run.",
    readTime: "5 min read",
    date: "Apr 2025",
    color: "from-blue-600/20",
  },
  {
    category: "Distribution",
    title: "Understanding Music Distribution in Africa: A 2025 Guide",
    excerpt:
      "Boomplay, Mdundo, Spotify, Apple Music — navigating the African streaming landscape and maximizing your royalties.",
    readTime: "7 min read",
    date: "Apr 2025",
    color: "from-orange-600/20",
  },
  {
    category: "Brand Building",
    title: "Building Your Artist Brand: Identity, Visuals & Narrative",
    excerpt:
      "Why your brand is as important as your music, and how to build one that resonates authentically with your audience.",
    readTime: "9 min read",
    date: "Mar 2025",
    color: "from-red-600/20",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="bg-[#080808] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-block mb-4 px-3 py-1.5 border border-[#FFB000]/30 rounded-full">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#FFB000] uppercase">
                Insights
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Knowledge For <span className="gradient-text">Artists.</span>
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-[#FFB000] transition-colors"
          >
            View All Articles <ArrowRight size={14} />
          </a>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((p, i) => (
            <article
              key={i}
              className="group bg-[#111] border border-white/8 rounded-2xl overflow-hidden hover-lift cursor-pointer"
            >
              {/* Color bar */}
              <div className={`h-1.5 bg-gradient-to-r ${p.color} to-transparent`} />

              <div className="p-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-[#FFB000] uppercase tracking-widest">
                    {p.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-white/25">
                    <Clock size={11} />
                    <span className="text-[10px]">{p.readTime}</span>
                  </div>
                </div>

                <h3 className="text-base font-black text-white leading-snug mb-3 group-hover:text-[#FFB000] transition-colors line-clamp-2">
                  {p.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed mb-6 line-clamp-3">{p.excerpt}</p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[11px] text-white/25">{p.date}</span>
                  <span className="text-xs font-semibold text-[#FFB000] group-hover:underline">
                    Read →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
