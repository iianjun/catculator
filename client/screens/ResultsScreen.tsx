import React from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { PixelButton } from "@/components/PixelButton";
import { PixelCard } from "@/components/PixelCard";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { CAT_STATUS_OPTIONS, CatStatus } from "@/lib/calculator";
import { RootStackParamList } from "@/navigation/RootStackNavigator";

type ResultsRouteProp = RouteProp<RootStackParamList, "Results">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Results">;

export default function ResultsScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ResultsRouteProp>();

  const { weight, catStatus, rer, der, multiplier } = route.params;
  const statusLabel = CAT_STATUS_OPTIONS.find(
    (opt) => opt.value === catStatus,
  )?.label;
  const isInactive = catStatus === "inactive";

  const handleFoodBreakdown = () => {
    navigation.navigate("FoodDetails", {
      der,
      weight,
      catStatus,
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
              : require("../../assets/images/cat-happy.webp")
          }
          style={styles.catImage}
          resizeMode="contain"
        />
        <ThemedText type="h4" style={styles.successText}>
          {isInactive ? "Let's work on this!" : "Great job!"}
        </ThemedText>
      </View>

      <PixelCard title="RER" style={styles.card}>
        <ThemedText type="h1" style={styles.calorieValue}>
          {rer}
        </ThemedText>
        <ThemedText type="small" style={styles.calorieUnit}>
          kcal/day
        </ThemedText>
        <ThemedText type="small" style={styles.description}>
          Resting Energy Requirement
        </ThemedText>
      </PixelCard>

      <PixelCard title="DER" style={styles.card}>
        <ThemedText type="h1" style={styles.calorieValue}>
          {der}
        </ThemedText>
        <ThemedText type="small" style={styles.calorieUnit}>
          kcal/day
        </ThemedText>
        <ThemedText type="small" style={styles.description}>
          Daily Energy Requirement
        </ThemedText>
        <View style={styles.multiplierRow}>
          <ThemedText type="small">
            {statusLabel} (x{multiplier})
          </ThemedText>
        </View>
      </PixelCard>

      <PixelCard style={styles.card}>
        <View style={styles.summaryRow}>
          <ThemedText type="body">Weight:</ThemedText>
          <ThemedText type="body">{weight} kg</ThemedText>
        </View>
        <View style={styles.summaryRow}>
          <ThemedText type="body">Status:</ThemedText>
          <ThemedText type="body">{statusLabel}</ThemedText>
        </View>
      </PixelCard>

      {isInactive ? (
        <PixelCard style={styles.card}>
          <ThemedText type="body" style={styles.warningText}>
            Your cat may be overweight. Consider consulting a vet for a weight
            management plan.
          </ThemedText>
        </PixelCard>
      ) : null}

      <View style={styles.buttonContainer}>
        <PixelButton onPress={handleFoodBreakdown} size="large">
          FOOD BREAKDOWN
        </PixelButton>
        <View style={styles.buttonSpacer} />
        <PixelButton
          onPress={handleNewCalculation}
          variant="secondary"
          size="medium"
        >
          NEW CALCULATION
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
    width: 100,
    height: 100,
    marginBottom: Spacing.sm,
  },
  successText: {
    textAlign: "center",
  },
  card: {
    marginBottom: Spacing.lg,
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
