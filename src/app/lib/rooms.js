const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   GET ALL ROOMS
========================= */
export async function getRooms() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/rooms?populate=preview_image&sort=price:asc`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch rooms");

    const json = await res.json();

    return json.data.map((item) => {
      const attr = item.attributes;

      return {
        id: item.id,
        name: attr.name,
        slug: attr.slug,
        price: attr.price,
        category: attr.category,
        short_description: attr.short_description,

        // ✅ SAFE preview image
        preview_image:
          attr.preview_image?.data?.attributes?.url
            ? `${STRAPI_URL}${attr.preview_image.data.attributes.url}`
            : "/placeholder-room.jpg",
      };
    });
  } catch (error) {
    console.error("getRooms error:", error);
    return [];
  }
}

/* =========================
   GET ROOM BY SLUG
========================= */
export async function getRoomBySlug(slug) {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/rooms?filters[slug][$eq]=${slug}&populate=gallery`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Room not found");

    const json = await res.json();
    const item = json.data[0];

    if (!item) return null;

    const attr = item.attributes;

    return {
      id: item.id,
      name: attr.name,
      slug: attr.slug,
      price: attr.price,
      category: attr.category,
      description: attr.description,

      // ✅ SAFE gallery mapping
      gallery: (attr.gallery?.data || []).map(
        (img) => `${STRAPI_URL}${img.attributes.url}`
      ),
    };
  } catch (error) {
    console.error("getRoomBySlug error:", error);
    return null;
  }
}
