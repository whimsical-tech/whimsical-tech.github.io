"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Intro.module.css";

interface Slide {
  text: string;
  segments: { text: string; highlighted: boolean }[];
}

interface IntroSlideshowProps {
  slides: Slide[];
}

export default function IntroSlideshow({ slides }: IntroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const AUTO_DELAY = 6_000;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef.current!);
  }, [slides.length]);

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_DELAY);
  };

  const goPrev = () => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
    resetTimer();
  };

  const goNext = () => {
    setIndex((i) => (i + 1) % slides.length);
    resetTimer();
  };

  //pause on hover, it's annoying to have text moving when you're trying to read!
  const pause = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const resume = () => resetTimer();

  // swipe / drag logic
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);

  const SWIPE_THRESHOLD = 50; // pixels

  const handlePointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (startX.current !== null) {
      deltaX.current = e.clientX - startX.current;
      // prevent text selection or inadvertent dragging
      e.preventDefault();
    }
  };

  const handlePointerUp = (e?: React.PointerEvent) => {
    if (startX.current !== null) {
      if (deltaX.current > SWIPE_THRESHOLD) {
        goPrev();
      } else if (deltaX.current < -SWIPE_THRESHOLD) {
        goNext();
      }

      if (e) e.currentTarget.releasePointerCapture(e.pointerId);
    }
    startX.current = null;
    deltaX.current = 0;
    resetTimer();
  };

  return (
    <>
      <nav className={styles.controls}>
        <button onClick={goPrev} aria-label="Previous slide">
          ‹
        </button>
        <button onClick={goNext} aria-label="Next slide">
          ›
        </button>
      </nav>
      <p
        className={styles.slide}
        onMouseEnter={pause}
        onMouseLeave={resume}
        aria-live="polite"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(e) => handlePointerUp(e)}
        onPointerCancel={(e) => handlePointerUp(e)}
      >
        {slides[index]?.segments.map((segment, i) => (
          <span key={i} className={segment.highlighted ? "foreground" : ""}>
            {segment.text}
          </span>
        ))}
      </p>
    </>
  );
}
