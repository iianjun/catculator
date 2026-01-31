# Catculator

A mobile app that calculates a cat's daily calorie requirements to help prevent obesity.

## Overview

Catculator helps cat owners determine the proper daily calorie intake for their cats based on:
- Cat's weight (using RER calculation)
- Cat's activity status (using DER multipliers)
- Food type (wet, dry, or both)

## Architecture

### Frontend (Expo React Native)
- **Screens**: Calculator, Results, Food Details
- **Components**: PixelButton, PixelCard, PixelInput, PixelSelect, PixelToggle
- **Design**: Retro pixel art style with Game Boy green color palette

### Backend (Express.js)
- Static landing page only (no API needed for this calculator)

## Key Features

1. **RER Calculation**: 
   - Cats under 2kg: 70 × (weight)^0.75
   - Cats 2-45kg: (weight × 30) + 70

2. **DER Multipliers**:
   - Kitten <4mo: 3.0
   - Kitten 4-12mo: 2.5
   - Neutered Adult: 1.2
   - Intact Adult: 1.4
   - Inactive: 1.0
   - Active: 1.6

3. **Food Portions**: Calculate wet/dry food amounts based on calorie needs

## Design System

- **Font**: Press Start 2P (pixel font)
- **Colors**: Game Boy green palette (#0F380F, #306230, #8BAC0F, #9BBC0F)
- **Style**: Chunky pixel borders, 4px shadows, no rounded corners

## Project Structure

```
client/
├── App.tsx - Main app with font loading
├── components/
│   ├── PixelButton.tsx - Pixel art button with shadow
│   ├── PixelCard.tsx - Card with pixel border and shadow
│   ├── PixelInput.tsx - Input field with stepper buttons
│   ├── PixelSelect.tsx - Grid selection component
│   ├── PixelToggle.tsx - Pixel toggle switch
│   └── PixelHeader.tsx - App header with icon
├── screens/
│   ├── CalculatorScreen.tsx - Main input screen
│   ├── ResultsScreen.tsx - RER/DER results display
│   └── FoodDetailsScreen.tsx - Food portion calculator
├── lib/
│   └── calculator.ts - Calorie calculation logic
└── constants/
    └── theme.ts - Pixel art theme configuration
```

## Running the App

- Frontend: `npm run expo:dev` (port 8081)
- Backend: `npm run server:dev` (port 5000)
