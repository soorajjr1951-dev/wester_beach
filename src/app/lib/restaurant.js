const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   RESTAURANT PAGE CONTENT
========================= */
export async function getRestaurantContent() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/restaurant?populate=deep`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch restaurant");

    const json = await res.json();
    const r = json.data?.attributes ?? json.data;

    return {
      hero: {
        title: r?.hero_title ?? "",
        description: r?.hero_description ?? "",
        image:
          r?.hero_image?.data?.attributes?.url
            ? `${STRAPI_URL}${r.hero_image.data.attributes.url}`
            : r?.hero_image?.url
            ? `${STRAPI_URL}${r.hero_image.url}`
            : "/placeholder-restaurant.jpg",
      },

      dishes: Array.isArray(r?.dishes)
        ? r.dishes.map((d) => ({
            name: d.name,
            price: d.price,
            image: d.image?.url
              ? `${STRAPI_URL}${d.image.url}`
              : "/placeholder-dish.jpg",
          }))
        : [],

      ambience: Array.isArray(r?.ambience_gallery?.data)
        ? r.ambience_gallery.data.map(
            (img) => `${STRAPI_URL}${img.attributes.url}`
          )
        : Array.isArray(r?.ambience_gallery)
        ? r.ambience_gallery.map(
            (img) => `${STRAPI_URL}${img.url}`
          )
        : [],
    };
  } catch (error) {
    console.error("getRestaurantContent error:", error);
    return null;
  }
}
