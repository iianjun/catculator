import { Platform } from "react-native";
import { getPixelFont } from "@/i18n/font";

// Colors extracted from the cat pixel art
// Cream body, warm brown/taupe fur, dusty pink ears/nose, charcoal outlines

// Light mode pastel accents (based on cat colors)
const catPalette = {
  cream: "#F5EBE0", // Cat's cream body
  taupe: "#8B7355", // Cat's brown fur
  taupeLight: "#A89078", // Lighter brown
  dustyPink: "#D4A5A5", // Cat's pink ears/nose
  blush: "#E8C4C4", // Softer pink
  charcoal: "#3A3535", // Cat's dark outline
};

// Muted versions for dark mode
const catPaletteMuted = {
  cream: "#C4BAB0",
  taupe: "#6B5B4F",
  taupeLight: "#887868",
  dustyPink: "#B48888",
  blush: "#C8A4A4",
  charcoal: "#2A2525",
};

export const Colors = {
  light: {
    // Core colors
    text: "#4A4545",
    textSecondary: "#7A7575",
    buttonText: "#FFFFFF",

    // Backgrounds - WHITE based
    backgroundRoot: "#FFFFFF",
    backgroundDefault: "#FAF8F6",
    backgroundSecondary: "#F5F0EC",
    backgroundTertiary: "#EDE6E0",

    // Primary accent - warm taupe/brown from cat fur
    primary: catPalette.taupe,
    primaryLight: catPalette.taupeLight,
    primaryLighter: catPalette.cream,

    // UI elements
    border: catPalette.taupe,
    tabIconDefault: "#AAAAAA",
    tabIconSelected: catPalette.taupe,
    link: catPalette.dustyPink,

    // Status colors (no green - using warm tones)
    success: catPalette.taupeLight,
    warning: catPalette.dustyPink,
    error: "#C47878",

    // Accent palette
    accent: catPalette.dustyPink,
    ...catPalette,
  },
  dark: {
    // Core colors
    text: "#E8E4E0",
    textSecondary: "#A8A4A0",
    buttonText: "#1A1818",

    // Backgrounds - GRAY based (warm gray)
    backgroundRoot: "#1A1818",
    backgroundDefault: "#2A2828",
    backgroundSecondary: "#3A3838",
    backgroundTertiary: "#4A4848",

    // Primary accent - muted taupe/brown
    primary: catPaletteMuted.taupeLight,
    primaryLight: catPaletteMuted.taupe,
    primaryLighter: catPaletteMuted.cream,

    // UI elements
    border: catPaletteMuted.taupeLight,
    tabIconDefault: "#6A6868",
    tabIconSelected: catPaletteMuted.taupeLight,
    link: catPaletteMuted.dustyPink,

    // Status colors
    success: catPaletteMuted.taupeLight,
    warning: catPaletteMuted.dustyPink,
    error: "#A45858",

    // Accent palette
    accent: catPaletteMuted.dustyPink,
    ...catPaletteMuted,
  },
};

// Pixel-perfect spacing (multiples of 8)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 40,
  "3xl": 48,
  "4xl": 56,
  "5xl": 64,
  inputHeight: 48,
  buttonHeight: 56,
  pixelBorder: 3,
};

// No rounded corners for pixel aesthetic
export const BorderRadius = {
  xs: 0,
  sm: 0,
  md: 0,
  lg: 0,
  xl: 0,
  "2xl": 0,
  "3xl": 0,
  full: 0,
};

// Pixel font typography
export const Typography = {
  h1: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "400" as const,
    fontFamily: "PressStart2P_400Regular",
  },
  h2: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
    fontFamily: "PressStart2P_400Regular",
  },
  h3: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400" as const,
    fontFamily: "PressStart2P_400Regular",
  },
  h4: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: "400" as const,
    fontFamily: "PressStart2P_400Regular",
  },
  body: {
    fontSize: 10,
    lineHeight: 18,
    fontWeight: "400" as const,
    fontFamily: "PressStart2P_400Regular",
  },
  small: {
    fontSize: 8,
    lineHeight: 16,
    fontWeight: "400" as const,
    fontFamily: "PressStart2P_400Regular",
  },
  link: {
    fontSize: 10,
    lineHeight: 18,
    fontWeight: "400" as const,
    fontFamily: "PressStart2P_400Regular",
  },
};

export function getFonts() {
  const font = getPixelFont();
  return Platform.select({
    ios: { sans: font, serif: font, rounded: font, mono: font },
    default: { sans: font, serif: font, rounded: font, mono: font },
    web: { sans: font, serif: font, rounded: font, mono: font },
  });
}

export const Fonts = getFonts();

// Pixel shadow style
export const PixelShadow = {
  offset: 4,
};
