"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Tv,
  Flame,
  Archive,
  Sofa,
  Refrigerator,
  Coffee,
  BedDouble,
} from "lucide-react";

import { getRoomBySlug } from "../../../lib/rooms";
import useScrollReveal from "../../../hooks/useScrollReveal";
import useScrollToTop from "../../../hooks/useScrollToTop";
import "./room-detail.css";

const WHATSAPP_NUMBER = "+918089211075";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const slug = params?.slug;
  // Build absolute image/canonical using metadataBase from root layout
  const title = slug
    ? `${slug.replace(/-/g, " ")}`
    : "Room";
  return {
    title: `${title} – Room Details`,
    description:
      "View photos, amenities, and pricing. Book your stay at Western Beach Ventures, Kovalam.",
    alternates: { canonical: `/rooms/${slug}` },
    openGraph: {
      type: "article",
      title: `${title} – Room Details`,
      description:
        "View photos, amenities, and pricing. Book your stay at Western Beach Ventures, Kovalam.",
    },
  };
}

export default function RoomDetailPage() {
  useScrollToTop();

  const { slug } = useParams();
  const [room, setRoom] = useState(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const touchStartX = useRef(0);

  useEffect(() => {
    if (!slug) return;

    (async () => {
      const data = await getRoomBySlug(slug);
      if (data) {
        setRoom(data);
        setActiveIndex(0);
      }
    })();
  }, [slug]);

  useEffect(() => {
    document.body.style.overflow = fullscreenOpen ? "hidden" : "auto";
  }, [fullscreenOpen]);

  useScrollReveal([room, activeIndex]);

  if (!room) {
    return (
      <p style={{ padding: 120, textAlign: "center", fontWeight: "bold" }}>
        Loading room…
      </p>
    );
  }

  const images = room.gallery || [];

  const nextImage = () => setActiveIndex((i) => (i + 1) % images.length);
  const prevImage = () =>
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello,\nI would like to book the *${room.name}*.\nPrice: ₹${room.price} per night.`,
  )}`;

  /* =========================
     AMENITIES CONFIG
  ========================= */
  const amenitiesConfig = [
    {
      key: "tv",
      label: "Television",
      icon: <Tv size={18} />,
    },
    {
      key: "geyser",
      label: "Hot Water",
      icon: <Flame size={18} />,
    },
    {
      key: "cupboard",
      label: "Cupboard",
      icon: <Archive size={18} />,
    },
    {
      key: "sofa",
      label: "Sofa",
      icon: <Sofa size={18} />,
    },
    {
      key: "fridge",
      label: "Refrigerator",
      icon: <Refrigerator size={18} />,
    },
    {
      key: "kettle",
      label: "Electric Kettle",
      icon: <Coffee size={18} />,
    },
  ];

  return (
    <main className="room-detail-page">
      <section className="room-detail-grid" data-animate>
        {/* =========================
      LEFT SIDE (TITLE + GALLERY)
  ========================= */}
        <div className="room-left">
          <span className="room-category">{room.category}</span>

          <h1>
            {room.name.split(" ")[0]}{" "}
            <em>{room.name.split(" ").slice(1).join(" ")}</em>
          </h1>

          <div className="room-gallery horizontal">
            <div className="room-gallery-thumbs vertical">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`thumb ${i === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                >
                  <Image src={img} alt="" width={100} height={100} />
                </button>
              ))}
            </div>

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
              />
            </div>
          </div>
        </div>

        {/* =========================
      RIGHT SIDE (DETAILS)
  ========================= */}
        <div className="room-right">
          <p className="room-description">{room.description}</p>

          {/* AMENITIES */}
          <div className="room-amenities">
            <h3>Amenities</h3>

            <ul className="amenities-grid">
              {room.amenities?.bed && (
                <li>
                  <BedDouble size={18} />
                  <span>{room.amenities.bed}</span>
                </li>
              )}

              {amenitiesConfig.map(
                ({ key, label, icon }) =>
                  room.amenities?.[key] === "Available" && (
                    <li key={key}>
                      {icon}
                      <span>{label}</span>
                    </li>
                  ),
              )}
            </ul>
          </div>

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
      </section>

      {/* LIGHTBOX */}
      {fullscreenOpen && (
        <div className="room-lightbox" onClick={() => setFullscreenOpen(false)}>
          <button className="room-lightbox-close">✕</button>
          <div
            className="room-lightbox-image"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt=""
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
