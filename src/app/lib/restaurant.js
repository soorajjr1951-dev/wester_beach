const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   RESTAURANT DISHES
========================= */
export async function getRestaurantDishes() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/restaurant-dishes?populate=image`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch dishes");

    const json = await res.json();

    return Array.isArray(json.data)
      ? json.data.map((item) => {
          const d = item?.attributes;
          if (!d) return null;

          return {
            id: item.id,
            name: d.name ?? "",
            price: d.price ?? "",
            image: d.image?.data?.attributes?.url
              ? `${STRAPI_URL}${d.image.data.attributes.url}`
              : "/placeholder-dish.jpg",
          };
        }).filter(Boolean)
      : [];
  } catch (err) {
    console.error("getRestaurantDishes error:", err);
    return [];
  }
}

/* =========================
   RESTAURANT AMBIENCE
========================= */
export async function getRestaurantAmbience() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/restaurant-ambiences?populate=gallery`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch ambience");

    const json = await res.json();

    if (!json.data?.length) return [];

    const a = json.data[0].attributes;
    if (!a) return [];

    return Array.isArray(a.gallery?.data)
      ? a.gallery.data.map(
          (img) => `${STRAPI_URL}${img.attributes.url}`
        )
      : [];
  } catch (err) {
    console.error("getRestaurantAmbience error:", err);
    return [];
  }
}
