export async function requestBrowserNotificationPermission() {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return { supported: false, granted: false, denied: false };
  }

  if (Notification.permission === "granted") {
    return { supported: true, granted: true, denied: false };
  }

  try {
    const permission = await Notification.requestPermission();
    return {
      supported: true,
      granted: permission === "granted",
      denied: permission === "denied",
    };
  } catch {
    return { supported: true, granted: false, denied: false };
  }
}

export async function requestMicrophonePermission() {
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
    return { supported: false, granted: false, denied: false };
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
    return { supported: true, granted: true, denied: false };
  } catch (error) {
    return { supported: true, granted: false, denied: true, error };
  }
}

export function showBrowserNotification(title: string, options?: NotificationOptions) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  new Notification(title, options);
}
