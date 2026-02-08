import i18n from "./index";

export function getPixelFont(): string {
  return i18n.locale === "ko" ? "Galmuri11-Bold" : "PressStart2P_400Regular";
}

// Galmuri11 renders smaller than Press Start 2P at the same nominal size
export const FONT_SIZE_SCALE = i18n.locale === "ko" ? 1.4 : 1;
