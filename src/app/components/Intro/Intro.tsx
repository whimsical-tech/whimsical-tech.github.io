"use client";
import { useState } from "react";
import styles from "./Intro.module.css";

const slides = [
  "Integrated third‑party SDKs, managed permission tiers, and built real‑time data dashboards.",
  "Built React apps with hundreds of inter‑dependent components, with demonstrated fluency in Component APIs.",
  "Optimised experiences from Retina‑level MacBooks to legacy mobiles and even Smart TVs.",
  "Conducted senior‑level interviews and mentored junior engineers, ready for larger challenges.",
] as const;

export default function Intro() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <section className={styles.intro}>
      <nav className={styles.controls}>
        <button onClick={prev} aria-label="Previous slide">
          ‹
        </button>
        <button onClick={next} aria-label="Next slide">
          ›
        </button>
      </nav>

      <p key={slides[index]} className={styles.slide}>
        {slides[index]}
      </p>
    </section>
  );
}
