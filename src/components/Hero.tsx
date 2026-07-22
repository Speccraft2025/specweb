"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, VolumeX, Volume2 } from "lucide-react";

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
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-black">
      {/* ── YouTube background video ── */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&enablejsapi=1&playsinline=1&modestbranding=1&iv_load_policy=3`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "100vw",
            height: "56.25vw",   /* 16:9 */
            minHeight: "100vh",
            minWidth: "177.78vh", /* 16:9 */
          }}
        />
      </div>

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />

      {/* ── Mute toggle ── */}
      <button
        onClick={toggleMute}
        className="absolute top-28 right-6 md:right-10 z-30 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all backdrop-blur-sm"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </button>

      {/* ── Content ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 pb-16 md:pb-24 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#FFB000]/30 bg-[#FFB000]/5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000] animate-pulse" />
          <span className="text-xs font-semibold tracking-[0.2em] text-[#FFB000] uppercase">
            Nairobi, Kenya
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.92] tracking-tight mb-5">
          <span className="block text-white">Building Artists,</span>
          <span className="block gold-shimmer">Content &</span>
          <span className="block text-white">Culture.</span>
        </h1>

        <p className="text-sm md:text-base text-white/50 font-medium tracking-widest uppercase mb-10">
          Production&nbsp;&nbsp;·&nbsp;&nbsp;Visuals&nbsp;&nbsp;·&nbsp;&nbsp;Strategy&nbsp;&nbsp;·&nbsp;&nbsp;Distribution&nbsp;&nbsp;·&nbsp;&nbsp;Artist Development
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-14">
          <a
            href="#contact"
            className="group flex items-center gap-2 px-7 py-4 rounded-full bg-[#FFB000] text-black font-bold text-sm hover:bg-[#FFC933] transition-colors"
          >
            Book Session
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#artists"
            className="flex items-center gap-2 px-7 py-4 rounded-full border border-white/25 text-white font-semibold text-sm hover:border-[#FFB000] hover:text-[#FFB000] transition-colors backdrop-blur-sm"
          >
            <Play size={13} fill="currentColor" /> Meet The Artists
          </a>
        </div>

        {/* Stats strip */}
        <div className="flex flex-wrap gap-8 md:gap-0 md:border-t md:border-white/10 md:pt-8">
          {stats.map((s, i) => (
            <div key={i} className="md:border-r md:border-white/10 md:pr-10 last:border-0">
              <div className="text-3xl md:text-4xl font-black text-[#FFB000] mb-0.5">
                <CountUp
                  target={s.value.replace("+", "").replace("K", "")}
                  suffix={s.value.includes("K") ? "K+" : "+"}
                />
              </div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="w-px h-10 bg-gradient-to-b from-[#FFB000]/50 to-transparent" />
      </div>
    </section>
  );
}
