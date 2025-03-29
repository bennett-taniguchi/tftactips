import { useRef, useState, useEffect, RefObject, JSX } from "react";

// Define interfaces for component props
interface TraitHexProps {
  size: number;
  bgColor: string;
  src: string;
  index: number;
}

const TraitHex = ({ size, bgColor, src, index }: TraitHexProps) => {
  const hexagonClipPath: string =
    "polygon(50% 0%, 90% 25%, 90% 75%, 50% 100%, 10% 75%, 10% 25%)";

  return (
    <div className="stack hover:z-50">
      {/* Top card - The main visible layer */}
      <div
        className={`card top ${bgColor} transition-all duration-300 flex items-center justify-center`}
        style={{
          clipPath: hexagonClipPath,
          padding: "0.2em",
          boxShadow:
            "inset 0 0 15px rgba(255,255,255,0.3), inset 0 0 5px rgba(255,255,255,0.5)",
        }}
      >
        <img
          src={src}
          width={size}
          height={size}
          alt="Trait Icon"
          className="object-contain max-w-full max-h-full"
        />
      </div>

      {/* Middle-top card - Extra layer for more depth */}
      <div
        className={`card mid-top ${bgColor} transition-all duration-300 flex items-center justify-center`}
        style={{
          clipPath: hexagonClipPath,
          padding: "0.2em",
          opacity: 0.85,
          boxShadow: "inset 0 0 10px rgba(255,255,255,0.2)",
        }}
      >
        <img
          src={src}
          width={size}
          height={size}
          alt="Trait Icon"
          className="object-contain max-w-full max-h-full opacity-85"
        />
      </div>

      {/* Middle card */}
      <div
        className={`card mid ${bgColor} transition-all duration-300 flex items-center justify-center`}
        style={{
          clipPath: hexagonClipPath,
          padding: "0.2em",
          opacity: 0.75,
          boxShadow: "inset 0 0 8px rgba(255,255,255,0.15)",
        }}
      >
        <img
          src={src}
          width={size}
          height={size}
          alt="Trait Icon"
          className="object-contain max-w-full max-h-full opacity-80"
        />
      </div>

      {/* Middle-bottom card - Extra layer for more depth */}
      <div
        className={`card mid-bottom ${bgColor} transition-all duration-300 flex items-center justify-center`}
        style={{
          clipPath: hexagonClipPath,
          padding: "0.2em",
          opacity: 0.65,
          boxShadow: "inset 0 0 6px rgba(255,255,255,0.1)",
        }}
      >
        <img
          src={src}
          width={size}
          height={size}
          alt="Trait Icon"
          className="object-contain max-w-full max-h-full opacity-70"
        />
      </div>

      {/* Bottom card */}
      <div
        className={`card bottom ${bgColor} transition-all duration-300 flex items-center justify-center`}
        style={{
          clipPath: hexagonClipPath,
          padding: "0.2em",
          opacity: 0.55,
          boxShadow: "inset 0 0 4px rgba(255,255,255,0.05)",
        }}
      >
        <img
          src={src}
          width={size}
          height={size}
          alt="Trait Icon"
          className="object-contain max-w-full max-h-full opacity-60"
        />
      </div>

      {/* Base card - deepest layer */}
      <div
        className={`card base ${bgColor} transition-all duration-300 flex items-center justify-center`}
        style={{
          clipPath: hexagonClipPath,
          padding: "0.2em",
          opacity: 0.4,
          boxShadow: "inset 0 0 3px rgba(0,0,0,0.5)",
        }}
      >
        <img
          src={src}
          width={size}
          height={size}
          alt="Trait Icon"
          className="object-contain max-w-full max-h-full opacity-40"
        />
      </div>

      {/* Shadow - also with hexagon shape */}
      <div
        className="card shadow transition-all duration-300"
        style={{
          clipPath: hexagonClipPath,
          filter: "blur(2px)",
        }}
      ></div>
    </div>
  );
};

// Define interface for the window with custom property
interface CustomWindow extends Window {
  scrollTimer?: number;
}

// Create a typed version of the window object
declare const window: CustomWindow;

