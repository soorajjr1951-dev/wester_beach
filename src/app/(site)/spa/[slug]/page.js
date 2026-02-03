"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getSpaBySlug } from "../../../lib/spa";
import useScrollReveal from "../../../hooks/useScrollReveal";
import useScrollToTop from "../../../hooks/useScrollToTop";
import "./spa-detail.css";

const WHATSAPP_NUMBER = "8129942409";

export default function SpaDetailPage() {
  useScrollToTop();

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
    return <p style={{ padding: 120 , color:"#02833a" , fontWeight:"bolder", textAlign:"center"}}>Loading treatment…</p>;
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello,\n\nI would like to book the *${spa.name}* treatment.`
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
            {activeImage && (
              <Image
                src={activeImage}
                alt={spa.name}
                width={900}
                height={600}
                quality={75}
                priority
              />
            )}
          </div>

          <div className="spa-gallery-thumbs">
            {spa.gallery?.map((img, i) => (
              <button
                key={i}
                className={`thumb ${activeImage === img ? "active" : ""}`}
                onClick={() => setActiveImage(img)}
              >
                <Image
                  src={img}
                  alt={`${spa.name} ${i + 1}`}
                  width={120}
                  height={90}
                  quality={70}
                />
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
