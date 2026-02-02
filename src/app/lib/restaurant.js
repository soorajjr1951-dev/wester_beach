/* =========================
   RESTAURANT LOCAL CONTENT
========================= */

export async function getRestaurantContent() {
  return {
    dishes: [
      {
        name: "Grilled Tiger Prawns",
        price: "950",
        image: "/restaurant/dishes/prawns.jpg",
      },
      {
        name: "Kerala Fish Curry",
        price: "720",
        image: "/restaurant/dishes/fish-curry.jpg",
      },
      {
        name: "Malabar Chicken Roast",
        price: "680",
        image: "/restaurant/dishes/chicken-roast.jpg",
      },
      {
        name: "Vegetable Stew & Appam",
        price: "540",
        image: "/restaurant/dishes/appam.jpg",
      },
    ],

    ambience: [
      "/restaurant/ambience/ambience1.jpg",
      "/restaurant/ambience/ambience2.jpg",
      "/restaurant/ambience/ambience3.jpg",
    ],
  };
}
