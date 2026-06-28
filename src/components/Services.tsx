"use client";

import { Music, Video, Star, Radio } from "lucide-react";

const services = [
  {
    icon: Music,
    title: "Music Production",
    tagline: "Sonic excellence from concept to master.",
    items: [
      "Recording",
      "Mixing",
      "Mastering",
      "Beat Production",
      "Songwriting",
      "EP Development",
    ],
    accent: "#FFB000",
  },
  {
    icon: Video,
    title: "Visual Production",
    tagline: "Visuals that move culture.",
    items: [
      "Music Videos",
      "Content Shoots",
      "Performance Videos",
      "Photography",
      "Short Form Content",
      "Reels",
    ],
    accent: "#FFB000",
  },
  {
    icon: Star,
    title: "Artist Development",
    tagline: "From artist to brand.",
    items: [
      "Career Planning",
      "Release Strategy",
      "Brand Positioning",
      "Audience Growth",
      "Distribution",
      "Publishing Support",
      "Rollout Campaigns",
    ],
    accent: "#FFB000",
  },
  {
    icon: Radio,
    title: "Media Services",
    tagline: "Content that converts.",
    items: [
      "Podcast Production",
      "Commercial Content",
      "Interviews",
      "Brand Campaigns",
      "Social Media Assets",
    ],
    accent: "#FFB000",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#080808] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-block mb-4 px-3 py-1.5 border border-[#FFB000]/30 rounded-full">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#FFB000] uppercase">
                What We Do
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Full-Service Creative{" "}
              <span className="gradient-text">Infrastructure.</span>
            </h2>
          </div>
          <p className="max-w-sm text-white/40 text-sm leading-relaxed md:text-right">
            Everything an independent artist needs to build, grow, and sustain a career in music.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="group relative bg-[#111] border border-white/8 rounded-2xl p-8 overflow-hidden hover-lift cursor-default"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFB000]/0 to-[#FFB000]/0 group-hover:from-[#FFB000]/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#FFB000]/4 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 inline-flex w-12 h-12 rounded-xl items-center justify-center bg-[#FFB000]/10 border border-[#FFB000]/20 group-hover:bg-[#FFB000]/15 transition-colors">
                    <Icon size={20} className="text-[#FFB000]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-white mb-2">{s.title}</h3>
                  <p className="text-white/40 text-sm mb-7">{s.tagline}</p>

                  {/* List */}
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                    {s.items.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#FFB000] flex-shrink-0" />
                        <span className="text-sm text-white/60">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-white/25 font-medium">
                      Service 0{i + 1}
                    </span>
                    <a
                      href="#contact"
                      className="text-xs font-semibold text-[#FFB000] hover:underline"
                    >
                      Inquire →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
