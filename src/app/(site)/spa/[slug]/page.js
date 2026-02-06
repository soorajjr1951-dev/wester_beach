"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { getSpaBySlug } from "../../../lib/spa";
import useScrollReveal from "../../../hooks/useScrollReveal";
import useScrollToTop from "../../../hooks/useScrollToTop";
import "./spa-detail.css";

const WHATSAPP_NUMBER = "+91 8089211075";

export default function SpaDetailPage() {
  useScrollToTop();

  const { slug } = useParams();
  const [spa, setSpa] = useState(null);

  //   INDEX-BASED STATE
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  // touch handling
  const touchStartX = useRef(0);

  useEffect(() => {
    if (!slug) return;

    async function load() {
      const data = await getSpaBySlug(slug);
      if (data) {
        setSpa(data);
        setActiveIndex(0);
      }
    }

    load();
  }, [slug]);

  //   Prevent body scroll in fullscreen
  useEffect(() => {
    document.body.style.overflow = fullscreenOpen ? "hidden" : "auto";
  }, [fullscreenOpen]);

  //   Keyboard controls
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!fullscreenOpen) return;

      if (e.key === "Escape") setFullscreenOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fullscreenOpen, spa]);

  useScrollReveal([spa, activeIndex]);

  if (!spa) {
    return <p style={{ padding: 120 }}>Loading treatment…</p>;
  }

  const images = spa.gallery || [];

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  //   Mouse wheel scroll
  const handleWheel = (e) => {
    if (e.deltaY > 0) nextImage();
    else prevImage();
  };

  //   Touch swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextImage() : prevImage();
    }
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello,\nI would like to book the ${spa.name} treatment.`,
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
          <div
            className="spa-gallery-main"
            onClick={() => setFullscreenOpen(true)}
          >
            <img
              src={images[activeIndex]}
              alt={spa.name}
              className="spa-main-img"
            />
          </div>

          <div className="spa-gallery-thumbs">
            {images.map((img, i) => (
              <button
                key={i}
                className={`thumb ${i === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(i)}
              >
                <img src={img} alt={`${spa.name} ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          FULLSCREEN LIGHTBOX
      ========================= */}
      {fullscreenOpen && (
        <div
          className="spa-lightbox"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => setFullscreenOpen(false)}
        >
          <button
            className="spa-lightbox-close"
            onClick={() => setFullscreenOpen(false)}
          >
            ✕
          </button>

          <div
            className="spa-lightbox-image"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={images[activeIndex]} alt={spa.name} />
            <div className="spa-lightbox-counter">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
