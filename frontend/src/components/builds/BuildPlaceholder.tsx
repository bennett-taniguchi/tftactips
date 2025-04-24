import { useEffect } from "react";

interface BuildPlaceholderProps {
  type: "loading" | "empty";
}

export default function BuildPlaceholder({ type }: BuildPlaceholderProps) {
  // Animation for the pulsing effect
  useEffect(() => {
    if (type !== "loading") return;
    
    // Simple pulse animation using CSS classes
    const element = document.getElementById("build-placeholder-pulse");
    if (!element) return;
    
    const animatePulse = () => {
      element.classList.add("pulse-animate");
      setTimeout(() => {
        element.classList.remove("pulse-animate");
        setTimeout(animatePulse, 300);  // Delay before starting the next pulse
      }, 1500);  // Duration of the pulse animation
    };
    
    animatePulse();
    
    return () => {
      if (element) {
        element.classList.remove("pulse-animate");
      }
    };
  }, [type]);
  
  const message = type === "loading" ? "Fetching builds" : "No builds found";

  return (
    <div>
      <div
        className="rounded-4xl border border-white text-black mt-[-1svh] h-[120px] w-[80svw] relative overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          background: "rgba(210, 0, 255, 0.5)",
          boxShadow: `
            0 8px 32px 0 rgba(0, 0, 0, 0.6), 
            0 0 0 1px rgba(255, 100, 0, 0.3),
            0 -1px 0 0 rgba(255, 255, 255, 0.3),
            0 1px 0 0 rgba(0, 0, 0, 0.6),
            inset 0 0 15px rgba(0, 0, 0, 0.6),
            inset 0 1px 5px rgba(255, 255, 255, 0.15)
          `,
          backdropFilter: "blur(4px)",
          transformOrigin: "center center",
        }}
      >
        {/* First animated conic gradient background layer - clockwise rotation */}
        <div
          className="absolute z-0 transition-all duration-300"
          style={{
            top: "-100%",
            left: "-100%",
            right: "-100%",
            bottom: "-100%",
            background: type === "loading" ? 
              `conic-gradient(
                from 0deg at 50% 50%,
                rgba(96, 165, 250, 0.8) 0deg,
                rgba(192, 132, 252, 0.8) 72deg,
                rgba(244, 114, 182, 0.8) 144deg,
                rgba(56, 189, 248, 0.8) 216deg,
                rgba(129, 140, 248, 0.8) 288deg,
                rgba(96, 165, 250, 0.8) 360deg
              )` :
              `conic-gradient(
                from 0deg at 50% 50%,
                rgba(96, 165, 250, 0.8) 0deg,
                rgba(192, 132, 252, 0.8) 72deg,
                rgba(244, 114, 182, 0.8) 144deg,
                rgba(56, 189, 248, 0.8) 216deg,
                rgba(129, 140, 248, 0.8) 288deg,
                rgba(96, 165, 250, 0.8) 360deg
              )`,
            opacity: 0.7,
            animation: type === "loading" ? "rotate 12s linear infinite" : "none"
          }}
        />
        
        {/* Second animated conic gradient layer - counter-clockwise rotation with offset */}
        {type === "loading" && (
          <div
            className="absolute z-1 transition-all duration-300"
            style={{
              top: "-100%",
              left: "-100%",
              right: "-100%",
              bottom: "-100%",
              background: `conic-gradient(
                from 180deg at 50% 50%,
                rgba(56, 189, 248, 0.5) 0deg,
                rgba(129, 140, 248, 0.5) 72deg,
                rgba(96, 165, 250, 0.5) 144deg,
                rgba(244, 114, 182, 0.5) 216deg,
                rgba(192, 132, 252, 0.5) 288deg,
                rgba(56, 189, 248, 0.5) 360deg
              )`,
              opacity: 0.6,
              animation: "rotate-reverse 8s linear infinite"
            }}
          />
        )}
        
        {/* Third animated conic gradient layer - clockwise rotation at different speed and angle */}
        {type === "loading" && (
          <div
            className="absolute z-2 transition-all duration-300"
            style={{
              top: "-100%",
              left: "-100%",
              right: "-100%",
              bottom: "-100%",
              background: `conic-gradient(
                from 90deg at 50% 50%,
                rgba(232, 121, 249, 0.4) 0deg, 
                rgba(79, 70, 229, 0.4) 90deg,
                rgba(99, 102, 241, 0.4) 180deg,
                rgba(236, 72, 153, 0.4) 270deg,
                rgba(232, 121, 249, 0.4) 360deg
              )`,
              opacity: 0.5,
              animation: "rotate 16s linear infinite"
            }}
          />
        )}
        
        {/* Overlay to soften the gradient */}
        <div
          className="absolute inset-0 z-3 opacity-40"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(1px)"
          }}
        />

        {/* Content container */}
        <div
          className="rounded-4xl inset-0 flex justify-center z-10 absolute m-1 transition-all duration-300"
        >
          {/* Message with pulsing effect for loading state */}
          <div
            id="build-placeholder-pulse"
            className={`font-bold text-3xl text-white/50 m-auto text-center transition-all duration-300 ${
              type === "loading" ? "opacity-100" : "opacity-90"
            }`}
            style={{
              position: "relative",
              zIndex: 2,
              transform: "translateZ(2px)",
              background: "linear-gradient(90deg, #38bdf8, #8b5cf6, #ec4899, #38bdf8)",
              backgroundSize: "300% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              animation: "gradient-text 4s ease infinite"
            }}
          >
            {message}
            {type === "loading" && (
              <span className="inline-block ml-1">
                <span className="animate-pulse">.</span>
                <span className="animate-pulse" style={{ animationDelay: "300ms" }}>.</span>
                <span className="animate-pulse" style={{ animationDelay: "600ms" }}>.</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Add CSS for the animations */}
      <style>{`
        @keyframes pulse {
          0% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.03);
          }
          100% {
            opacity: 0.8;
            transform: scale(1);
          }
        }
        
        .pulse-animate {
          animation: pulse 1.5s ease-in-out;
        }
        
        .animate-pulse {
          animation: dot-pulse 1.5s infinite ease-in-out;
        }
        
        @keyframes dot-pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes rotate-reverse {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
        
        @keyframes gradient-text {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}