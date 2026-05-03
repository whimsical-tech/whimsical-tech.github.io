"use client";

import { ReactNode, useEffect } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import en from "@/dictionaries/en.json";
import ja from "@/dictionaries/ja.json";

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources: {
      en: { dictionary: en },
      ja: { dictionary: ja },
    },
    fallbackLng: "en",
    ns: ["dictionary"],
    defaultNS: "dictionary",
    interpolation: {
      escapeValue: false,
    },
  });
}

export function I18nProvider({
  children,
  lang,
}: {
  children: ReactNode;
  lang: string;
}) {
  useEffect(() => {
    if (!i18next.isInitialized || i18next.language !== lang) {
      i18next.changeLanguage(lang);
    }
  }, [lang]);

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
