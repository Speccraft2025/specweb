"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";

const stats = [
  { value: "400+", label: "Songs Produced" },
  { value: "57+", label: "Artists Served" },
  { value: "32+", label: "Videos Produced" },
  { value: "217K+", label: "Audience Reach" },
];

function CountUp({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const num = parseInt(target.replace(/\D/g, ""));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = Math.ceil(num / (duration / 16));
          const timer = setInterval(() => {
            start = Math.min(start + step, num);
            setDisplay(start.toString());
            if (start >= num) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0a0a0a] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10" />

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#FFB000]/5 blur-[120px] z-0" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#FFB000]/8 blur-[80px] z-0" />

        {/* Placeholder for video — in production swap src for actual studio reel */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,176,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,176,0,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#FFB000]/30 bg-[#FFB000]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000] animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#FFB000] uppercase">
              Nairobi, Kenya
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.92] tracking-tight mb-6">
            <span className="block text-white">Building Artists,</span>
            <span className="block gold-shimmer">Content &</span>
            <span className="block text-white">Culture.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-white/50 font-medium tracking-widest uppercase mb-12">
            Production&nbsp;&nbsp;·&nbsp;&nbsp;Visuals&nbsp;&nbsp;·&nbsp;&nbsp;Strategy&nbsp;&nbsp;·&nbsp;&nbsp;Distribution&nbsp;&nbsp;·&nbsp;&nbsp;Artist Development
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-20">
            <a
              href="#contact"
              className="group flex items-center gap-2 px-7 py-4 rounded-full bg-[#FFB000] text-black font-bold text-sm hover:bg-[#FFC933] transition-colors"
            >
              Book Session
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#ecosystem"
              className="flex items-center gap-2 px-7 py-4 rounded-full border border-white/20 text-white font-semibold text-sm hover:border-[#FFB000] hover:text-[#FFB000] transition-colors"
            >
              Join Spec Craft
            </a>
            <a
              href="#portfolio"
              className="group flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              <Play size={14} fill="currentColor" />
              View Work
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:border-t md:border-white/10 md:pt-8">
            {stats.map((s, i) => (
              <div
                key={i}
                className="md:border-r md:border-white/10 md:pr-8 last:border-0"
              >
                <div className="text-3xl md:text-4xl font-black text-[#FFB000] mb-1">
                  <CountUp
                    target={s.value.replace("+", "").replace("K", "")}
                    suffix={s.value.includes("K") ? "K+" : "+"}
                  />
                </div>
                <div className="text-xs text-white/50 uppercase tracking-widest font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-[10px] text-white/30 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#FFB000]/50 to-transparent" />
      </div>
    </section>
  );
}
