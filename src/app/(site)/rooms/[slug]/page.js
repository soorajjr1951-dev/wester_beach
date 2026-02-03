"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getRoomBySlug } from "../../../lib/rooms";
import useScrollReveal from "../../../hooks/useScrollReveal";
import useScrollToTop from "../../../hooks/useScrollToTop";
import "./room-detail.css";

const WHATSAPP_NUMBER = "8129942409";

export default function RoomDetailPage() {
  useScrollToTop(); // ✅ ensures page opens at top

  const { slug } = useParams();
  const [room, setRoom] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchRoom() {
      const data = await getRoomBySlug(slug);
      setRoom(data);
      setActiveImage(data?.gallery?.[0] || null);
    }

    fetchRoom();
  }, [slug]);

  useScrollReveal([room, activeImage]);

  if (!room) {
    return <p style={{ padding: 120 , color:"#02833a" , fontWeight:"bolder", textAlign:"center"}}>Loading room…</p>;
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello,\n\nI would like to book the *${room.name}*.\nPrice: ₹${room.price} per night.`
  )}`;

  return (
    <main className="room-detail-page">
      <section className="room-detail-grid" data-animate>
        {/* LEFT CONTENT */}
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

        {/* RIGHT GALLERY */}
        <div className="room-gallery">
          <div className="room-gallery-main">
            {activeImage && (
              <Image
                src={activeImage}
                alt={room.name}
                width={900}
                height={600}
                quality={75}
                priority
                className="room-main-img"
              />
            )}
          </div>

          <div className="room-gallery-thumbs">
            {room.gallery?.map((img, i) => (
              <button
                key={i}
                className={`thumb ${activeImage === img ? "active" : ""}`}
                onClick={() => setActiveImage(img)}
              >
                <Image
                  src={img}
                  alt={`${room.name} ${i + 1}`}
                  width={120}
                  height={90}
                  quality={70}
                  className="room-thumb-img"
                />
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
