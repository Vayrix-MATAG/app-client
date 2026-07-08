import type {
  AppState,
  Driver,
  PendingRegistration,
  Ride,
  RideOrder,
  User,
  VehicleType,
} from "./types";

const STORAGE_KEY = "vayrix_app_state";

const DEFAULT_DRIVER: Driver = {
  name: "Eric T.",
  initials: "ET",
  rating: 4.8,
  trips: 1204,
  phone: "+237 6 77 12 34 56",
  vehicle: "Toyota Yaris",
  plate: "LT 782 DJ",
  eta: 3,
};

const VEHICLE_MULTIPLIERS: Record<VehicleType, number> = {
  moto: 0.65,
  voiture: 1,
  premium: 1.55,
};

export function createEmptyState(): AppState {
  return {
    token: null,
    user: null,
    securityModeEnabled: false,
    currentRide: null,
    rideHistory: getDefaultHistory(),
    pendingRegistration: null,
    pendingOrder: null,
  };
}

function getDefaultHistory(): Ride[] {
  return [
    {
      id: "hist-1",
      order: {
        departure: "Essos",
        destination: "Nsimalen Airport",
        distance: 7.8,
        duration: 18,
        estimatedPrice: 1500,
        vehicleType: "voiture",
        shared: false,
      },
      driver: DEFAULT_DRIVER,
      status: "completed",
      securityRecording: false,
      startedAt: new Date(Date.now() - 86400000).toISOString(),
      endedAt: new Date(Date.now() - 85000000).toISOString(),
      paymentMethod: "cash",
      rating: 5,
    },
    {
      id: "hist-2",
      order: {
        departure: "Bastos",
        destination: "Akwa",
        distance: 5.2,
        duration: 12,
        estimatedPrice: 900,
        vehicleType: "moto",
        shared: false,
      },
      driver: { ...DEFAULT_DRIVER, name: "Paul M.", initials: "PM" },
      status: "completed",
      securityRecording: false,
      paymentMethod: "mtn",
      rating: 4,
    },
    {
      id: "hist-3",
      order: {
        departure: "Mvog-Mbi",
        destination: "Marché Central",
        distance: 3.1,
        duration: 8,
        estimatedPrice: 650,
        vehicleType: "voiture",
        shared: false,
      },
      driver: DEFAULT_DRIVER,
      status: "cancelled",
      securityRecording: false,
    },
  ];
}

export function loadState(): AppState {
  if (typeof window === "undefined") return createEmptyState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyState();
    return { ...createEmptyState(), ...JSON.parse(raw) };
  } catch {
    return createEmptyState();
  }
}

export function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function estimateRide(
  departure: string,
  destination: string,
  vehicleType: VehicleType,
): Pick<RideOrder, "distance" | "duration" | "estimatedPrice"> {
  const seed = (departure.length + destination.length) % 5;
  const baseDistance = 4 + seed * 1.8;
  const baseDuration = Math.round(baseDistance * 2.2);
  const basePrice = Math.round(baseDistance * 380 * VEHICLE_MULTIPLIERS[vehicleType]);
  return {
    distance: Math.round(baseDistance * 10) / 10,
    duration: baseDuration,
    estimatedPrice: Math.max(500, basePrice),
  };
}

export function createRideFromOrder(order: RideOrder, securityMode: boolean): Ride {
  return {
    id: `ride-${Date.now()}`,
    order,
    driver: DEFAULT_DRIVER,
    status: "searching",
    securityRecording: false,
    ...(securityMode ? {} : {}),
  };
}

export function loginUser(emailOrPhone: string, password: string, state: AppState): AppState {
  if (!password) return state;
  const existing = state.user;
  if (existing && (existing.email === emailOrPhone || existing.phone === emailOrPhone)) {
    return { ...state, token: `token-${existing.id}` };
  }
  const user: User = {
    id: "user-demo",
    firstName: "Alex",
    lastName: "Kamga",
    phone: "+237 6 99 00 11 22",
    email: "alex@vayrix.com",
    onboardingComplete: true,
    homeAddress: "Essos, Yaoundé",
    workAddress: "Bastos, Yaoundé",
    emergencyContact: { name: "Marie K.", phone: "+237 6 88 22 33 44" },
  };
  return { ...state, token: `token-${user.id}`, user };
}

export function setPendingRegistration(
  state: AppState,
  data: PendingRegistration,
): AppState {
  return { ...state, pendingRegistration: data };
}

export function completeRegistration(state: AppState): AppState {
  const p = state.pendingRegistration;
  if (!p) return state;
  const user: User = {
    id: `user-${Date.now()}`,
    firstName: p.firstName,
    lastName: p.lastName,
    phone: p.phone,
    email: p.email,
    onboardingComplete: false,
  };
  return {
    ...state,
    token: `token-${user.id}`,
    user,
    pendingRegistration: null,
  };
}

export function completeOnboarding(
  state: AppState,
  data: Partial<User>,
): AppState {
  if (!state.user) return state;
  return {
    ...state,
    user: {
      ...state.user,
      ...data,
      onboardingComplete: true,
    },
  };
}

export function logout(state: AppState): AppState {
  return {
    ...createEmptyState(),
    rideHistory: state.rideHistory,
  };
}
