"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, VolumeX, Volume2, ChevronDown } from "lucide-react";

// Replace with your actual YouTube video ID (the part after ?v= in the URL)
const YOUTUBE_VIDEO_ID = "dQw4w9WgXcQ";

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
          const step = Math.ceil(num / (1800 / 16));
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

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function Hero() {
  const [muted, setMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleMute = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (muted) {
      iframe.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', "*");
    } else {
      iframe.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', "*");
    }
    setMuted(!muted);
  };

  return (
    <>
      {/* ── Full-screen video panel ── */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <div className="absolute inset-0">
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&enablejsapi=1&playsinline=1&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "100vw",
              height: "56.25vw",
              minHeight: "100vh",
              minWidth: "177.78vh",
            }}
          />
          {/* Blocks all pointer events reaching the iframe — hides YouTube UI */}
          <div className="absolute inset-0 z-10" />
        </div>

        {/* Subtle bottom fade so scroll section blends in */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />

        {/* Mute toggle — bottom right, unobtrusive */}
        <button
          onClick={toggleMute}
          className="absolute bottom-10 right-6 md:right-10 z-20 w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all backdrop-blur-sm"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        {/* Scroll cue — centre bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 animate-bounce">
          <ChevronDown size={24} className="text-white/40" />
        </div>
      </section>

      {/* ── Identity + CTA section ── */}
      <section className="bg-black pt-20 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#FFB000]/30 bg-[#FFB000]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000] animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#FFB000] uppercase">
              Nairobi, Kenya
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-end">
            {/* Left: Headline */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.92] tracking-tight mb-6">
                <span className="block text-white">Building Artists,</span>
                <span className="block gold-shimmer">Content &</span>
                <span className="block text-white">Culture.</span>
              </h1>
              <p className="text-sm text-white/40 font-medium tracking-widest uppercase">
                Production&nbsp;·&nbsp;Visuals&nbsp;·&nbsp;Strategy&nbsp;·&nbsp;Distribution&nbsp;·&nbsp;Artist Development
              </p>
            </div>

            {/* Right: CTAs + description */}
            <div className="flex flex-col gap-8">
              <p className="text-white/55 text-lg leading-relaxed max-w-sm">
                Nairobi&apos;s premier music company — record label, production house, and artist development ecosystem all under one roof.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="group flex items-center gap-2 px-7 py-4 rounded-full bg-[#FFB000] text-black font-bold text-sm hover:bg-[#FFC933] transition-colors"
                >
                  Book Session
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#artists"
                  className="flex items-center gap-2 px-7 py-4 rounded-full border border-white/20 text-white font-semibold text-sm hover:border-[#FFB000] hover:text-[#FFB000] transition-colors"
                >
                  <Play size={13} fill="currentColor" /> Meet The Artists
                </a>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 pt-10 border-t border-white/8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-black text-[#FFB000] mb-1 tabular-nums">
                  <CountUp
                    target={s.value.replace("+", "").replace("K", "")}
                    suffix={s.value.includes("K") ? "K+" : "+"}
                  />
                </div>
                <div className="text-[10px] text-white/35 uppercase tracking-widest font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
