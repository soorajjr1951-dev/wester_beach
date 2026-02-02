const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

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
      ? json.data.map((item) => {
          const a = item.attributes;

          return {
            id: item.id,
            name: a.name,
            slug: a.slug,
            category: a.category,
            price: a.price,
            description: a.description,
            long_description: a.long_description,

            gallery: Array.isArray(a.gallery?.data)
              ? a.gallery.data.map(
                  (img) => `${STRAPI_URL}${img.attributes.url}`
                )
              : [],
          };
        })
      : [];
  } catch (err) {
    console.error("getSpaServices error:", err);
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

    const item = json.data[0];
    const a = item.attributes;

    return {
      id: item.id,
      name: a.name,
      slug: a.slug,
      category: a.category,
      price: a.price,
      description: a.description,
      long_description: a.long_description,

      gallery: Array.isArray(a.gallery?.data)
        ? a.gallery.data.map(
            (img) => `${STRAPI_URL}${img.attributes.url}`
          )
        : [],
    };
  } catch (err) {
    console.error("getSpaBySlug error:", err);
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
      title: f.title,
      description: f.description,
      image: f.feature_image?.data?.attributes?.url
        ? `${STRAPI_URL}${f.feature_image.data.attributes.url}`
        : "/spa/spa-feature.jpg",
    };
  } catch (err) {
    console.error("getSpaFeature error:", err);
    return null;
  }
}
