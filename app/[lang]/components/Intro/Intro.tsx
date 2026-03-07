"use client";

import { useTranslation } from "next-i18next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/dictionaries";
import { useState, useEffect, useRef } from "react";
import Sun from "../Sun/Sun";
import styles from "./Intro.module.css";

interface Slide {
  text: string;
  segments: { text: string; highlighted: boolean }[];
}

export default async function Intro({ params }: PageProps<"/[lang]">) {
  const { t } = useTranslation("dictionary");

  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  //  const t = await getDictionary(lang);

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
      <p className={styles.slide}>
        {slides[index]?.segments.map((segment, i) => (
          <span key={i} className={segment.highlighted ? "foreground" : ""}>
            {segment.text}
          </span>
        ))}
      </p>
      <Sun />
    </section>
  );
}
