"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./rooms.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import { getRooms } from "../../lib/rooms";
import useScrollToTop from "@/app/hooks/useScrollToTop";

export const metadata = {
  title: "Rooms & Suites – Western Beach Ventures",
  description:
    "Explore AC and Non-AC rooms with sea view options. Thoughtful amenities and modern comforts by the Kovalam coast.",
  alternates: { canonical: "/rooms" },
  openGraph: {
    title: "Rooms & Suites – Western Beach Ventures",
    description:
      "Explore AC and Non-AC rooms with sea view options. Thoughtful amenities and modern comforts by the Kovalam coast.",
    type: "website",
  },
};

export default function RoomsPage() {
  useScrollToTop(); // ✅ ONLY THIS (no duplicates)

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("LOW_HIGH");

  useEffect(() => {
    async function fetchRooms() {
      const data = await getRooms();
      setRooms(Array.isArray(data) ? data : []);
      setLoading(false);
    }
    fetchRooms();
  }, []);

  const visibleRooms = useMemo(() => {
    let list = [...rooms];

    if (filterType !== "ALL") {
      list = list.filter((r) => r.category === filterType);
    }

    return list.sort((a, b) =>
      sortOrder === "LOW_HIGH" ? a.price - b.price : b.price - a.price,
    );
  }, [rooms, filterType, sortOrder]);

  useScrollReveal([visibleRooms.length, filterType, sortOrder]);

  if (loading) {
    return (
      <p
        style={{
          padding: 120,
          color: "#02833a",
          fontWeight: "bolder",
          textAlign: "center",
        }}
      >
        Loading rooms…
      </p>
    );
  }

  return (
    <main className="rooms-page">
      <div className="container">
        {/* HEADER */}
        <header className="rooms-header" data-animate>
          <span className="eyebrow">The Sanctuaries</span>
          <h1>
            Rest in the <br />
            <span>Sublime.</span>
          </h1>
          <p>Eight uniquely commissioned chambers by the sea.</p>
        </header>

        {/* FILTER + SORT */}
        <div className="rooms-controls" data-animate>
          <div className="filters">
            {["ALL", "AC", "NON-AC"].map((type) => (
              <button
                key={type}
                className={filterType === type ? "active" : ""}
                onClick={() => setFilterType(type)}
              >
                {type === "ALL" ? "All Rooms" : type}
              </button>
            ))}
          </div>

          <div className="sort">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="LOW_HIGH">Price: Low → High</option>
              <option value="HIGH_LOW">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* ROOMS GRID */}
        <div className="rooms-grid">
          {visibleRooms.map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.slug}`}
              className="room-card"
              data-animate
            >
              <div className="room-card-image">
                <Image
                  src={room.preview_image}
                  alt={room.name}
                  width={600}
                  height={420}
                  quality={75}
                  className="room-img"
                />

                <span
                  className={`badge ${
                    room.category === "AC" ? "ac" : "non-ac"
                  }`}
                >
                  {room.category}
                </span>
              </div>

              <div className="room-card-body">
                <h3>{room.name}</h3>
                <span>₹{room.price}</span>
                <div className="room-card-footer">
                  <p>{room.short_description}</p>
                  <span className="arrow">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
