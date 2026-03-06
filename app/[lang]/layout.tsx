import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "../I18nProvider";

export const metadata: Metadata = {
  title: "Whimsical Tech",
  description: "Santana's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
