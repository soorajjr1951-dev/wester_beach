const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   NORMALIZE SPA SERVICE
========================= */
function normalizeSpa(item) {
  const s = item?.attributes;
  if (!s) return null; // 🔒 SAFETY

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
      ? json.data
          .map(normalizeSpa)
          .filter(Boolean) // 🔥 REMOVE BROKEN ENTRIES
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
   GET SPA FEATURE (CMS)
========================= */
export async function getSpaFeature() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/spa-features?populate=feature_image`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch spa feature");

    const json = await res.json();
    const f = json.data?.[0]?.attributes;
    if (!f) return null;

    return {
      title: f.title ?? "",
      description: f.description ?? "",
      image: f.feature_image?.data?.attributes?.url
        ? `${STRAPI_URL}${f.feature_image.data.attributes.url}`
        : "/spa/spa-feature.jpg",
    };
  } catch (error) {
    console.error("getSpaFeature error:", error);
    return null;
  }
}
