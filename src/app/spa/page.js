"use client";

import { useState, useEffect } from "react";
import { Sparkles, Leaf, Droplets, Wind, CheckCircle } from "lucide-react";
import "./spa.css";
import useScrollReveal from "../hooks/useScrollReveal";
import Link from "next/link";
import { getSpaServices, getSpaFeature } from "../lib/spa";

const WHATSAPP_NUMBER = "7736242577";

export default function SpaPage() {
  const [activeTab, setActiveTab] = useState("Rituals");
  const [services, setServices] = useState([]);
  const feature = getSpaFeature();

  useEffect(() => {
    setServices(getSpaServices());
  }, []);

  useScrollReveal([activeTab, services.length]);

  const consultWhatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello 👋 I would like to book an Ayurvedic doctor consultation."
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
        <p>
          Ancient Keralan wisdom meets the modern quest for stillness.
          We use only cold-pressed oils and hand-picked herbs.
        </p>
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
                  <Link
                    href={`/spa/${service.slug}`}
                    className="ritual-btn"
                  >
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
              <h4>Personalized Healing.</h4>
              <p>
                Every journey begins with an assessment of your Prakriti (Dosha
                type). Our resident Ayurvedic doctor will curate your program.
              </p>

              <ul>
                {[
                  "In-depth Dosha Analysis",
                  "Dietary Guidance",
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
              <h5>Book Initial Consultation</h5>
              <a
                href={consultWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>Schedule Doctor Call</button>
              </a>
              <p>Consultation fee: ₹1,500 (Adjustable according treatments)</p>
            </div>
          </div>
        )}
      </section>

      {/* FEATURE (NOW FROM LIB) */}
      <section className="spa-feature" data-animate>
        <div className="feature-image" data-animate="left">
          <img src={feature.image} alt={feature.title} />
        </div>

        <div className="feature-text" data-animate="right">
          <span>Signature Feature</span>
          <h2>{feature.title}</h2>
          <p>{feature.description}</p>

          <div className="feature-icons">
            <div>
              <Sparkles />
              <small>Rejuvenate</small>
            </div>
            <div>
              <Droplets />
              <small>Detox</small>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
