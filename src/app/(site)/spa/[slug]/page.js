"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSpaBySlug } from "../../../lib/spa";
import useScrollReveal from "../../../hooks/useScrollReveal";
import "./spa-detail.css";

const WHATSAPP_NUMBER = "8129942409";

export default function SpaDetailPage() {
  const { slug } = useParams();
  const [spa, setSpa] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function load() {
      const data = await getSpaBySlug(slug);
      setSpa(data);
      setActiveImage(data?.gallery?.[0] || null);
    }

    load();
  }, [slug]);

  useScrollReveal([spa, activeImage]);

  if (!spa) {
    return <p style={{ padding: 120 }}>Loading treatment…</p>;
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello,\n\nI would like to book the *${spa.name}* treatment.\nPrice: ₹${spa.price}`
  )}`;

  return (
    <main className="spa-detail-page">
      <section className="spa-detail-grid" data-animate>
        {/* CONTENT */}
        <div className="spa-detail-content" data-animate="left">
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

        {/* GALLERY */}
        <div className="spa-gallery" data-animate="right">
          <div className="spa-gallery-main">
            {activeImage && <img src={activeImage} alt={spa.name} />}
          </div>

          <div className="spa-gallery-thumbs">
            {spa.gallery?.map((img, i) => (
              <button
                key={i}
                className={`thumb ${activeImage === img ? "active" : ""}`}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={`${spa.name} ${i}`} />
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
