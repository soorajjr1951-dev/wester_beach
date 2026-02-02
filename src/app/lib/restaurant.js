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

    /* ---------- DISHES (component OR relation safe) ---------- */
    const dishesRaw = Array.isArray(a?.dishes)
      ? a.dishes
      : Array.isArray(a?.dishes?.data)
      ? a.dishes.data.map((d) => d.attributes)
      : [];

    const dishes = dishesRaw.map((d) => ({
      name: d.name ?? "",
      price: d.price ?? "",
      image: d.image?.data?.attributes?.url
        ? `${STRAPI_URL}${d.image.data.attributes.url}`
        : "/placeholder-dish.jpg",
    }));

    /* ---------- AMBIENCE GALLERY ---------- */
    const ambience = Array.isArray(a?.ambience_gallery?.data)
      ? a.ambience_gallery.data.map(
          (img) => `${STRAPI_URL}${img.attributes.url}`
        )
      : [];

    return { dishes, ambience };
  } catch (error) {
    console.error("getRestaurantContent error:", error);
    return null;
  }
}
