// export function VayrixLogo({ size = 88 }: { size?: number }) {
//   return (
//     <div
//       className="relative flex items-center justify-center overflow-visible"
//       style={{ width: size, height: size }}
//     >
//       <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-[#3B6BFF]/30 via-[#7B5CFF]/15 to-[#0A0E27]/30 blur-2xl opacity-80" />
//       <div className="absolute inset-0 rounded-[36px] border border-white/10 shadow-[0_0_80px_rgba(123,92,255,0.18)]" />
//       <div
//         className="relative rounded-[36px] bg-gradient-to-br from-[#3B6BFF] to-[#7B5CFF] flex items-center justify-center shadow-[0_28px_70px_-24px_rgba(59,107,255,0.65)] animate-logo-pop"
//         style={{ width: size, height: size }}
//       >
//         <svg viewBox="0 0 120 120" width={size * 0.7} height={size * 0.7}>
//           <defs>
//             <linearGradient id="vayrix-gradient" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="0%" stopColor="#8DC1FF" />
//               <stop offset="50%" stopColor="#60A8FF" />
//               <stop offset="100%" stopColor="#5E47FF" />
//             </linearGradient>
//           </defs>
//           <path
//             d="M20 20 L40 20 L60 50 L80 20 L100 20 L70 60 L100 100 L80 100 L60 70 L40 100 L20 100 L50 60 Z"
//             fill="url(#vayrix-gradient)"
//             filter="drop-shadow(0 20px 40px rgba(59,107,255,0.35))"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// }


import { useMemo } from "react";
import logoImg from "@/assets/vayrix-logo.png";

export function VayrixLogo({ size = 180 }: { size?: number }) {
  const particles = useMemo(() => {
    const N = 16;
    return Array.from({ length: N }, (_, i) => {
      const angle = (i / N) * Math.PI * 2 + Math.random() * 0.3;
      const dist = 80 + Math.random() * 70;
      return {
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist,
        delay: 0.1 + Math.random() * 0.15,
      };
    });
  }, []);

  return (
    <div className="relative flex items-center justify-center overflow-visible" style={{ width: size, height: size }}>
      {/* étincelle initiale */}
      <div
        className="absolute w-[10px] h-[10px] rounded-full bg-white animate-spark z-[5]"
        style={{ boxShadow: "0 0 20px 6px rgba(139,168,255,0.9)" }}
      />

      {/* rayons de l'éclat */}
      <div className="absolute w-[220%] h-[220%] animate-rays z-[4]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 w-[2px] h-[45%] origin-bottom"
            style={{
              background: "linear-gradient(to top, rgba(123,92,255,0), rgba(139,178,255,0.9))",
              transform: `translate(-50%,-100%) rotate(${i * 45}deg)`,
            }}
          />
        ))}
      </div>

      {/* particules */}
      <div className="absolute inset-0 z-[4]">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 w-[5px] h-[5px] rounded-full bg-[#8DC1FF] animate-particle"
            style={{ "--tx": `${p.tx}px`, "--ty": `${p.ty}px`, animationDelay: `${p.delay}s` } as React.CSSProperties}
          />
        ))}
      </div>

      {/* le logo lui-même = ton image */}
      <img
        src={logoImg}
        alt="Vayrix"
        className="relative z-[3] animate-logo-pop rounded-[36px]"
        style={{ width: size, height: size }}
      />
    </div>
  );
}