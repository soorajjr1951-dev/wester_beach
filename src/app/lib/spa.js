const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   NORMALIZE SPA (LIKE ROOMS)
========================= */
function normalizeSpa(item) {
  const s = item?.attributes ?? item;

  return {
    id: item.id,
    name: s?.name ?? "",
    slug: s?.slug ?? "",
    price: s?.price ?? 0,
    category: s?.category ?? "",
    description: s?.description ?? "",
    long_description: s?.long_description ?? "",

    gallery: Array.isArray(s?.gallery?.data)
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
    return Array.isArray(json.data)
      ? json.data.map(normalizeSpa)
      : [];
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

    if (!res.ok) return null;

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
  } catch (e) {
    console.error("getSpaFeature error:", e);
    return null;
  }
}
