const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   NORMALIZE SPA SERVICE
========================= */
function normalizeSpa(item) {
  const s = item?.attributes;
  if (!s) return null;

  return {
    id: item.id,
    name: s.name ?? "",
    slug: s.slug ?? "",
    category: s.category ?? "",
    price: s.price ?? 0,
    description: s.description ?? "",
    long_description: s.long_description ?? "",

    gallery: Array.isArray(s.gallery?.data)
      ? s.gallery.data.map(
          (img) => `${STRAPI_URL}${img.attributes.url}`
        )
      : [],
  };
}

/* =========================
   GET SPA SERVICES
========================= */
export async function getSpaServices() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/spa-services?populate=gallery&sort=price:asc`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch spa services");

    const json = await res.json();

    return Array.isArray(json.data)
      ? json.data.map(normalizeSpa).filter(Boolean)
      : [];
  } catch (err) {
    console.error("getSpaServices error:", err);
    return [];
  }
}

/* =========================
   SPA FEATURE (STATIC – SAFE)
========================= */
export function getSpaFeature() {
  return {
    title: "Signature Ayurvedic Rejuvenation",
    description:
      "A deeply restorative ritual combining Abhyanga, Shirodhara and herbal steam therapy to rebalance the body and calm the mind.",
    image: "/spa/spa-feature.jpg", // MUST exist in /public/spa/
  };
}
