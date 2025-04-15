import React, { useState } from "react";
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

// TypeScript interfaces
interface CyberPanelProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  glow?: 'cyan' | 'emerald' | 'purple' | 'blue';
  onClick?: () => void;
}

export interface PanelConfig {
  id: number;
  color: 'cyan' | 'emerald' | 'purple' | 'blue';
  minSize: number;
  defaultSize: number;
  content: React.ReactNode;
}

interface CyberpunkBentoBoxProps {
  className?: string;
  panels?: PanelConfig[];
  onPanelResize?: (sizes: number[]) => void;
  onPanelClick?: (panelId: number) => void;
}

// CyberPanel component that creates the glossy/glassy cyberpunk styling
const CyberPanel: React.FC<CyberPanelProps> = ({ 
  children, 
  className, 
  size = "md", 
  glow = "cyan",
 
}) => {
  // Define glow color variants
  const glowVariants = {
    cyan: "from-cyan-500/40 to-emerald-500/40 border-cyan-500/40 shadow-cyan-400/20",
    emerald: "from-emerald-500/40 to-blue-500/40 border-emerald-500/40 shadow-emerald-400/20",
    purple: "from-purple-500/40 to-cyan-500/40 border-purple-500/40 shadow-purple-400/20",
    blue: "from-blue-500/40 to-cyan-500/40 border-blue-500/40 shadow-blue-400/20",
  };

  // Define size variants
  const sizeVariants = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div 
      className={cn(
        "relative   overflow-hidden transition-all duration-300",
        "border backdrop-blur-md bg-gray-900/60",
        "shadow-lg",
        glowVariants[glow],
        sizeVariants[size],
        className
      )}
    >
      {/* Gloss effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-0"></div>
      
      {/* Subtle inner glow */}
      <div className={cn(
        "absolute inset-0 mix-blend-overlay",
        glow === "cyan" ? "bg-cyan-500/5" : 
        glow === "emerald" ? "bg-emerald-500/5" : 
        glow === "purple" ? "bg-purple-500/5" : "bg-blue-500/5"
      )}></div>
      
      {/* Top decorative line */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
        `from-${glow === "cyan" ? "cyan" : glow}-500/40 to-${glow === "emerald" ? "emerald" : "blue"}-500/40`
      )}></div>
      
      {/* Content container */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Default panel config with different sizes and colors
const defaultPanels: PanelConfig[] = [
  { id: 1, color: "cyan", minSize: 15, defaultSize: 20, content: "Panel 1" },
  { id: 2, color: "emerald", minSize: 15, defaultSize: 30, content: "Panel 2" },
  { id: 3, color: "purple", minSize: 15, defaultSize: 20, content: "Panel 3" },
  { id: 4, color: "blue", minSize: 15, defaultSize: 25, content: "Panel 4" },
  { id: 5, color: "cyan", minSize: 15, defaultSize: 30, content: "Panel 5" },
  { id: 6, color: "emerald", minSize: 15, defaultSize: 20, content: "Panel 6" },
  { id: 7, color: "purple", minSize: 15, defaultSize: 25, content: "Panel 7" },
  { id: 8, color: "blue", minSize: 15, defaultSize: 20, content: "Panel 8" },
  { id: 9, color: "cyan", minSize: 15, defaultSize: 25, content: "Panel 9" }
];

// Main BentoBox component
const CyberpunkBentoBox: React.FC<CyberpunkBentoBoxProps> = ({ 
  className, 
  panels = defaultPanels,
  onPanelResize = () => {},
  onPanelClick = () => {},
}) => {
  const [panelSizes, setPanelSizes] = useState<number[]>(panels.map(p => p.defaultSize));

  // Handle panel resize
  const handleResize = (indices: number[], sizes: number[]) => {
    const newSizes = [...panelSizes];
    indices.forEach((index, i) => {
      newSizes[index] = sizes[i];
    });
    setPanelSizes(newSizes);
    onPanelResize(newSizes);
  };

  return (
    <div className={cn("w-full p-4", className)}>
    
      
      <h2 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white mb-12   ">
        Set 14
      </h2> 
      
      {/* First row - 3 panels */}
      <ResizablePanelGroup 
        direction="horizontal" 
        className="min-h-[200px]      overflow-hidden "
        onLayout={(sizes:any) => handleResize([0, 1, 2], sizes)}
      >
        <ResizablePanel minSize={panels[0].minSize} defaultSize={panels[0].defaultSize}>
          <CyberPanel 
            glow={panels[0].color} 
            className="h-full cursor-pointer hover:ring-2 hover:ring-emerald-500/30 transition-all"
            onClick={() => onPanelClick(panels[0].id)}
          >
            <div className="flex  h-full "  >
              <img src="./img/cybercity.png" className=" ml-50 w-50 h-50 fixed  "/>
              <h3 className="z-11 text-left text-xl font-semibold text-white bg-black-400">{panels[0].content}</h3>
            </div>
          </CyberPanel>
        </ResizablePanel>
        
        <ResizableHandle   className="bg-gradient-to-b from-cyan-500/30 to-emerald-500/30" />
        
        <ResizablePanel minSize={panels[1].minSize} defaultSize={panels[1].defaultSize}>
          <CyberPanel 
            glow={panels[1].color} 
            className="h-full cursor-pointer hover:ring-2 hover:ring-emerald-500/30 transition-all"
            onClick={() => onPanelClick(panels[1].id)}
          >
            <div className="flex items-center justify-center h-full">
              <h3 className="text-xl font-semibold text-white">{panels[1].content}</h3>
            </div>
          </CyberPanel>
        </ResizablePanel>
        
        <ResizableHandle   className="bg-gradient-to-b from-cyan-500/30 to-emerald-500/30" />
        
        <ResizablePanel minSize={panels[2].minSize} defaultSize={panels[2].defaultSize}>
          <CyberPanel 
            glow={panels[2].color} 
            className="h-full cursor-pointer hover:ring-2 hover:ring-purple-500/30 transition-all"
            onClick={() => onPanelClick(panels[2].id)}
          >
            <div className="flex items-center justify-center h-full">
              <h3 className="text-xl font-semibold text-white">{panels[2].content}</h3>
            </div>
          </CyberPanel>
        </ResizablePanel>
      </ResizablePanelGroup>
      
      {/* Second row - 3 panels */}
      <ResizablePanelGroup 
        direction="horizontal" 
        className="min-h-[200px]   overflow-hidden"
        onLayout={(sizes:any) => handleResize([3, 4, 5], sizes)}
      >
        <ResizablePanel minSize={panels[3].minSize} defaultSize={panels[3].defaultSize}>
          <CyberPanel 
            glow={panels[3].color} 
            className="h-full cursor-pointer hover:ring-2 hover:ring-blue-500/30 transition-all"
            onClick={() => onPanelClick(panels[3].id)}
          >
            <div className="flex items-center justify-center h-full">
              <h3 className="text-xl font-semibold text-white">{panels[3].content}</h3>
            </div>
          </CyberPanel>
        </ResizablePanel>
        
        <ResizableHandle  className="bg-gradient-to-b from-cyan-500/30 to-emerald-500/30 " />
        
        <ResizablePanel minSize={panels[4].minSize} defaultSize={panels[4].defaultSize}>
          <CyberPanel 
            glow={panels[4].color} 
            className="h-full cursor-pointer hover:ring-2 hover:ring-cyan-500/30 transition-all"
            onClick={() => onPanelClick(panels[4].id)}
          >
            <div className="flex items-center justify-center h-full">
              <h3 className="text-xl font-semibold text-white">{panels[4].content}</h3>
            </div>
          </CyberPanel>
        </ResizablePanel>
        
        <ResizableHandle  className="bg-gradient-to-b from-cyan-500/30 to-emerald-500/30" />
        
        <ResizablePanel minSize={panels[5].minSize} defaultSize={panels[5].defaultSize}>
          <CyberPanel 
            glow={panels[5].color} 
            className="h-full cursor-pointer hover:ring-2 hover:ring-emerald-500/30 transition-all"
            onClick={() => onPanelClick(panels[5].id)}
          >
            <div className="flex items-center justify-center h-full">
              <h3 className="text-xl font-semibold text-white">{panels[5].content}</h3>
            </div>
          </CyberPanel>
        </ResizablePanel>
      </ResizablePanelGroup>
      
      {/* Third row - 3 panels */}
      <ResizablePanelGroup 
        direction="horizontal" 
        className="min-h-[200px] rounded-xl overflow-hidden"
        onLayout={(sizes:any) => handleResize([6, 7, 8], sizes)}
      >
        <ResizablePanel minSize={panels[6].minSize} defaultSize={panels[6].defaultSize}>
          <CyberPanel 
            glow={panels[6].color} 
            className="h-full cursor-pointer hover:ring-2 hover:ring-purple-500/30 transition-all"
            onClick={() => onPanelClick(panels[6].id)}
          >
            <div className="flex items-center justify-center h-full">
              <h3 className="text-xl font-semibold text-white">{panels[6].content}</h3>
            </div>
          </CyberPanel>
        </ResizablePanel>
        
        <ResizableHandle   className="bg-gradient-to-b from-cyan-500/30 to-emerald-500/30" />
        
        <ResizablePanel minSize={panels[7].minSize} defaultSize={panels[7].defaultSize}>
          <CyberPanel 
            glow={panels[7].color} 
            className="h-full cursor-pointer hover:ring-2 hover:ring-blue-500/30 transition-all"
            onClick={() => onPanelClick(panels[7].id)}
          >
            <div className="flex items-center justify-center h-full">
              <h3 className="text-xl font-semibold text-white">{panels[7].content}</h3>
            </div>
          </CyberPanel>
        </ResizablePanel>
        
        <ResizableHandle  className="bg-gradient-to-b from-cyan-500/30 to-emerald-500/30" />
        
        <ResizablePanel minSize={panels[8].minSize} defaultSize={panels[8].defaultSize}>
          <CyberPanel 
            glow={panels[8].color} 
            className="h-full cursor-pointer hover:ring-2 hover:ring-cyan-500/30 transition-all"
            onClick={() => onPanelClick(panels[8].id)}
          >
            <div className="flex items-center justify-center h-full">
              <h3 className="text-xl font-semibold text-white">{panels[8].content}</h3>
            </div>
          </CyberPanel>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

// Export the standalone CyberPanel for individual use
export { CyberPanel };

// Export the full BentoBox
export default CyberpunkBentoBox;