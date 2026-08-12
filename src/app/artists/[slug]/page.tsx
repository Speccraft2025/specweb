import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Play, ExternalLink } from "lucide-react";
import { artists, getArtist } from "@/lib/artists";

export function generateStaticParams() {
  return artists.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const artist = getArtist(params.slug);
  if (!artist) return {};
  return {
    title: `${artist.name} | Spec Craft Media`,
    description: artist.bio,
  };
}

export default function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = getArtist(params.slug);
  if (!artist) notFound();

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      {/* Hero */}
      <section className={`relative min-h-[70vh] flex items-end bg-gradient-to-br ${artist.gradientFrom} ${artist.gradientTo} overflow-hidden`}>
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-[100px]" />

        {/* Initial placeholder */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white/8 border border-white/15 flex items-center justify-center">
          <span className="text-8xl font-black text-white/30">{artist.initial}</span>
        </div>

        {/* Back link */}
        <div className="absolute top-28 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <Link
              href="/#artists"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#FFB000] transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} /> Back to Roster
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-16 w-full">
          <p className="text-[#FFB000] text-xs font-bold uppercase tracking-[0.3em] mb-3">{artist.genre}</p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none mb-4">
            {artist.name}
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-lg leading-relaxed">{artist.tagline}</p>

          {/* Social links */}
          <div className="flex gap-3 mt-8">
            {artist.instagramUrl && (
              <a href={artist.instagramUrl} target="_blank" rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-white/20 text-white/60 text-xs font-semibold hover:border-[#FFB000]/50 hover:text-[#FFB000] transition-colors flex items-center gap-2">
                <ExternalLink size={12} /> Instagram
              </a>
            )}
            {artist.spotifyUrl && (
              <a href={artist.spotifyUrl} target="_blank" rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-white/20 text-white/60 text-xs font-semibold hover:border-[#1DB954]/50 hover:text-[#1DB954] transition-colors flex items-center gap-2">
                <ExternalLink size={12} /> Spotify
              </a>
            )}
            {artist.youtubeUrl && (
              <a href={artist.youtubeUrl} target="_blank" rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-white/20 text-white/60 text-xs font-semibold hover:border-[#FFB000]/50 hover:text-[#FFB000] transition-colors flex items-center gap-2">
                <ExternalLink size={12} /> YouTube
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Left: Bio + Achievements */}
          <div className="lg:col-span-1 space-y-12">
            {/* Bio */}
            <div>
              <h2 className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-5">About</h2>
              <p className="text-white/70 leading-relaxed text-base">{artist.extendedBio}</p>
            </div>

            {/* Achievements */}
            <div>
              <h2 className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-5">Highlights</h2>
              <div className="space-y-3">
                {artist.achievements.map((a) => (
                  <div key={a} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFB000] mt-2 flex-shrink-0" />
                    <span className="text-sm text-white/60 leading-relaxed">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-[#FFB000]/8 border border-[#FFB000]/20 rounded-2xl p-6">
              <p className="text-sm font-semibold text-white mb-1">Work With This Artist</p>
              <p className="text-xs text-white/40 mb-4 leading-relaxed">Bookings, collaborations, and sync licensing.</p>
              <Link
                href="/#contact"
                className="block text-center py-3 rounded-full bg-[#FFB000] text-black font-bold text-xs hover:bg-[#FFC933] transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </div>

          {/* Right: Discography */}
          <div className="lg:col-span-2">
            <h2 className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-8">Discography</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {artist.releases.map((release) => (
                <div
                  key={release.title}
                  className="group bg-[#111] border border-white/8 rounded-2xl overflow-hidden hover-lift"
                >
                  {/* Cover art placeholder */}
                  <div className={`relative h-48 bg-gradient-to-br ${release.coverColor} flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-black/20" />
                    {/* Play button */}
                    <button className="relative w-14 h-14 rounded-full bg-black/40 border border-white/20 flex items-center justify-center group-hover:bg-[#FFB000]/20 group-hover:border-[#FFB000]/50 transition-all duration-300">
                      <Play size={18} className="text-white group-hover:text-[#FFB000] fill-current transition-colors" />
                    </button>
                    {/* Type badge */}
                    <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/60 rounded-full">
                      <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">{release.type}</span>
                    </div>
                    <div className="absolute top-4 right-4 px-2.5 py-1 bg-black/60 rounded-full">
                      <span className="text-[10px] font-bold text-[#FFB000] tracking-wider">{release.year}</span>
                    </div>
                  </div>

                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-black text-white">{release.title}</h3>
                      <p className="text-[11px] text-white/35 mt-0.5">{release.year} · {release.type}</p>
                    </div>
                    <div className="flex gap-2">
                      {release.spotifyUrl && (
                        <a href={release.spotifyUrl} target="_blank" rel="noopener noreferrer"
                          className="text-[10px] font-semibold text-white/40 hover:text-[#1DB954] transition-colors px-3 py-1.5 border border-white/10 rounded-full hover:border-[#1DB954]/30">
                          Spotify
                        </a>
                      )}
                      {release.youtubeUrl && (
                        <a href={release.youtubeUrl} target="_blank" rel="noopener noreferrer"
                          className="text-[10px] font-semibold text-white/40 hover:text-red-400 transition-colors px-3 py-1.5 border border-white/10 rounded-full hover:border-red-400/30">
                          YouTube
                        </a>
                      )}
                      {!release.spotifyUrl && !release.youtubeUrl && (
                        <span className="text-[10px] text-white/20 px-3 py-1.5">Coming soon</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Videos section placeholder */}
            <div className="mt-12">
              <h2 className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-8">Videos</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[0, 1].map((i) => (
                  <div key={i} className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden aspect-video flex items-center justify-center group hover-lift cursor-pointer">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#FFB000]/10 group-hover:border-[#FFB000]/30 transition-all">
                        <Play size={20} className="text-white/30 group-hover:text-[#FFB000] fill-current transition-colors" />
                      </div>
                      <p className="text-[10px] text-white/20 uppercase tracking-widest">Video coming soon</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other artists */}
      <div className="border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-8">Also on the Roster</h2>
          <div className="flex flex-wrap gap-3">
            {artists
              .filter((a) => a.slug !== artist.slug)
              .map((a) => (
                <Link
                  key={a.slug}
                  href={`/artists/${a.slug}`}
                  className={`group flex items-center gap-3 px-4 py-3 bg-[#111] border border-white/8 rounded-xl hover:border-[#FFB000]/30 transition-all`}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${a.gradientFrom} ${a.gradientTo} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-xs font-black text-white">{a.initial}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-[#FFB000] transition-colors">{a.name}</p>
                    <p className="text-[10px] text-white/35">{a.genre}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
