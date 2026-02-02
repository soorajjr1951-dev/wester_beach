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
   SPA FEATURE (LOCAL ONLY)
========================= */

export function getSpaFeature() {
  return {
    title: "Signature Ayurvedic Rejuvenation",
    description:
      "A deeply restorative therapy combining Abhyanga, Shirodhara, and herbal steam to realign the body, calm the nervous system, and restore inner balance.",
    image: "https://cms.westernbeachventures.com/uploads/DSC_03813a_798670ed24.jpg", // MUST exist in /public/spa/
  };
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
