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
  addMessage,
  addNotification,
  awardLoyaltyPoints,
  completeOnboarding,
  completeRegistration,
  createRideFromOrder,
  loadState,
  loginUser,
  logout,
  pointsForRide,
  resolveNegotiation,
  saveState,
  setPendingRegistration,
  startNegotiation,
} from "@/lib/app-store";
import type {
  AppLanguage,
  AppNotification,
  AppState,
  ChatMessage,
  EmergencyContact,
  LoyaltyTier,
  NegotiationStatus,
  NotificationPrefs,
  PendingRegistration,
  Ride,
  RideOrder,
  SavedPaymentMethod,
  User,
  VehicleType,
} from "@/lib/types";

interface AppContextValue extends AppState {
  isAuthenticated: boolean;
  unreadNotifications: number;
  loyaltyTier: LoyaltyTier;
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
  cancelCurrentRide: (reason: string) => void;
  updateUser: (patch: Partial<User>) => void;
  addToHistory: (ride: Ride) => void;
  pushNotification: (n: Omit<AppNotification, "id" | "createdAt" | "read">) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  removeNotification: (id: string) => void;
  sendMessage: (rideId: string, text: string) => void;
  beginNegotiation: (price: number) => void;
  setNegotiationStatus: (status: NegotiationStatus, driverPrice?: number) => void;
  clearNegotiation: () => void;
  addEmergencyContact: (c: Omit<EmergencyContact, "id">) => void;
  removeEmergencyContact: (id: string) => void;
  addPaymentMethod: (m: Omit<SavedPaymentMethod, "id">) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
  setNotificationPrefs: (patch: Partial<NotificationPrefs>) => void;
  setLanguage: (lang: AppLanguage) => void;
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
    () => {
      const unreadNotifications = state.notifications.filter((n) => !n.read).length;
      const loyaltyTier: LoyaltyTier =
        state.loyalty.points >= 5000
          ? "platinum"
          : state.loyalty.points >= 2500
            ? "or"
            : state.loyalty.points >= 1000
              ? "argent"
              : "bronze";

      return {
        ...state,
        isAuthenticated: !!state.token && !!state.user,
        unreadNotifications,
        loyaltyTier,

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
            const price = s.currentRide.order.proposedPrice || s.currentRide.order.estimatedPrice;
            const earned = pointsForRide(price + (tip ?? 0));
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
            const withPoints = awardLoyaltyPoints(s, earned, `Course ${completed.order.departure} → ${completed.order.destination}`);
            return {
              ...withPoints,
              currentRide: null,
              rideHistory: [completed, ...s.rideHistory],
            };
          });
        },

        cancelCurrentRide: (reason) => {
          persist((s) => {
            if (!s.currentRide) return s;
            const cancelled: Ride = {
              ...s.currentRide,
              status: "cancelled",
              endedAt: new Date().toISOString(),
              comment: reason,
            };
            return {
              ...s,
              currentRide: null,
              rideHistory: [cancelled, ...s.rideHistory],
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

        pushNotification: (n) => {
          persist((s) => addNotification(s, n));
        },

        markNotificationRead: (id) => {
          persist((s) => ({
            ...s,
            notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
          }));
        },

        markAllNotificationsRead: () => {
          persist((s) => ({
            ...s,
            notifications: s.notifications.map((n) => ({ ...n, read: true })),
          }));
        },

        removeNotification: (id) => {
          persist((s) => ({
            ...s,
            notifications: s.notifications.filter((n) => n.id !== id),
          }));
        },

        sendMessage: (rideId, text) => {
          persist((s) =>
            addMessage(s, { rideId, sender: "client", text, status: "sent" }),
          );
        },

        beginNegotiation: (price) => {
          persist((s) => startNegotiation(s, price));
        },

        setNegotiationStatus: (status, driverPrice) => {
          persist((s) => resolveNegotiation(s, status, driverPrice));
        },

        clearNegotiation: () => {
          persist((s) => ({ ...s, negotiation: null }));
        },

        addEmergencyContact: (c) => {
          persist((s) => {
            if (!s.user) return s;
            const contact: EmergencyContact = { ...c, id: `ec-${Date.now()}` };
            const contacts = [...(s.user.emergencyContacts || []), contact];
            return {
              ...s,
              user: {
                ...s.user,
                emergencyContacts: contacts,
                emergencyContact: contacts[0]
                  ? { name: contacts[0].name, phone: contacts[0].phone }
                  : s.user.emergencyContact,
              },
            };
          });
        },

        removeEmergencyContact: (id) => {
          persist((s) => {
            if (!s.user) return s;
            const contacts = (s.user.emergencyContacts || []).filter((c) => c.id !== id);
            return {
              ...s,
              user: {
                ...s.user,
                emergencyContacts: contacts,
                emergencyContact: contacts[0]
                  ? { name: contacts[0].name, phone: contacts[0].phone }
                  : undefined,
              },
            };
          });
        },

        addPaymentMethod: (m) => {
          persist((s) => {
            const method: SavedPaymentMethod = { ...m, id: `pm-${Date.now()}` };
            const methods = m.default
              ? [method, ...s.paymentMethods.map((p) => ({ ...p, default: false }))]
              : [...s.paymentMethods, method];
            return { ...s, paymentMethods: methods };
          });
        },

        removePaymentMethod: (id) => {
          persist((s) => ({
            ...s,
            paymentMethods: s.paymentMethods.filter((p) => p.id !== id),
          }));
        },

        setDefaultPaymentMethod: (id) => {
          persist((s) => ({
            ...s,
            paymentMethods: s.paymentMethods.map((p) => ({ ...p, default: p.id === id })),
          }));
        },

        setNotificationPrefs: (patch) => {
          persist((s) => ({
            ...s,
            notificationPrefs: { ...s.notificationPrefs, ...patch },
          }));
        },

        setLanguage: (lang) => {
          persist((s) => ({ ...s, language: lang }));
        },
      };
    },
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
