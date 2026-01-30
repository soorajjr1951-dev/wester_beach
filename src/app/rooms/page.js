"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "./rooms.css";
import useScrollReveal from "../hooks/useScrollReveal";
import { getRooms } from "../lib/rooms";

export default function RoomsPage() {
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

    list.sort((a, b) =>
      sortOrder === "LOW_HIGH"
        ? a.price - b.price
        : b.price - a.price
    );

    return list;
  }, [rooms, filterType, sortOrder]);

  useScrollReveal([visibleRooms.length]);

  if (loading) {
    return <p style={{ padding: 120 }}>Loading rooms…</p>;
  }

  return (
    <main className="rooms-page">
      <div className="container">
        <header className="rooms-header" data-animate>
          <span className="eyebrow">The Sanctuaries</span>
          <h1>
            Rest in the <br />
            <span>Sublime.</span>
          </h1>
          <p>
            Eight uniquely commissioned chambers designed for stillness,
            privacy, and the gentle sounds of the tides.
          </p>
        </header>

        <div className="rooms-controls" data-animate>
          <div className="filter-group">
            {["ALL", "AC", "NON-AC"].map((type) => (
              <button
                key={type}
                className={filterType === type ? "active" : ""}
                onClick={() => setFilterType(type)}
              >
                {type.replace("_", " ")}
              </button>
            ))}
          </div>

          <div className="sort-group">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="LOW_HIGH">Price: Low → High</option>
              <option value="HIGH_LOW">Price: High → Low</option>
            </select>
          </div>
        </div>

        {visibleRooms.length === 0 ? (
          <p className="no-rooms">No rooms available.</p>
        ) : (
          <div className="rooms-list">
            {visibleRooms.map((room, index) => (
              <Link
                key={room.id}
                href={`/rooms/${room.slug}`}
                className={`room-row-card ${index % 2 !== 0 ? "reverse" : ""}`}
                data-animate
              >
                <div className="room-image">
                  {room.preview_image ? (
                    <img src={room.preview_image} alt={room.name} />
                  ) : (
                    <div className="room-image-placeholder" />
                  )}
                  <div className="room-type">{room.category}</div>
                </div>

                <div className="room-content">
                  <div className="stars">★★★</div>
                  <h3>{room.name}</h3>
                  <p className="description">{room.short_description}</p>

                  <div className="room-footer">
                    <div>
                      <span className="rate-label">Nightly rate from</span>
                      <div className="price">₹{room.price}</div>
                    </div>
                    <span className="arrow-btn">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
