"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getRoomBySlug } from "../../lib/rooms";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./room-detail.css";

const WHATSAPP_NUMBER = "8129942409";

export default function RoomDetailPage() {
  const { slug } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ separate states
  const [mainIndex, setMainIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useScrollReveal([room]);

  useEffect(() => {
    async function fetchRoom() {
      const data = await getRoomBySlug(slug);
      setRoom(data);
      setMainIndex(0);
      setLightboxIndex(0);
      setLoading(false);
    }

    if (slug) fetchRoom();
  }, [slug]);

  if (loading) return <p style={{ padding: 120 }}>Loading room…</p>;
  if (!room) return <p style={{ padding: 120 }}>Room not found.</p>;

  const gallery = room.gallery || [];

  // ✅ thumbnails EXCLUDE main image
  const thumbnails = gallery.filter((_, i) => i !== mainIndex).slice(0, 3);
  const extraCount = gallery.length - 1 - thumbnails.length;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello 👋\n\nI would like to book the *${room.name}*.\nPrice: ₹${room.price} per night.`
  )}`;

  function openLightbox(index) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
    setLightboxIndex(mainIndex); // ✅ reset back
  }

  function nextImage() {
    setLightboxIndex((prev) => (prev + 1) % gallery.length);
  }

  function prevImage() {
    setLightboxIndex((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1
    );
  }

  return (
    <main className="room-detail">
      <div className="room-detail-container">
        <div className="room-detail-card" data-animate>
          {/* HEADER */}
          <header className="room-detail-header">
            <span>{room.category}</span>
            <h1>
              {room.name.split(" ")[0]}{" "}
              <em>{room.name.split(" ").slice(1).join(" ")}</em>
            </h1>
            <p>{room.short_description}</p>
            <div className="room-price">₹{room.price} / night</div>
          </header>

          {/* GALLERY */}
          <section className="room-gallery">
            {/* MAIN IMAGE */}
            <div
              className="room-gallery-main"
              onClick={() => openLightbox(mainIndex)}
            >
              <img src={gallery[mainIndex]} alt={room.name} />
            </div>

            {/* THUMBNAILS */}
            <div className="room-gallery-grid">
              {thumbnails.map((img, i) => {
                const actualIndex = gallery.indexOf(img);
                return (
                  <div
                    key={actualIndex}
                    className="thumb-wrapper"
                    onClick={() => openLightbox(actualIndex)}
                  >
                    <img src={img} alt={`Thumbnail ${i}`} />

                    {i === thumbnails.length - 1 && extraCount > 0 && (
                      <div className="more-overlay">+{extraCount}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* DESCRIPTION */}
          {room.description && (
            <section className="room-description">
              <h2>About the Room</h2>
              <p>{room.description}</p>
            </section>
          )}

          {/* CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            Book via WhatsApp
          </a>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="lightbox">
          <button className="lightbox-close" onClick={closeLightbox}>
            ×
          </button>

          <button className="lightbox-nav left" onClick={prevImage}>
            ‹
          </button>

          <img
            src={gallery[lightboxIndex]}
            alt="Room Preview"
            className="lightbox-image"
          />

          <button className="lightbox-nav right" onClick={nextImage}>
            ›
          </button>
        </div>
      )}
    </main>
  );
}
