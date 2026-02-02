const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   NORMALIZE SPA
========================= */
function normalizeSpa(item) {
  const s = item.attributes;

  return {
    id: item.id,
    name: s.name,
    slug: s.slug,
    category: s.category,
    price: s.price,
    description: s.description,
    long_description: s.long_description,
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
      `${STRAPI_URL}/api/spa-services?populate=gallery`,
      { cache: "no-store" }
    );

    if (!res.ok) return [];

    const json = await res.json();
    return json.data.map(normalizeSpa);
  } catch (e) {
    console.error("getSpaServices error:", e);
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

    const json = await res.json();
    if (!json.data.length) return null;

    return normalizeSpa(json.data[0]);
  } catch (e) {
    console.error("getSpaBySlug error:", e);
    return null;
  }
}

/* =========================
   SPA FEATURE
========================= */
export async function getSpaFeature() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/spa-features?populate=feature_image`,
      { cache: "no-store" }
    );

    const json = await res.json();
    const f = json.data?.[0]?.attributes;
    if (!f) return null;

    return {
      title: f.title,
      description: f.description,
      image: f.feature_image?.data
        ? `${STRAPI_URL}${f.feature_image.data.attributes.url}`
        : "/spa/spa-feature.jpg",
    };
  } catch (e) {
    console.error("getSpaFeature error:", e);
    return null;
  }
}
