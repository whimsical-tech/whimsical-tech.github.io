import type { Metadata } from "next";
import { I18nProvider } from "../I18nProvider";

import { cookies } from "next/headers";

import NavBar from "./components/NavBar/NavBar";
import Script from "next/script";

import "../globals.css";
import i18next from "i18next";
import { i18n } from "next-i18next";

export const metadata: Metadata = {
  title: "Whimsical Tech",
  description: "Santana's Portfolio",
  icons: {
    icon: { url: "/favicon.ico" },
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "jp" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const currentLang = cookieLocale || lang;

  return (
    <html lang={currentLang}>
      <head>
        <Script
          src={`https://keepandroidopen.org/banner.js?lang=${lang}&size=mini&id=banner`}
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased">
        <div id="banner"></div>
        <I18nProvider lang={lang}>
          <NavBar />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
