"use client";

import { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import styles from "./OrbitIcons.module.css";

export default function OrbitIcons() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className={styles.orbitContainer}>
        <FaSun className={`${styles.icon} ${styles.sun}`} />
      </div>

      <div className={styles.orbitContainer}>
        <FaMoon className={`${styles.icon} ${styles.moon}`} />
      </div>
    </>
  );
}
