"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSpaServices } from "../../lib/spa";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./spa.css";

export default function SpaPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function load() {
      setServices(await getSpaServices());
    }
    load();
  }, []);

  useScrollReveal([services.length]);

  if (!services.length) {
    return <p style={{ padding: 120 }}>Loading spa…</p>;
  }

  return (
    <main className="spa-page">
      {/* HERO */}
      <section className="spa-hero" data-animate>
        <h1>
          Joy <span>Ayurvedic</span> Spa
        </h1>
        <p>
          Authentic Ayurvedic therapies rooted in Kerala’s ancient healing
          traditions.
        </p>
      </section>

      {/* SERVICES */}
      <section className="ritual-grid">
        {services.map((service) => (
          <div key={service.id} className="ritual-card" data-animate>
            <span>{service.category}</span>
            <h3>{service.name}</h3>
            <p>{service.description}</p>

            <div className="ritual-footer">
              <strong>₹{service.price}</strong>
              <Link href={`/spa/${service.slug}`} className="ritual-btn">
                View Treatment →
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
