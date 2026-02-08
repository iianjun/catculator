# Privacy Policy Drafter - Memory

## Key Principles for Mobile App Privacy Policies

### Accuracy is Critical
- Never claim data collection that doesn't exist
- Never omit data collection that does exist (especially from platform SDKs)
- For local-only apps: emphasize on-device processing as a privacy feature
- Be explicit about what happens to temporary data (e.g., "discarded when you exit")

### Platform SDK Considerations
- Expo apps may collect crash/diagnostic data - always mention this with appropriate caveats
- Font loading (expo-font) is local, no data transmission
- Haptic feedback (expo-haptics) is device-only, no data transmission
- React Native's new architecture doesn't inherently collect data
- Always reference Apple/Google privacy policies for app store platform services

### App Store Compliance Patterns
- Apple requires privacy policy URL before submission
- Google Play requires privacy policy for apps requesting sensitive permissions
- Both require child privacy disclosures (COPPA compliance)
- Include GDPR provisions for EEA users (right to access, delete, portability, etc.)
- Include CCPA provisions for California users (right to know, delete, opt-out of sale)

### Structure That Works
1. Developer note (what to fill in, legal review recommendation)
2. Introduction with plain-language summary
3. Information We Collect (subdivided: you provide, we collect auto, we DON'T collect)
4. How We Use Information
5. Data Storage and Security
6. Third-Party Services
7. Children's Privacy
8. Your Privacy Rights (GDPR, CCPA, general)
9. Changes to This Policy
10. Contact Information
11. Plain-language summary at end

### Writing Style
- Start each section with plain English, then add legal details
- Use "Important:" callouts for key privacy advantages
- Provide a summary section at the end for quick reference
- Be transparent about what the developer needs to verify/update
- Include specific URLs for third-party policies (Expo, Apple, Google)

### Common Pitfalls
- Overclaiming: saying you protect data you never collected
- Underclaiming: forgetting platform-level data collection (updates, crash reports)
- Vague language: "we may collect" when you definitely do or definitely don't
- Missing contact info placeholders
- Not explaining what happens to temporary/transient data

## Catculator-Specific Decisions

### Architecture Implications
- Client handles ALL calculations locally → strong privacy selling point
- Express server only serves landing page → no user data in backend
- No API calls in calculator flow → no data transmission to document
- No user accounts → eliminates entire category of privacy concerns

### Third-Party Disclosures
- Expo framework: mentioned with link to Expo privacy policy
- expo-haptics: disclosed as device-only feature
- expo-font: disclosed as bundled asset, no external transmission
- No analytics, no ads, no tracking → explicitly stated as "what we DON'T do"

### Regulatory Coverage
- GDPR: rights documented but noted as not practically applicable (no data to access/delete)
- CCPA: rights documented, emphasized we don't sell data
- COPPA: safe for all ages because no data collection
- Apple + Google: referenced their privacy policies for platform services
