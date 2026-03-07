import type { Locale } from "./i18n-config";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  jp: () => import("./dictionaries/jp.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;
