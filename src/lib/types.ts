export type VehicleType = "moto" | "voiture" | "premium";

export type RideStatus =
  | "searching"
  | "found"
  | "en_route"
  | "active"
  | "awaiting_payment"
  | "completed"
  | "cancelled";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  photo?: string;
  gender?: "M" | "F" | "autre";
  emergencyContact?: { name: string; phone: string };
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
}
