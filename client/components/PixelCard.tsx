import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, PixelShadow } from "@/constants/theme";

interface PixelCardProps {
  title?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export function PixelCard({ title, children, style }: PixelCardProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.backgroundDefault,
            borderColor: theme.border,
          },
          style,
        ]}
      >
        {title ? (
          <ThemedText type="h4" style={styles.title}>
            {title}
          </ThemedText>
        ) : null}
        {children}
      </View>
      <View
        style={[
          styles.shadow,
          { backgroundColor: theme.border },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  card: {
    borderWidth: Spacing.pixelBorder,
    padding: Spacing.lg,
    zIndex: 1,
  },
  title: {
    marginBottom: Spacing.md,
  },
  shadow: {
    position: "absolute",
    bottom: -PixelShadow.offset,
    left: PixelShadow.offset,
    right: -PixelShadow.offset,
    top: PixelShadow.offset,
    zIndex: 0,
  },
});
