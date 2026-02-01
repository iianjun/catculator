import React, { useState, useMemo } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { PixelButton } from "@/components/PixelButton";
import { PixelCard } from "@/components/PixelCard";
import { PixelInput } from "@/components/PixelInput";
import { PixelSelect } from "@/components/PixelSelect";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { FoodType, calculateFoodPortions } from "@/lib/calculator";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type FoodDetailsRouteProp = RouteProp<RootStackParamList, "FoodDetails">;
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "FoodDetails"
>;

const FOOD_TYPE_OPTIONS = [
  { value: "wet", label: "Wet Only" },
  { value: "dry", label: "Dry Only" },
  { value: "both", label: "Both" },
];

export default function FoodDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<FoodDetailsRouteProp>();

  const { der } = route.params;

  const [foodType, setFoodType] = useState<FoodType>("both");
  const [wetFoodCalories, setWetFoodCalories] = useState("80");
  const [dryFoodCaloriesPerKg, setDryFoodCaloriesPerKg] = useState("3500");

  const wetCal = parseFloat(wetFoodCalories) || 0;
  const dryCal = parseFloat(dryFoodCaloriesPerKg) || 0;

  const calculation = useMemo(() => {
    return calculateFoodPortions(der, foodType, wetCal, dryCal);
  }, [der, foodType, wetCal, dryCal]);

  const handleDone = () => {
    navigation.popToTop();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: Spacing.xl,
        paddingBottom: insets.bottom + Spacing["3xl"] + 80,
        paddingHorizontal: Spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      <PixelCard style={styles.infoCard} wrapperStyle={styles.infoWrapper}>
        <ThemedText type="body" style={styles.infoText}>
          Daily calories needed:
        </ThemedText>
        <ThemedText type="h2" style={styles.derValue}>
          {der} kcal
        </ThemedText>
      </PixelCard>

      <View style={styles.form}>
        <PixelSelect
          label="FOOD TYPE"
          options={FOOD_TYPE_OPTIONS}
          value={foodType}
          onChange={(val) => setFoodType(val as FoodType)}
          columns={3}
        />

        {foodType === "wet" || foodType === "both" ? (
          <PixelInput
            label="WET FOOD CALORIES"
            value={wetFoodCalories}
            onChangeText={setWetFoodCalories}
            placeholder="80"
            keyboardType="decimal-pad"
            unit="kcal/pouch"
          />
        ) : null}

        {foodType === "dry" || foodType === "both" ? (
          <PixelInput
            label="DRY FOOD CALORIES"
            value={dryFoodCaloriesPerKg}
            onChangeText={setDryFoodCaloriesPerKg}
            placeholder="3500"
            keyboardType="decimal-pad"
            unit="kcal/kg"
          />
        ) : null}
      </View>

      <View style={styles.resultSection}>
        <ThemedText type="h4" style={styles.resultTitle}>
          DAILY PORTIONS
        </ThemedText>

        <View style={styles.resultCards}>
          {foodType === "wet" || foodType === "both" ? (
            <PixelCard style={styles.resultCard}>
              <Image
                source={require("../../assets/images/web-food-bowl.webp")}
                style={styles.foodIcon}
                resizeMode="contain"
              />
              <ThemedText type="body" style={styles.foodLabel}>
                Wet Food
              </ThemedText>
              <ThemedText type="h3" style={styles.foodValue}>
                {foodType === "both"
                  ? "1 pouch"
                  : `${calculation.wetFoodGrams}g`}
              </ThemedText>
              {foodType === "wet" ? (
                <ThemedText type="small" style={styles.foodSubtext}>
                  ({Math.ceil(calculation.wetFoodGrams / 85)} pouches)
                </ThemedText>
              ) : null}
            </PixelCard>
          ) : null}

          {foodType === "dry" || foodType === "both" ? (
            <PixelCard style={styles.resultCard}>
              <Image
                source={require("../../assets/images/food-bowl.webp")}
                style={styles.foodIcon}
                resizeMode="contain"
              />
              <ThemedText type="body" style={styles.foodLabel}>
                Dry Food
              </ThemedText>
              <ThemedText type="h3" style={styles.foodValue}>
                {calculation.dryFoodGrams}g
              </ThemedText>
              <ThemedText type="small" style={styles.foodSubtext}>
                per day
              </ThemedText>
            </PixelCard>
          ) : null}
        </View>

        {foodType === "both" && wetCal > 0 ? (
          <PixelCard style={styles.breakdownCard}>
            <ThemedText type="body" style={styles.breakdownText}>
              Wet food: {wetCal} kcal
            </ThemedText>
            <ThemedText type="body" style={styles.breakdownText}>
              Dry food: {Math.round(calculation.dryFoodGrams * (dryCal / 1000))}{" "}
              kcal
            </ThemedText>
            <ThemedText
              type="body"
              style={[styles.breakdownText, styles.totalText]}
            >
              Total: {der} kcal
            </ThemedText>
          </PixelCard>
        ) : null}
      </View>

      <View style={styles.floatingButtonContainer}>
        <PixelButton onPress={handleDone} size="large">
          DONE
        </PixelButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoWrapper: {
    marginBottom: Spacing.lg,
  },
  infoCard: {
    marginBottom: Spacing.xl,
    alignItems: "center",
  },
  infoText: {
    marginBottom: Spacing.xs,
  },
  derValue: {
    textAlign: "center",
  },
  form: {
    marginBottom: Spacing.lg,
  },
  resultSection: {
    marginBottom: Spacing.xl,
  },
  resultTitle: {
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  resultCards: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  resultCard: {
    flex: 1,
    alignItems: "center",
  },
  foodIcon: {
    width: 48,
    height: 48,
    marginBottom: Spacing.sm,
  },
  foodLabel: {
    marginBottom: Spacing.xs,
  },
  foodValue: {
    textAlign: "center",
  },
  foodSubtext: {
    marginTop: Spacing.xs,
    opacity: 0.7,
  },
  breakdownCard: {
    marginTop: Spacing.md,
  },
  breakdownText: {
    marginBottom: Spacing.xs,
  },
  totalText: {
    marginTop: Spacing.sm,
  },
  floatingButtonContainer: {
    marginTop: Spacing.lg,
  },
});
