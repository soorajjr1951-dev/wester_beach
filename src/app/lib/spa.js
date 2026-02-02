const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   NORMALIZE SPA (ROOMS STYLE)
========================= */
function normalizeSpa(item) {
  const s = item.attributes;

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
   GET ALL SPA SERVICES
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
      ? json.data.map(normalizeSpa)
      : [];
  } catch (error) {
    console.error("getSpaServices error:", error);
    return [];
  }
}

/* =========================
   GET SPA BY SLUG
========================= */
export async function getSpaBySlug(slug) {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/spa-services?filters[slug][$eq]=${slug}&populate=gallery`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Spa not found");

    const json = await res.json();
    if (!json.data?.length) return null;

    return normalizeSpa(json.data[0]);
  } catch (error) {
    console.error("getSpaBySlug error:", error);
    return null;
  }
}

/* =========================
   STATIC FEATURE (NO CMS)
========================= */
export function getSpaFeature() {
  return {
    title: "Signature Ayurvedic Rejuvenation",
    description:
      "A deeply restorative therapy combining Abhyanga, Shirodhara and herbal steam to realign body and mind.",
    image: "/spa/spa-feature.jpg",
  };
}
