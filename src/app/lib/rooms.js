const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   NORMALIZE ROOM (v4 + v5 SAFE)
========================= */
function normalizeRoom(item) {
  const r = item?.attributes ?? item;

  return {
    id: item.id,
    name: r?.name ?? "",
    slug: r?.slug ?? "",
    price: r?.price ?? 0,
    category: r?.category ?? "",
    short_description: r?.short_description ?? "",
    description: r?.description ?? "",

    // =========================
    // AMENITIES (FLAT FIELDS)
    // =========================
    amenities: {
      tv: r?.tv ?? "Not available",
      geyser: r?.geyser ?? "Not available",
      cupboard: r?.cupboard ?? "Not available",
      bed: r?.bed ?? "",
      sofa: r?.sofa ?? "Not available",
      fridge: r?.fridge ?? "Not available",
      kettle: r?.kettle ?? "Not available",
    },

    // =========================
    // IMAGES
    // =========================
    preview_image:
      r?.preview_image?.data?.attributes?.url
        ? `${STRAPI_URL}${r.preview_image.data.attributes.url}`
        : r?.preview_image?.url
        ? `${STRAPI_URL}${r.preview_image.url}`
        : "/placeholder-room.jpg",

    gallery: Array.isArray(r?.gallery?.data)
      ? r.gallery.data.map(
          (img) => `${STRAPI_URL}${img.attributes.url}`
        )
      : Array.isArray(r?.gallery)
      ? r.gallery.map((img) => `${STRAPI_URL}${img.url}`)
      : [],
  };
}

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

    return Array.isArray(json.data)
      ? json.data.map(normalizeRoom)
      : [];
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
    if (!json.data?.length) return null;

    return normalizeRoom(json.data[0]);
  } catch (error) {
    console.error("getRoomBySlug error:", error);
    return null;
  }
}
