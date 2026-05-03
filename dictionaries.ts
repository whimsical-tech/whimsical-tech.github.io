export const i18n = {
  defaultLocale: "en",
  locales: ["en", "jp"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  jp: () => import("./dictionaries/jp.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;
