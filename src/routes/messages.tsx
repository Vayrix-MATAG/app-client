import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { useApp } from "@/contexts/AppProvider";
import { toast } from "sonner";
import { ArrowLeft, Phone, Send, Star, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/messages")({
  component: MessagesPage,
});

function MessagesPage() {
  const navigate = useNavigate();
  const { currentRide, messages, sendMessage } = useApp();
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const driver = currentRide?.driver;
  const rideId = currentRide?.id || "demo";
  const thread = messages.filter((m) => m.rideId === rideId);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [thread.length, typing]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    if (trimmed.length > 1000) {
      toast.error("Message trop long (max 1000 caractères)");
      return;
    }
    sendMessage(rideId, trimmed);
    setText("");
    setTyping(true);
    setTimeout(() => setTyping(false), 1800);
  }

  if (!driver) {
    return (
      <PhoneFrame>
        <div className="flex flex-col h-full min-h-0">
          <div className="px-5 py-4 flex items-center gap-3">
            <button
              onClick={() => navigate({ to: "/home" })}
              className="h-10 w-10 rounded-full bg-[#141B3D] border border-white/10 flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 text-white" />
            </button>
            <h1 className="text-lg font-semibold">Messagerie</h1>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <MessageCircle className="h-10 w-10 text-[#B8BED6] mb-3" />
            <p className="text-sm text-[#B8BED6]">Aucune course active pour démarrer une conversation.</p>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full min-h-0">
        <div className="px-4 py-3 flex items-center gap-3 border-b border-white/5 bg-[#141B3D]">
          <button
            onClick={() => window.history.back()}
            className="h-10 w-10 rounded-full bg-[#0A0E27] border border-white/10 flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 text-white" />
          </button>
          <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold">
            {driver.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{driver.name}</p>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> En ligne
            </p>
          </div>
          <a
            href={`tel:${driver.phone.replace(/\s/g, "")}`}
            className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow"
          >
            <Phone className="h-4 w-4 text-white" />
          </a>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {thread.length === 0 && !typing && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-sm text-[#B8BED6]">Dites bonjour à votre chauffeur 👋</p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {["Bonjour !", "J'arrive dans 2 min", "Où êtes-vous ?"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setText(s)}
                    className="px-3 py-1.5 rounded-full bg-[#141B3D] border border-white/10 text-xs text-white hover:border-[#7B5CFF]/60 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {thread.map((m) =>
            m.sender === "system" ? (
              <div key={m.id} className="text-center">
                <span className="inline-block text-[10px] px-3 py-1 rounded-full bg-[#141B3D] border border-white/5 text-[#B8BED6]">
                  {m.text}
                </span>
              </div>
            ) : (
              <div
                key={m.id}
                className={`flex ${m.sender === "client" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm animate-float-up ${
                    m.sender === "client"
                      ? "bg-gradient-primary text-white rounded-br-md"
                      : "bg-[#141B3D] border border-white/5 text-white rounded-bl-md"
                  }`}
                >
                  <p className="break-words">{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.sender === "client" ? "text-white/70" : "text-[#B8BED6]"}`}>
                    {new Date(m.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ),
          )}

          {typing && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-[#141B3D] border border-white/5 flex gap-1">
                <span className="h-2 w-2 rounded-full bg-[#B8BED6] animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-[#B8BED6] animate-bounce [animation-delay:120ms]" />
                <span className="h-2 w-2 rounded-full bg-[#B8BED6] animate-bounce [animation-delay:240ms]" />
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="px-4 py-3 border-t border-white/5 bg-[#141B3D] flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Écrivez un message…"
            maxLength={1000}
            className="flex-1 h-11 px-4 rounded-xl bg-[#0A0E27] border border-white/10 outline-none text-sm focus:border-[#7B5CFF]/60 transition"
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="h-11 w-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow disabled:opacity-50 transition active:scale-95"
          >
            <Send className="h-4 w-4 text-white" />
          </button>
        </form>
      </div>
    </PhoneFrame>
  );
}
