//"use client";

import styles from "./Timeline.module.css";

export default function Timeline() {
  return (
    <ul className={styles.timeline}>
      <li>
        <p>2013 - began frontend internship</p>
      </li>
      <li>
        <p>2016 - promoted to junior full time developer</p>
      </li>
      <li>
        <p>2019 - flew to Germany to work in international startups</p>
      </li>
      <li>
        <p>2022 - responsible for leading frontend development</p>
      </li>
      <li>
        <p>2026 - working with you?</p>
      </li>
    </ul>
  );
}
