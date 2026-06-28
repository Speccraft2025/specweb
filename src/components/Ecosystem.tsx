"use client";

import { Disc3, Users, Globe, BookOpen, Tv2, Code2, Calendar, TrendingUp } from "lucide-react";

const initiatives = [
  {
    icon: Disc3,
    title: "Record Label",
    description: "Artist signing, catalog development, and royalty management for independent artists.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/8 border-yellow-400/20",
  },
  {
    icon: Users,
    title: "Artist Incubation",
    description: "12-month intensive programs guiding emerging talent from idea to release-ready artist.",
    color: "text-purple-400",
    bg: "bg-purple-400/8 border-purple-400/20",
  },
  {
    icon: Globe,
    title: "Publishing",
    description: "Copyright registration, licensing, and royalty collection for songwriters.",
    color: "text-blue-400",
    bg: "bg-blue-400/8 border-blue-400/20",
  },
  {
    icon: TrendingUp,
    title: "Distribution",
    description: "Global digital distribution to Spotify, Apple Music, Boomplay, and 150+ platforms.",
    color: "text-green-400",
    bg: "bg-green-400/8 border-green-400/20",
  },
  {
    icon: BookOpen,
    title: "Education",
    description: "Workshops, masterclasses, and online resources for aspiring music industry professionals.",
    color: "text-orange-400",
    bg: "bg-orange-400/8 border-orange-400/20",
  },
  {
    icon: Tv2,
    title: "Media Production",
    description: "Full-service media house producing documentaries, podcasts, and branded content.",
    color: "text-red-400",
    bg: "bg-red-400/8 border-red-400/20",
  },
  {
    icon: Code2,
    title: "Technology Projects",
    description: "Building tools and platforms for the African music industry ecosystem.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/8 border-cyan-400/20",
  },
  {
    icon: Calendar,
    title: "Community Events",
    description: "Showcases, listening parties, networking events, and artist competitions.",
    color: "text-pink-400",
    bg: "bg-pink-400/8 border-pink-400/20",
  },
];

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="bg-[#0a0a0a] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-end">
          <div>
            <div className="inline-block mb-4 px-3 py-1.5 border border-[#FFB000]/30 rounded-full">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#FFB000] uppercase">
                The Ecosystem
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Beyond <span className="gradient-text">The Studio.</span>
            </h2>
          </div>
          <p className="text-white/40 text-base leading-relaxed lg:max-w-sm">
            Spec Craft Media is a creative ecosystem — a collection of interconnected initiatives
            that support every stage of an artist&apos;s career and every dimension of African music culture.
          </p>
        </div>

        {/* Ecosystem grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {initiatives.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={`group relative rounded-2xl border p-6 hover-lift cursor-default ${item.bg} backdrop-blur-sm`}
              >
                <div className={`w-10 h-10 rounded-xl ${item.bg} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon size={18} className={item.color} />
                </div>
                <h3 className="text-sm font-black text-white mb-2">{item.title}</h3>
                <p className="text-[13px] text-white/40 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Center statement */}
        <div className="mt-20 text-center max-w-2xl mx-auto">
          <div className="text-5xl font-black text-white/5 mb-4 select-none">∞</div>
          <p className="text-white/40 text-lg leading-relaxed">
            Every initiative connects to the others — creating a self-sustaining ecosystem where
            artists grow, revenue flows, and culture compounds.
          </p>
        </div>
      </div>
    </section>
  );
}
