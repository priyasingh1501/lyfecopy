# Lyfe Mobile App

React Native mobile client for the Lyfe lifestyle management platform.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android)

### Installation

1. **Install dependencies:**
   ```bash
   cd mobile
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   # or
   expo start
   ```

3. **Run on device/simulator:**
   - **iOS:** Press `i` in terminal or `npm run ios`
   - **Android:** Press `a` in terminal or `npm run android`
   - **Web:** Press `w` in terminal or `npm run web`

## 📱 Technology Stack

### Core Technologies
- **React Native 0.74** - Mobile framework
- **Expo SDK 51** - Development platform and tools
- **TypeScript** - Type safety and developer experience
- **React Navigation 6** - Navigation management

### State Management & Data
- **React Query (TanStack Query)** - Server state management and caching
- **Zustand** - Lightweight global state management
- **Expo SecureStore** - Secure token storage

### Development Tools
- **Jest + React Native Testing Library** - Unit testing
- **TypeScript** - Static type checking
- **Expo CLI** - Development and build tooling

## 🏗️ Architecture

### Directory Structure
```
src/
├── index.tsx              # App entry point
├── App.tsx                # Root component with providers
├── navigation/            # Navigation configuration
│   ├── RootNavigator.tsx  # Main tab navigator
│   └── stacks/           # Stack navigators
├── features/             # Feature-based modules
│   ├── auth/             # Authentication
│   ├── tasks/            # Task management
│   ├── dashboard/        # Dashboard screen
│   ├── health/           # Health tracking
│   └── settings/         # App settings
├── api/                  # API layer
│   ├── config.ts         # API configuration
│   ├── auth.ts           # Auth endpoints
│   └── tasks.ts          # Task endpoints
├── stores/               # Global state stores
├── utils/                # Utility functions
└── tests/                # Test files
```

### Key Design Patterns
- **Feature-based organization** - Related files grouped by feature
- **API-first architecture** - Consumes same REST API as web client
- **Separation of concerns** - Clear boundaries between UI, business logic, and data
- **TypeScript everywhere** - Full type safety across the application

## 🔐 Authentication

The mobile app uses JWT-based authentication with automatic token refresh:

1. **Login/Register** - User credentials exchanged for JWT tokens
2. **Secure Storage** - Tokens stored using Expo SecureStore
3. **Auto-refresh** - Tokens refreshed automatically before expiration
4. **API Integration** - Tokens attached to all authenticated requests

## 📊 State Management

### Server State (React Query)
- API data fetching and caching
- Optimistic updates for mutations
- Background refetching and synchronization
- Error handling and retry logic

### Client State (Zustand)
- UI preferences (dark mode, etc.)
- Navigation state
- Form state (complex forms only)

## 🎨 Styling Approach

Currently using basic React Native StyleSheet with:
- **Minimal styling placeholders** - Basic layout and typography
- **Responsive design** - Adapts to different screen sizes
- **Accessibility** - Screen reader and keyboard navigation support

**Future Enhancement:** Design system extraction from web Tailwind config

## 🧪 Testing Strategy

### Current Testing
- **Smoke tests** - Basic component rendering
- **Unit tests** - Business logic and utilities
- **API integration tests** - Mock API responses

### Planned Testing
- **E2E tests** - Critical user flows
- **Accessibility tests** - Screen reader compatibility
- **Performance tests** - App startup and navigation

## 📶 Offline Strategy

### Current Implementation
- **Online-first** - Requires internet connection
- **Cached data** - React Query caches API responses
- **Error handling** - Graceful degradation for network errors

### Planned Offline Features
- **Local database** - SQLite for offline data storage
- **Sync on reconnect** - Queue mutations for when online
- **Offline indicators** - Clear UI for connection status

## 🔮 Roadmap

### Phase 1: Foundation (Current)
- [x] Basic scaffold and navigation
- [x] Authentication flow (placeholders)
- [x] Core screens structure
- [ ] API integration testing

### Phase 2: Core Features  
- [ ] Task CRUD operations
- [ ] Dashboard with real data
- [ ] Settings management
- [ ] User profile management

### Phase 3: Health Features
- [ ] Workout logging forms
- [ ] Meal tracking UI
- [ ] Health metrics visualization
- [ ] Progress tracking

### Phase 4: Advanced Features
- [ ] Offline data sync
- [ ] Push notifications
- [ ] Background sync
- [ ] Focus session timer

### Phase 5: Polish & Performance
- [ ] Design system implementation
- [ ] Advanced animations
- [ ] Performance optimization
- [ ] App store deployment

## 🛠️ Development Commands

```bash
# Development
npm start                 # Start Expo dev server
npm run ios              # Run on iOS simulator  
npm run android          # Run on Android emulator
npm run web              # Run on web browser

# Testing
npm test                 # Run unit tests
npm run test:watch       # Watch mode for tests

# Building (future)
npx expo build:ios       # Build for iOS App Store
npx expo build:android   # Build for Google Play Store
```

## 🤝 Contributing

1. **Feature branches** - Create feature branches from main
2. **TypeScript** - All new code must be TypeScript
3. **Testing** - Add tests for new functionality
4. **Code review** - All changes require review

## 🔗 Related Documentation

- [Architecture Decision Record - Mobile Stack](../docs/adr/0001-mobile-stack.md)
- [Web Client Documentation](../client/README.md)
- [API Documentation](../server/README.md)

## 📞 Support

For development questions:
- Check existing GitHub issues
- Review code comments and documentation
- Consult team members for architecture decisions