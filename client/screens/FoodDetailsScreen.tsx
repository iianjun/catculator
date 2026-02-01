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
          <View>
            <View style={styles.labelWithTooltip}>
              <ThemedText type="body">WET FOOD CALORIES</ThemedText>
              <PixelTooltip
                content={
                  "Where to find:\n\nCheck the label for calories listed per container, such as 'kcal/can' or 'kcal/pouch' (e.g., 169 kcal ME/can)."
                }
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
                  unit="kcal/pouch"
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
              <ThemedText type="body">DRY FOOD CALORIES</ThemedText>
              <PixelTooltip
                content={
                  "Where to find:\n\nCheck the 'Calorie Content' or 'Guaranteed Analysis' section on your cat food packaging. Most brands list this value as kcal/kg."
                }
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
              unit="kcal/kg"
            />
          </View>
        ) : null}

        <View>
          <View style={styles.labelWithTooltip}>
            <ThemedText type="body">TREAT CALORIES</ThemedText>
            <PixelTooltip
              content={
                "Enter the combined calories of all daily treats.\n\nMost treat packages list calories per piece — just multiply by the number of treats per day.\n(Example: 2 kcal/piece \u00d7 5 pieces = 10 kcal)"
              }
              textStyle={{ fontSize: 9 }}
              tooltipStyle={{ padding: Spacing.md }}
            />
          </View>
          <PixelInput
            value={treatCalories}
            onChangeText={setTreatCalories}
            placeholder="0"
            keyboardType="decimal-pad"
            unit="kcal"
          />
        </View>
      </View>

      <View style={styles.resultSection}>
        <ThemedText type="h4" style={styles.resultTitle}>
          DAILY PORTIONS
        </ThemedText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.resultCards}
        >
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
                {foodType === "both" && dryCal > 0
                  ? `${pouches} pouch${pouches > 1 ? "es" : ""}`
                  : `${calculation.wetFoodGrams}g`}
              </ThemedText>
              {foodType === "wet" || (foodType === "both" && dryCal <= 0) ? (
                <ThemedText type="small" style={styles.foodSubtext}>
                  ({Math.round((calculation.wetFoodGrams / 85) * 10) / 10}{" "}
                  pouches)
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

          {treatCal > 0 ? (
            <PixelCard style={styles.resultCard}>
              <Image
                source={require("../../assets/images/churu-treats.webp")}
                style={styles.foodIcon}
                resizeMode="contain"
              />
              <ThemedText type="body" style={styles.foodLabel}>
                Treats
              </ThemedText>
              <ThemedText type="h3" style={styles.foodValue}>
                {treatCal} kcal
              </ThemedText>
            </PixelCard>
          ) : null}
        </ScrollView>

        {foodType === "both" && wetCal > 0 ? (
          <PixelCard style={styles.breakdownCard}>
            <ThemedText type="body" style={styles.breakdownText}>
              Wet food: {wetCal * pouches} kcal ({pouches} x {wetCal})
            </ThemedText>
            <ThemedText type="body" style={styles.breakdownText}>
              Dry food: {Math.round(calculation.dryFoodGrams * (dryCal / 1000))}{" "}
              kcal
            </ThemedText>
            {treatCal > 0 ? (
              <ThemedText type="body" style={styles.breakdownText}>
                Treats: {treatCal} kcal
              </ThemedText>
            ) : null}
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
        {!isEditMode && (
          <PixelButton onPress={handleDone} size="large">
            DONE
          </PixelButton>
        )}
        <View style={styles.saveButtonSpacing}>
          <PixelButton onPress={handleSave} size="large" variant="secondary">
            {isEditMode ? "UPDATE" : "SAVE"}
          </PixelButton>
        </View>
      </View>

      <PixelModal
        visible={saveModalVisible}
        title="NAME YOUR CAT"
        onConfirm={handleSaveConfirm}
        onCancel={handleSaveCancel}
        confirmLabel={isEditMode ? "UPDATE" : "SAVE"}
      >
        <PixelInput
          label="CAT NAME"
          value={catName}
          onChangeText={setCatName}
          placeholder="Mochi"
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
