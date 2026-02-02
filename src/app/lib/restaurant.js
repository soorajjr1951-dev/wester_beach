const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   RESTAURANT PAGE CONTENT
========================= */
export async function getRestaurantContent() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/restaurant-pages?populate[dishes][populate]=dishes_image&populate[ambience][populate]=ambience_gallery`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch restaurant");

    const json = await res.json();
    const page = json.data?.[0];
    if (!page) return null;

    const a = page.attributes;

    /* ---------- DISHES (REPEATABLE COMPONENT) ---------- */
    const dishes = Array.isArray(a?.dishes)
      ? a.dishes.map((d) => ({
          name: d.dishes_name ?? "",
          price: d.dishes_price ?? "",
          image: d.dishes_image?.data?.attributes?.url
            ? `${STRAPI_URL}${d.dishes_image.data.attributes.url}`
            : "/placeholder-dish.jpg",
        }))
      : [];

    /* ---------- AMBIENCE GALLERY ---------- */
    const ambience = Array.isArray(a?.ambience?.ambience_gallery?.data)
      ? a.ambience.ambience_gallery.data.map(
          (img) => `${STRAPI_URL}${img.attributes.url}`
        )
      : [];

    return { dishes, ambience };
  } catch (error) {
    console.error("getRestaurantContent error:", error);
    return null;
  }
}
