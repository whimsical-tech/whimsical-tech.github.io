import React from "react";

interface VisuallyHiddenProps {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

function VisuallyHidden({
  as: Element = "span",
  children,
  ...delegated
}: VisuallyHiddenProps) {
  return <Element {...delegated}>{children}</Element>;
}

export default VisuallyHidden;
