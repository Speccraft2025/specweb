"use client";

import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Spec Craft didn't just produce my EP — they helped me understand who I am as an artist. The level of care, detail, and strategy they bring is unmatched in Nairobi.",
    name: "Zara M",
    role: "Afro-Soul Artist",
    initial: "Z",
    color: "from-purple-600",
  },
  {
    quote:
      "I came in with a rough idea and left with a complete visual identity. The music video they produced for me got over 100K views in the first week. These guys understand culture.",
    name: "Dre Wako",
    role: "Recording Artist",
    initial: "D",
    color: "from-orange-600",
  },
  {
    quote:
      "Working with Spec Craft gave me the structure I was missing. They planned my release strategy, handled distribution, and the results speak for themselves — I'm now on multiple editorial playlists.",
    name: "Malkia",
    role: "Gospel / Neo-Soul Artist",
    initial: "M",
    color: "from-green-600",
  },
  {
    quote:
      "The team at Spec Craft is genuinely invested in your success. They pushed me creatively in ways I didn't expect, and the music came out better than I imagined.",
    name: "Phantom X",
    role: "Producer & Artist",
    initial: "P",
    color: "from-blue-600",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#080808] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1.5 border border-[#FFB000]/30 rounded-full">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#FFB000] uppercase">
              Social Proof
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Artists Speak <span className="gradient-text">For Themselves.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-[#111] border border-white/8 rounded-2xl p-8 hover-lift group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#FFB000]/3 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <Quote size={28} className="text-[#FFB000]/30 mb-6" />
              <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} to-transparent flex items-center justify-center border border-white/10`}
                >
                  <span className="text-sm font-black text-white">{t.initial}</span>
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t.name}</div>
                  <div className="text-[11px] text-white/40 uppercase tracking-wider">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof numbers */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "95%", label: "Client Return Rate" },
            { value: "57+", label: "Artists Served" },
            { value: "4.9★", label: "Average Rating" },
            { value: "5yr+", label: "Industry Experience" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#111] border border-white/8 rounded-xl p-6 text-center"
            >
              <div className="text-2xl md:text-3xl font-black text-[#FFB000] mb-1">{s.value}</div>
              <div className="text-[10px] text-white/35 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
