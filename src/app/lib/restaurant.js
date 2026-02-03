/* =========================
   RESTAURANT LOCAL CONTENT
========================= */

export async function getRestaurantContent() {
  return {
    dishes: [
      {
        name: "Grilled Tiger Prawns",
        price: "950",
        image: "https://cms.westernbeachventures.com/uploads/Grilled_Red_Snapper_0149e892e1.jpg",
      },
      {
        name: "Kerala Fish Curry",
        price: "720",
        image: "https://cms.westernbeachventures.com/uploads/Kerala_Prawn_Curry_c908cfccd1.jpg",
      },
    ],

    ambience: [
      "https://cms.westernbeachventures.com/uploads/DSC_03940_df498f47a1.JPG",
      "https://cms.westernbeachventures.com/uploads/DSC_03945_29ace52ed8.JPG",
      "https://cms.westernbeachventures.com/uploads/DSC_03939_9ccff8ae47.JPG",
      "https://cms.westernbeachventures.com/uploads/DSC_03932_1deed8b97d.JPG",
    ],
  };
}
