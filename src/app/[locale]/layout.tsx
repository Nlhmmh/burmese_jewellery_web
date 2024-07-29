import Navbar from "@/components/navbar";
import cfg from "@/config";
import type { Metadata } from "next";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import "../globals.css";
import { PageProps } from "../../types";
import { NextIntlClientProvider } from "next-intl";

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
  const messages = await getMessages();
  return (
    <html lang={locale} data-theme="light">
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Navbar params={{ locale: locale }} />
          <div className="m-5">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
