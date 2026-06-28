"use client";

import { useState } from "react";
import { ArrowRight, MessageCircle, MapPin, Clock, Phone, Mail } from "lucide-react";

const projectTypes = [
  "Recording Session",
  "Music Video",
  "Artist Development",
  "Brand Campaign",
  "EP / Album",
  "Podcast Production",
  "Other",
];

const budgetRanges = [
  "Under KES 10,000",
  "KES 10,000 – 30,000",
  "KES 30,000 – 100,000",
  "KES 100,000 – 300,000",
  "KES 300,000+",
  "Let's discuss",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-[#0a0a0a] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-3 py-1.5 border border-[#FFB000]/30 rounded-full">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#FFB000] uppercase">
              Get In Touch
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Ready To Build{" "}
            <span className="gradient-text">Something Bigger?</span>
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto">
            Tell us about your project and let&apos;s figure out how to make it happen.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-[#111] border border-[#FFB000]/30 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#FFB000]/10 border border-[#FFB000]/30 flex items-center justify-center mx-auto mb-6">
                  <ArrowRight size={24} className="text-[#FFB000]" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">We Got Your Message!</h3>
                <p className="text-white/40 text-base">
                  We&apos;ll get back to you within 24 hours. In the meantime, follow us on Instagram for daily studio content.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                      Full Name *
                    </label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#FFB000]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#FFB000]/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+254 7XX XXX XXX"
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#FFB000]/50 transition-colors"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                      Project Type *
                    </label>
                    <select
                      required
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#FFB000]/50 transition-colors appearance-none"
                    >
                      <option value="" disabled>Select type...</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#FFB000]/50 transition-colors appearance-none"
                    >
                      <option value="" disabled>Select range...</option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                    Tell Us About Your Project *
                  </label>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="What are you working on? What do you need? What's your vision?"
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#FFB000]/50 transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-full bg-[#FFB000] text-black font-bold text-sm hover:bg-[#FFC933] transition-colors"
                  >
                    Let&apos;s Work Together <ArrowRight size={15} />
                  </button>
                  <a
                    href="https://wa.me/254700000000?text=Hi%20Spec%20Craft%20Media%2C%20I%27d%20like%20to%20book%20a%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-4 px-6 rounded-full border border-green-500/40 text-green-400 font-semibold text-sm hover:bg-green-500/10 transition-colors"
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Studio info */}
            <div className="bg-[#111] border border-white/8 rounded-2xl p-7">
              <h3 className="text-base font-black text-white mb-6">Studio Info</h3>
              <div className="space-y-5">
                <div className="flex gap-3">
                  <MapPin size={16} className="text-[#FFB000] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white mb-0.5">Location</div>
                    <div className="text-sm text-white/45">Nairobi, Kenya</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock size={16} className="text-[#FFB000] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white mb-0.5">Hours</div>
                    <div className="text-sm text-white/45">Mon–Sat: 9AM – 10PM</div>
                    <div className="text-sm text-white/45">Sunday: By Appointment</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone size={16} className="text-[#FFB000] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white mb-0.5">Phone</div>
                    <div className="text-sm text-white/45">+254 700 000 000</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail size={16} className="text-[#FFB000] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-white mb-0.5">Email</div>
                    <div className="text-sm text-white/45">hello@speccraftmedia.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Book consultation CTA */}
            <div className="bg-gradient-to-br from-[#FFB000]/10 to-transparent border border-[#FFB000]/20 rounded-2xl p-7">
              <h3 className="text-base font-black text-white mb-2">Prefer a Call?</h3>
              <p className="text-sm text-white/45 mb-5 leading-relaxed">
                Book a free 30-minute consultation with our team to discuss your project.
              </p>
              <a
                href="https://calendly.com/speccraftmedia"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-full border border-[#FFB000]/40 text-[#FFB000] font-semibold text-sm hover:bg-[#FFB000]/10 transition-colors"
              >
                Book A Consultation
              </a>
            </div>

            {/* Map placeholder */}
            <div className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden h-48 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={28} className="text-[#FFB000]/40 mx-auto mb-2" />
                <p className="text-xs text-white/25 uppercase tracking-widest">Nairobi, Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
