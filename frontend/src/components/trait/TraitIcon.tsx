import { cn } from "@/lib/utils";
import  { useState, useEffect } from "react";

interface TraitIconProps {
  src?: string;
  alt?: string;
  num?: number;
  size?: number;
  bgColor?: string;
  borderColor?: string;
  borderWidth?: number;
  isPrismatic?: boolean;
  className?: string;
}

const TraitIcon = ({
  src,
  alt,
  num = -1,
  size = 80,
  bgColor = "#4B5563",
  borderColor = "white",
  borderWidth = 2,
  isPrismatic = false,
  className,
}: TraitIconProps) => {
  const hexagonClipPath =
    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
  const [rotation, setRotation] = useState(0);

  // Animation effect for prismatic border
  useEffect(() => {
    if (!isPrismatic) return;

    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [isPrismatic]);

  // Prismatic gradient style
  const prismaticStyle = {
    background: `conic-gradient(from ${rotation}deg at 50% 50%, 
      rgb(181, 249, 177) -25.61deg, 
      rgb(174, 167, 248) 0.63deg, 
      rgb(185, 232, 188) 27.2deg,
      rgb(246, 254, 216) 56.21deg, 
      rgb(199, 251, 247) 83.01deg, 
      rgb(154, 240, 254) 109.35deg, 
      rgb(245, 236, 255) 129.56deg, 
      rgb(248, 153, 248) 154.85deg, 
      rgb(182, 252, 227) 181.24deg, 
      rgb(126, 147, 242) 210.86deg, 
      rgb(225, 164, 253) 244.3deg, 
      rgb(175, 230, 240) 264.6deg, 
      rgb(243, 241, 199) 287.41deg, 
      rgb(233, 159, 126) 306.52deg, 
      rgb(181, 249, 177) 334.39deg, 
      rgb(174, 167, 248) 360.63deg)`,
  };

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
    >
      {/* Border hexagon (slightly larger, positioned underneath) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          clipPath: hexagonClipPath,
          ...(isPrismatic ? prismaticStyle : { backgroundColor: borderColor }),
          transform: `scale(${1 + borderWidth / size})`,
          zIndex: 1,
        }}
      />

      {/* Content hexagon */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full flex items-center justify-center",
          bgColor
        )}
        style={{
          clipPath: hexagonClipPath,
          zIndex: 2,
        }}
      >
        {num !== -1 ? (
          <div
            style={{
              textShadow:
                "-.5px -.5px 0 #000, .5px -.5px 0 #000, -.5px .5px 0 #000, .5px .5px 0 #000",
            }}
            className="text-white font-bold text-lg flex items-center justify-center w-full h-full"
          >
            {num}
          </div>
        ) : (
          <img
            src={src || "/api/placeholder/100/100"}
            alt={alt || "Trait icon"}
            className="w-full h-full object-cover  "
          />
        )}
      </div>
    </div>
  );
};

export default TraitIcon;
