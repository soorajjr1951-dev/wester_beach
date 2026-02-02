const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getRooms() {
  const res = await fetch(
    `${STRAPI_URL}/api/rooms?populate=preview_image&sort=price:asc`,
    { cache: "no-store" }
  );

  const json = await res.json();

  return json.data.map((r) => ({
    id: r.id,
    ...r.attributes,
    preview_image: r.attributes.preview_image?.data?.attributes?.url,
  }));
}

export async function getRoomBySlug(slug) {
  const res = await fetch(
    `${STRAPI_URL}/api/rooms?filters[slug][$eq]=${slug}&populate=gallery`,
    { cache: "no-store" }
  );

  const json = await res.json();
  const r = json.data[0];

  if (!r) return null;

  return {
    id: r.id,
    ...r.attributes,
    gallery: r.attributes.gallery.data.map((g) => g.attributes.url),
  };
}
