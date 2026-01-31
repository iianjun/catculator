import { Platform } from "react-native";

// Game Boy Green Color Palette
const pixelGreen = {
  primary: "#0F380F",
  primaryLight: "#306230",
  primaryLighter: "#8BAC0F",
  background: "#9BBC0F",
  surface: "#8BAC0F",
};

export const Colors = {
  light: {
    text: "#0F380F",
    textSecondary: "#306230",
    buttonText: "#9BBC0F",
    tabIconDefault: "#306230",
    tabIconSelected: "#0F380F",
    link: "#0F380F",
    backgroundRoot: "#9BBC0F",
    backgroundDefault: "#8BAC0F",
    backgroundSecondary: "#306230",
    backgroundTertiary: "#0F380F",
    border: "#0F380F",
    success: "#8BAC0F",
    warning: "#306230",
    error: "#0F380F",
    ...pixelGreen,
  },
  dark: {
    text: "#9BBC0F",
    textSecondary: "#8BAC0F",
    buttonText: "#0F380F",
    tabIconDefault: "#8BAC0F",
    tabIconSelected: "#9BBC0F",
    link: "#8BAC0F",
    backgroundRoot: "#0F380F",
    backgroundDefault: "#1A4A1A",
    backgroundSecondary: "#306230",
    backgroundTertiary: "#8BAC0F",
    border: "#8BAC0F",
    success: "#8BAC0F",
    warning: "#306230",
    error: "#9BBC0F",
    primary: "#9BBC0F",
    primaryLight: "#8BAC0F",
    primaryLighter: "#306230",
    background: "#0F380F",
    surface: "#1A4A1A",
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
  pixelBorder: 4,
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

export const Fonts = Platform.select({
  ios: {
    sans: "PressStart2P_400Regular",
    serif: "PressStart2P_400Regular",
    rounded: "PressStart2P_400Regular",
    mono: "PressStart2P_400Regular",
  },
  default: {
    sans: "PressStart2P_400Regular",
    serif: "PressStart2P_400Regular",
    rounded: "PressStart2P_400Regular",
    mono: "PressStart2P_400Regular",
  },
  web: {
    sans: "'Press Start 2P', monospace",
    serif: "'Press Start 2P', monospace",
    rounded: "'Press Start 2P', monospace",
    mono: "'Press Start 2P', monospace",
  },
});

// Pixel shadow style
export const PixelShadow = {
  offset: 4,
  color: "#0F380F",
};
