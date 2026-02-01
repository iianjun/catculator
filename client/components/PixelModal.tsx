import React, { ReactNode } from "react";
import { StyleSheet, View, Modal, Pressable } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { PixelButton } from "@/components/PixelButton";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, PixelShadow } from "@/constants/theme";

interface PixelModalProps {
  visible: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  children: ReactNode;
}

export function PixelModal({
  visible,
  title,
  onConfirm,
  onCancel,
  confirmLabel = "OK",
  cancelLabel = "CANCEL",
  children,
}: PixelModalProps) {
  const { theme } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable
          style={styles.modalWrapper}
          onPress={(e) => e.stopPropagation()}
        >
          <View
            style={[
              styles.modal,
              {
                backgroundColor: theme.backgroundDefault,
                borderColor: theme.border,
              },
            ]}
          >
            <ThemedText type="h4" style={styles.title}>
              {title}
            </ThemedText>
            <View style={styles.content}>{children}</View>
            <View style={styles.buttons}>
              <View style={styles.button}>
                <PixelButton variant="secondary" onPress={onCancel}>
                  {cancelLabel}
                </PixelButton>
              </View>
              <View style={styles.button}>
                <PixelButton variant="primary" onPress={onConfirm}>
                  {confirmLabel}
                </PixelButton>
              </View>
            </View>
          </View>
          <View style={[styles.shadow, { backgroundColor: theme.border }]} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },
  modalWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: 400,
  },
  modal: {
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
  title: {
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  content: {
    marginBottom: Spacing.lg,
  },
  buttons: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  button: {
    flex: 1,
  },
});
