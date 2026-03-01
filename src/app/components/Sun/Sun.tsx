import React, { useEffect, useState } from "react";
import styles from "./Sun.module.css";
import { PiSunFill } from "react-icons/pi";

type Vec = { x: number; y: number; size: number };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function lerpVec(a: Vec, b: Vec, t: number): Vec {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    size: lerp(a.size, b.size, t),
  };
}

export default function Sun() {
  // have to figure out animation, this is definitely NOT it
  /*   const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const start = { x: -0.3 * vw, y: 0.3 * vh, size: 0.3 * vw };
  const end = { x: vw - 0.12 * vw, y: vh - 0.12 * vw, size: 0.12 * vw };
  const [pos, setPos] = useState<Vec>(start);

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = `${totalHeight}px`;
    sentinel.style.width = "1px";
    sentinel.style.height = "1px";
    document.body.appendChild(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // entry.intersectionRatio goes from 0 (top) to 1 (bottom)
        const t = entry.intersectionRatio; // 0‑1 range
        setPos(lerpVec(start, end, t));
      },
      {
        root: null, // viewport
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0, .01, .02 … 1
      },
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      document.body.removeChild(sentinel);
    };
  }, []);
 */
  const [isRotating, setIsRotating] = React.useState(false);
  return (
    <div
      className={styles.sunContainer}
      onMouseEnter={() => setIsRotating(true)}
      onMouseLeave={() => setIsRotating(false)}
      /*  style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        width: `${pos.size}px`,
        height: `${pos.size}px`,
      }} */
      aria-hidden="true"
    >
      <PiSunFill
        className={`${styles.sun}${isRotating ? ` ${styles.rotating}` : ""}`}
      />
    </div>
  );
}
