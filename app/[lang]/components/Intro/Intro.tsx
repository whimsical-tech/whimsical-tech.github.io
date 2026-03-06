"use client";

import { useTranslation } from "next-i18next";
import { useState, useEffect, useRef } from "react";
import Sun from "../Sun/Sun";
import styles from "./Intro.module.css";

interface Slide {
  text: string;
}

export default function Intro() {
  const { t } = useTranslation("dictionary");
  const slides: Slide[] = t("intro.slides", { returnObjects: true }) as Slide[];

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
      <p
        onMouseEnter={() => clearInterval(intervalRef.current!)}
        onMouseLeave={resetTimer}
        className={styles.slide}
        dangerouslySetInnerHTML={{ __html: slides[index]?.text || "" }}
      />
      <Sun />
    </section>
  );
}
