"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./restaurant.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import { getRestaurantContent } from "../../lib/restaurant";

export default function RestaurantPage() {
  useScrollReveal();

  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const content = await getRestaurantContent();
      setData(content);
    }
    load();
  }, []);

  if (!data) {
    return (
      <p
        style={{
          padding: 120,
          color: "#02833a",
          fontWeight: "bolder",
          textAlign: "center",
        }}
      >
        Loading…
      </p>
    );
  }

  const { dishes, ambience } = data;

  return (
    <main className="restaurant-page">
      {/* ================= HERO ================= */}
      <section className="restaurant-hero">
        <div className="restaurant-hero-media">
          <Image
            src="https://cms.westernbeachventures.com/uploads/DSC_03927_50c81bff50.JPG"
            alt="Beachside Restaurant"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
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
            An intimate indoor dining experience rooted in Keralan tradition and
            shaped by the sea.
          </p>
        </div>
      </section>

      {/* ================= DISHES ================= */}
      {dishes.length > 0 && (
        <section className="restaurant-dishes">
          <header data-animate>
            <h3>Signature Dishes</h3>
            <p>Selected from the morning catch</p>
          </header>

          <div className="dish-grid">
            {dishes.map((dish, i) => (
              <div key={i} className="dish-card" data-animate>
                <Image
                  src={dish.image}
                  alt={dish.name}
                  width={400}
                  height={300}
                  quality={70}
                  loading="lazy"
                />
                <div className="dish-info">
                  <h4>{dish.name}</h4>
                  <span>₹{dish.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= AMBIENCE ================= */}
      {ambience.length > 0 && (
        <section className="restaurant-ambience">
          <div className="ambience-grid">
            <div className="ambience-text" data-animate="left">
              <span>Seating & Ambience</span>
              <h2>Elegant Indoor Dining</h2>
              <p>
                Experience coastal comfort in our thoughtfully designed dining
                space, where warm lighting and ocean-inspired décor create the
                perfect setting for an unforgettable meal.
              </p>
            </div>

            <div className="ambience-images" data-animate="right">
              {ambience.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`Dining view ${i + 1}`}
                  width={420}
                  height={300}
                  quality={70}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
