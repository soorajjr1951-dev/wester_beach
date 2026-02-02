const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   NORMALIZE SPA SERVICE
========================= */
function normalizeSpa(item) {
  const s = item.attributes ?? item;

  return {
    id: item.id,
    name: s?.name ?? "",
    slug: s?.slug ?? "",
    category: s?.category ?? "",
    price: s?.price ?? 0,
    description: s?.description ?? "",
    long_description: s?.long_description ?? "",

    gallery: Array.isArray(s?.gallery?.data)
      ? s.gallery.data.map(img => `${STRAPI_URL}${img.attributes.url}`)
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
    return Array.isArray(json.data) ? json.data.map(normalizeSpa) : [];
  } catch (e) {
    console.error("getSpaServices error:", e);
    return [];
  }
}

/* =========================
   GET SPA FEATURE
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

    return {
      title: f?.title ?? "Ayurvedic Rejuvenation",
      description: f?.description ?? "",
      image: f?.feature_image?.data?.attributes?.url
        ? `${STRAPI_URL}${f.feature_image.data.attributes.url}`
        : "/spa/spa-feature.jpg",
    };
  } catch (e) {
    console.error("getSpaFeature error:", e);
    return {
      title: "Ayurvedic Rejuvenation",
      description: "A deeply restorative therapy combining Abhyanga, Shirodhara and herbal steam to realign body and mind.",
      image: "/spa/spa-feature.jpg",
    };
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
    return json.data?.length ? normalizeSpa(json.data[0]) : null;
  } catch (e) {
    console.error("getSpaBySlug error:", e);
    return null;
  }
}
