"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import "./navbar.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }

    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <>
      <header
        className={`navbar-main ${
          isScrolled ? "navbar-scrolled" : "navbar-transparent"
        }`}
      >
        <div className="navbar-container">
          {/* BRAND */}
          <Link href="/" className="navbar-brand">
            <span className="brand-word green">Western</span>
            <span className="brand-dot">•</span>
            <span className="brand-word blue">Beach</span>
            <span className="brand-dot">•</span>
            <span className="brand-word dark">Ventures</span>
          </Link>

          {/* DESKTOP LINKS */}
          <nav className="navbar-links">
            <Link href="/rooms">Rooms</Link>
            <Link href="/spa">Ayurvedic Spa</Link>
            <Link href="/restaurant">Restaurant</Link>
          </nav>

          {/* CTA */}
          <Link href="/rooms" className="navbar-cta">
            Book Your Stay
          </Link>

          {/* HAMBURGER */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={32} />
        </button>

        <div className="mobile-links">
          <Link href="/rooms" onClick={() => setMenuOpen(false)}>
            Rooms
          </Link>
          <Link href="/spa" onClick={() => setMenuOpen(false)}>
            Ayurvedic Spa
          </Link>
          <Link href="/restaurant" onClick={() => setMenuOpen(false)}>
            Restaurant
          </Link>
          <Link href="/rooms" onClick={() => setMenuOpen(false)} className="mobile-cta">
            Book Your Stay
          </Link>
        </div>
      </div>
    </>
  );
}
