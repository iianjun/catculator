import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";

interface PixelToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function PixelToggle({ label, value, onChange }: PixelToggleProps) {
  const { theme, isDark } = useTheme();

  const handleToggle = () => {
    onChange(!value);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Pressable onPress={handleToggle} style={styles.container}>
      <ThemedText type="body" style={styles.label}>
        {label}
      </ThemedText>
      <View
        style={[
          styles.toggle,
          {
            backgroundColor: value ? theme.primary : theme.backgroundDefault,
            borderColor: theme.border,
          },
        ]}
      >
        <View
          style={[
            styles.toggleHandle,
            {
              backgroundColor: value ? theme.buttonText : theme.text,
              left: value ? 28 : 4,
            },
          ]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  label: {
    flex: 1,
  },
  toggle: {
    width: 56,
    height: 28,
    borderWidth: Spacing.pixelBorder,
    position: "relative",
  },
  toggleHandle: {
    position: "absolute",
    top: 4,
    width: 16,
    height: 16,
  },
});
