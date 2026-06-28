"use client";

const pillars = [
  "Audio Production",
  "Video Production",
  "Branding",
  "Distribution",
  "Publishing",
  "Promotion",
  "Strategy",
  "Artist Development",
];

export default function About() {
  return (
    <section id="about" className="bg-[#0a0a0a] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-block mb-6 px-3 py-1.5 border border-[#FFB000]/30 rounded-full">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#FFB000] uppercase">
                Who We Are
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 text-white">
              We Don&apos;t Just{" "}
              <span className="gradient-text">Record Music.</span>
              <br />
              We Build Careers.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Spec Craft Media Ltd is an independent music company based in Nairobi
              helping artists create, package, market and monetize their work.
            </p>
            <p className="text-white/40 text-base leading-relaxed mb-12">
              We&apos;re more than a studio — we&apos;re an infrastructure company built for
              the African creative economy. From your first recording to your global
              release, we&apos;re with you at every step.
            </p>

            {/* Pillars */}
            <div className="flex flex-wrap gap-2.5">
              {pillars.map((p) => (
                <span
                  key={p}
                  className="px-4 py-2 text-xs font-semibold tracking-wider text-[#FFB000] border border-[#FFB000]/25 rounded-full bg-[#FFB000]/5 hover:bg-[#FFB000]/10 transition-colors"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            {/* Mission card */}
            <div className="relative bg-[#111] border border-white/8 rounded-2xl p-8 md:p-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FFB000]/5 blur-[60px] pointer-events-none" />
              <div className="relative z-10">
                <div className="text-[#FFB000] text-4xl font-black leading-none mb-6">&ldquo;</div>
                <p className="text-white text-xl md:text-2xl font-semibold leading-relaxed mb-8">
                  To build an ecosystem where African creatives can own their work,
                  grow sustainable audiences, and compete globally.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-0.5 bg-[#FFB000]" />
                  <span className="text-xs text-white/50 uppercase tracking-widest font-medium">
                    Our Mission
                  </span>
                </div>
              </div>
            </div>

            {/* Accent blocks */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-[#FFB000]/10 border border-[#FFB000]/20 -z-10" />
            <div className="absolute -top-6 -left-6 w-20 h-20 rounded-xl bg-white/3 border border-white/8 -z-10" />
          </div>
        </div>

        {/* Bottom numbers */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-0.5 rounded-2xl overflow-hidden border border-white/5">
          {[
            { label: "Founded", value: "2019", sub: "Nairobi, Kenya" },
            { label: "Scope", value: "Pan-African", sub: "Global distribution" },
            { label: "Artists", value: "Independent", sub: "100% artist-owned" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[#111] px-8 py-8 flex flex-col gap-1 hover:bg-[#161616] transition-colors"
            >
              <span className="text-[10px] text-white/30 uppercase tracking-widest">{item.label}</span>
              <span className="text-2xl font-black text-white">{item.value}</span>
              <span className="text-sm text-white/40">{item.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
