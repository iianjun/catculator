import React, { useState, useMemo } from "react";
import { StyleSheet, View, Image, ScrollView, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { PixelButton } from "@/components/PixelButton";
import { PixelCard } from "@/components/PixelCard";
import { PixelInput } from "@/components/PixelInput";
import { PixelSelect } from "@/components/PixelSelect";
import { PixelModal } from "@/components/PixelModal";
import { PixelTooltip } from "@/components/PixelTooltip";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, PixelShadow } from "@/constants/theme";
import { FoodType, calculateFoodPortions } from "@/lib/calculator";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { saveCatProfile, updateCatProfile, CatProfile } from "@/lib/storage";
import { useTranslation } from "@/i18n/useTranslation";

type FoodDetailsRouteProp = RouteProp<RootStackParamList, "FoodDetails">;
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "FoodDetails"
>;

export default function FoodDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<FoodDetailsRouteProp>();
  const { t } = useTranslation();

  const {
    der,
    weight,
    catStatus,
    foodType: initialFoodType,
    wetFoodCalories: initialWet,
    dryFoodCaloriesPerKg: initialDry,
    treatCalories: initialTreat,
    pouches: initialPouches,
    profileId,
    profileName,
  } = route.params;

  const isEditMode = !!profileId;

  const [foodType, setFoodType] = useState<FoodType>(initialFoodType ?? "both");
  const [wetFoodCalories, setWetFoodCalories] = useState(
    initialWet !== undefined ? String(initialWet) : "80",
  );
  const [dryFoodCaloriesPerKg, setDryFoodCaloriesPerKg] = useState(
    initialDry !== undefined ? String(initialDry) : "3500",
  );
  const [treatCalories, setTreatCalories] = useState(
    initialTreat !== undefined ? String(initialTreat) : "0",
  );
  const [pouches, setPouches] = useState(initialPouches ?? 1);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [catName, setCatName] = useState(profileName ?? "");

  const wetCal = parseFloat(wetFoodCalories) || 0;
  const dryCal = parseFloat(dryFoodCaloriesPerKg) || 0;
  const treatCal = parseFloat(treatCalories) || 0;

  const foodTypeOptions = [
    { value: "wet", label: t("food.wetOnly") },
    { value: "dry", label: t("food.dryOnly") },
    { value: "both", label: t("food.both") },
  ];

  const calculation = useMemo(() => {
    return calculateFoodPortions(
      der,
      foodType,
      wetCal,
      dryCal,
      treatCal,
      pouches,
    );
  }, [der, foodType, wetCal, dryCal, treatCal, pouches]);

  const totalConsumed = useMemo(() => {
    let total = treatCal;
    if (foodType === "wet") {
      total += wetCal > 0 ? (calculation.wetFoodGrams / 85) * wetCal : 0;
    } else if (foodType === "dry") {
      total += dryCal > 0 ? (calculation.dryFoodGrams / 1000) * dryCal : 0;
    } else {
      total += wetCal * pouches;
      total += dryCal > 0 ? (calculation.dryFoodGrams / 1000) * dryCal : 0;
    }
    return Math.floor(total * 10) / 10;
  }, [foodType, treatCal, wetCal, dryCal, pouches, calculation]);

  const remaining = Math.floor((der - totalConsumed) * 10) / 10;

  const isOverBudget = remaining < 0;

  const handleDone = () => {
    navigation.reset({ index: 0, routes: [{ name: "Calculator" }] });
  };

  const handleSave = () => {
    setSaveModalVisible(true);
  };

  const handleSaveConfirm = async () => {
    const profile: CatProfile = {
      id: isEditMode ? profileId : String(Date.now()),
      name: catName.trim(),
      weight,
      catStatus,
      foodType,
      wetFoodCalories: parseFloat(wetFoodCalories) || 0,
      dryFoodCaloriesPerKg: parseFloat(dryFoodCaloriesPerKg) || 0,
      treatCalories: parseFloat(treatCalories) || 0,
      pouches,
      savedAt: Date.now(),
    };
    if (isEditMode) {
      await updateCatProfile(profileId, profile);
    } else {
      await saveCatProfile(profile);
    }
    setSaveModalVisible(false);
    setCatName("");
    navigation.reset({ index: 0, routes: [{ name: "Calculator" }] });
  };

  const handleSaveCancel = () => {
    setSaveModalVisible(false);
    setCatName("");
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
      <PixelCard style={styles.infoCard} wrapperStyle={styles.infoWrapper}>
        <ThemedText type="body" style={styles.infoText}>
          {t("food.dailyCalories")}
        </ThemedText>
        <ThemedText type="h2" style={styles.derValue}>
          {der} {t("food.kcal")}
        </ThemedText>
      </PixelCard>

      <View style={styles.form}>
        <PixelSelect
          label={t("food.foodType")}
          options={foodTypeOptions}
          value={foodType}
          onChange={(val) => setFoodType(val as FoodType)}
          columns={3}
        />

        {foodType === "wet" || foodType === "both" ? (
          <View>
            <View style={styles.labelWithTooltip}>
              <ThemedText type="body">{t("food.wetFoodCalories")}</ThemedText>
              <PixelTooltip
                content={t("food.wetTooltip")}
                textStyle={{ fontSize: 9 }}
                tooltipStyle={{ padding: Spacing.md }}
              />
            </View>
            <View style={styles.wetInputRow}>
              <View style={styles.wetInputFlex}>
                <PixelInput
                  value={wetFoodCalories}
                  onChangeText={setWetFoodCalories}
                  placeholder="80"
                  keyboardType="decimal-pad"
                  unit={t("food.kcalPouch")}
                />
              </View>
              {foodType === "both" ? (
                <View style={styles.pouchStepperWrapper}>
                  <View style={styles.pouchStepper}>
                    <View
                      style={[
                        styles.pouchCount,
                        {
                          borderColor: theme.border,
                          backgroundColor: theme.backgroundDefault,
                        },
                      ]}
                    >
                      <ThemedText type="body">{pouches}</ThemedText>
                    </View>
                    <View style={styles.stepButtons}>
                      <Pressable
                        onPress={() => {
                          setPouches((p) => p + 1);
                          Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Light,
                          );
                        }}
                        style={[
                          styles.stepBtn,
                          {
                            backgroundColor: theme.primary,
                            borderColor: theme.border,
                          },
                        ]}
                      >
                        <Feather
                          name="plus"
                          size={16}
                          color={theme.buttonText}
                        />
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          setPouches((p) => Math.max(1, p - 1));
                          Haptics.impactAsync(
                            Haptics.ImpactFeedbackStyle.Light,
                          );
                        }}
                        style={[
                          styles.stepBtn,
                          {
                            backgroundColor: theme.primary,
                            borderColor: theme.border,
                          },
                        ]}
                      >
                        <Feather
                          name="minus"
                          size={16}
                          color={theme.buttonText}
                        />
                      </Pressable>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.pouchStepperShadow,
                      { backgroundColor: theme.border },
                    ]}
                  />
                </View>
              ) : null}
            </View>
          </View>
        ) : null}

        {foodType === "dry" || foodType === "both" ? (
          <View>
            <View style={styles.labelWithTooltip}>
              <ThemedText type="body">{t("food.dryFoodCalories")}</ThemedText>
              <PixelTooltip
                content={t("food.dryTooltip")}
                textStyle={{
                  fontSize: 9,
                }}
                tooltipStyle={{
                  padding: Spacing.md,
                }}
              />
            </View>
            <PixelInput
              value={dryFoodCaloriesPerKg}
              onChangeText={setDryFoodCaloriesPerKg}
              placeholder="3500"
              keyboardType="decimal-pad"
              unit={t("food.kcalKg")}
            />
          </View>
        ) : null}

        <View>
          <View style={styles.labelWithTooltip}>
            <ThemedText type="body">{t("food.treatCalories")}</ThemedText>
            <PixelTooltip
              content={t("food.treatTooltip")}
              textStyle={{ fontSize: 9 }}
              tooltipStyle={{ padding: Spacing.md }}
            />
          </View>
          <PixelInput
            value={treatCalories}
            onChangeText={setTreatCalories}
            placeholder="0"
            keyboardType="decimal-pad"
            unit={t("food.kcal")}
          />
        </View>
      </View>

      <View style={styles.resultSection}>
        <ThemedText type="h4" style={styles.resultTitle}>
          {t("food.dailyPortions")}
        </ThemedText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.resultCards}
        >
          {foodType === "wet" || foodType === "both" ? (
            <PixelCard style={styles.resultCard}>
              <Image
                source={require("../../assets/images/wet-food-bowl.webp")}
                style={styles.foodIcon}
                resizeMode="contain"
              />
              <ThemedText type="body" style={styles.foodLabel}>
                {t("food.wetFood")}
              </ThemedText>
              <ThemedText type="h3" style={styles.foodValue}>
                {foodType === "both" && dryCal > 0
                  ? `${pouches} ${pouches > 1 ? t("food.pouches") : t("food.pouch")}`
                  : `${calculation.wetFoodGrams}${t("food.gram")}`}
              </ThemedText>
              {foodType === "wet" || (foodType === "both" && dryCal <= 0) ? (
                <ThemedText type="small" style={styles.foodSubtext}>
                  ({Math.round((calculation.wetFoodGrams / 85) * 10) / 10}{" "}
                  {t("food.pouches")})
                </ThemedText>
              ) : null}
            </PixelCard>
          ) : null}

          {foodType === "dry" || (foodType === "both" && dryCal > 0) ? (
            <PixelCard style={styles.resultCard}>
              <Image
                source={require("../../assets/images/food-bowl.webp")}
                style={styles.foodIcon}
                resizeMode="contain"
              />
              <ThemedText type="body" style={styles.foodLabel}>
                {t("food.dryFood")}
              </ThemedText>
              <ThemedText type="h3" style={styles.foodValue}>
                {calculation.dryFoodGrams}
                {t("food.gram")}
              </ThemedText>
              <ThemedText type="small" style={styles.foodSubtext}>
                {t("food.perDay")}
              </ThemedText>
            </PixelCard>
          ) : null}

          {treatCal > 0 ? (
            <PixelCard style={styles.resultCard}>
              <Image
                source={require("../../assets/images/churu-treats.webp")}
                style={styles.foodIcon}
                resizeMode="contain"
              />
              <ThemedText type="body" style={styles.foodLabel}>
                {t("food.treats")}
              </ThemedText>
              <ThemedText type="h3" style={styles.foodValue}>
                {treatCal} {t("food.kcal")}
              </ThemedText>
            </PixelCard>
          ) : null}
        </ScrollView>

        {isOverBudget && foodType === "both" ? (
          <PixelCard style={styles.warningCard}>
            <Image
              source={require("../../assets/images/obesity-cat.webp")}
              style={styles.warningImage}
              resizeMode="contain"
            />
            <ThemedText
              type="body"
              style={[styles.warningText, { color: theme.error }]}
            >
              {t("food.overbudgetWarning")}
            </ThemedText>
          </PixelCard>
        ) : null}

        {foodType === "both" && wetCal > 0 ? (
          <PixelCard style={styles.breakdownCard}>
            <ThemedText type="body" style={styles.breakdownText}>
              {t("food.wetFoodBreakdown", {
                kcal: wetCal * pouches,
                pouches,
                perPouch: wetCal,
              })}
            </ThemedText>
            <ThemedText type="body" style={styles.breakdownText}>
              {t("food.dryFoodBreakdown", {
                kcal: Math.round(calculation.dryFoodGrams * (dryCal / 1000)),
              })}
            </ThemedText>
            {treatCal > 0 ? (
              <ThemedText type="body" style={styles.breakdownText}>
                {t("food.treatsBreakdown", { kcal: treatCal })}
              </ThemedText>
            ) : null}
            <ThemedText
              type="body"
              style={[
                styles.breakdownText,
                styles.totalText,
                isOverBudget && { color: theme.error },
              ]}
            >
              {t("food.totalBreakdown", { consumed: totalConsumed, der })}
              {isOverBudget ? ` (${remaining})` : ""}
            </ThemedText>
          </PixelCard>
        ) : null}
      </View>

      <View style={styles.floatingButtonContainer}>
        {!isEditMode && (
          <PixelButton onPress={handleDone} size="large">
            {t("food.done")}
          </PixelButton>
        )}
        <View style={styles.saveButtonSpacing}>
          <PixelButton onPress={handleSave} size="large" variant="secondary">
            {isEditMode ? t("food.update") : t("food.save")}
          </PixelButton>
        </View>
      </View>

      <PixelModal
        visible={saveModalVisible}
        title={t("food.nameYourCat")}
        onConfirm={handleSaveConfirm}
        onCancel={handleSaveCancel}
        confirmLabel={isEditMode ? t("food.update") : t("food.save")}
      >
        <PixelInput
          label={t("food.catName")}
          value={catName}
          onChangeText={setCatName}
          placeholder={t("food.catNamePlaceholder")}
        />
      </PixelModal>
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
  labelWithTooltip: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  wetInputRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
  },
  wetInputFlex: {
    flex: 1,
  },
  pouchStepperWrapper: {
    position: "relative",
  },
  pouchStepper: {
    flexDirection: "row",
    height: Spacing.inputHeight,
    zIndex: 1,
  },
  pouchStepperShadow: {
    position: "absolute",
    bottom: -PixelShadow.offset,
    left: PixelShadow.offset,
    right: -PixelShadow.offset,
    top: PixelShadow.offset,
    zIndex: 0,
  },
  pouchCount: {
    width: 40,
    height: Spacing.inputHeight,
    borderWidth: Spacing.pixelBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  stepButtons: {
    height: Spacing.inputHeight,
  },
  stepBtn: {
    flex: 1,
    width: 32,
    borderWidth: Spacing.pixelBorder,
    alignItems: "center",
    justifyContent: "center",
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
    paddingBottom: Spacing.sm,
  },
  resultCard: {
    alignItems: "center",
    flex: 1,
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
  warningCard: {
    paddingTop: 0,
    marginTop: Spacing.md,
    alignItems: "center",
  },
  warningImage: {
    width: 256,
    height: 256,
    marginBottom: Spacing.sm,
  },
  warningText: {
    textAlign: "center",
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
  saveButtonSpacing: {
    marginTop: Spacing.md,
  },
});
