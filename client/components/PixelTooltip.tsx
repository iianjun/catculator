import React, { ReactNode, useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, PixelShadow } from "@/constants/theme";

interface PixelTooltipProps {
  content: string;
  trigger?: ReactNode;
  iconSize?: number;
  textStyle?: TextStyle;
  tooltipStyle?: ViewStyle;
}

export function PixelTooltip({
  content,
  trigger,
  iconSize = 16,
  textStyle,
  tooltipStyle,
}: PixelTooltipProps) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setVisible(true)} hitSlop={8}>
        {trigger ?? (
          <View
            style={[
              styles.defaultTrigger,
              {
                width: iconSize + 8,
                height: iconSize + 8,
              },
            ]}
          >
            <Feather name="info" size={iconSize} color={theme.textSecondary} />
          </View>
        )}
      </Pressable>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)}>
          <Pressable
            style={styles.tooltipWrapper}
            onPress={(e) => e.stopPropagation()}
          >
            <View
              style={[
                styles.tooltip,
                {
                  backgroundColor: theme.backgroundDefault,
                  borderColor: theme.border,
                },
                tooltipStyle,
              ]}
            >
              <ThemedText type="body" style={[styles.content, textStyle]}>
                {content}
              </ThemedText>
              <Pressable
                onPress={() => setVisible(false)}
                style={[styles.closeButton, { borderColor: theme.border }]}
              >
                <Feather name="x" size={14} color={theme.text} />
              </Pressable>
            </View>
            <View style={[styles.shadow, { backgroundColor: theme.border }]} />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  defaultTrigger: {
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },
  tooltipWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: 320,
  },
  tooltip: {
    borderWidth: Spacing.pixelBorder,
    padding: Spacing.lg,
    zIndex: 1,
  },
  shadow: {
    position: "absolute",
    bottom: -PixelShadow.offset,
    left: PixelShadow.offset,
    right: -PixelShadow.offset,
    top: PixelShadow.offset,
    zIndex: 0,
  },
  content: {
    paddingRight: Spacing.lg,
  },
  closeButton: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    borderWidth: 2,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
