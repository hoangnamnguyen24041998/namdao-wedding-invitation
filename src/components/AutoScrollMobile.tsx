import { useEffect, useRef } from "react";

const AutoScrollMobile = () => {
  const hasScrolled = useRef(false);
  const cancelled = useRef(false);

  useEffect(() => {
    if (hasScrolled.current) return;
    hasScrolled.current = true;

    window.scrollTo(0, 0); // Start at top

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return;

    const cancelScroll = () => {
      cancelled.current = true;
    };

    // Cancel auto-scroll on any user interaction
    window.addEventListener("scroll", cancelScroll, { once: true });
    window.addEventListener("click", cancelScroll, { once: true });
    window.addEventListener("touchstart", cancelScroll, { once: true });

    const scrollToBottom = () => {
      const target = document.documentElement.scrollHeight;
      let current = window.scrollY;

      const step = () => {
        if (cancelled.current) return;

        current += 2;
        if (current < target) {
          window.scrollTo(0, current);
          setTimeout(() => requestAnimationFrame(step), 10);
        }
      };

      requestAnimationFrame(step);
    };

    const timeout = setTimeout(() => {
      if (!cancelled.current) scrollToBottom();
    }, 10000);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", cancelScroll);
      window.removeEventListener("click", cancelScroll);
      window.removeEventListener("touchstart", cancelScroll);
    };
  }, []);

  return null;
};

export default AutoScrollMobile;
