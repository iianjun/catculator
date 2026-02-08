import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";

import en from "./locales/en";
import ko from "./locales/ko";

const i18n = new I18n({ en, ko });

const deviceLanguage = getLocales()?.[0]?.languageCode ?? "en";
i18n.locale = deviceLanguage === "ko" ? "ko" : "en";
i18n.defaultLocale = "en";
i18n.enableFallback = true;

export default i18n;