const TraitBoard: React.FC = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  // Handle scroll effect
  useEffect(() => {
    // Initialize the scroll value
    if (cardsRef.current) {
      cardsRef.current.style.setProperty("--scroll", "0px");
    }

    const handleScroll = (): void => {
      // Debug output to console to verify the event is firing
      console.log("Scroll event fired, window.scrollY:", window.scrollY);

      const scrollY: number = window.scrollY;
      setScrollOffset(scrollY * 0.5);
      setIsScrolling(true);

      // Directly apply the transform to ensure it updates
      //   if (cardsRef.current) {
      //     const baseTransform = "translateX(-50%) rotateX(45deg) rotateZ(45deg)";
      //     const scrollTransform = `translateY(${scrollY * 0.5}px) rotateZ(${scrollY * -0.05}deg)`;
      //     cardsRef.current.style.transform = `${baseTransform} ${scrollTransform}`;
      //   }

      // Reset the scrolling status after a delay
      clearTimeout(window.scrollTimer);
      window.scrollTimer = window.setTimeout(() => setIsScrolling(false), 150);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Trigger once to set initial position
    handleScroll();

    // Force a reflow to ensure initial scroll state is captured
    document.body.offsetHeight;

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (window.scrollTimer) {
        clearTimeout(window.scrollTimer);
      }
    };
  }, []);

  // Generate icons for grid
  const generateIcons = (): JSX.Element[] => {
    const traitIcons: JSX.Element[] = [];
    const totalItems: number = 24;
    const colors: string[] = [
      "bg-amber-500",
      "bg-purple-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-red-500",
    ];
    const traitName: string[] = [
      "rapidfire",
      "strategist",
      "slayer",
      "goldenox",
      "bruiser",
      "bastion",
      "cypher",
      "boombots",
      "netgod",
      "marksman",
      "syndicate",
      "techie",
      "cyberboss",
      "vanguard",
      "amp",
      "dynamo",
      "executioner",
      "exotech",
      "divinicorp",
      "virus",
    ];

    function pickTrait(num: number): string {
      return traitName[num % traitName.length];
    }

    for (let i = 0; i < totalItems; i++) {
      const colorIndex: number = i % colors.length;
      traitIcons.push(
        <TraitHex
          key={i}
          size={100}
          bgColor={colors[colorIndex]}
          src={`https://tft-set14.s3.us-east-2.amazonaws.com/traits/tft14_emblem_${pickTrait(
            i
          )}-tft_set14+(1).png`}
          index={i}
        />
      );
    }

    return traitIcons;
  };
  function scrollFloor(y:number){
   
    if(scrollY >= 1000) {
        return -900*.03 
    } else {
        return -(scrollY) * .03
    }
    // if(y>=50) {
    //     return y+10*500
    // } else {
    //     return y*2
    // }
  }

 
  return (
    <div>
      {/* Background isometric grid container - with proper containment */}
      <div className="fixed inset-0" style={{ zIndex: 1 }}>
        {/* Clipping container to prevent 3D content from overflowing */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Padding container to ensure 3D transformed content doesn't touch edges */}
          <div className="absolute inset-0" style={{ padding: "0 10% 0 0" }}>
            <main className="w-full h-full relative">
              {/* Isometric floor */}
              <div
                className="floor"
                style={{
                  position: "absolute",
                  width: "800px",
                  height: "900px",
                  top: "5%",
                  left: "52%",
                  transform: `
                  translateX(${1.75*scrollFloor(scrollY)}%)
                
                  rotateX(${Math.max(45 - scrollY * 0.05, 0)}deg) 
                  rotateZ(${Math.max(45 - scrollY * 0.05, 0)}deg)
                    translateY(${Math.min(scrollOffset*.1,.1*500)}px)
                `,
                  transformOrigin: "50% 50%",
                  transformStyle: "preserve-3d",
                  background:
                    "linear-gradient(135deg, rgba(30,30,50,0.8), rgba(10,10,20,0.9))",
                  boxShadow: "inset 0 0 60px rgba(100,70,200,0.2)",
                  borderRadius: "8px",
                  zIndex: 0,
                }}
              >
                {/* Grid lines for the floor */}
                <div
                  className="grid-lines"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: `
                      linear-gradient(rgba(150,100,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(150,100,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "48px 48px",
                    opacity: 0.4,
                  }}
                ></div>

                {/* Glow effect at the center */}
                <div
                  className="floor-glow"
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: "40%",
                    width: "20%",
                    height: "20%",
                    background:
                      "radial-gradient(circle, rgba(150,100,255,0.2) 0%, transparent 70%)",
                    filter: "blur(30px)",
                  }}
                ></div>
              </div>

              {/* Cards container with trait icons */}
              <div
                ref={cardsRef}
                className="cards"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 12em)",
                  gridTemplateRows: "repeat(9, 9em)",
                  gridGap: "0em",
                  position: "absolute",
                  top: "0%",
                  left: "65%", // Changed from 87% to 50% for center alignment
                  transform: `
      translateX(${-50+scrollFloor(scrollY)}%)
      rotateX(${Math.max(45 - scrollY * 0.05, 0)}deg) 
      rotateZ(${Math.max(45 - scrollY * 0.05, 0)}deg)
  translateY(${Math.min(scrollOffset*.25,.25*500)}px)
    `,
                  transformOrigin: "50% 50%", // Changed from 50% 0 to center the rotation
                  transformStyle: "preserve-3d",
                  pointerEvents: "auto",
                  cursor: "pointer",
                  zIndex: 2,
                  transition: "transform 0.1s ease-out", // Added for smoother transitions
                }}
              >
                {generateIcons()}
              </div>
            </main>
          </div>
        </div>

        {/* Edge mask to ensure content fades out before hitting the scrollbar */}
        <div
          className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none"
          style={{ zIndex: 10 }}
        ></div>
      </div>

      {/* Debugging elements to show scroll information */}
      <div className="fixed bottom-4 left-4 bg-black/80 text-white px-3 py-1 rounded z-50 space-y-1">
        <div>Scroll: {scrollOffset.toFixed(0)}px</div>
        <div>Is Scrolling: {isScrolling ? "Yes" : "No"}</div>
        <div>
          Window ScrollY: {typeof window !== "undefined" ? window.scrollY : 0}
        </div>
      </div>

      {/* Force scrollable content - Add enough content to enable scrolling */}
      <div className="relative z-0">
        <div className="h-screen"></div>
        <div className="h-screen"></div>
        <div className="h-screen"></div>
        <div className="h-screen"></div>
      </div>

      {/* CSS styles */}
      <style>{`
        .stack {
          display: block;
          position: relative;
          transform-style: preserve-3d;
          cursor: pointer;
          z-index: 5;
          transition: z-index 0.01s;
        }
        .card {
          position: absolute;
          width: 70%;
          height: 80%;
          transition: all 0.3s;
          box-shadow: -1px -1px 0 rgba(0,0,0,0.2) inset;
        }
        .top {
          transform: translateZ(10px);
          z-index: 6;
        }
        .mid-top {
          transform: translateZ(8px);
          z-index: 5;
        }
        .mid {
          transform: translateZ(6px);
          z-index: 4;
        }
        .mid-bottom {
          transform: translateZ(4px);
          z-index: 3;
        }
        .bottom {
          transform: translateZ(2px);
          z-index: 2;
        }
        .base {
          transform: translateZ(1px);
          z-index: 1;
        }
        .shadow {
          background: black;
          opacity: 0.7;
          transform: translateZ(0);
          z-index: 0;
        }
        
        /* Floor reflection effect */
        .stack::after {
          content: '';
          position: absolute;
          bottom: 10px;
          left: 0%;
          width: 70%;
          height: 10px;
          background: linear-gradient(to bottom, rgba(150,100,255,0.2), transparent);
          transform: translateZ(-1px);
          filter: blur(3px);
          opacity: 0.6;
          z-index: -1;
        }
        
        /* Explicitly define the hover states */
        .stack:hover .top {
          transform: translateZ(18px) !important;
        }
        .stack:hover .mid-top {
          transform: translateZ(15px) !important;
        }
        .stack:hover .mid {
          transform: translateZ(12px) !important;
        }
        .stack:hover .mid-bottom {
          transform: translateZ(9px) !important;
        }
        .stack:hover .bottom {
          transform: translateZ(6px) !important;
        }
        .stack:hover .base {
          transform: translateZ(3px) !important;
        }
        .stack:hover .shadow {
          filter: blur(6px) !important;
          opacity: 0.4 !important;
          transform: translateZ(0) scale(1.05) !important;
        }
        .stack:hover::after {
          opacity: 0.8;
          filter: blur(5px);
          width: 75%;
        }
        
        /* Ensure scrollbar is accessible */
        ::-webkit-scrollbar {
          width: 10px;
          z-index: 100;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        
        html, body {
          overflow-x: hidden;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        
        /* Ensure content is tall enough to enable scrolling */
        body {
          min-height: 400vh;
        }
      `}</style>
    </div>
  );
};

export default TraitBoard;
