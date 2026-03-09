import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "../I18nProvider";

export const metadata: Metadata = {
  title: "Whimsical Tech",
  description: "Santana's Portfolio",
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

  return (
    <html lang={lang}>
      <body className="antialiased">
        <I18nProvider lang={lang}>{children}</I18nProvider>
      </body>
    </html>
  );
}
