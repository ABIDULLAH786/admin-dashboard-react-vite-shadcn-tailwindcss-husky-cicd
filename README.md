# LongSword Admin – Project Standards

This document defines the technical standards, architectural decisions, and development conventions for the **LongSword Admin Dashboard**.

---

## Tech Stack

* **Framework:** React 19 + Vite (TypeScript + SWC)
* **Styling:** Tailwind CSS v4 (CSS-first configuration)
* **UI Components:** shadcn/ui (Zinc base with custom dark theme)
* **Routing:** React Router v7 (Data Router API with layout splitting)
* **Authentication:** Web3 / MetaMask wallet connection + React Context API
* **State & Server Sync:** TanStack Query v5 + Axios

  * Used for fetching and mutating admin data (users, analytics, system settings)
  * Provides request deduplication, caching, retry logic, and standardized loading/error states
* **Global UI State:** Zustand (persisted user preferences)
* **Quality Control:** Husky v9 + ESLint (pre-commit hooks)
* **CI/CD:** Automated pipeline for linting and build validation

---

## Color Palette (LongSword Dark Mode)

* **Background:** `#0B0E11` (Deep LongSword)
* **Card / Surface:** `#181A20` (Panel Gray)
* **Primary:** `#FCD535` (Yellow)
* **Success:** `#0ECB81` (Verification Green)
* **Destructive:** `#F6465D` (Action/Delete Red)
* **Border:** `#2B3139` (Subtle Divider)

---

## Directory Structure

### The "Triad" Architecture

Each major admin feature follows a strict separation pattern:

* **Presenter (`Component.tsx`)**
  Pure UI layer. Receives data via props. Contains Tailwind styling.
  No API calls or heavy logic.

* **Brain (`useComponentData.ts`)**
  Custom hook responsible for TanStack Query, Axios calls, and feature-level state logic.

* **Blueprint (`Component.types.ts`)**
  TypeScript interfaces and data contracts defining the shape of props and API responses.

**Golden Rule:**

* Shared across multiple features → `src/components/`
* Feature-specific → `src/pages/Feature/components/`

---

```text
src/
├── assets/                 # Global static files (logos, icons)
├── components/             # Shared UI library
│   ├── ui/                 # shadcn-generated components
│   ├── common/             # Global reusable components
│   └── layout/             # Layout-specific components
│       ├── AppSidebar.tsx
│       └── MainHeader.tsx
├── hooks/                  # Global reusable hooks
│   └── useAuth.tsx         # AuthProvider + auth context logic
├── layouts/                # Route wrappers
│   ├── RootLayout.tsx      # Theme handling (Dark/Light)
│   └── MainLayout.tsx      # Protected layout (Sidebar + Header)
├── lib/                    # Pure helper functions (formatters, utilities)
├── constants/              # Enums and configuration maps
├── services/               # API client logic
│   ├── auth.service.ts
│   ├── users.service.ts
│   └── analytics.service.ts
├── types/                  # Centralized domain models
├── routes/                 # Router configuration
│   ├── index.tsx
│   ├── public.routes.tsx
│   └── private.routes.tsx
├── pages/                  # Feature modules
│   ├── Connect/
│   ├── Dashboard/
│   ├── Users/
│   ├── Analytics/
│   └── Settings/
├── store/                  # Zustand stores
│   └── useUserPreferences.ts
├── providers/              # Global providers
│   └── ErrorBoundary.tsx
├── .env                    # Root-level environment variables
├── .env.example
├── package.json
└── tsconfig.json
```

---

## Architectural Strategies

### 1. Tiered State Management

The dashboard follows a layered state model:

* **Authentication State**
  Managed via React Context (`AuthProvider`).
  Provides global access to wallet connection and user role.

* **Server State**
  Managed by TanStack Query.
  Handles caching, background refetching, retries, and synchronization.

* **Global UI State**
  Managed by Zustand with persistence (theme, UI preferences).

* **Local Component State**
  `useState` / `useReducer` for isolated UI interactions (dropdowns, modals).

---

### 2. Authentication & Routing (Layout Splitting)

* **Public Layout (`/connect`)**
  Unauthenticated users are redirected here to authenticate via MetaMask.

* **Protected Layout (`/dashboard`, `/users`, etc.)**
  Wrapped in `MainLayout`, which injects `AppSidebar` and `MainHeader`.

* **Route Guards**
  Implemented using React Router loaders.
  Authentication state is validated before rendering protected routes to prevent unauthorized access flicker.

---

### 3. Resilience & Error Isolation

* Feature-heavy components (data tables, analytics charts) are wrapped in isolated `ErrorBoundary` components.
* A single failed API request must never crash the entire admin panel.
* API errors are surfaced through consistent UI fallback states.

---

## Key Configurations

* **Path Aliases:** `@/*` maps to `src/*` for clean imports.
* **Type Imports:** Always use `import type` when importing TypeScript interfaces (required due to `verbatimModuleSyntax`).
* **Environment Variables:** All backend URLs, RPC nodes, and sensitive configs must be defined in `.env`.
* **Husky:** Pre-commit hook runs `npm run lint` on staged files.

---

## Development Rules

1. **Co-location**
   Store feature-specific components within their respective page directory.

2. **Context Over Prop Drilling**
   Use `useAuth()` to access user data deeply instead of passing props through layouts.

3. **No Magic Strings**
   Use constants or environment variables.

4. **Strict Linting Compliance**
   No unused variables, no incorrect Fast Refresh exports, no ignored TypeScript errors.

5. **Separation of Concerns**
   UI components must not perform direct API calls. All data logic belongs in hooks or services.

