import AsyncStorage from "@react-native-async-storage/async-storage";
import { CatStatus, FoodType } from "@/lib/calculator";

export interface CatProfile {
  id: string;
  name: string;
  weight: number;
  catStatus: CatStatus;
  foodType: FoodType;
  wetFoodCalories: number;
  dryFoodCaloriesPerKg: number;
  treatCalories: number;
  savedAt: number;
}

const STORAGE_KEY = "@catculator/profiles";

export async function saveCatProfile(profile: CatProfile): Promise<void> {
  const existing = await getCatProfiles();
  existing.push(profile);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export async function getCatProfiles(): Promise<CatProfile[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  return JSON.parse(raw) as CatProfile[];
}

export async function updateCatProfile(
  id: string,
  profile: CatProfile,
): Promise<void> {
  const existing = await getCatProfiles();
  const updated = existing.map((p) => (p.id === id ? profile : p));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function deleteCatProfile(profileId: string): Promise<void> {
  const existing = await getCatProfiles();
  const filtered = existing.filter((p) => p.id !== profileId);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
