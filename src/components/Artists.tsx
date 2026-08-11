"use client";

import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import { artists } from "@/lib/artists";

export default function Artists() {
  return (
    <section id="artists" className="bg-[#080808] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-block mb-4 px-3 py-1.5 border border-[#FFB000]/30 rounded-full">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#FFB000] uppercase">
                The Roster
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Meet The <span className="gradient-text">Artists.</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs leading-relaxed">
            Independent talent. Global ambition. Rooted in Nairobi.
          </p>
        </div>

        {/* Artist grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {artists.map((artist) => (
            <Link
              key={artist.slug}
              href={`/artists/${artist.slug}`}
              className="group relative rounded-2xl overflow-hidden hover-lift block"
            >
              {/* Artist visual */}
              <div
                className={`relative h-80 bg-gradient-to-br ${artist.gradientFrom} ${artist.gradientTo} flex flex-col justify-end`}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Initial / placeholder for real photo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <span className="text-4xl font-black text-white">{artist.initial}</span>
                </div>

                {/* Play button on hover */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FFB000] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <Play size={14} className="text-black fill-black" />
                </div>

                {/* Info */}
                <div className="relative z-10 p-6">
                  <p className="text-[10px] font-bold text-[#FFB000] uppercase tracking-widest mb-1">
                    {artist.genre}
                  </p>
                  <h3 className="text-2xl font-black text-white mb-1">{artist.name}</h3>
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{artist.tagline}</p>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="bg-[#111] border border-white/8 border-t-0 px-6 py-4 flex items-center justify-between rounded-b-2xl">
                <div className="flex gap-1.5">
                  {artist.releases.slice(0, 3).map((r) => (
                    <div key={r.title} className={`w-7 h-7 rounded bg-gradient-to-br ${r.coverColor} flex-shrink-0`} />
                  ))}
                  {artist.releases.length > 3 && (
                    <div className="w-7 h-7 rounded bg-white/8 flex items-center justify-center">
                      <span className="text-[9px] text-white/50 font-bold">+{artist.releases.length - 3}</span>
                    </div>
                  )}
                </div>
                <span className="text-xs font-semibold text-[#FFB000] flex items-center gap-1 group-hover:gap-2 transition-all">
                  View <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
