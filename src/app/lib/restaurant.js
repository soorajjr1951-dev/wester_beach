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

    /* ---------- SINGLE DISH (YOUR CURRENT STRUCTURE) ---------- */
    const dishes = a.dishes_name
      ? [
          {
            name: a.dishes_name,
            price: a.dishes_price,
            image: a.dishes_image?.data?.attributes?.url
              ? `${STRAPI_URL}${a.dishes_image.data.attributes.url}`
              : "/placeholder-dish.jpg",
          },
        ]
      : [];

    /* ---------- AMBIENCE GALLERY ---------- */
    const ambience = Array.isArray(a.ambience_gallery?.data)
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
