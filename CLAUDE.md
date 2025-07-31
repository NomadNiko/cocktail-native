# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Code Quality (Claude Code Usage)
- `npm run lint` - Run ESLint and Prettier checks
- `npm run format` - Auto-fix ESLint issues and format with Prettier

**Important**: Claude Code should NOT run development commands like `npm start`, `npm run ios`, `npm run android`, or EAS build commands. The developer manages the development build and device interactions directly. Claude Code should focus on code changes and only run lint/format commands to verify code quality.

### Other Available Commands (Developer Use Only)
- `npm start` - Start Expo development server with dev client
- `npm run tunnel` - Start dev server with tunnel (for physical devices)
- `npm run ios` - Run on iOS simulator/device
- `npm run android` - Run on Android emulator/device
- `npm run web` - Run web version
- `npm run build:dev` - Build development version using EAS
- `npm run build:preview` - Build preview version using EAS  
- `npm run build:prod` - Build production version using EAS
- `npm run prebuild` - Generate native code (expo prebuild)

## Architecture Overview

### Tech Stack
- **Framework**: React Native with Expo Router (file-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native) with custom design system
- **Navigation**: Expo Router with tab-based navigation
- **State Management**: React hooks and context (no external state management)
- **UI Components**: Custom component library in `components/nativewindui/`
- **Theming**: Light/dark mode with custom color system

### Project Structure
- `app/` - File-based routing with Expo Router
  - `(tabs)/` - Tab navigation screens
  - `_layout.tsx` - Root layout with providers
  - `modal.tsx` - Modal screen
- `components/` - Reusable components
  - `nativewindui/` - Custom UI component library with variants
- `lib/` - Utility functions and hooks
  - `cn.ts` - Class name utility (clsx + tailwind-merge)
  - `useColorScheme.tsx` - Theme management
- `theme/` - Design system colors and navigation themes
- Native platform folders: `ios/`, `android/`

### Key Patterns
- **Component Variants**: Uses `class-variance-authority` for component styling variants
- **Platform-Specific Styling**: iOS/Android conditional styles using NativeWind
- **Theme Management**: Automatic light/dark mode with manual toggle
- **Path Aliases**: Uses `~/` for root imports (configured in tsconfig.json)
- **Type Safety**: Strict TypeScript with Expo Router typed routes

### Configuration Files
- `eas.json` - EAS Build configuration (development, preview, production profiles)
- `app.json` - Expo configuration with router experiments enabled
- `tailwind.config.js` - NativeWind configuration with custom color system
- `eslint.config.js` - ESLint with Expo preset and custom rules

### Development Notes
- Uses Expo development client (not Expo Go)
- NativeWind provides Tailwind CSS classes for React Native
- Custom UI components follow shadcn/ui patterns adapted for React Native
- Theme colors are defined as CSS variables with platform-specific handling
- Tab navigation uses custom icons via `@roninoss/icons`

### Package Management Guidelines
- **Work with existing packages**: Always try to use packages already installed in the project
- **Avoid new dependencies**: Installing new packages requires rebuilding the development client via EAS, which should be avoided
- **Last resort only**: Only suggest new package installations if absolutely necessary and no existing solution is available
- **Check package.json first**: Always review existing dependencies before suggesting alternatives