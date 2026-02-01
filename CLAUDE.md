# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Catculator is a React Native (Expo) mobile app that calculates a cat's daily calorie requirements to prevent obesity. Retro pixel art aesthetic using the Press Start 2P font, chunky borders, and pixel shadows.

## Commands

```bash
# Development
npm run expo:dev          # Start Expo dev client
npm run server:dev        # Start Express backend (port 5000)

# Quality checks
npm run lint              # ESLint via Expo
npm run lint:fix          # ESLint auto-fix
npm run check:types       # TypeScript type check (tsc --noEmit)
npm run check:format      # Prettier check
npm run format            # Prettier auto-fix all files

# Database
npm run db:push           # Apply Drizzle migrations to PostgreSQL

# Production
npm run server:build      # Bundle server with esbuild
npm run server:prod       # Run production server
```

## Architecture

**Client-server split:** The client handles all UI and calculations locally. The Express server only serves a landing page — there are no API calls in the calculator flow.

**Navigation:** Linear stack flow via `@react-navigation/native-stack`:
- `Calculator` → weight input + cat status selection
- `Results` → displays RER/DER calculations (params: weight, catStatus, rer, der, multiplier)
- `FoodDetails` → food portion calculator (params: der, weight, catStatus)

Screen params are typed via `RootStackParamList` in `client/navigation/RootStackNavigator.tsx`.

**Path aliases** (configured in tsconfig.json and babel.config.js):
- `@/*` → `./client/*`
- `@shared/*` → `./shared/*`

**Theming:** `useTheme()` hook returns `{ theme, isDark }`. Colors defined in `client/constants/theme.ts`. Light mode uses warm cat-fur tones (browns/creams), dark mode uses inverted warm grays. All components use `theme.*` color tokens — never hardcode colors.

**Design system constants** in `client/constants/theme.ts`:
- `Spacing` — 8px grid (xs:4, sm:8, md:16, lg:24, xl:32)
- `PixelShadow` — offset: 4px
- `BorderRadius` — always 0 (pixel aesthetic)
- `Typography` — size scale from h1 (24px) to small (8px)

**Custom Pixel components** (`client/components/Pixel*.tsx`): PixelButton, PixelCard, PixelInput, PixelSelect, PixelToggle, PixelHeader. All follow the same pattern: 3px pixel borders, 4px shadows, no rounded corners, Press Start 2P font.

## Core Calculation Logic (`client/lib/calculator.ts`)

- **RER**: `weight < 2kg ? 70 × weight^0.75 : (weight × 30) + 70`
- **DER**: `RER × multiplier` where multiplier depends on cat status (kitten <4mo: 3.0, kitten 4-12mo: 2.5, neutered: 1.2, intact: 1.4, inactive: 1.0, active: 1.6)
- Food portions calculated from DER and user-provided kcal values

## Key Conventions

- Font: Press Start 2P (`PressStart2P_400Regular`) — must render at whole-number pixel sizes
- Animations: React Native Reanimated for button press states
- Haptic feedback: `expo-haptics` on button presses
- New Architecture enabled (`newArchEnabled: true` in app.json)
- React Compiler enabled (`reactCompiler: true`)
- Formatting: Prettier runs on save — run `npm run format` to normalize all files
