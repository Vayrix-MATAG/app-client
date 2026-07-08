import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  completeOnboarding,
  completeRegistration,
  createRideFromOrder,
  loadState,
  loginUser,
  logout,
  saveState,
  setPendingRegistration,
} from "@/lib/app-store";
import type {
  AppState,
  PendingRegistration,
  Ride,
  RideOrder,
  User,
  VehicleType,
} from "@/lib/types";

interface AppContextValue extends AppState {
  isAuthenticated: boolean;
  login: (emailOrPhone: string, password: string) => void;
  startRegistration: (data: PendingRegistration) => void;
  verifyOtp: () => void;
  finishOnboarding: (data: Partial<User>) => void;
  signOut: () => void;
  toggleSecurityMode: (enabled: boolean) => void;
  setPendingOrder: (order: Partial<RideOrder> | null) => void;
  updatePendingOrder: (patch: Partial<RideOrder>) => void;
  startRideSearch: (order: RideOrder) => void;
  updateCurrentRide: (patch: Partial<Ride>) => void;
  completeRide: (data: { paymentMethod: string; rating: number; comment?: string; tip?: number }) => void;
  updateUser: (patch: Partial<User>) => void;
  addToHistory: (ride: Ride) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(createEmptyState);

  function createEmptyState(): AppState {
    return loadState();
  }

  useEffect(() => {
    saveState(state);
  }, [state]);

  const persist = useCallback((updater: (s: AppState) => AppState) => {
    setState((s) => updater(s));
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      isAuthenticated: !!state.token && !!state.user,

      login: (emailOrPhone, password) => {
        persist((s) => loginUser(emailOrPhone, password, s));
      },

      startRegistration: (data) => {
        persist((s) => setPendingRegistration(s, data));
      },

      verifyOtp: () => {
        persist((s) => completeRegistration(s));
      },

      finishOnboarding: (data) => {
        persist((s) => completeOnboarding(s, data));
      },

      signOut: () => {
        persist((s) => logout(s));
      },

      toggleSecurityMode: (enabled) => {
        persist((s) => ({ ...s, securityModeEnabled: enabled }));
      },

      setPendingOrder: (order) => {
        persist((s) => ({ ...s, pendingOrder: order }));
      },

      updatePendingOrder: (patch) => {
        persist((s) => ({
          ...s,
          pendingOrder: { ...s.pendingOrder, ...patch },
        }));
      },

      startRideSearch: (order) => {
        persist((s) => ({
          ...s,
          currentRide: createRideFromOrder(order, s.securityModeEnabled),
          pendingOrder: null,
        }));
      },

      updateCurrentRide: (patch) => {
        persist((s) => {
          if (!s.currentRide) return s;
          return { ...s, currentRide: { ...s.currentRide, ...patch } };
        });
      },

      completeRide: ({ paymentMethod, rating, comment, tip }) => {
        persist((s) => {
          if (!s.currentRide) return s;
          const completed: Ride = {
            ...s.currentRide,
            status: "completed",
            paymentMethod,
            rating,
            comment,
            tip,
            endedAt: new Date().toISOString(),
            securityRecording: false,
          };
          return {
            ...s,
            currentRide: null,
            rideHistory: [completed, ...s.rideHistory],
          };
        });
      },

      updateUser: (patch) => {
        persist((s) => {
          if (!s.user) return s;
          return { ...s, user: { ...s.user, ...patch } };
        });
      },

      addToHistory: (ride) => {
        persist((s) => ({ ...s, rideHistory: [ride, ...s.rideHistory] }));
      },
    }),
    [state, persist],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export function formatPrice(n: number) {
  return n.toLocaleString("fr-FR");
}

export function vehicleLabel(type: VehicleType) {
  return { moto: "Moto", voiture: "Voiture", premium: "Premium" }[type];
}
