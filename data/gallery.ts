export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: "community" | "pilgrimage" | "vip";
};

// Replace these filenames with the actual ones you uploaded to Supabase
// Base URL for your Supabase bucket
const BUCKET_URL =
  "https://pxouwgfpksichenstsgh.supabase.co/storage/v1/object/public/gallery";

export const galleryData: GalleryItem[] = [
  // --- SECTION A: The Global Network (Card Stack) ---
  {
    id: "bayerischer",
    category: "community",
    src: `${BUCKET_URL}/bayerischer.JPG`,
    alt: "Penya members in Bayerischer Hof",
    caption: "Exchanging scarves with Penya Blaugrana Bayerischer Hof.",
  },
  {
    id: "sf-trip",
    category: "community",
    src: `${BUCKET_URL}/san_fran.JPG`,
    alt: "Group photo in San Francisco",
    caption: "Meeting with Penya Blaugrana San Francisco.",
  },
  {
    id: "dublin-trip",
    category: "community",
    src: `${BUCKET_URL}/dublin.JPG`,
    alt: "Group photo in Dublin",
    caption: "Meeting with Penya Blaugrana Dublin.",
  },
  {
    id: "las-vegas-trip",
    category: "community",
    src: `${BUCKET_URL}/las_vegas.JPG`,
    alt: "Group photo in Las Vegas",
    caption: "Meeting with Penya Blaugrana Las Vegas.",
  },

  // --- SECTION B: The Pilgrimage (Masonry Grid) ---
  {
    id: "pbsd-flag",
    category: "pilgrimage",
    src: `${BUCKET_URL}/pbsdflag_campnou.JPG`,
    alt: "Wide shot of Camp Nou",
    caption:
      "The Cathedral. There is no feeling like walking through these gates.",
  },
  {
    id: "mountjic-2",
    category: "pilgrimage",
    src: `${BUCKET_URL}/mountjic2.JPG`,
    alt: "Penya members outside Mountjic",
    caption: "Penya members outside Mountjic.",
  },
  {
    id: "trophies",
    category: "pilgrimage",
    src: `${BUCKET_URL}/trophies.JPG`,
    alt: "Barcelona trophies",
    caption: "Barcelona trophies",
  },
  {
    id: "camp-nou-meet",
    category: "pilgrimage",
    src: `${BUCKET_URL}/outside_stadium.JPG`,
    alt: "Penya members outside Camp Nou",
    caption: "Penya members outside Camp Nou.",
  },
  {
    id: "scarf-display",
    category: "pilgrimage",
    src: `${BUCKET_URL}/scarf_insidecamp.JPG`,
    alt: "Penya members inside Camp Nou",
    caption: "Penya members inside Camp Nou.",
  },

  // --- SECTION C: Inner Circle (Accordion Slider) ---
  {
    id: "mountjic",
    category: "vip",
    src: `${BUCKET_URL}/mountjic.JPG`,
    alt: "Penya members outside Mountjic",
    caption: "Penya members outside Mountjic.",
  },
  {
    id: "hansi",
    category: "vip",
    src: `${BUCKET_URL}/hansi_meet.JPG`,
    alt: "Meeting Hansi Flick",
    caption: "Member with Hansi Flick.",
  },
  // {
  //   id: "bein",
  //   category: "vip",
  //   src: `${BUCKET_URL}/bein_meet.JPG`,
  //   alt: "BEIN broadcast team",
  //   caption: "Members with beIN broadcast team.",
  // },
  {
    id: "rafa",
    category: "vip",
    src: `${BUCKET_URL}/rafa_meet.JPG`,
    alt: "Rafael Marquez",
    caption: "Barcelona legend Rafael Marquez.",
  },
  {
    id: "lewandowski",
    category: "vip",
    src: `${BUCKET_URL}/robert_meet.JPG`,
    alt: "Robert Lewandowski",
    caption: "The Polish striker Robert Lewandowski.",
  },
  {
    id: "sergi",
    category: "vip",
    src: `${BUCKET_URL}/roberto_meet.JPG`,
    alt: "Sergiño Dest",
    caption: "The Spanish defender Sergiño Dest.",
  },
  {
    id: "laporta",
    category: "vip",
    src: `${BUCKET_URL}/laporta_meet.JPG`,
    alt: "Meeting Joan Laporta",
    caption: "Our President & First Lady sharing a moment with Joan Laporta.",
  },
];
