import { i18n } from "./i18n-config";

const config = {
  i18n: {
    defaultLocale: i18n.defaultLocale,
    locales: i18n.locales,
  },
  experimental: {
    outputFileTracingIncludes: {
      "/*": ["./content/**/*"],
    },
  },
  ns: ["dictionary"],
  defaultNS: "dictionary",
  localePath: "./dictionaries",
};

export default config;
