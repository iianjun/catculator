import React, { ReactNode } from "react";
import { StyleSheet, Pressable, ViewStyle, StyleProp } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, PixelShadow } from "@/constants/theme";

interface PixelButtonProps {
  onPress?: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PixelButton({
  onPress,
  children,
  style,
  disabled = false,
  variant = "primary",
  size = "medium",
}: PixelButtonProps) {
  const { theme, isDark } = useTheme();
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pressed.value * PixelShadow.offset }],
  }));

  const shadowStyle = useAnimatedStyle(() => ({
    height: PixelShadow.offset - pressed.value * PixelShadow.offset,
  }));

  const handlePressIn = () => {
    if (!disabled) {
      pressed.value = withTiming(1, { duration: 50 });
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      pressed.value = withTiming(0, { duration: 100 });
    }
  };

  const handlePress = () => {
    if (!disabled && onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onPress();
    }
  };

  const getBackgroundColor = () => {
    if (variant === "primary") {
      return isDark ? theme.primaryLighter : theme.primary;
    }
    return isDark ? theme.backgroundSecondary : theme.backgroundDefault;
  };

  const getTextColor = () => {
    if (variant === "primary") {
      return isDark ? theme.backgroundRoot : theme.buttonText;
    }
    return theme.text;
  };

  const getHeight = () => {
    switch (size) {
      case "small":
        return 40;
      case "large":
        return 64;
      default:
        return Spacing.buttonHeight;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "small":
        return 8;
      case "large":
        return 12;
      default:
        return 10;
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[styles.wrapper, style]}
    >
      <AnimatedPressable
        style={[
          styles.button,
          {
            backgroundColor: getBackgroundColor(),
            borderColor: theme.border,
            height: getHeight(),
            opacity: disabled ? 0.5 : 1,
          },
          animatedStyle,
        ]}
        pointerEvents="none"
      >
        <ThemedText
          style={[
            styles.buttonText,
            { color: getTextColor(), fontSize: getFontSize() },
          ]}
        >
          {children}
        </ThemedText>
      </AnimatedPressable>
      <Animated.View
        style={[
          styles.shadow,
          { backgroundColor: theme.border },
          shadowStyle,
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  button: {
    borderWidth: Spacing.pixelBorder,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
    zIndex: 1,
  },
  buttonText: {
    textAlign: "center",
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
});
