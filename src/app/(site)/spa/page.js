"use client";

import { useState, useEffect } from "react";
import { Sparkles, Leaf, Droplets, Wind, CheckCircle } from "lucide-react";
import "./spa.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import Link from "next/link";
import { getSpaServices, getSpaFeature } from "../../lib/spa";

const WHATSAPP_NUMBER = "8129942409";

export default function SpaPage() {
  const [activeTab, setActiveTab] = useState("Rituals");
  const [services, setServices] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const feature = getSpaFeature(); // 🔥 instant, no CMS dependency

  useEffect(() => {
    async function load() {
      const data = await getSpaServices();
      setServices(data);
      setLoaded(true); // 🔑 always end loading
    }
    load();
  }, []);

  useScrollReveal([activeTab, services.length]);

  if (!loaded) {
    return <p style={{ padding: 120 }}>Loading spa…</p>;
  }

  const consultWhatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello,\n\nI would like to book an Ayurvedic doctor consultation.`
  )}`;

  return (
    <main className="spa-page">
      {/* HERO */}
      <section className="spa-hero" data-animate>
        <div className="spa-icon">
          <Sparkles size={32} />
        </div>
        <h1>
          Joy <span>Ayurvedic</span> Spa.
        </h1>
        <p>Ancient Keralan wisdom meets modern stillness.</p>
      </section>

      {/* TABS */}
      <section className="spa-tabs" data-animate>
        <div className="tab-header">
          {["Rituals", "Consult"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? "active" : ""}
            >
              {tab === "Rituals" ? "Healing Rituals" : "Dr. Consultation"}
            </button>
          ))}
        </div>

        {/* RITUALS */}
        {activeTab === "Rituals" && (
          <div className="ritual-grid">
            {services.length === 0 && (
              <p style={{ opacity: 0.7 }}>No treatments available</p>
            )}

            {services.map((service) => (
              <div key={service.id} className="ritual-card" data-animate>
                <div className="ritual-head">
                  <div>
                    <span>{service.category}</span>
                    <h3>{service.name}</h3>
                  </div>
                  <strong>₹{service.price}</strong>
                </div>

                <p>{service.description}</p>

                <div className="ritual-footer">
                  <div className="ritual-icons">
                    <Leaf size={16} />
                    <Droplets size={16} />
                    <Wind size={16} />
                  </div>
                  <Link href={`/spa/${service.slug}`} className="ritual-btn">
                    View Treatment →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CONSULT */}
        {activeTab === "Consult" && (
          <div className="consult-grid" data-animate>
            <div className="consult-info">
              <h4>Personalized Healing</h4>
              <p>
                Each journey begins with a Dosha assessment by our resident
                Ayurvedic doctor.
              </p>

              <ul>
                {[
                  "Dosha Analysis",
                  "Diet Guidance",
                  "Yoga Recommendations",
                  "Herbal Prescription",
                ].map((item) => (
                  <li key={item}>
                    <CheckCircle size={18} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="consult-box">
              <h5>Book Consultation</h5>
              <a href={consultWhatsapp} target="_blank">
                <button>Schedule Doctor Call</button>
              </a>
              <p>Consultation fee: ₹1,500</p>
            </div>
          </div>
        )}
      </section>

      {/* FEATURE */}
      <section className="spa-feature" data-animate>
        <div className="feature-image">
          <img src={feature.image} alt={feature.title} />
        </div>

        <div className="feature-text">
          <span>Signature Therapy</span>
          <h2>{feature.title}</h2>
          <p>{feature.description}</p>
        </div>
      </section>
    </main>
  );
}
