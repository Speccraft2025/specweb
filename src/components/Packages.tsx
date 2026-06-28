"use client";

import { Check, Zap } from "lucide-react";

const packages = [
  {
    name: "Recording Package",
    price: "KES 5,000",
    priceSuffix: "/ session",
    tag: "Most Popular",
    description: "Everything you need to get your sound out there.",
    features: [
      "Professional Studio Recording",
      "Mixing & Mastering",
      "Custom Cover Art",
      "Distribution Assistance",
      "1-on-1 Artist Consultation",
      "Digital Release Support",
    ],
    cta: "Book Now",
    highlight: false,
  },
  {
    name: "Visual Package",
    price: "KES 15,000",
    priceSuffix: "/ project",
    tag: "Best Value",
    description: "Complete visual identity for your music release.",
    features: [
      "Full Music Video Production",
      "Professional Photography Session",
      "Short-form Content (3 Reels)",
      "Promo Assets & Covers",
      "Color Grading & Edit",
      "Social Media Cutdowns",
    ],
    cta: "Get Started",
    highlight: true,
  },
  {
    name: "Artist Growth Package",
    price: "Custom",
    priceSuffix: "/ month",
    tag: "Complete Ecosystem",
    description: "Full-service career development, month by month.",
    features: [
      "Everything in Recording + Visual",
      "Artist Development Coaching",
      "Release Rollout Strategy",
      "Brand Positioning & Positioning",
      "Audience Growth Management",
      "Publishing & Distribution",
      "Monthly Performance Reviews",
      "Priority Studio Access",
    ],
    cta: "Schedule Call",
    highlight: false,
  },
];

export default function Packages() {
  return (
    <section id="packages" className="bg-[#0a0a0a] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1.5 border border-[#FFB000]/30 rounded-full">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#FFB000] uppercase">
              Pricing
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Invest In Your{" "}
            <span className="gradient-text">Career.</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto text-base">
            Transparent pricing built for independent artists at every stage of their journey.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden flex flex-col ${
                pkg.highlight
                  ? "border-2 border-[#FFB000] bg-[#111]"
                  : "border border-white/8 bg-[#111]"
              } hover-lift`}
            >
              {/* Featured glow */}
              {pkg.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFB000] to-transparent" />
              )}

              <div className="p-8 flex-1">
                {/* Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full ${
                      pkg.highlight
                        ? "bg-[#FFB000] text-black"
                        : "bg-white/5 text-white/40"
                    }`}
                  >
                    {pkg.tag}
                  </span>
                  {pkg.highlight && <Zap size={16} className="text-[#FFB000]" />}
                </div>

                <h3 className="text-xl font-black text-white mb-2">{pkg.name}</h3>
                <p className="text-white/40 text-sm mb-8 leading-relaxed">{pkg.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-xs text-white/30 uppercase tracking-widest">Starting from</span>
                  <div className="flex items-end gap-1 mt-1">
                    <span
                      className={`text-3xl font-black ${
                        pkg.highlight ? "text-[#FFB000]" : "text-white"
                      }`}
                    >
                      {pkg.price}
                    </span>
                    <span className="text-white/40 text-sm mb-1">{pkg.priceSuffix}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          pkg.highlight
                            ? "bg-[#FFB000]/20 text-[#FFB000]"
                            : "bg-white/8 text-white/50"
                        }`}
                      >
                        <Check size={10} />
                      </div>
                      <span className="text-sm text-white/60">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="p-8 pt-0">
                <a
                  href="#contact"
                  className={`block w-full text-center py-3.5 rounded-full font-bold text-sm transition-all duration-200 ${
                    pkg.highlight
                      ? "bg-[#FFB000] text-black hover:bg-[#FFC933]"
                      : "border border-white/15 text-white hover:border-[#FFB000]/50 hover:text-[#FFB000]"
                  }`}
                >
                  {pkg.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Custom note */}
        <p className="text-center text-white/25 text-sm mt-8">
          All packages customizable. Bulk session rates available.{" "}
          <a href="#contact" className="text-[#FFB000]/60 hover:text-[#FFB000] underline transition-colors">
            Let&apos;s talk.
          </a>
        </p>
      </div>
    </section>
  );
}
