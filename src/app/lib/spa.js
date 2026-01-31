const SPA_SERVICES = [
  {
    id: 1,
    slug: "pedicure",
    category: "Foot Care",
    name: "Pedicure",
    description:
      "A rejuvenating foot treatment including exfoliation, massage, and nail care.",
    long_description:
      "Our Pedicure service includes foot soaking, exfoliation, cuticle care, massage, and polish application. It leaves your feet soft, relaxed, and beautifully groomed.",
    price: 2500,

    gallery: [
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200",
    ],
  },

  {
    id: 2,
    slug: "head-wash",
    category: "Hair Care",
    name: "Head Wash",
    description:
      "A therapeutic scalp cleansing and massage to rejuvenate your hair.",
    long_description:
      "Deep scalp cleansing, soothing massage, and herbal treatments to promote hair health and relaxation.",
    price: 1500,

    gallery: [
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200",
    ],
  },

  {
    id: 3,
    slug: "fish-spa",
    category: "Therapy",
    name: "Fish Spa",
    description:
      "A gentle aquatic therapy where fish exfoliate dead skin.",
    long_description:
      "A unique and relaxing treatment where small fish gently remove dead skin cells, leaving your skin soft and refreshed.",
    price: 2800,

    gallery: [
      "https://images.unsplash.com/photo-1622445272461-c6580cab8755?q=80&w=1200",
    ],
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
