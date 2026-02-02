"use client";

import { useEffect, useState } from "react";
import "./restaurant.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import { getRestaurantContent } from "../../lib/restaurant";

export default function RestaurantPage() {
  useScrollReveal();
  const [data, setData] = useState(null);

  useEffect(() => {
    getRestaurantContent().then(setData);
  }, []);

  if (!data) return <p style={{ padding: 120 }}>Loading…</p>;

  const { dishes, ambience } = data;

  return (
    <main className="restaurant-page">
      {/* HERO – STATIC */}
      <section className="restaurant-hero">
        <div className="restaurant-hero-media">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de"
            alt="Beachside Restaurant"
          />
        </div>
        <div className="restaurant-hero-overlay"></div>

        <div className="restaurant-hero-content" data-animate>
          <span className="restaurant-eyebrow">Ocean to Plate</span>
          <h1>
            The Best <br />
            <span>Kitchen.</span>
          </h1>
          <p>
            A beachside dining experience rooted in Keralan tradition and shaped
            by the sea.
          </p>
        </div>
      </section>

      {/* SIGNATURE DISHES */}
      <section className="restaurant-dishes">
        <header data-animate>
          <h3>Signature Dishes</h3>
          <p>Selected from the morning catch</p>
        </header>

        <div className="dish-grid">
          {dishes.map((dish, i) => (
            <div key={i} className="dish-card" data-animate>
              <img src={dish.image} alt={dish.name} />
              <div className="dish-info">
                <h4>{dish.name}</h4>
                <span>{dish.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AMBIENCE */}
      <section className="restaurant-ambience">
        <div className="ambience-grid">
          <div className="ambience-text" data-animate="left">
            <span>Seating & Ambience</span>
            <h2>Indoor & Outdoor Dining</h2>
            <p>
              Choose between shaded indoor seating or open-air deck tables
              overlooking the Arabian Sea.
            </p>
          </div>

          <div className="ambience-images" data-animate="right">
            {ambience.images.map((img, i) => (
              <img key={i} src={img} alt={`Dining view ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
