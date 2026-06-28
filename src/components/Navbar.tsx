"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Artists", href: "#artists" },
  { label: "Packages", href: "#packages" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-18 py-4">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="text-xl font-black tracking-tight text-white group-hover:text-[#FFB000] transition-colors">
            SPEC CRAFT
          </span>
          <span className="text-[10px] tracking-[0.25em] text-[#FFB000] uppercase font-medium">
            Media Ltd
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 hover:text-[#FFB000] transition-colors duration-200 font-medium tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#contact"
            className="text-sm font-semibold px-5 py-2.5 rounded-full bg-[#FFB000] text-black hover:bg-[#FFC933] transition-colors"
          >
            Book Session
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/5 px-4 py-6 flex flex-col gap-5">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-base text-white/80 hover:text-[#FFB000] transition-colors font-medium"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 text-center text-sm font-bold px-6 py-3 rounded-full bg-[#FFB000] text-black"
            onClick={() => setOpen(false)}
          >
            Book Session
          </a>
        </div>
      )}
    </header>
  );
}
