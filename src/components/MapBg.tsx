export function MapBg({
  withCar = false,
  showGps = false,
  gpsLabel = "Votre position",
  origin,
  destination,
  destinationQuery,
}: {
  withCar?: boolean;
  showGps?: boolean;
  gpsLabel?: string;
  origin?: { latitude: number; longitude: number };
  destination?: { latitude: number; longitude: number };
  destinationQuery?: string;
}) {
  const defaultOrigin = origin ?? { latitude: 3.84803, longitude: 11.5024 };
  const routeUrl = destinationQuery
    ? `https://www.google.com/maps/dir/${defaultOrigin.latitude},${defaultOrigin.longitude}/${encodeURIComponent(destinationQuery)}/?output=embed`
    : destination
    ? `https://www.google.com/maps/dir/${defaultOrigin.latitude},${defaultOrigin.longitude}/${destination.latitude},${destination.longitude}/?output=embed`
    : `https://www.google.com/maps?q=${defaultOrigin.latitude},${defaultOrigin.longitude}&z=15&output=embed`;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0A0E27]">
      <iframe
        title="Carte Vayrix"
        src={routeUrl}
        className="absolute inset-0 w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      {showGps && (
        <div className="absolute bottom-32 left-4 px-3 py-1.5 rounded-full bg-[#141B3D]/90 backdrop-blur border border-white/10 text-[10px] text-[#B8BED6] z-10 pointer-events-auto">
          📍 {gpsLabel}
        </div>
      )}
      {withCar && (
        <div className="absolute top-4 right-4 rounded-2xl bg-white/10 border border-white/10 px-3 py-2 text-[11px] text-white shadow-lg backdrop-blur z-10 pointer-events-auto">
          🚗 Trajet en cours
        </div>
      )}
    </div>
  );
}
