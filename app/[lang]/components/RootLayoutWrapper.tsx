"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { ThemeProvider } from "./ThemeProvider/ThemeProvider";
import { I18nProvider } from "../../I18nProvider";
import NavBar from "./NavBar/NavBar";
import { Locale } from "@/i18n-config";

interface RootLayoutWrapperProps {
  children: React.ReactNode;
  lang: Locale;
}

export default function RootLayoutWrapper({
  children,
  lang,
}: RootLayoutWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  /* TODO: the timeout might be unnecessary */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}

      <ThemeProvider>
        <I18nProvider lang={lang}>
          <NavBar />
          {!isLoading && children}
        </I18nProvider>
      </ThemeProvider>
    </>
  );
}
