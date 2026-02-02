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

    return json.data.map((room) => ({
      id: room.id,
      name: room.name,
      slug: room.slug,
      price: room.price,
      category: room.category,
      short_description: room.short_description,

      // ✅ preview image (optional)
      preview_image: room.preview_image?.url
        ? `${STRAPI_URL}${room.preview_image.url}`
        : "/placeholder-room.jpg",
    }));
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
    const room = json.data[0];

    if (!room) return null;

    return {
      id: room.id,
      name: room.name,
      slug: room.slug,
      price: room.price,
      category: room.category,
      description: room.description,

      // ✅ gallery (optional)
      gallery: Array.isArray(room.gallery)
        ? room.gallery.map((img) => `${STRAPI_URL}${img.url}`)
        : [],
    };
  } catch (error) {
    console.error("getRoomBySlug error:", error);
    return null;
  }
}
