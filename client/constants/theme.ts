import { Platform } from "react-native";

// Pastel Light Theme Colors
const pastelLight = {
  primary: "#5D7A6E",
  primaryLight: "#8BA898",
  primaryLighter: "#B8D4C4",
  background: "#F5F0E8",
  surface: "#EDE7DC",
  accent: "#D4A574",
};

// Dark Theme Colors
const darkTheme = {
  primary: "#B8D4C4",
  primaryLight: "#8BA898",
  primaryLighter: "#5D7A6E",
  background: "#1A1F1C",
  surface: "#252B27",
  accent: "#E8C49A",
};

export const Colors = {
  light: {
    text: "#3D4A44",
    textSecondary: "#6B7A72",
    buttonText: "#FFFFFF",
    tabIconDefault: "#8BA898",
    tabIconSelected: "#5D7A6E",
    link: "#5D7A6E",
    backgroundRoot: "#F5F0E8",
    backgroundDefault: "#EDE7DC",
    backgroundSecondary: "#E2D9CC",
    backgroundTertiary: "#D4C9BA",
    border: "#5D7A6E",
    success: "#8BA898",
    warning: "#D4A574",
    error: "#C4776A",
    ...pastelLight,
  },
  dark: {
    text: "#E8E4DC",
    textSecondary: "#A8A49C",
    buttonText: "#1A1F1C",
    tabIconDefault: "#6B7A72",
    tabIconSelected: "#B8D4C4",
    link: "#B8D4C4",
    backgroundRoot: "#1A1F1C",
    backgroundDefault: "#252B27",
    backgroundSecondary: "#323A35",
    backgroundTertiary: "#424C46",
    border: "#8BA898",
    success: "#8BA898",
    warning: "#E8C49A",
    error: "#D4948A",
    ...darkTheme,
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
};
