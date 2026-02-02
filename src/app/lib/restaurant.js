const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   RESTAURANT PAGE CONTENT
========================= */
export async function getRestaurantContent() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/restaurant-page?populate[dishes][populate]=image&populate=ambience_gallery`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch restaurant");

    const json = await res.json();
    const r = json.data?.attributes;

    if (!r) return null;

    return {
      dishes: Array.isArray(r.dishes)
        ? r.dishes.map((d) => ({
            name: d.name,
            price: d.price,
            image: d.image?.data?.attributes?.url
              ? `${STRAPI_URL}${d.image.data.attributes.url}`
              : "/placeholder-dish.jpg",
          }))
        : [],

      ambience: Array.isArray(r.ambience_gallery?.data)
        ? r.ambience_gallery.data.map(
            (img) => `${STRAPI_URL}${img.attributes.url}`
          )
        : [],
    };
  } catch (error) {
    console.error("getRestaurantContent error:", error);
    return null;
  }
}
