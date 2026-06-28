"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Music, ExternalLink } from "lucide-react";

const artists = [
  {
    name: "Zara M",
    genre: "Afro-Soul / R&B",
    bio: "Nairobi-born vocalist blending Swahili storytelling with contemporary R&B production. Known for her powerful live performances and deeply personal lyricism.",
    achievements: ["2x Best Female Artist — Nairobi Music Awards", "100K+ streams debut EP", "Featured on KBC Radio"],
    releases: ["Echoes (2024)", "Midnight Drive EP (2023)"],
    initial: "Z",
    color: "from-purple-600 to-pink-600",
  },
  {
    name: "Dre Wako",
    genre: "Afrobeat / Hip-Hop",
    bio: "Multi-genre producer and rapper from Eastlands, Nairobi. Dre Wako&apos;s music is a collision of trap, Afrobeat and spoken word — raw, cinematic, authentic.",
    achievements: ["1M+ views debut video", "Collaboration with regional artists", "Headlined Blankets & Wine"],
    releases: ["Streets Talk (2024)", "Eastlands Chronicles (2023)"],
    initial: "D",
    color: "from-orange-600 to-yellow-600",
  },
  {
    name: "Malkia",
    genre: "Gospel / Neo-Soul",
    bio: "Spirit-led artist crafting gospel music that transcends the church walls. Malkia's sound is soulful, orchestral, and deeply moving.",
    achievements: ["Gospel Music Kenya Award Nominee", "Viral TikTok moment — 500K views", "Radio nationwide"],
    releases: ["Grace (2024)", "Nimekuona (2023)"],
    initial: "M",
    color: "from-green-600 to-teal-600",
  },
  {
    name: "Phantom X",
    genre: "Electronic / Afrofusion",
    bio: "Producer and multi-instrumentalist pushing the boundaries of what East African electronic music can be. Phantom X creates worlds, not just songs.",
    achievements: ["Showcased at Afrikin Festival", "International playlist features", "Sync placement — African drama series"],
    releases: ["Frequencies Vol. 1 (2024)", "Pulse (2023)"],
    initial: "P",
    color: "from-blue-600 to-cyan-600",
  },
];

export default function Artists() {
  const [current, setCurrent] = useState(0);
  const artist = artists[current];

  const prev = () => setCurrent((c) => (c - 1 + artists.length) % artists.length);
  const next = () => setCurrent((c) => (c + 1) % artists.length);

  return (
    <section id="artists" className="bg-[#080808] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block mb-4 px-3 py-1.5 border border-[#FFB000]/30 rounded-full">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#FFB000] uppercase">
              The Roster
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Artists We&apos;ve{" "}
            <span className="gradient-text">Worked With.</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Artist visual */}
          <div className="relative">
            <div
              className={`relative h-80 md:h-96 rounded-2xl bg-gradient-to-br ${artist.color} overflow-hidden flex items-center justify-center`}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 text-center">
                <div className="w-28 h-28 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-5xl font-black text-white">{artist.initial}</span>
                </div>
                <span className="text-white/50 text-sm uppercase tracking-widest">{artist.genre}</span>
              </div>
              {/* Navigation */}
              <div className="absolute bottom-5 right-5 flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:bg-[#FFB000]/20 hover:border-[#FFB000]/40 transition-all"
                >
                  <ChevronLeft size={18} className="text-white" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center hover:bg-[#FFB000]/20 hover:border-[#FFB000]/40 transition-all"
                >
                  <ChevronRight size={18} className="text-white" />
                </button>
              </div>
              {/* Counter */}
              <div className="absolute top-5 right-5 px-3 py-1 bg-black/50 rounded-full">
                <span className="text-xs text-white/60 font-medium">
                  {String(current + 1).padStart(2, "0")} / {String(artists.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Artist info */}
          <div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-2">{artist.name}</h3>
            <p className="text-[#FFB000] text-sm font-semibold uppercase tracking-widest mb-6">{artist.genre}</p>
            <p className="text-white/55 leading-relaxed mb-8 text-base">{artist.bio}</p>

            {/* Achievements */}
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-widest text-white/30 font-semibold mb-4">Achievements</h4>
              <div className="space-y-2.5">
                {artist.achievements.map((a) => (
                  <div key={a} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFB000] mt-1.5 flex-shrink-0" />
                    <span className="text-sm text-white/60">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Releases */}
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-widest text-white/30 font-semibold mb-4">Recent Releases</h4>
              <div className="flex flex-wrap gap-2">
                {artist.releases.map((r) => (
                  <div key={r} className="flex items-center gap-2 px-3.5 py-2 bg-[#FFB000]/8 border border-[#FFB000]/20 rounded-full">
                    <Music size={11} className="text-[#FFB000]" />
                    <span className="text-xs text-white/70 font-medium">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <a href="#portfolio" className="flex items-center gap-2 text-sm font-semibold text-[#FFB000] border border-[#FFB000]/30 px-5 py-2.5 rounded-full hover:bg-[#FFB000]/10 transition-colors">
                View Work <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {artists.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-6 h-2 bg-[#FFB000]" : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
