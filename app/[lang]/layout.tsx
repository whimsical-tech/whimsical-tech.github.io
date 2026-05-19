import type { Metadata } from "next";
import { I18nProvider } from "../I18nProvider";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";
import NavBar from "./components/NavBar/NavBar";
import Script from "next/script";

import "../globals.css";

export const metadata: Metadata = {
  title: "Whimsical Tech",
  description: "Santana's Portfolio",
  icons: {
    icon: { url: "/favicon.ico" },
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ja" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <head>
        {/*  temporarily hidden
        <Script
          src={`https://keepandroidopen.org/banner.js?lang=${lang}&size=mini&id=banner`}
          strategy="afterInteractive"
        /> */}
      </head>
      <body className="antialiased">
        <div id="banner"></div>
        <ThemeProvider>
          <I18nProvider lang={lang}>
            <NavBar />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
