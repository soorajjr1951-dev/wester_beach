// lib/rooms.js
// Dummy data — backend ready later (Strapi / API)

const ROOMS = [
  {
    id: 1,
    slug: "normal-room",
    name: "Normal Room",
    category: "NON-AC",
    price: 1500,
    short_description:
      "A comfortable and affordable stay designed for simplicity and rest.",
    description:
      "Our Normal Rooms offer a peaceful stay with essential comforts, ideal for travelers seeking value and tranquility near the sea.",
    preview_image: "/rooms/normal/cover.JPG",
    gallery: [
      "/rooms/normal/1.JPG",
      "/rooms/normal/2.JPG",
      "/rooms/normal/3.JPG",
      "/rooms/normal/4.JPG",
      "/rooms/normal/5.JPG",
      "/rooms/normal/6.JPG",
      "/rooms/normal/7.JPG",
      "/rooms/normal/9.JPG",
    ],
  },

  {
    id: 2,
    slug: "super-deluxe-ac",
    name: "Super Deluxe Room",
    category: "AC",
    price: 2500,
    short_description:
      "An elegant air-conditioned retreat with enhanced comfort and space.",
    description:
      "The Super Deluxe AC Room blends modern amenities with serene interiors, offering a refined stay experience overlooking the coastal calm.",
    preview_image: "/rooms/delux-ac/cover.JPG",
    gallery: [
      "/rooms/delux-ac/1.JPG",
      "/rooms/delux-ac/2.JPG",
      "/rooms/delux-ac/3.JPG",
      "/rooms/delux-ac/4.JPG",
      "/rooms/delux-ac/5.JPG",
      "/rooms/delux-ac/6.JPG",
      "/rooms/delux-ac/7.JPG",
      "/rooms/delux-ac/8.JPG",
    ],
  },

  {
    id: 3,
    slug: "super-deluxe-non-ac",
    name: "Super Deluxe Room",
    category: "NON-AC",
    price: 2000,
    short_description:
      "Spacious deluxe comfort with natural ventilation and coastal breeze.",
    description:
      "Perfect for guests who enjoy fresh sea air, our Super Deluxe Non-AC rooms provide spacious interiors with thoughtful design.",
    preview_image: "/rooms/delux-non-ac/cover.JPG",
    gallery: [
      "/rooms/delux-non-ac/1.JPG",
      "/rooms/delux-non-ac/2.JPG",
      "/rooms/delux-non-ac/3.JPG",
      "/rooms/delux-non-ac/4.JPG",
      "/rooms/delux-non-ac/5.JPG",
      "/rooms/delux-non-ac/6.JPG",
      "/rooms/delux-non-ac/7.JPG",
      "/rooms/delux-non-ac/8.JPG",
    ],
  },

  {
    id: 4,
    slug: "suite-room-ac",
    name: "Suite Room",
    category: "AC",
    price: 3500,
    short_description:
      "Our most luxurious air-conditioned suite for a premium experience.",
    description:
      "The AC Suite Room offers expansive space, refined interiors, and elevated comfort — ideal for couples or long stays.",
    preview_image: "/rooms/suite-ac/cover.JPG",
    gallery: [
      "/rooms/suite-ac/1.JPG",
      "/rooms/suite-ac/2.JPG",
      "/rooms/suite-ac/3.JPG",
      "/rooms/suite-ac/4.JPG",
      "/rooms/suite-ac/5.JPG",
      "/rooms/suite-ac/6.JPG",
      "/rooms/suite-ac/7.JPG",
      "/rooms/suite-ac/8.JPG",
    ],
  },

  {
    id: 5,
    slug: "suite-room-non-ac",
    name: "Suite Room",
    category: "NON-AC",
    price: 3000,
    short_description:
      "A spacious non-AC suite with calming interiors and ocean air.",
    description:
      "Designed for those who prefer natural airflow, the Non-AC Suite Room delivers luxury with an earthy coastal feel.",
    preview_image: "/rooms/suite-non-ac/cover.JPG",
    gallery: [
      "/rooms/suite-non-ac/1.JPG",
      "/rooms/suite-non-ac/2.JPG",
      "/rooms/suite-non-ac/3.JPG",
      "/rooms/suite-non-ac/4.JPG",
      "/rooms/suite-non-ac/5.JPG",
      "/rooms/suite-non-ac/6.JPG",
      "/rooms/suite-non-ac/7.JPG",
      "/rooms/suite-non-ac/8.JPG",
    ],
  },
];

// =======================
// PUBLIC API
// =======================

export async function getRooms() {
  return ROOMS;
}

export async function getRoomBySlug(slug) {
  return ROOMS.find((room) => room.slug === slug) || null;
}
