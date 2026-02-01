import React, { useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { PixelButton } from "@/components/PixelButton";
import { PixelInput } from "@/components/PixelInput";
import { PixelSelect } from "@/components/PixelSelect";
import { PixelCard } from "@/components/PixelCard";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import {
  CatStatus,
  CAT_STATUS_OPTIONS,
  calculateRER,
  calculateDER,
  getMultiplier,
} from "@/lib/calculator";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Calculator"
>;

export default function CalculatorScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const [weight, setWeight] = useState("");
  const [catStatus, setCatStatus] = useState<CatStatus>("neutered");

  const weightNum = parseFloat(weight) || 0;
  const hasValidWeight = weightNum > 0 && weightNum <= 45;

  const handleCalculate = () => {
    if (!hasValidWeight) return;

    const rer = calculateRER(weightNum);
    const der = calculateDER(rer, catStatus);
    const multiplier = getMultiplier(catStatus);

    navigation.navigate("Results", {
      weight: weightNum,
      catStatus,
      rer: Math.round(rer * 10) / 10,
      der: Math.round(der * 10) / 10,
      multiplier,
    });
  };

  const getCatImage = () => {
    if (!hasValidWeight) {
      return require("../../assets/images/cat-neutral.webp");
    }
    if (catStatus === "inactive") {
      return require("../../assets/images/cat-worried.webp");
    }
    return require("../../assets/images/cat-happy.webp");
  };

  const getCatMessage = () => {
    if (!weight) {
      return "MEOW! Enter my weight!";
    }
    if (!hasValidWeight) {
      return "Hmm... that weight seems off!";
    }
    if (catStatus === "inactive") {
      return "Let's get healthy together!";
    }
    return "Looking good! Ready to calculate!";
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: Spacing.xl,
        paddingBottom: insets.bottom + Spacing.xl,
        paddingHorizontal: Spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.catSection}>
        <Image
          source={getCatImage()}
          style={styles.catImage}
          resizeMode="contain"
        />
        <PixelCard>
          <ThemedText type="body" style={styles.speechText}>
            {getCatMessage()}
          </ThemedText>
        </PixelCard>
      </View>

      <View style={styles.form}>
        <PixelInput
          label="CAT WEIGHT"
          value={weight}
          onChangeText={setWeight}
          placeholder="0.0"
          keyboardType="decimal-pad"
          unit="kg"
          showStepper
          step={0.5}
          min={0.1}
          max={45}
        />

        <PixelSelect
          label="CAT STATUS"
          options={CAT_STATUS_OPTIONS.map((opt) => ({
            value: opt.value,
            label: opt.label,
          }))}
          value={catStatus}
          onChange={(val) => setCatStatus(val as CatStatus)}
          columns={2}
        />

        <View style={styles.statusInfo}>
          <ThemedText type="small" style={styles.statusDescription}>
            {
              CAT_STATUS_OPTIONS.find((opt) => opt.value === catStatus)
                ?.description
            }
            {" (x"}
            {
              CAT_STATUS_OPTIONS.find((opt) => opt.value === catStatus)
                ?.multiplier
            }
            {")"}
          </ThemedText>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <PixelButton
          onPress={handleCalculate}
          disabled={!hasValidWeight}
          size="large"
        >
          CALCULATE
        </PixelButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  catSection: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  catImage: {
    width: 120,
    height: 120,
    marginBottom: Spacing.md,
  },
  speechText: {
    textAlign: "center",
  },
  form: {
    marginBottom: Spacing.xl,
  },
  statusInfo: {
    alignItems: "center",
    marginTop: -Spacing.sm,
  },
  statusDescription: {
    opacity: 0.8,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: Spacing.md,
  },
});
