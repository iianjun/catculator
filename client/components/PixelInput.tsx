import React from "react";
import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, PixelShadow } from "@/constants/theme";

interface PixelInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "decimal-pad";
  unit?: string;
  showStepper?: boolean;
  step?: number;
  min?: number;
  max?: number;
}

export function PixelInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  unit,
  showStepper = false,
  step = 0.1,
  min = 0,
  max = 100,
}: PixelInputProps) {
  const { theme, isDark } = useTheme();

  const handleIncrement = () => {
    const currentValue = parseFloat(value) || 0;
    const newValue = Math.min(currentValue + step, max);
    onChangeText(newValue.toFixed(1));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleDecrement = () => {
    const currentValue = parseFloat(value) || 0;
    const newValue = Math.max(currentValue - step, min);
    onChangeText(newValue.toFixed(1));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="body" style={styles.label}>
        {label}
      </ThemedText>
      <View style={styles.inputRow}>
        {showStepper ? (
          <Pressable
            onPress={handleDecrement}
            style={[
              styles.stepperButton,
              {
                backgroundColor: theme.primary,
                borderColor: theme.border,
              },
            ]}
          >
            <Feather name="minus" size={20} color={theme.buttonText} />
          </Pressable>
        ) : null}
        <View style={styles.inputWrapper}>
          <View
            style={[
              styles.input,
              {
                backgroundColor: isDark ? theme.backgroundDefault : "#FFFFFF",
                borderColor: theme.border,
              },
            ]}
          >
            <TextInput
              style={[
                styles.textInput,
                { color: theme.text, fontFamily: "PressStart2P_400Regular" },
              ]}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={theme.textSecondary}
              keyboardType={keyboardType}
            />
            {unit ? (
              <ThemedText type="body" style={styles.unit}>
                {unit}
              </ThemedText>
            ) : null}
          </View>
          <View
            style={[styles.inputShadow, { backgroundColor: theme.border }]}
          />
        </View>
        {showStepper ? (
          <Pressable
            onPress={handleIncrement}
            style={[
              styles.stepperButton,
              {
                backgroundColor: theme.primary,
                borderColor: theme.border,
              },
            ]}
          >
            <Feather name="plus" size={20} color={theme.buttonText} />
          </Pressable>
        ) : null}
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
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
  },
  inputWrapper: {
    flex: 1,
    position: "relative",
  },
  input: {
    borderWidth: Spacing.pixelBorder,
    height: Spacing.inputHeight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    zIndex: 1,
  },
  inputShadow: {
    position: "absolute",
    bottom: -PixelShadow.offset,
    left: PixelShadow.offset,
    right: -PixelShadow.offset,
    top: PixelShadow.offset,
    zIndex: 0,
  },
  textInput: {
    flex: 1,
    fontSize: 12,
    height: "100%",
  },
  unit: {
    marginLeft: Spacing.sm,
  },
  stepperButton: {
    width: Spacing.inputHeight,
    height: Spacing.inputHeight,
    borderWidth: Spacing.pixelBorder,
    alignItems: "center",
    justifyContent: "center",
  },
});
