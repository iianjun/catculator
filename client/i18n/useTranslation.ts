import i18n from "./index";

export function useTranslation() {
  const t = i18n.t.bind(i18n);
  const locale = i18n.locale;
  const isKorean = locale === "ko";

  return { t, locale, isKorean };
}
