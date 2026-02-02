const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   RESTAURANT DISHES
========================= */
export async function getRestaurantDishes() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/restaurant-pages?populate[dishes][populate]=dishes_image`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch dishes");

    const json = await res.json();
    const page = json.data?.[0];
    if (!page) return [];

    const dishes = page.attributes?.dishes ?? [];

    return dishes.map((d, index) => ({
      id: index,
      name: d.dishes_name ?? "",
      price: d.dishes_price ?? "",
      image: d.dishes_image?.data?.attributes?.url
        ? `${STRAPI_URL}${d.dishes_image.data.attributes.url}`
        : "/placeholder-dish.jpg",
    }));
  } catch (error) {
    console.error("getRestaurantDishes error:", error);
    return [];
  }
}

/* =========================
   RESTAURANT AMBIENCE
========================= */
export async function getRestaurantAmbience() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/restaurant-pages?populate[ambience][populate]=ambience_gallery`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch ambience");

    const json = await res.json();
    const page = json.data?.[0];
    if (!page) return [];

    const gallery =
      page.attributes?.ambience?.ambience_gallery?.data ?? [];

    return gallery.map(
      (img) => `${STRAPI_URL}${img.attributes.url}`
    );
  } catch (error) {
    console.error("getRestaurantAmbience error:", error);
    return [];
  }
}
