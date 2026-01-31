import { Platform } from "react-native";

// Pastel accent colors (no green)
const pastelAccents = {
  coral: "#E8A598",
  peach: "#F5C4A1",
  lavender: "#C4B4D4",
  blush: "#E8B4B8",
  cream: "#F5E6D3",
};

// Toned-down pastel accents for dark mode
const mutedAccents = {
  coral: "#C48878",
  peach: "#D4A481",
  lavender: "#A494B4",
  blush: "#C89498",
  cream: "#D4C6B3",
};

export const Colors = {
  light: {
    // Core colors
    text: "#4A4A4A",
    textSecondary: "#7A7A7A",
    buttonText: "#FFFFFF",
    
    // Backgrounds - WHITE based
    backgroundRoot: "#FFFFFF",
    backgroundDefault: "#FAFAFA",
    backgroundSecondary: "#F5F5F5",
    backgroundTertiary: "#EFEFEF",
    
    // Primary accent - coral/peach pastel
    primary: "#E8A598",
    primaryLight: "#F5C4A1",
    primaryLighter: "#F5E6D3",
    
    // UI elements
    border: "#D4A481",
    tabIconDefault: "#AAAAAA",
    tabIconSelected: "#E8A598",
    link: "#C4B4D4",
    
    // Status colors
    success: "#A8C4A8",
    warning: "#F5C4A1",
    error: "#E8A598",
    
    // Accent palette
    accent: pastelAccents.lavender,
    ...pastelAccents,
  },
  dark: {
    // Core colors
    text: "#E8E8E8",
    textSecondary: "#A8A8A8",
    buttonText: "#2A2A2A",
    
    // Backgrounds - GRAY based
    backgroundRoot: "#1A1A1A",
    backgroundDefault: "#2A2A2A",
    backgroundSecondary: "#3A3A3A",
    backgroundTertiary: "#4A4A4A",
    
    // Primary accent - muted coral/peach
    primary: "#C48878",
    primaryLight: "#D4A481",
    primaryLighter: "#D4C6B3",
    
    // UI elements
    border: "#A48468",
    tabIconDefault: "#6A6A6A",
    tabIconSelected: "#C48878",
    link: "#A494B4",
    
    // Status colors
    success: "#88A488",
    warning: "#D4A481",
    error: "#C48878",
    
    // Accent palette
    accent: mutedAccents.lavender,
    ...mutedAccents,
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
