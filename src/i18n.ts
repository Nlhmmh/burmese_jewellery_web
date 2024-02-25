import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import cfg from "./config";

export default getRequestConfig(async ({ locale }) => {
  if (!cfg.locales.includes(locale as any)) notFound();
  return {
    messages: (
      await (locale === "en"
        ? import("../messages/en.json")
        : import(`../messages/${locale}.json`))
    ).default,
  };
});
