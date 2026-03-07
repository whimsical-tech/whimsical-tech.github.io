"use client";
import React, { useEffect, useState } from "react";
import styles from "./Sun.module.css";
import { PiSunFill } from "react-icons/pi";

export default function Sun() {
  const [isRotating, setIsRotating] = React.useState(false);
  return (
    <div
      className={styles.sunContainer}
      onMouseEnter={() => setIsRotating(true)}
      onMouseLeave={() => setIsRotating(false)}
      aria-hidden="true"
    >
      <PiSunFill
        className={`${styles.sun}${isRotating ? ` ${styles.rotating}` : ""}`}
      />
    </div>
  );
}
