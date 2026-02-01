import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, PixelShadow } from "@/constants/theme";

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface PixelSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  columns?: number;
}

export function PixelSelect({
  label,
  options,
  value,
  onChange,
  columns = 2,
}: PixelSelectProps) {
  const { theme, isDark } = useTheme();

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="body" style={styles.label}>
        {label}
      </ThemedText>
      <View style={[styles.grid, { gap: Spacing.sm }]}>
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <View
              key={option.value}
              style={[styles.optionWrapper, { width: `${100 / columns - 2}%` }]}
            >
              <Pressable
                onPress={() => handleSelect(option.value)}
                style={[
                  styles.option,
                  {
                    backgroundColor: isSelected
                      ? theme.primary
                      : theme.backgroundDefault,
                    borderColor: theme.border,
                  },
                ]}
              >
                <ThemedText
                  type="small"
                  style={[
                    styles.optionLabel,
                    {
                      color: isSelected ? theme.buttonText : theme.text,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {option.label}
                </ThemedText>
              </Pressable>
              <View
                style={[
                  styles.optionShadow,
                  {
                    backgroundColor: theme.border,
                    opacity: isSelected ? 0 : 1,
                  },
                ]}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  label: {
    marginBottom: Spacing.sm,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionWrapper: {
    position: "relative",
    marginBottom: Spacing.sm,
  },
  option: {
    borderWidth: Spacing.pixelBorder,
    padding: Spacing.md,
    minHeight: 56,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  optionLabel: {
    textAlign: "center",
  },
  optionShadow: {
    position: "absolute",
    bottom: -PixelShadow.offset,
    left: PixelShadow.offset,
    right: -PixelShadow.offset,
    top: PixelShadow.offset,
    zIndex: 0,
  },
});
