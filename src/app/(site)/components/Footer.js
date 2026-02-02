"use client";

import Link from "next/link";
import { Waves, Instagram, Facebook, Phone } from "lucide-react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* TOP GRID */}
        <div className="footer-grid">
          {/* BRAND / QUOTE */}
          <div className="footer-brand">
            <div className="brand-row">
              <div className="brand-icon">
                <Waves size={22} />
              </div>
              <div className="brand-text">
                <span className="brand-title">WESTERN BEACH VENTURES </span>
                <span className="brand-sub">
                    • Kovalam
                </span>
              </div>
            </div>

            <h4 className="brand-quote">
              “Where the land ends, and the story begins.”
            </h4>

            <div className="socials">
              <a href="#"><Instagram /></a>
              <a href="#"><Facebook /></a>
              <a href="#"><Phone /></a>
            </div>
          </div>

          {/* EXPLORE */}
          <div className="footer-column">
            <h5>Explore</h5>
            <ul>
              <li><Link href="/rooms">The Stays</Link></li>
              <li><Link href="/restaurant">The Food</Link></li>
              <li><Link href="/spa">The Spa</Link></li>
              <li><Link href="/">Our Philosophy</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="footer-column">
            <h5>Contact</h5>
            <p>
              Beach Road, Kovalam<br />
              Thiruvananthapuram, Kerala 695527
              <span className="contact-phone">
                +91 98765 43210
              </span>
              <span className="contact-email">
                hello@westernbeach.in
              </span>
            </p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="footer-bottom">
          <p>
            © 2024 Western Beach Ventures. All Rights Reserved.
          </p>

          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Sustainability</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
