const imageUrl =
  "https://pxouwgfpksichenstsgh.supabase.co/storage/v1/object/public/assets/";

// 1. DATA STRUCTURE CHANGE: Removed text, added 'roleKey'
export const boardMembers = [
  {
    id: 1,
    url: `${imageUrl}president.jpeg?q=80&w=400&auto=format&fit=crop`,
    name: "Ruben Aguilera",
    roleKey: "president", // Matches JSON prefix
    textColor: "text-barca-red",
  },
  {
    id: 2,
    url: `${imageUrl}vp.jpeg?q=80&w=400&auto=format&fit=crop`,
    name: "Carlos “Chuck” Acuña",
    roleKey: "vp",
    textColor: "text-barca-blue",
  },
  {
    id: 3,
    url: `${imageUrl}sec.jpeg?q=80&w=400&auto=format&fit=crop`,
    name: "Daniel Lopez",
    roleKey: "covp",
    textColor: "text-yellow-500",
  },
  {
    id: 4,
    url: `${imageUrl}pr.jpeg?q=80&w=400&auto=format&fit=crop`,
    name: "Frank Contreras",
    roleKey: "pr",
    textColor: "text-barca-red",
  },
  {
    id: 5,
    url: `${imageUrl}charities-jorge.jpeg?q=80&w=400&auto=format&fit=crop`,
    name: "Jorge Sanchez Guillen",
    roleKey: "counsel",
    textColor: "text-barca-red",
  },
  {
    id: 6,
    url: `${imageUrl}charities-chuy.jpeg?q=80&w=400&auto=format&fit=crop`,
    name: "Jesus “Chuy” Munoz",
    roleKey: "advisor",
    textColor: "text-barca-red",
  },
  {
    id: 7,
    url: `${imageUrl}mendoza.jpg?q=80&w=400&auto=format&fit=crop`,
    name: "Jonathan Mendoza",
    roleKey: "digital",
    textColor: "text-barca-blue",
  },
  {
    id: 8,
    url: `${imageUrl}josep-honorary.jpeg?q=80&w=400&auto=format&fit=crop`,
    name: "Josep Martin",
    roleKey: "honorary",
    textColor: "text-barca-gold",
  },
];
