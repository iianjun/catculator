// Cat calorie calculation utilities

export type CatStatus =
  | "kitten_young"
  | "kitten_old"
  | "neutered"
  | "intact"
  | "inactive"
  | "active";

export interface CatStatusOption {
  value: CatStatus;
  label: string;
  multiplier: number;
  description: string;
}

export const CAT_STATUS_OPTIONS: CatStatusOption[] = [
  {
    value: "kitten_young",
    label: "Kitten <4mo",
    multiplier: 3.0,
    description: "Rapid growth phase",
  },
  {
    value: "kitten_old",
    label: "Kitten 4-12mo",
    multiplier: 2.5,
    description: "Late growth phase",
  },
  {
    value: "neutered",
    label: "Neutered",
    multiplier: 1.2,
    description: "Standard indoor cat",
  },
  {
    value: "intact",
    label: "Intact",
    multiplier: 1.4,
    description: "Non-neutered adult",
  },
  {
    value: "inactive",
    label: "Inactive",
    multiplier: 1.0,
    description: "Weight management",
  },
  {
    value: "active",
    label: "Active",
    multiplier: 1.6,
    description: "High energy level",
  },
];

export function calculateRER(weightKg: number): number {
  if (weightKg <= 0) return 0;
  
  if (weightKg < 2) {
    // Exponential formula for cats under 2kg
    return 70 * Math.pow(weightKg, 0.75);
  } else {
    // Linear formula for cats 2kg to 45kg
    return weightKg * 30 + 70;
  }
}

export function calculateDER(rer: number, status: CatStatus): number {
  const statusOption = CAT_STATUS_OPTIONS.find((opt) => opt.value === status);
  if (!statusOption) return rer;
  return rer * statusOption.multiplier;
}

export function getMultiplier(status: CatStatus): number {
  const statusOption = CAT_STATUS_OPTIONS.find((opt) => opt.value === status);
  return statusOption?.multiplier ?? 1;
}

export type FoodType = "wet" | "dry" | "both";

export interface FoodCalculation {
  wetFoodGrams: number;
  dryFoodGrams: number;
  remainingCalories: number;
}

export function calculateFoodPortions(
  derCalories: number,
  foodType: FoodType,
  wetFoodCalories: number, // Total kcal in wet food
  dryFoodCaloriesPerKg: number // kcal per kg of dry food
): FoodCalculation {
  let remainingCalories = derCalories;
  let wetFoodGrams = 0;
  let dryFoodGrams = 0;

  if (foodType === "wet") {
    // All calories from wet food (assuming standard 85g pouch)
    // User provides total wet food calories, we calculate how many pouches
    wetFoodGrams = wetFoodCalories > 0 ? (derCalories / wetFoodCalories) * 85 : 0;
    remainingCalories = 0;
  } else if (foodType === "dry") {
    // All calories from dry food
    if (dryFoodCaloriesPerKg > 0) {
      // Convert kcal/kg to grams needed
      dryFoodGrams = (derCalories / dryFoodCaloriesPerKg) * 1000;
    }
    remainingCalories = 0;
  } else if (foodType === "both") {
    // Subtract wet food calories first, then calculate dry food
    remainingCalories = Math.max(0, derCalories - wetFoodCalories);
    wetFoodGrams = 85; // Assume one standard pouch
    
    if (dryFoodCaloriesPerKg > 0 && remainingCalories > 0) {
      dryFoodGrams = (remainingCalories / dryFoodCaloriesPerKg) * 1000;
    }
  }

  return {
    wetFoodGrams: Math.round(wetFoodGrams * 10) / 10,
    dryFoodGrams: Math.round(dryFoodGrams * 10) / 10,
    remainingCalories: Math.round(remainingCalories * 10) / 10,
  };
}
