const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   GET RESTAURANT DISHES
========================= */
export async function getRestaurantDishes() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/restaurant-dishes?populate=dishes_image`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch dishes");

    const json = await res.json();

    return Array.isArray(json.data)
      ? json.data.map(item => {
          const d = item.attributes;
          return {
            name: d?.dishes_name ?? "",
            price: d?.dishes_price ?? "",
            image: d?.dishes_image?.data?.attributes?.url
              ? `${STRAPI_URL}${d.dishes_image.data.attributes.url}`
              : "/placeholder-dish.jpg",
          };
        })
      : [];
  } catch (e) {
    console.error("getRestaurantDishes error:", e);
    return [];
  }
}

/* =========================
   GET RESTAURANT AMBIENCE
========================= */
export async function getRestaurantAmbience() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/restaurant-ambiences?populate=ambience_gallery`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch ambience");

    const json = await res.json();

    return Array.isArray(json.data)
      ? json.data.flatMap(item =>
          item.attributes?.ambience_gallery?.data?.map(
            img => `${STRAPI_URL}${img.attributes.url}`
          ) || []
        )
      : [];
  } catch (e) {
    console.error("getRestaurantAmbience error:", e);
    return [];
  }
}
