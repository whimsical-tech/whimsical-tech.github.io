import { Code } from "bright";
import CodeBlockWrapper from "./CodeBlockWrapper";
import theme from "./theme.js";
import styles from "./CodeSnippet.module.css";

interface CodeSnippetProps {
  className?: string;
  [key: string]: any;
}

export default function CodeSnippet({ className, ...props }: CodeSnippetProps) {
  return (
    <CodeBlockWrapper>
      <Code {...props} theme={theme} className={styles.codeBlock} />
    </CodeBlockWrapper>
  );
}
