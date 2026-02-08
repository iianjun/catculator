import i18n from "./index";

export function getPixelFont(): string {
  return i18n.locale === "ko" ? "neodgm" : "PressStart2P_400Regular";
}
