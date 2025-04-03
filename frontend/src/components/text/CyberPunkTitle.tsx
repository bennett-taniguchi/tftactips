export default function CyberPunkTitle({ text }: any) {
  return (
    <div className="relative pt-6 px-8 pb-4 flex justify-center">
      <h1 className="font-mono text-6xl font-extrabold tracking-wider text-emerald-400 uppercase relative">
        {text}
        {/* Grid Overlay that only appears on text */}
        <div className="absolute inset-0 overflow-hidden mix-blend-multiply pointer-events-none">
          {/* Horizontal grid lines */}
          <div
            className="absolute top-0 left-0 right-0 h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(16, 185, 129, 0.3) 5px, rgba(16, 185, 129, 0.3) 6px)",
              backgroundSize: "100% 10px",
            }}
          ></div>

          {/* Vertical grid lines */}
          <div
            className="absolute top-0 left-0 right-0 h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(16, 185, 129, 0.3) 10px, rgba(16, 185, 129, 0.3) 11px)",
              backgroundSize: "20px 100%",
            }}
          ></div>
        </div>
        {/* Glitch effect overlays */}
        <div
          className="absolute inset-0 text-emerald-500 opacity-50 animate-pulse"
          style={{
            animation: "pulse 2s infinite",
            left: "2px",
            top: "2px",
          }}
        >
          {text}
        </div>
        <div
          className="absolute inset-0 text-yellow-500/40 animate-pulse"
          style={{
            animation: "pulse 3s infinite",
            animationDelay: "0.5s",
            left: "-2px",
            clipPath: "inset(1% 0 1% 0)",
          }}
        >
          {text}
        </div>
        <div
          className="absolute inset-0 text-gray-500/10"
          style={{
            animation: "bounce 5s infinite",
            animationDelay: "1s",
            left: "1px",
            top: "-1px",
            clipPath: "inset(1% 0 0 0)",
          }}
        >
          {text}
        </div>
        {/* CSS Animations for glitch effect */}
        <style>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          
          100% { transform: translate(0); }
        }
        h1 {
          animation: glitch 6s infinite;
          text-shadow: 0 0 10px rgba(16, 185, 129, 0.7);
        }
      `}</style>
      </h1>
    </div>
  );
}
