const imageUrl =
  "https://pxouwgfpksichenstsgh.supabase.co/storage/v1/object/public/assets/";
export const board: {
  id: number;
  url: string;
  alt: string;
  name: string;
  position: string;
  textColor: string;
  description: string;
}[] = [
  {
    id: 1,
    url: `${imageUrl}president.jpeg?q=80&w=400&auto=format&fit=crop`,
    alt: "President",
    name: "Ruben Aguilera",
    position: "President",
    textColor: "text-barca-red",
    description: "Leading the vision and official Penya relations.",
  },
  {
    id: 2,
    url: `${imageUrl}vp.jpeg?q=80&w=400&auto=format&fit=crop`,
    alt: "Vice President",
    name: "Carlos “Chuck” Acuña",
    position: "Vice President",
    textColor: "text-barca-blue",
    description: "Overseeing matchday operations and events.",
  },
  {
    id: 3,
    url: `${imageUrl}sec.jpeg?q=80&w=400&auto=format&fit=crop`,
    alt: "Co-Vice President",
    name: "Daniel Lopez",
    position: "Co-Vice President",
    textColor: "text-yellow-500",
    description: "Oversees matchday logistics and headquarters operations.",
  },
  {
    id: 4,
    url: `${imageUrl}pr.jpeg?q=80&w=400&auto=format&fit=crop`,
    alt: "Frank Contreras - PR Director",
    name: "Frank Contreras",
    position: "PR & Charity Coordinator",
    textColor: "text-barca-red",
    description:
      "Spearheads our community outreach and charitable partnerships, ensuring our Penya gives back to San Diego.",
  },
  {
    id: 5,
    url: `${imageUrl}charities-jorge.jpeg?q=80&w=400&auto=format&fit=crop`,
    alt: "Jorge Sanchez Guillen - Charities & Event Counsel",
    name: "Jorge Sanchez Guillen",
    position: "Charities & Event Counsel",
    textColor: "text-barca-red",
    description:
      "Provides strategic guidance on event planning and charity initiatives to elevate our member experience for the upcoming season.",
  },
  {
    id: 6,
    url: `${imageUrl}charities-chuy.jpeg?q=80&w=400&auto=format&fit=crop`,
    alt: "Jesus “Chuy” Munoz - Charities & Event Counsel",
    name: "Jesus “Chuy” Munoz",
    position: "Charities & Event Counsel",
    textColor: "text-barca-red",
    description:
      "A dedicated advisor for seasonal activities, focused on expanding our charitable footprint and community impact.",
  },
  {
    id: 7,
    url: `${imageUrl}mendoza.jpg?q=80&w=400&auto=format&fit=crop`,
    alt: "Jonathan Mendoza - Digital & Creative Director",
    name: "Jonathan Mendoza",
    position: "Digital & Creative Director",
    textColor: "text-barca-blue",
    description:
      "The architect of our digital presence, leading web development and designing the visual identity that connects our community.",
  },
  {
    id: 8,
    url: `${imageUrl}josep-honorary.jpeg?q=80&w=400&auto=format&fit=crop`,
    alt: "Josep Martin - Honorary Member",
    name: "Josep Martin",
    position: "Honorary Penyista",
    textColor: "text-barca-gold",
    description:
      "A long-standing pillar of our penya, honored for his unwavering dedication to the values of FC Barcelona.",
  },
];
