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

  const consultWhatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello, I would like to book an Ayurvedic consultation."
  )}`;

  return (
    <main className="spa-page">
      {/* HERO */}
      <section className="spa-hero" data-animate>
        <Sparkles size={32} />
        <h1>
          Joy <span>Ayurvedic</span> Spa
        </h1>
        <p>Ancient Keralan wisdom for modern wellness.</p>
      </section>

      {/* TABS */}
      <section className="spa-tabs">
        <div className="tab-header">
          {["Rituals", "Consult"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? "active" : ""}
            >
              {tab === "Rituals" ? "Healing Rituals" : "Doctor Consultation"}
            </button>
          ))}
        </div>

        {/* RITUALS */}
        {activeTab === "Rituals" && (
          <div className="ritual-grid">
            {services.map((s) => (
              <div key={s.id} className="ritual-card" data-animate>
                <div className="ritual-head">
                  <div>
                    <span>{s.category}</span>
                    <h3>{s.name}</h3>
                  </div>
                  <strong>₹{s.price}</strong>
                </div>

                <p>{s.description}</p>

                <div className="ritual-footer">
                  <Leaf size={16} />
                  <Droplets size={16} />
                  <Wind size={16} />
                  <Link href={`/spa/${s.slug}`}>View →</Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CONSULT */}
        {activeTab === "Consult" && (
          <div className="consult-box" data-animate>
            <h4>Personalized Healing</h4>
            <p>Dosha assessment by certified Ayurvedic doctor.</p>
            <a href={consultWhatsapp} target="_blank">
              <button>Book Consultation</button>
            </a>
          </div>
        )}
      </section>

      {/* FEATURE */}
      <section className="spa-feature" data-animate>
        <img src={feature.image} alt={feature.title} />
        <h2>{feature.title}</h2>
        <p>{feature.description}</p>
      </section>
    </main>
  );
}
