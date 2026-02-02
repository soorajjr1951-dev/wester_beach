"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSpaBySlug } from "../../../lib/spa";
import useScrollReveal from "../../../hooks/useScrollReveal";
import "./spa-detail.css";

export default function SpaDetailPage() {
  const { slug } = useParams();
  const [spa, setSpa] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getSpaBySlug(slug);
      setSpa(data);
      setActiveImage(data?.gallery?.[0]);
    }
    load();
  }, [slug]);

  useScrollReveal([spa, activeImage]);

  if (!spa) return <p style={{ padding: 120 }}>Loading treatment…</p>;

  return (
    <main className="spa-detail-page">
      <div className="spa-detail-grid" data-animate>
        <div className="spa-gallery">
          {activeImage && <img src={activeImage} alt={spa.name} />}
          <div className="thumbs">
            {spa.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="spa-content">
          <span>{spa.category}</span>
          <h1>{spa.name}</h1>
          <p>{spa.long_description}</p>
          <strong>₹{spa.price}</strong>
        </div>
      </div>
    </main>
  );
}
