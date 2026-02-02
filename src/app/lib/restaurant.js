const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   RESTAURANT PAGE CONTENT
========================= */
export async function getRestaurantContent() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/restaurant-pages?populate=*`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch restaurant");

    const json = await res.json();
    const page = json.data?.[0];
    if (!page) return null;

    const a = page.attributes;

    return {
      dishes: Array.isArray(a?.dishes)
        ? a.dishes.map((d) => ({
            name: d.name ?? "",
            price: d.price ?? "",
            image: d.image?.data?.attributes?.url
              ? `${STRAPI_URL}${d.image.data.attributes.url}`
              : "/placeholder-dish.jpg",
          }))
        : [],

      ambience: Array.isArray(a?.ambience_gallery?.data)
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
