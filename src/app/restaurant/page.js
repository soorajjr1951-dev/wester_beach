"use client";

import "./restaurant.css";
import useScrollReveal from "../hooks/useScrollReveal";
import { RESTAURANT_CONTENT } from "../lib/restaurant";

export default function RestaurantPage() {
  useScrollReveal();

  const { hero, philosophy, dishes, ambience } = RESTAURANT_CONTENT;

  return (
    <main className="restaurant-page">
      {/* HERO */}
      <section className="restaurant-hero">
        <div className="restaurant-hero-media">
          <img src={hero.image} alt="Beachside Restaurant" />
        </div>
        <div className="restaurant-hero-overlay"></div>

        <div className="restaurant-hero-content" data-animate="fade">
          <span className="restaurant-eyebrow">{hero.eyebrow}</span>
          <h1>
            {hero.title.split(" ")[0]} <br />
            <span>{hero.title.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p>{hero.description}</p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="restaurant-about">
        <div className="about-grid">
          <div className="about-text" data-animate="left">
            <h2>{philosophy.title}</h2>
            {philosophy.paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          <div className="about-image" data-animate="right">
            <img src={philosophy.image} alt="Fresh coastal cuisine" />
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
            <span>{ambience.label}</span>
            <h2>{ambience.title}</h2>
            <p>{ambience.description}</p>
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
