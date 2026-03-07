"use client";

import { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import { PiSunFill } from "react-icons/pi";

export default function NavBar() {
  const [active, setActive] = useState<string>("intro");

  useEffect(() => {
    const sections = ["intro", "skills", "contact"];
    const handler = () => {
      const scrollY = window.scrollY;
      let current = "intro";

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const offset = el.offsetTop - 80;
          if (scrollY >= offset) current = id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [isIconShown, setIsIconShown] = useState(true);

  return (
    <nav className={styles.nav}>
      <p
        onMouseEnter={() => setIsIconShown(false)}
        onMouseLeave={() => setIsIconShown(true)}
        className={styles.hi}
      >
        {" "}
        <span className={styles.heightEnforcer}>
          Hi! I'm{" "}
          {isIconShown ? (
            <PiSunFill className={styles.wordplay} />
          ) : (
            <span className={styles.wordplay}>San</span>
          )}{" "}
        </span>
        tana <br />
        and this is Whimsical Tech
      </p>
      <ul className={styles.list}>
        <li>
          <a
            href="#intro"
            onClick={scrollTo("intro")}
            className={active === "intro" ? styles.active : undefined}
          >
            Intro
          </a>
        </li>
        <li>
          <a
            href="#skills"
            onClick={scrollTo("skills")}
            className={active === "skills" ? styles.active : undefined}
          >
            Skills
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={scrollTo("contact")}
            className={active === "contact" ? styles.active : undefined}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
