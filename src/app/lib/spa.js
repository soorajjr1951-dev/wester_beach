const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getSpaServices() {
  const res = await fetch(
    `${STRAPI_URL}/api/spa-services?sort=price:asc`,
    { cache: "no-store" }
  );

  const json = await res.json();

  return json.data.map((s) => ({
    id: s.id,
    ...s.attributes,
  }));
}

export async function getSpaBySlug(slug) {
  const res = await fetch(
    `${STRAPI_URL}/api/spa-services?filters[slug][$eq]=${slug}&populate=gallery`,
    { cache: "no-store" }
  );

  const json = await res.json();
  const s = json.data[0];

  if (!s) return null;

  return {
    id: s.id,
    ...s.attributes,
    gallery: s.attributes.gallery.data.map((g) => g.attributes.url),
  };
}

export async function getSpaFeature() {
  const res = await fetch(
    `${STRAPI_URL}/api/spa-feature?populate=image`,
    { cache: "no-store" }
  );

  const json = await res.json();
  return json.data.attributes;
}
