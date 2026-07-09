import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ScreenHeader } from "@/components/FormUi";
import { useApp } from "@/contexts/AppProvider";
import type { NotificationCategory } from "@/lib/types";
import {
  Bell,
  Car,
  Tag,
  Users,
  CreditCard,
  Shield,
  Gift,
  MessageCircle,
  CheckCheck,
  Trash2,
} from "lucide-react";

export const Route = createFileRoute("/notifications")({
  component: NotificationsPage,
});

const CATEGORY_META: Record<
  NotificationCategory,
  { icon: typeof Bell; color: string; bg: string }
> = {
  driver: { icon: Car, color: "text-[#3B6BFF]", bg: "bg-[#3B6BFF]/15" },
  negotiation: { icon: Tag, color: "text-[#7B5CFF]", bg: "bg-[#7B5CFF]/15" },
  share: { icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/15" },
  payment: { icon: CreditCard, color: "text-yellow-400", bg: "bg-yellow-500/15" },
  security: { icon: Shield, color: "text-red-400", bg: "bg-red-500/15" },
  promo: { icon: Gift, color: "text-pink-400", bg: "bg-pink-500/15" },
  message: { icon: MessageCircle, color: "text-cyan-400", bg: "bg-cyan-500/15" },
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "À l'instant";
  if (min < 60) return `Il y a ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `Il y a ${h} h`;
  const d = Math.floor(h / 24);
  if (d === 1) return "Hier";
  return `Il y a ${d} j`;
}

function NotificationsPage() {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, markAllNotificationsRead, removeNotification, unreadNotifications } = useApp();

  return (
    <AppShell hideNav>
      <ScreenHeader title="Notifications" onBack={() => navigate({ to: "/home" })} />
      <div className="px-5 pb-8 space-y-4">
        {notifications.length > 0 && unreadNotifications > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#141B3D] border border-white/5 text-xs text-[#B8BED6] hover:text-white transition"
          >
            <CheckCheck className="h-3.5 w-3.5" /> Tout marquer comme lu ({unreadNotifications})
          </button>
        )}

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-16 w-16 rounded-2xl bg-[#141B3D] border border-white/5 flex items-center justify-center mb-4">
              <Bell className="h-7 w-7 text-[#B8BED6]" />
            </div>
            <p className="text-sm font-medium">Aucune notification</p>
            <p className="text-xs text-[#B8BED6] mt-1">Vos alertes apparaîtront ici.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => {
              const meta = CATEGORY_META[n.category];
              const Icon = meta.icon;
              return (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border transition ${
                    n.read
                      ? "bg-[#141B3D] border-white/5"
                      : "bg-[#1a2348] border-[#7B5CFF]/30"
                  }`}
                >
                  <button
                    onClick={() => {
                      markNotificationRead(n.id);
                      if (n.linkTo) navigate({ to: n.linkTo });
                    }}
                    className="flex items-start gap-3 flex-1 text-left"
                  >
                    <div className={`h-10 w-10 rounded-xl ${meta.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`h-4 w-4 ${meta.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold truncate">{n.title}</p>
                        {!n.read && <span className="h-2 w-2 rounded-full bg-[#7B5CFF] shrink-0" />}
                      </div>
                      <p className="text-xs text-[#B8BED6] line-clamp-2">{n.body}</p>
                      <p className="text-[10px] text-[#B8BED6]/70 mt-1">{timeAgo(n.createdAt)}</p>
                    </div>
                  </button>
                  <button
                    onClick={() => removeNotification(n.id)}
                    className="h-8 w-8 rounded-lg flex items-center justify-center text-[#B8BED6] hover:text-red-300 hover:bg-red-500/10 transition shrink-0"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
