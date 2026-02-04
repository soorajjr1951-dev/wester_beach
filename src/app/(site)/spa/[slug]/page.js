"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSpaBySlug } from "../../../lib/spa";
import useScrollReveal from "../../../hooks/useScrollReveal";
import useScrollToTop from "../../../hooks/useScrollToTop";
import "./spa-detail.css";

const WHATSAPP_NUMBER = "8089211075";

export default function SpaDetailPage() {
  useScrollToTop();

  const { slug } = useParams();
  const [spa, setSpa] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function load() {
      const data = await getSpaBySlug(slug);
      if (data) {
        setSpa(data);
        setActiveImage(data.gallery?.[0] || null);
      }
    }

    load();
  }, [slug]);

  useScrollReveal([spa, activeImage]);

  if (!spa) {
    return <p style={{ padding: 120 }}>Loading treatment…</p>;
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello,\nI would like to book the ${spa.name} treatment.`
  )}`;

  return (
    <main className="spa-detail-page">
      <section className="spa-detail-grid" data-animate>
        {/* LEFT */}
        <div className="spa-detail-content">
          <span className="spa-category">{spa.category}</span>

          <h1>
            {spa.name.split(" ")[0]}{" "}
            <em>{spa.name.split(" ").slice(1).join(" ")}</em>
          </h1>

          <p>{spa.long_description}</p>

          <div className="spa-price">₹{spa.price}</div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="spa-book-btn"
          >
            Book via WhatsApp →
          </a>
        </div>

        {/* RIGHT */}
        <div className="spa-gallery">
          <div className="spa-gallery-main">
            {activeImage && (
              <img
                src={activeImage}
                alt={spa.name}
                className="spa-main-img"
              />
            )}
          </div>

          <div className="spa-gallery-thumbs">
            {spa.gallery.map((img, i) => (
              <button
                key={i}
                className={`thumb ${img === activeImage ? "active" : ""}`}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={`${spa.name} ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
