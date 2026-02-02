const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getRestaurantContent() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/restaurant-page?populate=dishes_image,ambience_gallery`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch restaurant page");

    const json = await res.json();
    const a = json.data.attributes;

    const dishes = a.dishes_name.map((_, i) => ({
      name: a.dishes_name[i],
      price: a.dishes_price[i],
      image: a.dishes_image[i]?.url,
    }));

    return {
      dishes,
      ambience: {
        images: a.ambience_gallery.map((img) => img.url),
      },
    };
  } catch (err) {
    console.error("getRestaurantContent error:", err);
    return null;
  }
}
