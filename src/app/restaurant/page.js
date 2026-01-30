"use client";

import "./restaurant.css";
import useScrollReveal from "../hooks/useScrollReveal";

export default function RestaurantPage() {
  useScrollReveal();

  return (
    <main className="restaurant-page">
      {/* HERO */}
      <section className="restaurant-hero">
        <div className="restaurant-hero-media">
          <img
            src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=2000"
            alt="Beachside Restaurant"
          />
        </div>
        <div className="restaurant-hero-overlay"></div>

        <div className="restaurant-hero-content" data-animate="fade">
          <span className="restaurant-eyebrow">Ocean to Plate</span>
          <h1>
            The Deck <br />
            <span>Kitchen.</span>
          </h1>
          <p>
            A beachside dining experience rooted in Keralan tradition,
            shaped by the sea, and served with intention.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="restaurant-about">
        <div className="about-grid">
          <div className="about-text" data-animate="left">
            <h2>Our Food Philosophy</h2>
            <p>
              Every morning at sunrise, our chefs walk the Kovalam
              shoreline to select the day’s freshest catch. We cook
              slowly, season gently, and serve food that respects both
              the ingredient and the land it comes from.
            </p>
            <p>
              No shortcuts. No excess. Just honest coastal cooking
              inspired by generations of Keralan wisdom.
            </p>
          </div>

          <div className="about-image" data-animate="right">
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200"
              alt="Fresh coastal cuisine"
            />
          </div>
        </div>
      </section>

      {/* SIGNATURE DISHES */}
      <section className="restaurant-dishes">
        <header data-animate>
          <h3>Signature Dishes</h3>
          <p>Selected from the morning catch</p>
        </header>

        <div className="dish-grid">
          {[
            {
              name: "Grilled Red Snapper",
              price: "₹1,200",
              img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
            },
            {
              name: "Kerala Prawn Curry",
              price: "₹980",
              img: "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&q=80&w=800",
            },
            {
              name: "Vegetarian Thali",
              price: "₹720",
              img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
            },
          ].map((dish, i) => (
            <div key={i} className="dish-card" data-animate>
              <img src={dish.img} alt={dish.name} />
              <div className="dish-info">
                <h4>{dish.name}</h4>
                <span>{dish.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEATING & AMBIENCE */}
      <section className="restaurant-ambience">
        <div className="ambience-grid">
          <div className="ambience-text" data-animate="left">
            <span>Seating & Ambience</span>
            <h2>Indoor & Outdoor Dining</h2>
            <p>
              Choose between shaded indoor seating or open-air deck
              tables overlooking the Arabian Sea. As daylight fades,
              lanterns glow and the sound of waves becomes part of the
              experience.
            </p>
          </div>

          <div className="ambience-images" data-animate="right">
            <img
              src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=1000"
              alt="Outdoor seating"
            />
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1000"
              alt="Indoor dining"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
