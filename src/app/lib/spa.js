// lib/spa.js

const SPA_SERVICES = [
  {
    id: 1,
    slug: "abhyanga-therapy",
    category: "Ayurveda",
    name: "Abhyanga Therapy",
    description:
      "A full-body massage using warm herbal oils to nourish tissues and calm the nervous system.",
    long_description:
      "Abhyanga is a deeply restorative Ayurvedic massage using warm, medicated oils tailored to your dosha. It improves circulation, detoxifies tissues, calms the nervous system, and promotes deep relaxation.",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    slug: "shirodhara",
    category: "Rejuvenation",
    name: "Shirodhara",
    description:
      "Continuous pouring of warm oil on the forehead to induce deep relaxation.",
    long_description:
      "Shirodhara involves a steady stream of warm herbal oil poured on the forehead, calming the mind, improving sleep, reducing anxiety, and balancing the nervous system.",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    slug: "panchakarma-lite",
    category: "Detox",
    name: "Panchakarma Lite",
    description:
      "A gentle detox ritual designed to restore digestive fire and balance.",
    long_description:
      "Panchakarma Lite is a simplified detox therapy that removes toxins, improves digestion, and restores balance using time-tested Ayurvedic practices.",
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1622445272461-c6580cab8755?q=80&w=1200&auto=format&fit=crop",
  },
];

export function getSpaServices() {
  return SPA_SERVICES;
}

export function getSpaBySlug(slug) {
  return SPA_SERVICES.find((s) => s.slug === slug) || null;
}

/* FEATURE DATA */
export function getSpaFeature() {
  return {
    title: "The Wellness Bathtub Ritual.",
    description:
      "A sensory soak infused with flower petals, Himalayan salts, and sandalwood essence — grounding your energy as the sea breeze flows through the terrace.",
    image:
      "https://plus.unsplash.com/premium_photo-1658506799059-78e0f7a53bf8?q=80&w=1170&auto=format&fit=crop",
  };
}
