export default {
  app: {
    name: "CATCULATOR",
  },

  nav: {
    catculator: "Catculator",
    myCats: "My cats",
    results: "Results",
    foodSetup: "Food setup",
  },

  calculator: {
    catWeight: "CAT WEIGHT",
    catStatus: "CAT STATUS",
    calculate: "CALCULATE",
    myCats: "MY CATS",
    speech: {
      initial: "MEOW! Enter my weight!",
      invalidWeight: "Hmm... that weight seems off!",
      inactive: "Let's get healthy together!",
      ready: "Looking good! Ready to calculate!",
    },
  },

  catStatus: {
    kitten_young: {
      label: "Kitten <4mo",
      description: "Rapid growth phase",
    },
    kitten_old: {
      label: "Kitten 4-12mo",
      description: "Late growth phase",
    },
    neutered: {
      label: "Neutered",
      description: "Standard indoor cat",
    },
    intact: {
      label: "Intact",
      description: "Non-neutered adult",
    },
    inactive: {
      label: "Inactive",
      description: "Weight management",
    },
    active: {
      label: "Active",
      description: "High energy level",
    },
  },

  results: {
    profileResults: "{{name}}'s Results",
    letsWork: "Let's work on this!",
    greatJob: "Great job!",
    rer: "RER",
    der: "DER",
    kcalDay: "kcal/day",
    restingEnergy: "Resting Energy Requirement",
    dailyEnergy: "Daily Energy Requirement",
    rerTooltip:
      "The number of calories a cat needs to maintain basic body functions (like breathing and digestion) while at total rest in a controlled temperature.",
    derTooltip:
      "The total number of calories a cat needs per day based on their RER plus their specific lifestyle factors (life stage, activity level, and neuter status).",
    weight: "Weight:",
    status: "Status:",
    overweightWarning:
      "Your cat may be overweight. Consider consulting a vet for a weight management plan.",
    foodBreakdown: "FOOD BREAKDOWN",
    newCalculation: "NEW CALCULATION",
  },

  food: {
    dailyCalories: "Daily calories needed:",
    foodType: "FOOD TYPE",
    wetOnly: "Wet Only",
    dryOnly: "Dry Only",
    both: "Both",
    wetFoodCalories: "WET FOOD CALORIES",
    dryFoodCalories: "DRY FOOD CALORIES",
    treatCalories: "TREAT CALORIES",
    wetTooltip:
      "Where to find:\n\nCheck the label for calories listed per container, such as 'kcal/can' or 'kcal/pouch' (e.g., 169 kcal ME/can).",
    dryTooltip:
      "Where to find:\n\nCheck the 'Calorie Content' or 'Guaranteed Analysis' section on your cat food packaging. Most brands list this value as kcal/kg.",
    treatTooltip:
      "Enter the combined calories of all daily treats.\n\nMost treat packages list calories per piece — just multiply by the number of treats per day.\n(Example: 2 kcal/piece × 5 pieces = 10 kcal)",
    kcalPouch: "kcal/pouch",
    kcalKg: "kcal/kg",
    kcal: "kcal",
    dailyPortions: "DAILY PORTIONS",
    wetFood: "Wet Food",
    dryFood: "Dry Food",
    treats: "Treats",
    pouch: "pouch",
    pouches: "pouches",
    perDay: "per day",
    gram: "g",
    overbudgetWarning:
      "Meouch! Too many calories can lead to a cat-astrophic waistline.",
    wetFoodBreakdown: "Wet food: {{kcal}} kcal ({{pouches}} x {{perPouch}})",
    dryFoodBreakdown: "Dry food: {{kcal}} kcal",
    treatsBreakdown: "Treats: {{kcal}} kcal",
    totalBreakdown: "Total: {{consumed}} / {{der}} kcal",
    done: "DONE",
    save: "SAVE",
    update: "UPDATE",
    nameYourCat: "NAME YOUR CAT",
    catName: "CAT NAME",
    catNamePlaceholder: "Mochi",
  },

  profiles: {
    unnamedCat: "Unnamed Cat",
    saved: "Saved {{date}}",
    delete: "DELETE",
    edit: "EDIT",
    foodType: "Food Type:",
    wetFood: "Wet Food:",
    dryFood: "Dry Food:",
    treats: "Treats:",
    noSavedCat: "NO SAVED CAT YET",
    noSavedCatDesc: "Save a profile from the Food Setup screen.",
    deleteCat: "DELETE CAT?",
    deleteConfirm: "{{name}} will be removed.",
    thisCat: "This cat",
  },

  common: {
    ok: "OK",
    cancel: "CANCEL",
  },

  error: {
    oops: "OOPS!",
    message:
      "Catculator had a little accident. The cat knocked something over!",
    tryAgain: "TRY AGAIN",
    errorLog: "ERROR LOG",
  },
};
