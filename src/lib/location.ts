export const DEFAULT_USER_LOCATION = {
  latitude: 3.84803,
  longitude: 11.5024,
};

export const DEFAULT_DRIVER_LOCATION = {
  latitude: 3.8568,
  longitude: 11.5076,
};

const KNOWN_LOCATIONS: Record<string, { latitude: number; longitude: number }> = {
  essos: { latitude: 3.8356, longitude: 11.5024 },
  bastos: { latitude: 3.8563, longitude: 11.5178 },
  "marché central": { latitude: 3.8574, longitude: 11.5185 },
  "centre-ville": { latitude: 3.8482, longitude: 11.5067 },
  "nsimalen": { latitude: 3.7228, longitude: 11.5534 },
  akwa: { latitude: 4.0833, longitude: 9.7118 },
};

function normalizePlaceName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[’'`,.]/g, "")
    .replace(/\s+/g, " ");
}

export function resolveLocationCoordinates(
  place?: string,
  fallback?: { latitude: number; longitude: number },
) {
  if (!place) {
    return fallback ?? null;
  }

  const trimmed = place.trim();
  const latLngMatch = trimmed.match(/(-?\d+(?:\.\d+)?)[,\s]+(-?\d+(?:\.\d+)?)/);
  if (latLngMatch) {
    return {
      latitude: Number(latLngMatch[1]),
      longitude: Number(latLngMatch[2]),
    };
  }

  const normalized = normalizePlaceName(place);
  if (KNOWN_LOCATIONS[normalized]) {
    return KNOWN_LOCATIONS[normalized];
  }

  if (fallback) {
    return {
      latitude: fallback.latitude + 0.008,
      longitude: fallback.longitude + 0.013,
    };
  }

  return null;
}
