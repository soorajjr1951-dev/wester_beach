const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getRestaurantContent() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/restaurant-pages?populate[dishes][populate]=dishes_image&populate[ambience][populate]=ambience_gallery`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const json = await res.json();
    const page = json.data?.[0]?.attributes;
    if (!page) return null;

    const dishes = Array.isArray(page.dishes)
      ? page.dishes.map((d) => ({
          name: d.dishes_name ?? "",
          price: d.dishes_price ?? "",
          image: d.dishes_image?.data?.attributes?.url
            ? `${STRAPI_URL}${d.dishes_image.data.attributes.url}`
            : "/placeholder-dish.jpg",
        }))
      : [];

    const ambience = Array.isArray(page.ambience?.ambience_gallery?.data)
      ? page.ambience.ambience_gallery.data.map(
          (img) => `${STRAPI_URL}${img.attributes.url}`
        )
      : [];

    return { dishes, ambience };
  } catch (e) {
    console.error("getRestaurantContent error:", e);
    return null;
  }
}
