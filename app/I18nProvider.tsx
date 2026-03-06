"use client";

import { ReactNode } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import en from "@/dictionaries/en.json";
import jp from "@/dictionaries/jp.json";

// Initialize i18next
if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources: {
      en: { dictionary: en },
      jp: { dictionary: jp },
    },
    lng: "en",
    fallbackLng: "en",
    ns: ["dictionary"],
    defaultNS: "dictionary",
    interpolation: {
      escapeValue: false,
    },
  });
}

export function I18nProvider({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
