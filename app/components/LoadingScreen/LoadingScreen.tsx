"use client";

import { useEffect, useState } from "react";
import OrbitIcons from "../OrbitIcons/OrbitIcons";
import { i18n, type Locale } from "@/i18n-config";
import styles from "./LoadingScreen.module.css";

const SECTOR_COUNT = 30;

const messages: Record<Locale, string> = {
  en: "loading",
  ja: "読 み 込 み 中",
};

export default function LoadingScreen() {
  const [ringsData, setRingsData] = useState<string[][]>([]);

  useEffect(() => {
    const preparedRings = i18n.locales.map((locale) => {
      const message = messages[locale];
      const chars = message.split("");

      return Array.from({ length: SECTOR_COUNT }, (_, i) =>
        i < chars.length ? chars[i] : "",
      );
    });

    setRingsData(preparedRings);
  }, []);

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderWrapper}>
        {ringsData.map((sectors, ringIndex) => (
          <div key={ringIndex} className={styles.loaderRing}>
            {sectors.map((char, charIndex) => (
              <div key={charIndex} className={styles.loaderSector}>
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>

      <OrbitIcons />
    </div>
  );
}
