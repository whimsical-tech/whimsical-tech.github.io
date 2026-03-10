"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import styles from "./NavBar.module.css";
import { PiSunFill } from "react-icons/pi";
import { BiWorld } from "react-icons/bi";
import { HiMenu, HiX } from "react-icons/hi";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";

export default function NavBar() {
  const [active, setActive] = useState<string>("intro");
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    setIsMenuOpen(false);
  };

  const switchLang = () => {
    const newLang = currentLang === "en" ? "jp" : "en";
    router.push(`/${newLang}`);
  };

  const [isIconShown, setIsIconShown] = useState(true);

  return (
    <nav className={`${styles.nav} ${isMenuOpen ? styles.menuOpen : ""}`}>
      <p
        onMouseEnter={() => setIsIconShown(false)}
        onMouseLeave={() => setIsIconShown(true)}
        className={styles.hi}
      >
        {" "}
        <span className={styles.heightEnforcer}>
          {" "}
          {
            //maybe change name reveal to be a tooltip?
          }
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

      <FocusLock
        disabled={!isMenuOpen}
        returnFocus
        className={styles.navLinksContainer}
      >
        <RemoveScroll enabled={isMenuOpen} className={styles.navLinks}>
          <button
            className={styles.hamburger}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"} //TODO: add translation
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>

          <ul className={styles.list}>
            <li>
              <a
                href="#intro"
                onClick={scrollTo("intro")}
                className={active === "intro" ? styles.active : undefined}
              >
                {t("navbar.intro")}
              </a>
            </li>
            <li>
              <a
                href="#skills"
                onClick={scrollTo("skills")}
                className={active === "skills" ? styles.active : undefined}
              >
                {t("navbar.skills")}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={scrollTo("contact")}
                className={active === "contact" ? styles.active : undefined}
              >
                {t("navbar.contact")}
              </a>
            </li>
          </ul>

          <button onClick={switchLang} className={styles.langSwitch}>
            <BiWorld />
            {currentLang === "en" ? "JP" : "EN"}
          </button>
        </RemoveScroll>
      </FocusLock>
    </nav>
  );
}
