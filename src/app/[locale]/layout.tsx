import Navbar from "@/components/navbar";
import cfg from "@/config";
import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import "../globals.css";
import { PageProps } from "../../types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: cfg.title,
};

export function generateStaticParams() {
  return cfg.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: PageProps) {
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale} data-theme="light">
      <body className={inter.className}>
        <Navbar />
        <div className="m-5">{children}</div>
      </body>
    </html>
  );
}
