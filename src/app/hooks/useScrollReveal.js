"use client";

import { useEffect, useRef } from "react";

export default function useScrollReveal(deps = []) {
  const lastScrollY = useRef(0);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]");
    if (!elements.length) return;

    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 900px)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY.current;
        lastScrollY.current = currentScrollY;

        entries.forEach((entry) => {
          const el = entry.target;

          if (entry.isIntersecting) {
            // 🚀 MOBILE: instant reveal (no delay logic)
            if (isMobile) {
              el.classList.add("animate-in");
              return;
            }

            // 🖥 DESKTOP: keep direction-aware animation
            el.classList.add("animate-in");
            el.dataset.revealed = scrollingDown ? "down" : "up";
          } else {
            // allow re-animation when leaving viewport
            el.classList.remove("animate-in");
          }
        });
      },
      {
        // ⚡ MOBILE: trigger earlier
        threshold: isMobile ? 0.05 : 0.18,

        // ⚡ MOBILE: remove bottom offset delay
        rootMargin: isMobile
          ? "0px 0px 0px 0px"
          : "0px 0px -120px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, deps);
}
