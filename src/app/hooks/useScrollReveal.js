"use client";

import { useEffect, useRef } from "react";

export default function useScrollReveal(deps = []) {
  const lastScrollY = useRef(0);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY.current;
        lastScrollY.current = currentScrollY;

        entries.forEach((entry) => {
          const el = entry.target;

          if (entry.isIntersecting) {
            // ✅ apply animation
            el.classList.add("animate-in");

            // mark direction so we can re-animate correctly
            el.dataset.revealed = scrollingDown ? "down" : "up";
          } else {
            // ✅ allow re-animation ONLY when leaving viewport
            el.classList.remove("animate-in");
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -120px 0px", // prevents footer jitter
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, deps);
}
