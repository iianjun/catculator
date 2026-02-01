# Catculator Design Guidelines

## Brand Identity

**Purpose**: Helps cat owners prevent obesity by calculating precise daily calorie requirements for their cats.

**Aesthetic Direction**: **Retro Pixel Art** - Nostalgic 8-bit game aesthetic with chunky pixels, limited color palette, and playful cat-themed visuals. Think Game Boy meets modern utility app. This creates an approachable, fun experience for what could otherwise feel like dry math.

**Memorable Element**: Every interaction feels like playing a vintage handheld game - pixel art cats, retro sound-like feedback (visual only), chunky buttons with pressed states.

## Navigation Architecture

**Root Navigation**: Stack-Only (linear calculator flow)

**Screen List**:

1. **Home/Calculator Input** - Primary screen where users input cat details
2. **Results Screen** - Shows RER, DER, and food portion recommendations
3. **Food Details Screen** - Nested input for wet/dry food calorie specifications
4. **Settings/About** - App preferences, pixel art theme customization, about info

## Screen-by-Screen Specifications

### 1. Home/Calculator Input

**Purpose**: Collect cat weight and activity status

**Layout**:

- Header: Custom pixel art header with app title "CATCULATOR" in chunky pixel font, settings icon (top-right)
- Main content: Scrollable form with pixel art elements
- Top inset: insets.top + Spacing.xl
- Bottom inset: insets.bottom + Spacing.xl

**Components**:

- Pixel art cat illustration at top (changes expression based on weight category)
- Weight input field with pixel art border and chunky +/- buttons
- Activity status picker with 6 chunky pixel buttons (grid layout, 2 columns)
- Large "CALCULATE" pixel button at bottom
- All buttons have 4px pressed state (shift down + darker shade)

**Empty State**: Default state shows neutral pixel cat with speech bubble "MEOW! Enter my weight!"

### 2. Results Screen

**Purpose**: Display RER, DER calculations and feeding recommendations

**Layout**:

- Header: Back button (pixel arrow), title "RESULTS"
- Main content: Scrollable with pixel art cards
- Top inset: headerHeight + Spacing.xl
- Bottom inset: insets.bottom + Spacing.xl

**Components**:

- Happy pixel cat celebration animation at top
- Chunky pixel card showing RER (large pixel numbers)
- Chunky pixel card showing DER with activity multiplier
- "FOOD BREAKDOWN" button leading to Food Details screen
- "SAVE" button (stores calculation to history)
- Pixel art warning box if cat is in obese-prone category

### 3. Food Details Screen

**Purpose**: Input wet/dry food calories to calculate portions

**Layout**:

- Header: Back button, title "FOOD SETUP"
- Main content: Scrollable form
- Submit button: Floating pixel button at bottom (with shadow: offset 0,2, opacity 0.10, radius 2)
- Top inset: headerHeight + Spacing.xl
- Bottom inset: insets.bottom + Spacing.xl + 60 (for floating button)

**Components**:

- Toggle switches (pixel style) for "Wet Food" and "Dry Food"
- Conditionally shown input fields based on toggles:
  - Wet food: Total kcal input
  - Dry food: kcal per kg input
- Result display: Pixel art food bowl with calculated grams
- "DONE" floating pixel button

### 4. Settings/About

**Purpose**: App preferences and information

**Layout**:

- Header: Back button, title "SETTINGS"
- Main content: Scrollable list
- Top inset: headerHeight + Spacing.xl
- Bottom inset: insets.bottom + Spacing.xl

**Components**:

- Pixel avatar selector (4 preset pixel cat avatars)
- Theme toggle (light/dark pixel themes)
- Unit preference (kg/lbs)
- About section with pixel art credits
- Version number in pixel font

## Color Palette

**PRIMARY THEME** (Game Boy Green):

- Primary: #0F380F (dark green, buttons/headers)
- Primary Light: #306230 (mid green, active states)
- Primary Lighter: #8BAC0F (lime, accents)
- Background: #9BBC0F (light green, main bg)
- Surface: #8BAC0F (cards/containers)
- Text: #0F380F (dark green, high contrast)
- Text Secondary: #306230 (mid green)

**SEMANTIC**:

- Success: #8BAC0F (lime green)
- Warning: #0F380F (dark for warnings on light bg)
- Error: #0F380F (consistent dark)

**DARK THEME** (optional):

- Invert the palette: #0F380F for bg, #9BBC0F for text

## Typography

**Font**: "Press Start 2P" (Google Font) - authentic pixel font

- **Fallback**: Courier New (monospace system font)

**Type Scale** (rem equivalent for pixel font):

- XXL: 24px - Screen titles, large numbers
- XL: 16px - Section headers
- L: 12px - Button labels
- M: 10px - Body text, input labels
- S: 8px - Helper text

**CRITICAL**: Pixel fonts MUST be rendered at whole-number sizes (no decimals) and never anti-aliased.

## Visual Design

**Icons**: Feather icons, but custom pixel-ized versions (8x8 or 16x16 grid)

**Buttons**:

- 4px thick pixel border
- Pressed state: Shift content down 4px, darken fill by 20%
- Hover (web): Lighten fill by 10%

**Input Fields**:

- 3px thick pixel border (#0F380F)
- Chunky +/- adjustment buttons on number inputs
- No rounded corners (stay true to pixel aesthetic)

**Spacing Grid**: Use multiples of 8px (pixel-perfect alignment)

## Assets to Generate

1. **icon.png** - App icon: Pixel art cat face in green color scheme, 1024x1024
   - WHERE USED: Device home screen

2. **splash-icon.webp** - Pixel cat with calculator, 128x128
   - WHERE USED: App launch screen

3. **cat-neutral.webp** - Neutral pixel cat (128x128)
   - WHERE USED: Home screen default state

4. **cat-happy.webp** - Happy pixel cat (128x128)
   - WHERE USED: Results screen, successful calculation

5. **cat-worried.webp** - Worried pixel cat (128x128)
   - WHERE USED: Obese-prone warning state

6. **food-bowl.webp** - Pixel art cat food bowl (128x128)
   - WHERE USED: Food Details screen, portion display

7. **web-food-bowl.webp** - Pixel art cat web food bowl (128x128)
   - WHERE USED: Web food breakdown display when includes web food

**Asset Style**: All assets use 4-color Game Boy palette, chunky pixels visible, no anti-aliasing, transparent backgrounds.
