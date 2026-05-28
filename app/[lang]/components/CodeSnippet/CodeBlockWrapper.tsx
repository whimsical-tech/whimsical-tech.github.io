"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";
import styles from "./CodeSnippet.module.css";

interface CodeBlockWrapperProps {
  children: React.ReactNode;
}

export default function CodeBlockWrapper({ children }: CodeBlockWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [codeText, setCodeText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const preElement = containerRef.current.querySelector("pre");
    if (preElement) {
      setCodeText(preElement.textContent || "");
    }
  }, []);

  const handleCopy = () => {
    if (!codeText) return;
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        onClick={handleCopy}
        className={styles.copyButton}
        aria-label="Copy code"
        disabled={!codeText}
      >
        {copied ? (
          <>
            Copied <FaCheck size={18} />
          </>
        ) : (
          <>
            Copy <FaCopy size={18} />
          </>
        )}
      </button>
      {children}
    </div>
  );
}
