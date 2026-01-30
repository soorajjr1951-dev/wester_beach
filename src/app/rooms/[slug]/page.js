export const runtime = "edge";

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getRoomBySlug } from "../../lib/rooms";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./room-detail.css";

const WHATSAPP_NUMBER = "7736242577";

export default function RoomDetailPage() {
  const { slug } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useScrollReveal([room]);

  useEffect(() => {
    async function fetchRoom() {
      const data = await getRoomBySlug(slug);
      setRoom(data);
      setActiveIndex(0);
      setLoading(false);
    }
    if (slug) fetchRoom();
  }, [slug]);

  if (loading) return <p style={{ padding: 120 }}>Loading room…</p>;
  if (!room) return <p style={{ padding: 120 }}>Room not found.</p>;

  const gallery = room.gallery || [];
  const visibleThumbs = gallery.slice(0, 3);
  const extraCount = gallery.length - 3;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello 👋\n\nI would like to book the *${room.name}*.\nPrice: ₹${room.price} per night.`
  )}`;

  function openLightbox(index) {
    setActiveIndex(index);
    setLightboxOpen(true);
  }

  function nextImage() {
    setActiveIndex((prev) => (prev + 1) % gallery.length);
  }

  function prevImage() {
    setActiveIndex((prev) =>
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
            <div
              className="room-gallery-main"
              onClick={() => openLightbox(activeIndex)}
            >
              <img src={gallery[activeIndex]} alt={room.name} />
            </div>

            <div className="room-gallery-grid">
              {visibleThumbs.map((img, i) => (
                <div
                  key={i}
                  className="thumb-wrapper"
                  onClick={() => openLightbox(i)}
                >
                  <img src={img} alt={`Thumb ${i}`} />

                  {i === 2 && extraCount > 0 && (
                    <div className="more-overlay">+{extraCount}</div>
                  )}
                </div>
              ))}
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
          <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>
            ×
          </button>

          <button className="lightbox-nav left" onClick={prevImage}>
            ‹
          </button>

          <img
            src={gallery[activeIndex]}
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
