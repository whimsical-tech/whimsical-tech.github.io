"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import styles from "./NavBar.module.css";
import { PiSunFill } from "react-icons/pi";
import { BiWorld } from "react-icons/bi";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";
import { useTheme } from "../ThemeProvider/ThemeProvider";
import Link from "next/link";

function Logo() {
  const [isIconShown, setIsIconShown] = useState(true);

  return (
    <p
      onMouseEnter={() => setIsIconShown(false)}
      onMouseLeave={() => setIsIconShown(true)}
      className={styles.hi}
    >
      <span className={styles.heightEnforcer}>
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
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const [active, setActive] = useState<string>("intro");
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const getHomepagePath = () => {
    return `/${currentLang}`;
  };

  const getSlugFromPathname = (path: string, locale: string): string => {
    const regex = new RegExp(`^\\/${locale}\\/`);
    const slug = path.replace(regex, "");

    if (!slug && path === `/${locale}`) return "home";

    return slug.split("/")[0] || "home";
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (pathname === getHomepagePath()) {
      const sections = ["intro", "skills", "contact"];

      setActive("intro");

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(entry.target.id);
            }
          });
        },
        {
          rootMargin: "-40px 0px 0px 0px",
          threshold: 0.5,
        },
      );

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      observerRef.current = observer;

      return () => {
        if (observerRef.current) observerRef.current.disconnect();
      };
    } else {
      const slug = getSlugFromPathname(pathname, currentLang);
      setActive(slug);
    }
  }, [pathname, currentLang]);

  // if not on homepage, needs to go there first
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    const target = document.getElementById(id);
    if (pathname === getHomepagePath()) {
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    } else {
      router.push(`${getHomepagePath()}#${id}`);
    }
    setIsMenuOpen(false);
  };

  const switchLang = () => {
    const newLang = currentLang === "en" ? "ja" : "en";
    setIsLoading(true);

    // Replace locale in path
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  const { theme, toggleTheme } = useTheme();

  if (isLoading) {
    return (
      <nav className={styles.nav}>
        <div className={styles.loadingSkeleton}>
          {/*  <div className={styles.skeletonLogo} /> */}
          <Logo />

          <div className={styles.skeletonNavigation}>
            <div className={styles.skeletonNavLinks}>
              <div className={styles.skeletonLink} />
              <div className={styles.skeletonLink} />
              <div className={styles.skeletonLink} />
              <div className={styles.skeletonLink} />
            </div>

            <div className={styles.skeletonLangSwitch} />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`${styles.nav} ${isMenuOpen ? styles.menuOpen : ""}`}>
      <Logo />

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
              <Link
                className={active === "blog" ? styles.active : undefined}
                href={`/${currentLang}/blog`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navbar.blog")}
              </Link>
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
            <li className={styles.mobileOnly}>
              <button onClick={toggleTheme} className={styles.themeSwitch}>
                {theme === "light" ? <FaSun /> : <FaMoon />}
                {theme === "light"
                  ? t("navbar.lightMode")
                  : t("navbar.darkMode")}
              </button>
            </li>
          </ul>

          <div className={styles.buttonsContainer}>
            <button onClick={toggleTheme} className={styles.themeSwitch}>
              {theme === "light" ? <FaSun /> : <FaMoon />}
              {theme === "light" ? t("navbar.lightMode") : t("navbar.darkMode")}
            </button>

            <button onClick={switchLang} className={styles.langSwitch}>
              <BiWorld />
              {currentLang === "en" ? "EN" : "JP"}
            </button>
          </div>
        </RemoveScroll>
      </FocusLock>
    </nav>
  );
}
