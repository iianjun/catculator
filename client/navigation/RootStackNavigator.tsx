import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CalculatorScreen from "@/screens/CalculatorScreen";
import ResultsScreen from "@/screens/ResultsScreen";
import FoodDetailsScreen from "@/screens/FoodDetailsScreen";
import SavedProfilesScreen from "@/screens/SavedProfilesScreen";
import { PixelHeader } from "@/components/PixelHeader";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { CatStatus, FoodType } from "@/lib/calculator";

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

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={{
          headerTitle: () => <PixelHeader title="CATCULATOR" />,
        }}
      />
      <Stack.Screen
        name="SavedProfiles"
        component={SavedProfilesScreen}
        options={{
          headerTitle: "MY CATS",
        }}
      />
      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{
          headerTitle: "RESULTS",
        }}
      />
      <Stack.Screen
        name="FoodDetails"
        component={FoodDetailsScreen}
        options={{
          headerTitle: "FOOD SETUP",
        }}
      />
    </Stack.Navigator>
  );
}
