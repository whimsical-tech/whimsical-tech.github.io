"use client";

import { useEffect } from "react";
import styles from "./UtterancesComments.module.css";

interface UtterancesCommentsProps {
  repo: string;
}

const THEME_MAP = {
  light: "github-light",
  dark: "github-dark",
} as const;

export default function UtterancesComments({ repo }: UtterancesCommentsProps) {
  useEffect(() => {
    const container = document.getElementById("utterances-comments");
    if (!container || !repo) return;
    if (container.hasChildNodes()) return;

    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    const utterancesTheme =
      THEME_MAP[currentTheme as keyof typeof THEME_MAP] ||
      process.env.NEXT_PUBLIC_UTTERANCES_THEME ||
      "github-light";

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", utterancesTheme);
    script.setAttribute("crossorigin", "anonymous");

    container.appendChild(script);
  }, [repo]);

  return <div id="utterances-comments" className={styles.comments} />;
}
