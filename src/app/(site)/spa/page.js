"use client";

import { useEffect, useState } from "react";
import { Sparkles, Leaf, Droplets, Wind, CheckCircle } from "lucide-react";
import "./spa.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import Link from "next/link";
import { getSpaServices, getSpaFeature } from "../../lib/spa";

const WHATSAPP_NUMBER = "8129942409";

export default function SpaPage() {
  const [activeTab, setActiveTab] = useState("Rituals");
  const [services, setServices] = useState([]);
  const [feature, setFeature] = useState(null);

  useEffect(() => {
    async function load() {
      setServices(await getSpaServices());
      setFeature(await getSpaFeature());
    }
    load();
  }, []);

  useScrollReveal([activeTab, services.length, feature]);

  if (!feature) return <p style={{ padding: 120 }}>Loading spa…</p>;

  return (
    <main className="spa-page">
      <section className="spa-hero" data-animate>
        <div className="spa-icon">
          <Sparkles size={32} />
        </div>
        <h1>
          Joy <span>Ayurvedic</span> Spa.
        </h1>
        <p>
          Ancient Keralan wisdom meets the modern quest for stillness.
        </p>
      </section>

      {activeTab === "Rituals" && (
        <div className="ritual-grid">
          {services.map((service) => (
            <div key={service.id} className="ritual-card">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <Link href={`/spa/${service.slug}`}>View →</Link>
            </div>
          ))}
        </div>
      )}

      <section className="spa-feature">
        <img src={feature.image} alt={feature.title} />
        <h2>{feature.title}</h2>
        <p>{feature.description}</p>
      </section>
    </main>
  );
}
