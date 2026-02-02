const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   GET RESTAURANT PAGE
========================= */
export async function getRestaurantContent() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/restaurant-pages?populate[dishes][populate]=image&populate=ambience_gallery`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch restaurant");

    const json = await res.json();
    const r = json.data?.[0]; // 👈 collection → first item

    if (!r) return null;

    const a = r.attributes ?? r;

    return {
      dishes: Array.isArray(a.dishes)
        ? a.dishes.map((d) => ({
            name: d.name,
            price: d.price,
            image: d.image?.url
              ? `${STRAPI_URL}${d.image.url}`
              : "/placeholder-dish.jpg",
          }))
        : [],

      ambience: Array.isArray(a.ambience_gallery?.data)
        ? a.ambience_gallery.data.map(
            (img) => `${STRAPI_URL}${img.attributes.url}`
          )
        : [],
    };
  } catch (error) {
    console.error("getRestaurantContent error:", error);
    return null;
  }
}
