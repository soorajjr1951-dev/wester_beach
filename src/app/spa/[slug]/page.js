"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSpaBySlug } from "../../lib/spa";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./spa-detail.css";

const WHATSAPP_NUMBER = "9495461894";

export default function SpaDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getSpaBySlug(slug);
      setService(data);
      setLoading(false);
    }

    if (slug) fetchData();
  }, [slug]);

  useScrollReveal([service]);

  if (loading) {
    return <p style={{ padding: 120 }}>Loading treatment…</p>;
  }

  if (!service) {
    return <p style={{ padding: 120 }}>Treatment not found.</p>;
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello 👋\n\nI would like to book the *${service.name}*.\nPrice: ₹${service.price}.`
  )}`;

  return (
    <main className="spa-page">
      <section className="spa-feature" data-animate>
        {/* IMAGE */}
        <div className="feature-image" data-animate="left">
          <img src={service.image} alt={service.name} />
        </div>

        {/* CONTENT */}
        <div className="feature-text" data-animate="right">
          <span>{service.category}</span>

          <h2>{service.name}</h2>

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
