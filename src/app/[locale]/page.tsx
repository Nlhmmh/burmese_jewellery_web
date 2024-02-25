import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Props } from "../../types";

export default function Index({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Index");
  return <h1>{t("title")}</h1>;
}
