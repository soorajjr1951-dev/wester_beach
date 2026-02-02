"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "./rooms.css";
import useScrollReveal from "../../hooks/useScrollReveal";
import { getRooms } from "../../lib/rooms";
import useScrollToTop from "@/app/hooks/useScrollToTop";

export default function RoomsPage() {
  useScrollToTop();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("LOW_HIGH");

  useEffect(() => {
    async function fetchRooms() {
      const data = await getRooms();
      setRooms(data);
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
      sortOrder === "LOW_HIGH" ? a.price - b.price : b.price - a.price
    );
  }, [rooms, filterType, sortOrder]);

  useScrollReveal([visibleRooms.length, filterType, sortOrder]);

  if (loading) return <p style={{ padding: 120 }}>Loading rooms…</p>;

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

        {/* 🔥 FILTER + SORT */}
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
                <img src={room.preview_image} alt={room.name} />
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
                <p>{room.short_description}</p>
                <div className="room-card-footer">
                  <span>₹{room.price}</span>
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
