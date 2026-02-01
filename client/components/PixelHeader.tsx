import React from "react";
import { View, StyleSheet, Image } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Spacing } from "@/constants/theme";

interface PixelHeaderProps {
  title: string;
}

export function PixelHeader({ title }: PixelHeaderProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/icon.webp")}
        style={styles.icon}
        resizeMode="contain"
      />
      <ThemedText type="h3" style={styles.title}>
        {title}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: Spacing.sm,
  },
  title: {
    textTransform: "uppercase",
  },
});
