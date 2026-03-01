"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./Intro.module.css";
import Sun from "../Sun/Sun";

const slides = [
  <>
    Integrated <span className="foreground">third‑party SDKs</span>, managed{" "}
    <span className="foreground">permission tiers</span>, and built{" "}
    <span className="foreground">real‑time data dashboards</span>.
  </>,
  <>
    Built{" "}
    <span className="foreground">React apps with hundreds of components</span>,
    with demonstrated fluency in Component APIs.
  </>,
  <>
    Optimised experiences{" "}
    <span className="foreground">
      from Retina‑level MacBooks to older mobile devices
    </span>{" "}
    and even Smart TVs.
  </>,
  <>
    Conducted <span className="foreground">senior‑level interviews</span> and{" "}
    <span className="foreground">mentored junior engineers</span>, ready for
    larger challenges.
  </>,
] as const;

export default function Intro() {
  const [index, setIndex] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const AUTO_DELAY = 6_000;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_DELAY);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goPrev = () => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
    resetTimer();
  };

  const goNext = () => {
    setIndex((i) => (i + 1) % slides.length);
    resetTimer();
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_DELAY);
  };

  //pause on hover, it's annoying to have text moving when you're trying to read!
  const pause = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const resume = () => resetTimer();

  return (
    <section className={styles.intro} id="intro">
      <nav className={styles.controls}>
        <button onClick={goPrev} aria-label="Previous slide">
          ‹
        </button>
        <button onClick={goNext} aria-label="Next slide">
          ›
        </button>
      </nav>

      <p onMouseEnter={pause} onMouseLeave={resume} className={styles.slide}>
        {slides[index]}
      </p>

      <Sun />
    </section>
  );
}
