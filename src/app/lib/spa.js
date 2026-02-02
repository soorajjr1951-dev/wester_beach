const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/* =========================
   GET ALL SPA SERVICES
========================= */
export async function getSpaServices() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/spa-services?sort=price:asc`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch spa services");

    const json = await res.json();

    return json.data.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      category: item.category,
      price: item.price,
      description: item.description,
    }));
  } catch (error) {
    console.error("getSpaServices error:", error);
    return [];
  }
}

/* =========================
   STATIC SPA FEATURE (NO STRAPI)
========================= */
export const SPA_FEATURE = {
  title: "Traditional Abhyanga Therapy",
  description:
    "A deeply restorative full-body Ayurvedic massage using warm, cold-pressed herbal oils. This signature therapy improves circulation, detoxifies the body, calms the nervous system, and restores natural balance.",
  image: "/spa/spa-feature.jpg", // put image in /public/spa/
};
