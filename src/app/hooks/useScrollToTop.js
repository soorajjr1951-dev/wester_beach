"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 1️⃣ Disable browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2️⃣ Force scroll AFTER Next finishes rendering
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [pathname]);
}
