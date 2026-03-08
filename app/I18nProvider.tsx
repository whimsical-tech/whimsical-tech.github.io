"use client";

import { ReactNode, useEffect } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import en from "@/dictionaries/en.json";
import jp from "@/dictionaries/jp.json";

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources: {
      en: { dictionary: en },
      jp: { dictionary: jp },
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
    i18next.changeLanguage(lang);
  }, [lang]);

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
