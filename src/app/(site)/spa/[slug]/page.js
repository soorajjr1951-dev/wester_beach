"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSpaBySlug } from "../../lib/spa";
import useScrollReveal from "../../hooks/useScrollReveal";
import "./spa-detail.css";

const WHATSAPP_NUMBER = "8129942409";

export default function SpaDetailPage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function load() {
      const data = await getSpaBySlug(slug);
      setService(data);
      setActiveImage(data?.gallery?.[0] || null);
    }

    load();
  }, [slug]);

  useScrollReveal([service, activeImage]);

  if (!service) return <p style={{ padding: 120 }}>Loading treatment…</p>;

  return (
    <main className="spa-detail-page">
      <img src={activeImage} alt={service.name} />
      <h1>{service.name}</h1>
      <p>{service.long_description}</p>
    </main>
  );
}
