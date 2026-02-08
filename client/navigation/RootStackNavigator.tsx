import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CalculatorScreen from "@/screens/CalculatorScreen";
import ResultsScreen from "@/screens/ResultsScreen";
import FoodDetailsScreen from "@/screens/FoodDetailsScreen";
import SavedProfilesScreen from "@/screens/SavedProfilesScreen";
import { PixelHeader } from "@/components/PixelHeader";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { CatStatus, FoodType } from "@/lib/calculator";
import { useTranslation } from "@/i18n/useTranslation";

export type RootStackParamList = {
  Calculator: undefined;
  SavedProfiles: undefined;
  Results: {
    weight: number;
    catStatus: CatStatus;
    rer: number;
    der: number;
    multiplier: number;
    foodType?: FoodType;
    wetFoodCalories?: number;
    dryFoodCaloriesPerKg?: number;
    treatCalories?: number;
    pouches?: number;
    profileId?: string;
    profileName?: string;
  };
  FoodDetails: {
    der: number;
    weight: number;
    catStatus: CatStatus;
    foodType?: FoodType;
    wetFoodCalories?: number;
    dryFoodCaloriesPerKg?: number;
    treatCalories?: number;
    pouches?: number;
    profileId?: string;
    profileName?: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const screenOptions = useScreenOptions({ transparent: false });
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={{
          headerTitle: () => (
            <PixelHeader title={t("nav.catculator")} showIcon />
          ),
        }}
      />
      <Stack.Screen
        name="SavedProfiles"
        component={SavedProfilesScreen}
        options={{
          headerTitle: () => <PixelHeader title={t("nav.myCats")} />,
        }}
      />
      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{
          headerTitle: () => <PixelHeader title={t("nav.results")} />,
        }}
      />
      <Stack.Screen
        name="FoodDetails"
        component={FoodDetailsScreen}
        options={{
          headerTitle: () => <PixelHeader title={t("nav.foodSetup")} />,
        }}
      />
    </Stack.Navigator>
  );
}
