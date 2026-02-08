import React, { useCallback, useState } from "react";
import { StyleSheet, View, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ThemedText } from "@/components/ThemedText";
import { PixelCard } from "@/components/PixelCard";
import { PixelButton } from "@/components/PixelButton";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/constants/theme";
import { getCatProfiles, deleteCatProfile, CatProfile } from "@/lib/storage";
import { PixelModal } from "@/components/PixelModal";
import {
  calculateRER,
  calculateDER,
  getMultiplier,
  calculateFoodPortions,
} from "@/lib/calculator";
import { RootStackParamList } from "@/navigation/RootStackNavigator";
import { useTranslation } from "@/i18n/useTranslation";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SavedProfiles"
>;

export default function SavedProfilesScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { t, locale } = useTranslation();
  const [profiles, setProfiles] = useState<CatProfile[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CatProfile | null>(null);

  const foodTypeLabels: Record<string, string> = {
    wet: t("food.wetOnly"),
    dry: t("food.dryOnly"),
    both: t("food.both"),
  };

  useFocusEffect(
    useCallback(() => {
      getCatProfiles().then((data) => {
        setProfiles(data.sort((a, b) => b.savedAt - a.savedAt));
      });
    }, []),
  );

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    await deleteCatProfile(deleteTarget.id);
    setProfiles((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    setExpandedId(null);
  };

  const handleEdit = (profile: CatProfile) => {
    const rer = calculateRER(profile.weight);
    const der = calculateDER(rer, profile.catStatus);
    const multiplier = getMultiplier(profile.catStatus);

    navigation.navigate("Results", {
      weight: profile.weight,
      catStatus: profile.catStatus,
      rer: Math.round(rer * 10) / 10,
      der: Math.round(der * 10) / 10,
      multiplier,
      foodType: profile.foodType,
      wetFoodCalories: profile.wetFoodCalories,
      dryFoodCaloriesPerKg: profile.dryFoodCaloriesPerKg,
      treatCalories: profile.treatCalories,
      pouches: profile.pouches,
      profileId: profile.id,
      profileName: profile.name,
    });
  };

  const renderItem = ({ item }: { item: CatProfile }) => {
    const statusLabel = t(`catStatus.${item.catStatus}.label`);
    const isExpanded = expandedId === item.id;

    const rer = calculateRER(item.weight);
    const der = calculateDER(rer, item.catStatus);
    const portions = calculateFoodPortions(
      der,
      item.foodType,
      item.wetFoodCalories,
      item.dryFoodCaloriesPerKg,
      item.treatCalories,
      item.pouches ?? 1,
    );

    return (
      <Pressable onPress={() => handleToggle(item.id)}>
        <PixelCard wrapperStyle={styles.cardWrapper}>
          <ThemedText type="h4">
            {item.name || t("profiles.unnamedCat")}
          </ThemedText>
          <ThemedText
            type="body"
            style={[styles.detailText, { color: theme.textSecondary }]}
          >
            {item.weight} kg · {statusLabel}
          </ThemedText>

          {isExpanded ? (
            <View style={styles.expandedSection}>
              <View
                style={[
                  styles.divider,
                  { backgroundColor: theme.border, opacity: 0.3 },
                ]}
              />

              <View style={styles.row}>
                <ThemedText type="body">RER:</ThemedText>
                <ThemedText type="body">
                  {Math.round(rer * 10) / 10} {t("food.kcal")}
                </ThemedText>
              </View>
              <View style={styles.row}>
                <ThemedText type="body">DER:</ThemedText>
                <ThemedText type="body">
                  {Math.round(der * 10) / 10} {t("food.kcal")}
                </ThemedText>
              </View>
              <View style={styles.row}>
                <ThemedText type="body">{t("profiles.foodType")}</ThemedText>
                <ThemedText type="body">
                  {foodTypeLabels[item.foodType]}
                </ThemedText>
              </View>

              {item.foodType === "wet" || item.foodType === "both" ? (
                <View style={styles.row}>
                  <ThemedText type="body">{t("profiles.wetFood")}</ThemedText>
                  <ThemedText type="body">
                    {portions.wetFoodGrams}
                    {t("food.gram")}
                  </ThemedText>
                </View>
              ) : null}

              {item.foodType === "dry" || item.foodType === "both" ? (
                <View style={styles.row}>
                  <ThemedText type="body">{t("profiles.dryFood")}</ThemedText>
                  <ThemedText type="body">
                    {portions.dryFoodGrams}
                    {t("food.gram")}
                  </ThemedText>
                </View>
              ) : null}

              {item.treatCalories > 0 ? (
                <View style={styles.row}>
                  <ThemedText type="body">{t("profiles.treats")}</ThemedText>
                  <ThemedText type="body">
                    {item.treatCalories} {t("food.kcal")}
                  </ThemedText>
                </View>
              ) : null}

              <View style={styles.buttonRow}>
                <View style={styles.buttonFlex}>
                  <PixelButton
                    variant="secondary"
                    size="small"
                    onPress={() => setDeleteTarget(item)}
                  >
                    {t("profiles.delete")}
                  </PixelButton>
                </View>
                <View style={styles.buttonFlex}>
                  <PixelButton
                    variant="secondary"
                    size="small"
                    onPress={() => handleEdit(item)}
                  >
                    {t("profiles.edit")}
                  </PixelButton>
                </View>
              </View>
            </View>
          ) : (
            <ThemedText type="small" style={{ color: theme.textSecondary }}>
              {t("profiles.saved", {
                date: new Date(item.savedAt).toLocaleDateString(
                  locale === "ko" ? "ko-KR" : "en-US",
                ),
              })}
            </ThemedText>
          )}
        </PixelCard>
      </Pressable>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <ThemedText type="h4" style={styles.emptyTitle}>
        {t("profiles.noSavedCat")}
      </ThemedText>
      <ThemedText
        type="body"
        style={[styles.emptySubtext, { color: theme.textSecondary }]}
      >
        {t("profiles.noSavedCatDesc")}
      </ThemedText>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <FlatList
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: insets.bottom + Spacing.xl,
          },
        ]}
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
      <PixelModal
        visible={!!deleteTarget}
        title={t("profiles.deleteCat")}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        confirmLabel={t("profiles.delete")}
      >
        <ThemedText type="body" style={styles.deleteText}>
          {t("profiles.deleteConfirm", {
            name: deleteTarget?.name || t("profiles.thisCat"),
          })}
        </ThemedText>
      </PixelModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    flexGrow: 1,
  },
  cardWrapper: {
    marginBottom: Spacing.md,
  },
  detailText: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  expandedSection: {
    marginTop: Spacing.xs,
  },
  divider: {
    height: 2,
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.sm,
  },
  buttonRow: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  buttonFlex: {
    flex: 1,
  },
  deleteText: {
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
  },
  emptyTitle: {
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  emptySubtext: {
    textAlign: "center",
  },
});
