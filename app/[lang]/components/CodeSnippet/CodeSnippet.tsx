import React from "react";
import { Code } from "bright";

import styles from "./CodeSnippet.module.css";

interface CodeSnippetProps {
  className?: string;
}

function CodeSnippet({ className, ...props }: CodeSnippetProps) {
  return <Code {...props} className={styles.wrapper} />;
}

export default CodeSnippet;
