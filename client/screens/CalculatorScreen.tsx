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
import { useTranslation } from "@/i18n/useTranslation";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Calculator"
>;

export default function CalculatorScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

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
      return t("calculator.speech.initial");
    }
    if (!hasValidWeight) {
      return t("calculator.speech.invalidWeight");
    }
    if (catStatus === "inactive") {
      return t("calculator.speech.inactive");
    }
    return t("calculator.speech.ready");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: Spacing.md,
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
          label={t("calculator.catWeight")}
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
          label={t("calculator.catStatus")}
          options={CAT_STATUS_OPTIONS.map((opt) => ({
            value: opt.value,
            label: t(`catStatus.${opt.value}.label`),
          }))}
          value={catStatus}
          onChange={(val) => setCatStatus(val as CatStatus)}
          columns={2}
        />

        <View style={styles.statusInfo}>
          <ThemedText type="small" style={styles.statusDescription}>
            {t(`catStatus.${catStatus}.description`)}
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
          {t("calculator.calculate")}
        </PixelButton>
        <View style={styles.buttonSpacer} />
        <PixelButton
          onPress={() => navigation.navigate("SavedProfiles")}
          variant="secondary"
          size="medium"
        >
          {t("calculator.myCats")}
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
    width: 200,
    height: 200,
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
  buttonSpacer: {
    height: Spacing.md,
  },
});
