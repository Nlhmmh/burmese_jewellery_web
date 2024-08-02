import en from "@/assets/locales/en.json";
import jp from "@/assets/locales/jp.json";
import mm from "@/assets/locales/mm.json";
import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      jp: {
        translation: jp,
      },
      mm: {
        translation: mm,
      },
    },
    lng: "en",
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
