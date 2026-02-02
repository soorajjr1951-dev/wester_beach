const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   GET DISHES
========================= */
export async function getRestaurantDishes() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/restaurant-dishes?populate=image`,
      { cache: "no-store" }
    );

    if (!res.ok) return [];

    const json = await res.json();

    return json.data.map((item) => ({
      id: item.id,
      name: item.attributes.name,
      price: item.attributes.price,
      image: item.attributes.image?.data
        ? `${STRAPI_URL}${item.attributes.image.data.attributes.url}`
        : "/placeholder-dish.jpg",
    }));
  } catch (e) {
    console.error("getRestaurantDishes error:", e);
    return [];
  }
}

/* =========================
   GET AMBIENCE
========================= */
export async function getRestaurantAmbience() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/restaurant-ambiences?populate=gallery`,
      { cache: "no-store" }
    );

    const json = await res.json();
    const a = json.data?.[0]?.attributes;

    return Array.isArray(a?.gallery?.data)
      ? a.gallery.data.map(
          (img) => `${STRAPI_URL}${img.attributes.url}`
        )
      : [];
  } catch (e) {
    console.error("getRestaurantAmbience error:", e);
    return [];
  }
}
