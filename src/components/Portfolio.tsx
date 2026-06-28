"use client";

import { useState } from "react";
import { Play, BookOpen } from "lucide-react";

const filters = ["All", "Music", "Visuals", "Campaigns", "Films", "Artists"];

const projects = [
  {
    id: 1,
    title: "Echoes of Nairobi",
    type: "Music",
    year: "2024",
    category: "Music",
    credits: "Prod. Spec Craft Media",
    description: "A genre-blending Afro-Soul EP capturing the pulse of Nairobi's underground music scene.",
    color: "from-yellow-900/40",
  },
  {
    id: 2,
    title: "City Lights",
    type: "Music Video",
    year: "2024",
    category: "Visuals",
    credits: "Dir. Spec Craft Visuals",
    description: "Cinematic music video shot across Nairobi's skyline at golden hour.",
    color: "from-purple-900/40",
  },
  {
    id: 3,
    title: "The Journey Campaign",
    type: "Brand Campaign",
    year: "2023",
    category: "Campaigns",
    credits: "Creative: Spec Craft Media",
    description: "Full 360° campaign for an emerging Kenyan R&B artist — digital, OOH, and content.",
    color: "from-blue-900/40",
  },
  {
    id: 4,
    title: "Roots & Routes",
    type: "Documentary",
    year: "2023",
    category: "Films",
    credits: "Spec Craft Media Production",
    description: "Short documentary exploring the origins of East African contemporary music.",
    color: "from-green-900/40",
  },
  {
    id: 5,
    title: "Artist Spotlight: Zara M",
    type: "Artist Feature",
    year: "2024",
    category: "Artists",
    credits: "Photography + Production",
    description: "Complete brand rollout for emerging vocalist Zara M — visuals, bio, and release strategy.",
    color: "from-red-900/40",
  },
  {
    id: 6,
    title: "Frequency Sessions Vol. 1",
    type: "EP",
    year: "2023",
    category: "Music",
    credits: "Recorded & Mixed at Spec Craft",
    description: "Live session recordings showcasing the studio's acoustic signature.",
    color: "from-orange-900/40",
  },
];

export default function Portfolio() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="bg-[#0a0a0a] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-block mb-4 px-3 py-1.5 border border-[#FFB000]/30 rounded-full">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#FFB000] uppercase">
              Our Work
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-10">
            Selected <span className="gradient-text">Works.</span>
          </h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                  active === f
                    ? "bg-[#FFB000] text-black"
                    : "border border-white/15 text-white/50 hover:border-[#FFB000]/50 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="group relative bg-[#111] border border-white/8 rounded-2xl overflow-hidden hover-lift"
            >
              {/* Artwork placeholder */}
              <div
                className={`h-52 bg-gradient-to-br ${p.color} to-[#111] flex items-center justify-center relative`}
              >
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,176,0,0.3) 0%, transparent 70%)",
                  }}
                />
                {/* Play button */}
                <button className="w-14 h-14 rounded-full bg-black/40 border border-white/20 flex items-center justify-center group-hover:bg-[#FFB000]/20 group-hover:border-[#FFB000]/40 transition-all duration-300">
                  <Play size={20} className="text-white group-hover:text-[#FFB000] fill-current transition-colors" />
                </button>
                {/* Type badge */}
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/60 rounded-full">
                  <span className="text-[10px] font-semibold text-white/70 uppercase tracking-wider">{p.type}</span>
                </div>
                <div className="absolute top-4 right-4 px-2.5 py-1 bg-black/60 rounded-full">
                  <span className="text-[10px] font-semibold text-[#FFB000] tracking-wider">{p.year}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-lg font-black text-white mb-1">{p.title}</h3>
                <p className="text-[11px] text-[#FFB000]/70 uppercase tracking-wider font-medium mb-3">{p.credits}</p>
                <p className="text-sm text-white/45 leading-relaxed line-clamp-2 mb-5">{p.description}</p>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-[#FFB000] transition-colors">
                    <Play size={12} fill="currentColor" /> Play
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-[#FFB000] transition-colors">
                    <BookOpen size={12} /> Case Study
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3.5 border border-white/15 rounded-full text-sm font-semibold text-white/60 hover:border-[#FFB000]/50 hover:text-[#FFB000] transition-all duration-200">
            Load More Projects
          </button>
        </div>
      </div>
    </section>
  );
}
