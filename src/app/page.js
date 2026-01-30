"use client";
import Link from "next/link";
import "./home.css";
import useScrollReveal from "./hooks/useScrollReveal";

export default function HomePage() {
  useScrollReveal();

  return (
    <div className="home-wrapper">
      {/* HERO */}
      <section className="hero">
        <div className="hero-media">
          <img
            src="hero-lighthouse_4k_3840x2160.png"
            alt="Kovalam Lighthouse"
          />
        </div>
        <div className="hero-overlay" />

        <div className="hero-content" data-animate>
          <p className="hero-tagline">STAY WITH US FEELS LIKE HOME</p>
          <h1 className="hero-title">
            Experience Unparalleled <br />
            <span>Comfort.</span>
          </h1>
        </div>

        <div className="scroll-indicator">⌄</div>

        {/* BOOKING BAR */}
        <div className="booking-bar">
          <div className="booking-item">Check In</div>
          <div className="booking-item">And Enjoy</div>

          <Link href="/rooms" className="booking-go">
            Go
          </Link>
        </div>
      </section>

      {/* INTRO */}
      <section className="intro">
        <div className="intro-grid">
          <div className="intro-text" data-animate="left">
            <span className="section-label">THE ESSENCE</span>
            <h2>Restore. Recharge. Reconnect.</h2>

            <p>
              At Western Beach Ventures, we believe luxury is not excess — it is
              space, calm, and connection. Nestled along the Kovalam coast, our
              retreat blends comfort with the raw beauty of the Arabian Sea.
            </p>

            <Link href="/rooms" className="primary-btn">
              Learn More →
            </Link>
          </div>

          <div className="intro-image" data-animate="right">
            <img
              src="https://images.unsplash.com/photo-1630632496226-6c862fb7ab24?q=80&w=687&auto=format&fit=crop"
              alt="Wellness Retreat"
            />
          </div>
        </div>
      </section>

      {/* CHAPTERS */}
      <section className="chapters">
        {[
          {
            title: "Stay",
            img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
            link: "/rooms",
          },
          {
            title: "Dine",
            img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
            link: "/restaurant",
          },
          {
            title: "Heal",
            img: "https://plus.unsplash.com/premium_photo-1723773777071-7bbc49e21970?q=80&w=687&auto=format&fit=crop",
            link: "/spa",
          },
        ].map((item, i) => (
          <Link
            key={i}
            href={item.link}
            className="chapter-card"
            data-animate="up"
          >
            <img src={item.img} alt={item.title} />
            <div className="chapter-overlay">
              <h3>{item.title}</h3>
            </div>
          </Link>
        ))}
      </section>

      {/* CONTACT */}
      <section className="contact-strip" data-animate>
        <h2>Elevate Your Wellbeing.</h2>

        <div className="contact-grid">
          <div>
            <span>VISIT</span>
            <p>
              Beach Road, Kovalam
              <br />
              Kerala 695527
            </p>
          </div>
          <div>
            <span>CONTACT</span>
            <p>inquiry@westernbeach.in</p>
          </div>
          <div>
            <span>FOLLOW</span>
            <p>@westernbeachresort</p>
          </div>
        </div>
      </section>
    </div>
  );
}
