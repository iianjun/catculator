import React from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { PixelButton } from "@/components/PixelButton";
import { PixelCard } from "@/components/PixelCard";
import { PixelTooltip } from "@/components/PixelTooltip";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { useTranslation } from "@/i18n/useTranslation";

type ResultsRouteProp = RouteProp<RootStackParamList, "Results">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Results">;

export default function ResultsScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ResultsRouteProp>();
  const { t } = useTranslation();

  const { weight, catStatus, rer, der, multiplier } = route.params;
  const statusLabel = t(`catStatus.${catStatus}.label`);
  const isInactive = catStatus === "inactive";

  const handleFoodBreakdown = () => {
    navigation.navigate("FoodDetails", {
      der,
      weight,
      catStatus,
      ...(route.params.foodType !== undefined && {
        foodType: route.params.foodType,
      }),
      ...(route.params.wetFoodCalories !== undefined && {
        wetFoodCalories: route.params.wetFoodCalories,
      }),
      ...(route.params.dryFoodCaloriesPerKg !== undefined && {
        dryFoodCaloriesPerKg: route.params.dryFoodCaloriesPerKg,
      }),
      ...(route.params.treatCalories !== undefined && {
        treatCalories: route.params.treatCalories,
      }),
      ...(route.params.pouches !== undefined && {
        pouches: route.params.pouches,
      }),
      ...(route.params.profileId !== undefined && {
        profileId: route.params.profileId,
      }),
      ...(route.params.profileName !== undefined && {
        profileName: route.params.profileName,
      }),
    });
  };

  const handleNewCalculation = () => {
    navigation.popToTop();
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
          source={
            isInactive
              ? require("../../assets/images/cat-worried.webp")
              : require("../../assets/images/cat-happy-animated.gif")
          }
          style={styles.catImage}
          resizeMode="contain"
        />
        <ThemedText type="h4" style={styles.successText}>
          {route.params.profileName
            ? t("results.profileResults", { name: route.params.profileName })
            : isInactive
              ? t("results.letsWork")
              : t("results.greatJob")}
        </ThemedText>
      </View>

      <PixelCard style={styles.card}>
        <View style={styles.titleRow}>
          <ThemedText type="h4">{t("results.rer")}</ThemedText>
          <PixelTooltip content={t("results.rerTooltip")} />
        </View>
        <ThemedText type="h1" style={styles.calorieValue}>
          {rer}
        </ThemedText>
        <ThemedText type="small" style={styles.calorieUnit}>
          {t("results.kcalDay")}
        </ThemedText>
        <ThemedText type="small" style={styles.description}>
          {t("results.restingEnergy")}
        </ThemedText>
      </PixelCard>

      <PixelCard style={styles.card}>
        <View style={styles.titleRow}>
          <ThemedText type="h4">{t("results.der")}</ThemedText>
          <PixelTooltip content={t("results.derTooltip")} />
        </View>
        <ThemedText type="h1" style={styles.calorieValue}>
          {der}
        </ThemedText>
        <ThemedText type="small" style={styles.calorieUnit}>
          {t("results.kcalDay")}
        </ThemedText>
        <ThemedText type="small" style={styles.description}>
          {t("results.dailyEnergy")}
        </ThemedText>
        <View style={styles.multiplierRow}>
          <ThemedText type="small">
            {statusLabel} (x{multiplier})
          </ThemedText>
        </View>
      </PixelCard>

      <PixelCard style={styles.card}>
        <View style={styles.summaryRow}>
          <ThemedText type="body">{t("results.weight")}</ThemedText>
          <ThemedText type="body">{weight} kg</ThemedText>
        </View>
        <View style={styles.summaryRow}>
          <ThemedText type="body">{t("results.status")}</ThemedText>
          <ThemedText type="body">{statusLabel}</ThemedText>
        </View>
      </PixelCard>

      {isInactive ? (
        <PixelCard style={styles.card}>
          <ThemedText type="body" style={styles.warningText}>
            {t("results.overweightWarning")}
          </ThemedText>
        </PixelCard>
      ) : null}

      <View style={styles.buttonContainer}>
        <PixelButton onPress={handleFoodBreakdown} size="large">
          {t("results.foodBreakdown")}
        </PixelButton>
        <View style={styles.buttonSpacer} />
        <PixelButton
          onPress={handleNewCalculation}
          variant="secondary"
          size="medium"
        >
          {t("results.newCalculation")}
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
    marginBottom: Spacing.sm,
  },
  successText: {
    textAlign: "center",
  },
  card: {
    marginBottom: Spacing.lg,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  calorieValue: {
    textAlign: "center",
    marginBottom: Spacing.xs,
  },
  calorieUnit: {
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  description: {
    textAlign: "center",
    opacity: 0.7,
  },
  multiplierRow: {
    marginTop: Spacing.sm,
    alignItems: "center",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  warningCard: {
    borderWidth: 6,
  },
  warningText: {
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: Spacing.lg,
  },
  buttonSpacer: {
    height: Spacing.md,
  },
});
