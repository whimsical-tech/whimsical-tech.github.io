"use client";

import { useEffect } from "react";
import { useTheme } from "@/app/components/ThemeProvider/ThemeProvider";
import "./UtterancesComments.module.css";

interface UtterancesCommentsProps {
  repo: string;
}

const THEME_MAP = {
  light: "github-light",
  dark: "github-dark",
} as const;

export default function UtterancesComments({ repo }: UtterancesCommentsProps) {
  const { theme } = useTheme();
  const utterancesTheme =
    (THEME_MAP[theme] ?? process.env.NEXT_PUBLIC_UTTERANCES_THEME) ||
    "github-light";

  useEffect(() => {
    const container = document.getElementById("utterances-comments");
    if (!container || !repo) return;

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", utterancesTheme);
    script.setAttribute("crossorigin", "anonymous");

    container.appendChild(script);

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [repo, utterancesTheme]);

  return <div id="utterances-comments" />;
}
