import type {
  AppNotification,
  AppState,
  ChatMessage,
  Driver,
  LoyaltyEntry,
  LoyaltyTier,
  NegotiationOffer,
  NegotiationStatus,
  PendingRegistration,
  Ride,
  RideOrder,
  SavedPaymentMethod,
  User,
  VehicleType,
} from "./types";

const STORAGE_KEY = "vayrix_app_state";
const STATE_VERSION = 3; // increment when AppState shape changes

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

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    category: "promo",
    title: "Offre week-end",
    body: "−20% sur vos courses Premium jusqu'à dimanche.",
    createdAt: new Date(Date.now() - 3600_000).toISOString(),
    read: false,
    linkTo: "/home",
  },
  {
    id: "n2",
    category: "security",
    title: "Mode Sécurité IA",
    body: "Pensez à activer le mode sécurité pour vos courses de nuit.",
    createdAt: new Date(Date.now() - 7200_000).toISOString(),
    read: false,
    linkTo: "/settings",
  },
  {
    id: "n3",
    category: "payment",
    title: "Paiement confirmé",
    body: "Votre dernière course a été payée (1 500 XAF).",
    createdAt: new Date(Date.now() - 86400_000).toISOString(),
    read: true,
    linkTo: "/history",
  },
];

const DEFAULT_PAYMENT_METHODS: SavedPaymentMethod[] = [
  { id: "pm-cash", type: "cash", label: "Cash", default: true },
  { id: "pm-mtn", type: "mtn", label: "MTN Mobile Money", number: "+237 6•• ••• 482" },
  { id: "pm-orange", type: "orange", label: "Orange Money", number: "+237 6•• ••• 113" },
];

export function createEmptyState(): AppState {
  return {
    token: null,
    user: null,
    securityModeEnabled: false,
    currentRide: null,
    rideHistory: getDefaultHistory(),
    pendingRegistration: null,
    pendingOrder: null,
    notifications: DEFAULT_NOTIFICATIONS,
    messages: [],
    loyalty: { points: 1240, history: getDefaultLoyaltyHistory() },
    paymentMethods: DEFAULT_PAYMENT_METHODS,
    notificationPrefs: {
      driver: true,
      negotiation: true,
      share: true,
      payment: true,
      security: true,
      promo: true,
      message: true,
    },
    language: "fr",
    negotiation: null,
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

function getDefaultLoyaltyHistory(): LoyaltyEntry[] {
  return [
    {
      id: "lp1",
      type: "earned",
      amount: 150,
      label: "Course Essos → Nsimalen",
      date: new Date(Date.now() - 86400_000).toISOString(),
    },
    {
      id: "lp2",
      type: "earned",
      amount: 90,
      label: "Course Bastos → Akwa",
      date: new Date(Date.now() - 2 * 86400_000).toISOString(),
    },
  ];
}

export function loadState(): AppState {
  if (typeof window === "undefined") return createEmptyState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyState();
    const parsed = JSON.parse(raw) as Partial<AppState> & { _version?: number };
    // Wipe stale state when schema version changes
    if ((parsed._version ?? 0) < STATE_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      return createEmptyState();
    }
    const base = createEmptyState();
    return {
      ...base,
      ...parsed,
      notificationPrefs: { ...base.notificationPrefs, ...parsed.notificationPrefs },
      loyalty: { ...base.loyalty, ...parsed.loyalty },
    };
  } catch {
    return createEmptyState();
  }
}

export function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, _version: STATE_VERSION }));
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
  const existing = state.user;
  const isExisting = Boolean(existing && (existing.email === emailOrPhone || existing.phone === emailOrPhone));

  if (!password) {
    if (isExisting && existing) {
      return { ...state, token: `token-${existing.id}` };
    }

    const isEmail = emailOrPhone.includes("@");
    const user: User = {
      id: `user-${Date.now()}`,
      firstName: "Alex",
      lastName: "Kamga",
      phone: isEmail ? "+237 6 99 00 11 22" : emailOrPhone,
      email: isEmail ? emailOrPhone : "alex@vayrix.com",
      onboardingComplete: true,
      homeAddress: "Essos, Yaoundé",
      workAddress: "Bastos, Yaoundé",
      emergencyContact: { name: "Marie K.", phone: "+237 6 88 22 33 44" },
      emergencyContacts: [
        { id: "ec1", name: "Marie K.", phone: "+237 6 88 22 33 44" },
      ],
    };
    return { ...state, token: `token-${user.id}`, user };
  }

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
    emergencyContacts: [
      { id: "ec1", name: "Marie K.", phone: "+237 6 88 22 33 44" },
    ],
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

export function tierForPoints(points: number): LoyaltyTier {
  if (points >= 5000) return "platinum";
  if (points >= 2500) return "or";
  if (points >= 1000) return "argent";
  return "bronze";
}

export function tierThreshold(tier: LoyaltyTier): { min: number; max: number; next: LoyaltyTier | null } {
  const table: Record<LoyaltyTier, { min: number; max: number; next: LoyaltyTier | null }> = {
    bronze: { min: 0, max: 1000, next: "argent" },
    argent: { min: 1000, max: 2500, next: "or" },
    or: { min: 2500, max: 5000, next: "platinum" },
    platinum: { min: 5000, max: 10000, next: null },
  };
  return table[tier];
}

export function pointsForRide(price: number): number {
  return Math.max(10, Math.round(price / 10));
}

export function addNotification(
  state: AppState,
  n: Omit<AppNotification, "id" | "createdAt" | "read">,
): AppState {
  const notif: AppNotification = {
    ...n,
    id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  return { ...state, notifications: [notif, ...state.notifications] };
}

export function addMessage(
  state: AppState,
  msg: Omit<ChatMessage, "id" | "createdAt">,
): AppState {
  const full: ChatMessage = {
    ...msg,
    id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  return { ...state, messages: [...state.messages, full] };
}

export function startNegotiation(state: AppState, price: number): AppState {
  const offer: NegotiationOffer = {
    price,
    by: "client",
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  return { ...state, negotiation: offer };
}

export function resolveNegotiation(
  state: AppState,
  status: NegotiationStatus,
  driverPrice?: number,
): AppState {
  if (!state.negotiation) return state;
  const updated: NegotiationOffer = {
    ...state.negotiation,
    status,
    price: driverPrice ?? state.negotiation.price,
  };
  return { ...state, negotiation: updated };
}

export function awardLoyaltyPoints(
  state: AppState,
  amount: number,
  label: string,
): AppState {
  const entry: LoyaltyEntry = {
    id: `lp-${Date.now()}`,
    type: "earned",
    amount,
    label,
    date: new Date().toISOString(),
  };
  return {
    ...state,
    loyalty: {
      points: state.loyalty.points + amount,
      history: [entry, ...state.loyalty.history],
    },
  };
}
