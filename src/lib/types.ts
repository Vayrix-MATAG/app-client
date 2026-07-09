export type VehicleType = "moto" | "voiture" | "premium";

export type RideStatus =
  | "searching"
  | "found"
  | "en_route"
  | "active"
  | "awaiting_payment"
  | "completed"
  | "cancelled";

export type NotificationCategory =
  | "driver"
  | "negotiation"
  | "share"
  | "payment"
  | "security"
  | "promo"
  | "message";

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  linkTo?: string;
}

export type ChatSender = "client" | "driver" | "system";

export interface ChatMessage {
  id: string;
  rideId: string;
  sender: ChatSender;
  text: string;
  createdAt: string;
  status?: "sending" | "sent" | "failed";
}

export type LoyaltyTier = "bronze" | "argent" | "or" | "platinum";

export interface LoyaltyEntry {
  id: string;
  type: "earned" | "spent";
  amount: number;
  label: string;
  date: string;
}

export interface LoyaltyState {
  points: number;
  history: LoyaltyEntry[];
}

export type NegotiationStatus =
  | "pending"
  | "accepted"
  | "counter"
  | "refused"
  | "timeout";

export interface NegotiationOffer {
  price: number;
  by: "client" | "driver";
  status: NegotiationStatus;
  createdAt: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
}

export type PaymentMethodType = "cash" | "mtn" | "orange";

export interface SavedPaymentMethod {
  id: string;
  type: PaymentMethodType;
  label: string;
  number?: string;
  default?: boolean;
}

export interface NotificationPrefs {
  driver: boolean;
  negotiation: boolean;
  share: boolean;
  payment: boolean;
  security: boolean;
  promo: boolean;
  message: boolean;
}

export type AppLanguage = "fr" | "en";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  photo?: string;
  gender?: "M" | "F" | "autre";
  emergencyContact?: { name: string; phone: string };
  emergencyContacts?: EmergencyContact[];
  homeAddress?: string;
  workAddress?: string;
  onboardingComplete: boolean;
}

export interface RideOrder {
  departure: string;
  destination: string;
  distance: number;
  duration: number;
  estimatedPrice: number;
  proposedPrice?: number;
  vehicleType: VehicleType;
  shared: boolean;
  sharedSavings?: number;
  extraTime?: number;
}

export interface Driver {
  name: string;
  initials: string;
  rating: number;
  trips: number;
  phone: string;
  vehicle: string;
  plate: string;
  eta: number;
}

export interface Ride {
  id: string;
  order: RideOrder;
  driver: Driver;
  status: RideStatus;
  securityRecording: boolean;
  startedAt?: string;
  endedAt?: string;
  paymentMethod?: string;
  rating?: number;
  comment?: string;
  tip?: number;
  dangerDetected?: boolean;
  dangerScore?: number;
  sosTriggered?: boolean;
}

export interface PendingRegistration {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  password: string;
}

export interface AppState {
  token: string | null;
  user: User | null;
  securityModeEnabled: boolean;
  currentRide: Ride | null;
  rideHistory: Ride[];
  pendingRegistration: PendingRegistration | null;
  pendingOrder: Partial<RideOrder> | null;
  notifications: AppNotification[];
  messages: ChatMessage[];
  loyalty: LoyaltyState;
  paymentMethods: SavedPaymentMethod[];
  notificationPrefs: NotificationPrefs;
  language: AppLanguage;
  negotiation: NegotiationOffer | null;
}
