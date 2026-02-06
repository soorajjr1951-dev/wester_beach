"use client";

import Link from "next/link";
import Image from "next/image";
import "./home.css";
import useScrollReveal from "../hooks/useScrollReveal";

export default function HomePage() {
  useScrollReveal();

  return (
    <div className="home-wrapper">
      {/* HERO */}
      <section className="hero">
        <div className="hero-media">
          <Image
            src="https://cms.westernbeachventures.com/uploads/aerial_view_sea_by_mountain_jpg_8ba3ee1603.jpeg"
            alt="Kovalam Lighthouse"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="hero-overlay" />

        <div className="hero-content" data-animate>
          <p className="hero-tagline">STAY WITH US FEELS LIKE HOME</p>
          <h1 className="hero-title">
            Experience Unparalleled <br />
            <span>Comfort</span>
          </h1>
        </div>

        <div className="scroll-indicator">⌄</div>

        {/* BOOKING BAR */}
        <div className="booking-bar">
          <div className="booking-item">Check In And Enjoy</div>
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
            <Image
              src="https://cms.westernbeachventures.com/uploads/attractive_girl_sunglasses_hat_lies_warm_sand_jpg_ae2417a638.jpeg"
              alt="Wellness Retreat"
              width={520}
              height={420}
              sizes="(max-width: 768px) 100vw, 520px"
            />
          </div>
        </div>
      </section>

      {/* CHAPTERS */}
      <section className="chapters">
        {[
          {
            title: "Stay",
            img: "https://cms.westernbeachventures.com/uploads/DSC_03698_6794fb68a0.JPG",
            link: "/rooms",
          },
          {
            title: "Dine",
            img: "https://cms.westernbeachventures.com/uploads/DSC_03939_9ccff8ae47.JPG",
            link: "/restaurant",
          },
          {
            title: "Heal",
            img: "https://cms.westernbeachventures.com/uploads/Head_Massage_bb7925c3dd.jpg",
            link: "/spa",
          },
        ].map((item, i) => (
          <Link
            key={i}
            href={item.link}
            className="chapter-card"
            data-animate="up"
          >
            <Image
              src={item.img}
              alt={item.title}
              width={420}
              height={520}
              sizes="(max-width: 768px) 100vw, 420px"
            />
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
            <p>westernbeachresort2025@gmail.com</p>
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
