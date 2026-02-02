"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSpaBySlug } from "../../lib/spa";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./spa-detail.css";

const WHATSAPP_NUMBER = "8129942409";

export default function SpaDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const data = getSpaBySlug(slug);
    setService(data);
    setActiveImage(data?.gallery?.[0]);
  }, [slug]);

  useScrollReveal([service, activeImage]);

  if (!service) return <p style={{ padding: 120 }}>Treatment not found.</p>;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello, \n\nI would like to book the *${service.name}*.\nPrice: ₹${service.price}.`,
  )}`;

  return (
    <main className="spa-detail-page">
      <section className="spa-detail-grid" data-animate>
        {/* GALLERY */}
        <div className="spa-gallery">
          <div className="spa-gallery-main">
            <img src={activeImage} alt={service.name} />
          </div>

          <div className="spa-gallery-thumbs">
            {service.gallery.map((img, i) => (
              <button
                key={i}
                className={`thumb ${activeImage === img ? "active" : ""}`}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={`${service.name} ${i}`} />
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="spa-detail-content">
          <span className="spa-category">{service.category}</span>
          <h1>{service.name}</h1>
          <p>{service.long_description}</p>

          <div className="spa-price">₹{service.price}</div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="spa-book-btn"
          >
            Book Appointment →
          </a>
        </div>
      </section>
    </main>
  );
}
