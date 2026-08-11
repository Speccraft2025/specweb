export type Release = {
  title: string;
  year: string;
  type: "Single" | "EP" | "Album" | "Collab";
  spotifyUrl?: string;
  youtubeUrl?: string;
  coverColor: string;
};

export type Artist = {
  slug: string;
  name: string;
  genre: string;
  tagline: string;
  bio: string;
  extendedBio: string;
  achievements: string[];
  releases: Release[];
  initial: string;
  gradientFrom: string;
  gradientTo: string;
  instagramUrl?: string;
  youtubeUrl?: string;
};

export const artists: Artist[] = [
  {
    slug: "zara-m",
    name: "Zara M",
    genre: "Afro-Soul / R&B",
    tagline: "Where Swahili storytelling meets contemporary R&B.",
    bio: "Nairobi-born vocalist blending Swahili storytelling with contemporary R&B production. Known for her powerful live performances and deeply personal lyricism.",
    extendedBio:
      "Zara M grew up in Nairobi's Westlands district, surrounded by a household that balanced classical Kenyan music with international R&B. She began writing at 14, performing at school events before catching the attention of Spec Craft Media in 2022. Her debut EP sold out its physical run in three days and earned her two nominations at the Nairobi Music Awards. Every song she writes is a conversation — between past and present, between tradition and modernity.",
    achievements: [
      "2x Best Female Artist — Nairobi Music Awards",
      "100K+ streams on debut EP",
      "Featured on KBC Radio",
      "Performed at Blankets & Wine 2023",
    ],
    releases: [
      { title: "Echoes", year: "2024", type: "EP", coverColor: "from-purple-800 to-pink-900" },
      { title: "Midnight Drive", year: "2023", type: "EP", coverColor: "from-indigo-800 to-purple-900" },
      { title: "Nafsi", year: "2023", type: "Single", coverColor: "from-pink-800 to-rose-900" },
      { title: "City Girl", year: "2022", type: "Single", coverColor: "from-violet-800 to-purple-900" },
    ],
    initial: "Z",
    gradientFrom: "from-purple-600",
    gradientTo: "to-pink-600",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com",
  },
  {
    slug: "dre-wako",
    name: "Dre Wako",
    genre: "Afrobeat / Hip-Hop",
    tagline: "Raw, cinematic, authentic — Eastlands to the world.",
    bio: "Multi-genre producer and rapper from Eastlands, Nairobi. Dre Wako's music is a collision of trap, Afrobeat and spoken word — raw, cinematic, authentic.",
    extendedBio:
      "Dre Wako learned to produce on a cracked version of FL Studio in a one-room house in Eastlands. What began as beats for friends became a full creative identity — layered with field recordings from Nairobi's streets, Luhya percussion samples, and trap hi-hats that hit harder than most. His debut video crossed 1M views in two weeks, and his collaboration run with regional artists has made him one of the most in-demand producers in East Africa.",
    achievements: [
      "1M+ views on debut video",
      "Collaboration with 12+ regional artists",
      "Headlined Blankets & Wine",
      "Featured on NRG Radio Top 10",
    ],
    releases: [
      { title: "Streets Talk", year: "2024", type: "EP", coverColor: "from-orange-800 to-yellow-900" },
      { title: "Eastlands Chronicles", year: "2023", type: "EP", coverColor: "from-amber-800 to-orange-900" },
      { title: "No Cap", year: "2023", type: "Single", coverColor: "from-yellow-800 to-amber-900" },
      { title: "Eastlands", year: "2022", type: "Single", coverColor: "from-orange-900 to-red-900" },
    ],
    initial: "D",
    gradientFrom: "from-orange-500",
    gradientTo: "to-yellow-500",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com",
  },
  {
    slug: "malkia",
    name: "Malkia",
    genre: "Gospel / Neo-Soul",
    tagline: "Spirit-led sound that transcends the church walls.",
    bio: "Spirit-led artist crafting gospel music that transcends the church walls. Malkia's sound is soulful, orchestral, and deeply moving.",
    extendedBio:
      "Malkia sang in the choir before she could read. Raised in a Pentecostal home in Kiambu, she grew up with gospel as her first language — but always heard jazz, soul, and neo-soul underneath the hymns. Her music bridges the sacred and the secular without compromise, reaching audiences who wouldn't normally enter a church and worshippers who rarely listen to R&B. Her viral TikTok moment in 2023 brought her to national radio and a growing pan-African audience.",
    achievements: [
      "Gospel Music Kenya Award Nominee 2024",
      "Viral TikTok moment — 500K views",
      "Nationwide radio play",
      "Featured in Citizen TV Faith segment",
    ],
    releases: [
      { title: "Grace", year: "2024", type: "EP", coverColor: "from-green-800 to-teal-900" },
      { title: "Nimekuona", year: "2023", type: "Single", coverColor: "from-emerald-800 to-green-900" },
      { title: "Milele", year: "2023", type: "Single", coverColor: "from-teal-800 to-cyan-900" },
      { title: "Nguvu Yangu", year: "2022", type: "Single", coverColor: "from-green-900 to-emerald-900" },
    ],
    initial: "M",
    gradientFrom: "from-green-500",
    gradientTo: "to-teal-500",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com",
  },
  {
    slug: "phantom-x",
    name: "Phantom X",
    genre: "Electronic / Afrofusion",
    tagline: "Creating worlds, not just songs.",
    bio: "Producer and multi-instrumentalist pushing the boundaries of what East African electronic music can be. Phantom X creates worlds, not just songs.",
    extendedBio:
      "Phantom X is an anomaly in East African music — a classically trained pianist who discovered electronic production at 19 and never looked back. His sets blend live Ngoni samples with synthesizers, club-ready percussion with ambient soundscapes. He has been showcased at Afrikin Festival, licensed his music to an African drama series, and built an international following through Bandcamp and SoundCloud. Phantom X doesn't make music for a genre — he makes music for the feeling.",
    achievements: [
      "Showcased at Afrikin Festival 2024",
      "International playlist features on Spotify",
      "Sync placement — African drama series",
      "Bandcamp top seller — Electronic Africa",
    ],
    releases: [
      { title: "Frequencies Vol. 1", year: "2024", type: "EP", coverColor: "from-blue-800 to-cyan-900" },
      { title: "Pulse", year: "2023", type: "EP", coverColor: "from-cyan-800 to-blue-900" },
      { title: "Rift Valley Dreams", year: "2023", type: "Single", coverColor: "from-sky-800 to-blue-900" },
      { title: "001", year: "2022", type: "Single", coverColor: "from-blue-900 to-indigo-900" },
    ],
    initial: "P",
    gradientFrom: "from-blue-500",
    gradientTo: "to-cyan-500",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com",
  },
];

export function getArtist(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}
