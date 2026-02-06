"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getRoomBySlug } from "../../../lib/rooms";
import useScrollReveal from "../../../hooks/useScrollReveal";
import useScrollToTop from "../../../hooks/useScrollToTop";
import "./room-detail.css";

const WHATSAPP_NUMBER = "8089211075";

export default function RoomDetailPage() {
  useScrollToTop();

  const { slug } = useParams();
  const [room, setRoom] = useState(null);

  // 🔥 INDEX BASED STATE
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const touchStartX = useRef(0);

  useEffect(() => {
    if (!slug) return;

    async function fetchRoom() {
      const data = await getRoomBySlug(slug);
      if (data) {
        setRoom(data);
        setActiveIndex(0);
      }
    }

    fetchRoom();
  }, [slug]);

  // 🔥 Lock body scroll
  useEffect(() => {
    document.body.style.overflow = fullscreenOpen ? "hidden" : "auto";
  }, [fullscreenOpen]);

  // 🔥 Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!fullscreenOpen) return;

      if (e.key === "Escape") setFullscreenOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fullscreenOpen, room]);

  useScrollReveal([room, activeIndex]);

  if (!room) {
    return (
      <p
        style={{
          padding: 120,
          color: "#02833a",
          fontWeight: "bolder",
          textAlign: "center",
        }}
      >
        Loading room…
      </p>
    );
  }

  const images = room.gallery || [];

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // 🔥 Mouse wheel
  const handleWheel = (e) => {
    if (e.deltaY > 0) nextImage();
    else prevImage();
  };

  // 🔥 Touch swipe
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
    `Hello,\nI would like to book the *${room.name}*.\nPrice: ₹${room.price} per night.`,
  )}`;

  return (
    <main className="room-detail-page">
      <section className="room-detail-grid" data-animate>
        {/* LEFT */}
        <div className="room-detail-content">
          <span className="room-category">{room.category}</span>

          <h1>
            {room.name.split(" ")[0]}{" "}
            <em>{room.name.split(" ").slice(1).join(" ")}</em>
          </h1>

          <p>{room.description}</p>

          <div className="room-price">₹{room.price} / night</div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="room-book-btn"
          >
            Book via WhatsApp →
          </a>
        </div>

        <div className="room-gallery horizontal">
          {/* THUMBNAILS LEFT */}
          <div className="room-gallery-thumbs vertical">
            {images.map((img, i) => (
              <button
                key={i}
                className={`thumb ${i === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(i)}
              >
                <Image
                  src={img}
                  alt={`${room.name} ${i + 1}`}
                  width={100}
                  height={100}
                />
              </button>
            ))}
          </div>

          {/* MAIN IMAGE RIGHT */}
          <div
            className="room-gallery-main"
            onClick={() => setFullscreenOpen(true)}
          >
            <Image
              src={images[activeIndex]}
              alt={room.name}
              width={900}
              height={600}
              priority
              className="room-main-img"
            />
          </div>
        </div>
      </section>

      {/* =========================
          FULLSCREEN LIGHTBOX
      ========================= */}
      {fullscreenOpen && (
        <div
          className="room-lightbox"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => setFullscreenOpen(false)}
        >
          <button
            className="room-lightbox-close"
            onClick={() => setFullscreenOpen(false)}
          >
            ✕
          </button>

          <div
            className="room-lightbox-image"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={room.name}
              fill
              sizes="100vw"
              style={{ objectFit: "contain" }}
            />
            <div className="room-lightbox-counter">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
