import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CalculatorScreen from "@/screens/CalculatorScreen";
import ResultsScreen from "@/screens/ResultsScreen";
import FoodDetailsScreen from "@/screens/FoodDetailsScreen";
import { PixelHeader } from "@/components/PixelHeader";
import { useScreenOptions } from "@/hooks/useScreenOptions";
import { CatStatus } from "@/lib/calculator";

export type RootStackParamList = {
  Calculator: undefined;
  Results: {
    weight: number;
    catStatus: CatStatus;
    rer: number;
    der: number;
    multiplier: number;
  };
  FoodDetails: {
    der: number;
    weight: number;
    catStatus: CatStatus;
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
