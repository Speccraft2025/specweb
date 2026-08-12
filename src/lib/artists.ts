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
  spotifyUrl?: string;
};

export const artists: Artist[] = [
  {
    slug: "amin-worldwide",
    name: "Amin Worldwide",
    genre: "Afrobeat / Hip-Hop",
    tagline: "International sound, Nairobi roots.",
    bio: "Amin Worldwide is a Nairobi-based artist with a global perspective, blending Afrobeat, hip-hop and R&B into a signature sound that connects East Africa to the world.",
    extendedBio:
      "Amin Worldwide has built a reputation for bridging continents through music — his sound carries the energy of Nairobi's streets with the polish of international production. Known for his versatility and stage presence, he's collaborated across borders and earned a growing following on Spotify and beyond. Every record is a statement of intent: big, bold, and undeniably Kenyan.",
    achievements: [
      "Featured on major Spotify editorial playlists",
      "International collaborations across East Africa",
      "Consistent chart presence on Kenyan digital platforms",
      "Spec Craft Media flagship artist",
    ],
    releases: [
      { title: "Worldwide", year: "2024", type: "Single", coverColor: "from-blue-800 to-indigo-900" },
      { title: "No Limits", year: "2023", type: "Single", coverColor: "from-indigo-800 to-blue-900" },
      { title: "Global", year: "2023", type: "EP", coverColor: "from-blue-900 to-purple-900" },
    ],
    initial: "A",
    gradientFrom: "from-blue-600",
    gradientTo: "to-indigo-600",
    instagramUrl: "https://www.instagram.com/aminworldwideinternational/",
    spotifyUrl: "https://open.spotify.com/artist/5lQFMmaScJK4zHcRgn7r0I?si=CVWYux8DQky_2nPGYPa21A",
  },
  {
    slug: "sifa-kleen",
    name: "Sifa Kleen",
    genre: "Afro-Soul / R&B",
    tagline: "Clean sound. Real emotion. Pure Sifa.",
    bio: "Sifa Kleen is a soulful vocalist and songwriter from Nairobi, crafting R&B and Afro-soul music that's deeply personal and instantly relatable.",
    extendedBio:
      "Sifa Kleen's music is rooted in authenticity — her vocals carry lived experience and her writing cuts through to the heart of every listener. She blends smooth R&B production with Afro-soul textures, creating records that feel both contemporary and timeless. She has steadily built a loyal fanbase through honest storytelling and consistent releases that showcase her range as both a vocalist and songwriter.",
    achievements: [
      "Growing Spotify following across East Africa",
      "Featured in independent music media",
      "Consistent streaming growth quarter on quarter",
      "Celebrated for her raw, emotive vocal delivery",
    ],
    releases: [
      { title: "Kleen", year: "2024", type: "EP", coverColor: "from-pink-800 to-rose-900" },
      { title: "Sawa", year: "2023", type: "Single", coverColor: "from-rose-800 to-pink-900" },
      { title: "Nafsi", year: "2023", type: "Single", coverColor: "from-fuchsia-800 to-pink-900" },
    ],
    initial: "S",
    gradientFrom: "from-pink-500",
    gradientTo: "to-rose-500",
    instagramUrl: "https://www.instagram.com/sifakleen/",
    spotifyUrl: "https://open.spotify.com/artist/2Km9gfcIpZ5Rb2cbvVvCxE",
  },
  {
    slug: "jazel-dboy-isaac",
    name: "Jazel 'dBoy' Isaac",
    genre: "Hip-Hop / Trap",
    tagline: "Every bar a blueprint. Every track a statement.",
    bio: "Jazel 'dBoy' Isaac is a Nairobi rapper and creative director known for sharp lyricism, cinematic production, and an uncompromising artistic vision.",
    extendedBio:
      "Jazel 'dBoy' Isaac approaches music the way an architect approaches a building — every element is deliberate, every bar load-bearing. His hip-hop is dense with reference, wit, and cultural commentary, delivered over production that spans trap, boom-bap, and everything in between. Beyond the mic, he's a key creative force at Spec Craft Media, shaping the label's direction as much as its sound.",
    achievements: [
      "Creative director at Spec Craft Media",
      "Released multiple acclaimed solo projects",
      "Known for his lyrically dense, cinematic style",
      "Growing presence on East African rap circuits",
    ],
    releases: [
      { title: "Blueprint", year: "2024", type: "EP", coverColor: "from-orange-800 to-amber-900" },
      { title: "dBoy Season", year: "2023", type: "Single", coverColor: "from-amber-800 to-orange-900" },
      { title: "Statement", year: "2023", type: "Single", coverColor: "from-yellow-800 to-amber-900" },
    ],
    initial: "J",
    gradientFrom: "from-orange-500",
    gradientTo: "to-amber-500",
    instagramUrl: "https://www.instagram.com/dr_dboy/",
    spotifyUrl: "https://open.spotify.com/artist/45kik87XRCJ1mLxkdQsLE0",
  },
  {
    slug: "timeless",
    name: "Timeless",
    genre: "Gospel / Neo-Soul",
    tagline: "Music that outlasts the moment.",
    bio: "Timeless is a Nairobi-based gospel and neo-soul artist whose music bridges faith and feeling — uplifting, honest, and built to last.",
    extendedBio:
      "The name says it all. Timeless makes music with permanence in mind — records that speak to the spirit without losing the soul. Drawing from gospel tradition and neo-soul innovation, he crafts songs that work in the church and on the headphones alike. His sound has resonated with a broad audience across Kenya and the wider East African gospel community, and his Spotify catalogue continues to grow with each release.",
    achievements: [
      "Recognised in Kenya's gospel music community",
      "Streaming catalogue growing on Spotify",
      "Performs across faith-based and mainstream platforms",
      "Known for his powerful live worship sets",
    ],
    releases: [
      { title: "Forever", year: "2024", type: "EP", coverColor: "from-green-800 to-emerald-900" },
      { title: "Milele", year: "2023", type: "Single", coverColor: "from-emerald-800 to-teal-900" },
      { title: "Nguvu", year: "2023", type: "Single", coverColor: "from-teal-800 to-green-900" },
    ],
    initial: "T",
    gradientFrom: "from-green-500",
    gradientTo: "to-emerald-500",
    instagramUrl: "https://www.instagram.com/timeless_joe/",
    spotifyUrl: "https://open.spotify.com/artist/1y06QoyTjBBLrW4laycsVA?si=snoC2jWlR1mjTLOGGsrfJA",
  },
];

export function getArtist(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}
