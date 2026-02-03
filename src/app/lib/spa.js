const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   HELPER: IMAGE URL
========================= */
function toImageUrl(img) {
  if (!img) return null;

  // v5 (gallery[])
  if (img.url) {
    return img.url.startsWith("http")
      ? img.url
      : `${STRAPI_URL}${img.url}`;
  }

  // v4 (gallery.data[])
  if (img.attributes?.url) {
    return img.attributes.url.startsWith("http")
      ? img.attributes.url
      : `${STRAPI_URL}${img.attributes.url}`;
  }

  return null;
}

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

    // ✅ SUPPORTS BOTH STRAPI v4 + v5
    gallery: Array.isArray(s?.gallery?.data)
      ? s.gallery.data.map(toImageUrl).filter(Boolean)
      : Array.isArray(s?.gallery)
      ? s.gallery.map(toImageUrl).filter(Boolean)
      : [],
  };
}

/* =========================
   GET SPA LIST
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

    if (!res.ok) throw new Error("Spa not found");

    const json = await res.json();
    return json.data?.length
      ? normalizeSpa(json.data[0])
      : null;
  } catch (e) {
    console.error("getSpaBySlug error:", e);
    return null;
  }
}

/* =========================
   SPA FEATURE (LOCAL)
========================= */
export function getSpaFeature() {
  return {
    title: "Signature Ayurvedic Rejuvenation",
    description:
      "A deeply restorative therapy combining Abhyanga, Shirodhara, and herbal steam to realign the body and mind.",
    image:
      "https://cms.westernbeachventures.com/uploads/DSC_03813a_798670ed24.jpg",
  };
}
