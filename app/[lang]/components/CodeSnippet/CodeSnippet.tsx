import React from "react";
import { Code } from "bright";
import theme from "./theme.js";

import styles from "./CodeSnippet.module.css";

interface CodeSnippetProps {
  className?: string;
}

function CodeSnippet({ className, ...props }: CodeSnippetProps) {
  return <Code {...props} theme={theme} className={styles.wrapper} />;
}

export default CodeSnippet;
