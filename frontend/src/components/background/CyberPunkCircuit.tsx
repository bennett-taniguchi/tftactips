import React, { useEffect, useState, useRef } from 'react';

interface PathInfo {
  active: boolean;
  speed: number;
  delay: number;
}

interface ActivePaths {
  [key: string]: PathInfo;
}

interface CircuitTraceProps {
  id: string;
  d: string;
  stroke?: string;
  strokeWidth?: number;
  animated?: boolean;
  className?: string;
}

interface ICPatternProps {
  x: number;
  y: number;
  width: number;
  height: number;
  pins?: number;
  className?: string;
}

interface ComponentNodeProps {
  x: number;
  y: number;
  size?: number;
}

interface EdgeConnectorProps {
  x: number;
  y: number;
  width: number;
  height: number;
  pins?: number;
}

const CyberpunkCircuit = () => {
  const [activePaths, setActivePaths] = useState<ActivePaths>({});
  const svgRef = useRef<SVGSVGElement>(null);

  // Generate random timing for animations
  useEffect(() => {
    const paths: ActivePaths = {};
    const pathCount = 24; // Increased for more complex board

    for (let i = 0; i < pathCount; i++) {
      paths[`path-${i}`] = {
        active: Math.random() > 0.25,
        speed: 3000 + Math.random() * 8000,
        delay: Math.random() * 3000
      };
    }

    setActivePaths(paths);
  }, []);

  // Circuit trace component with path length calculation for better animation
  const CircuitTrace: React.FC<CircuitTraceProps> = ({ id, d, stroke = "#fa0", strokeWidth = 2, animated = true, className = "" }) => {
    const pathInfo = activePaths[id];
    const pathRef = useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = useState<number>(0);

    useEffect(() => {
      if (pathRef.current) {
        try {
          const length = pathRef.current.getTotalLength();
          setPathLength(length || 100);
        } catch (e) {
          setPathLength(100);
        }
      }
    }, [d]);

    if (!pathInfo || !animated) {
      return <path d={d} stroke={stroke} strokeWidth={strokeWidth} fill="none" className={className} />;
    }

    const dashArray = `${pathLength * 0.15} ${pathLength * 0.25}`;
    const style = {
      animation: pathInfo.active ?
        `pulseAlong ${pathInfo.speed}ms ${pathInfo.delay}ms infinite linear` : 'none',
      strokeDasharray: dashArray,
      strokeDashoffset: pathLength
    };

    return (
      <g>
        <path
          ref={pathRef}
          d={d}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill="none"
          opacity={0.4}
          className={className}
        />
        <path
          d={d}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill="none"
          style={style}
          className={`animated-path ${className}`}
        />
      </g>
    );
  };

  // IC chip pattern component with enhanced details
  const ICPattern: React.FC<ICPatternProps> = ({ x, y, width, height, pins = 8, className = "" }) => {
    const pinWidth = 2;
    const pinHeight = 8;
    const spacing = width / (pins + 1);
    const hasPins = pins > 0;

    // Internal circuit pattern for IC
    const icInteriorPattern = () => {
      const patternCount = Math.floor(pins/2);
      const elements: React.ReactNode[] = [];

      for (let i = 0; i < patternCount; i++) {
        const startX = x + 10;
        const startY = y + 8 + (i * (height - 16) / patternCount);
        const endX = x + width - 10;

        elements.push(
          <path
            key={`ic-line-${i}`}
            d={`M ${startX} ${startY} H ${endX}`}
            stroke="#fa0"
            strokeWidth={0.8}
            opacity={0.6}
          />
        );

        // Add small components on IC
        if (i % 2 === 0) {
          elements.push(
            <rect
              key={`ic-component-${i}`}
              x={x + 15 + (i * 10)}
              y={startY - 2}
              width={5}
              height={3}
              fill="#111"
              stroke="#fa0"
              strokeWidth={0.5}
            />
          );
        }
      }

      return elements;
    };

    return (
      <g className={className}>
        {/* IC body */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="#111"
          stroke="#fa0"
          strokeWidth={1}
        />

        {/* IC label/text */}
        <text
          x={x + width/2}
          y={y + height/2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fa0"
          fontSize="6"
          opacity={0.8}
        >
          IC{Math.floor(Math.random() * 900) + 100}
        </text>

        {/* Internal circuit pattern */}
        {icInteriorPattern()}

        {/* Top pins */}
        {hasPins && Array.from({ length: pins }).map((_, i) => (
          <rect
            key={`top-${i}`}
            x={x + spacing * (i + 1) - pinWidth/2}
            y={y - pinHeight}
            width={pinWidth}
            height={pinHeight}
            fill="#fa0"
          />
        ))}

        {/* Bottom pins */}
        {hasPins && Array.from({ length: pins }).map((_, i) => (
          <rect
            key={`bottom-${i}`}
            x={x + spacing * (i + 1) - pinWidth/2}
            y={y + height}
            width={pinWidth}
            height={pinHeight}
            fill="#fa0"
          />
        ))}
      </g>
    );
  };

  // Component node
  const ComponentNode: React.FC<ComponentNodeProps> = ({ x, y, size = 6 }) => {
    // Randomize which nodes get the pulse animation
    const hasPulse = Math.random() > 0.5;

    return (
      <circle
        cx={x}
        cy={y}
        r={size/2}
        fill="#111"
        stroke="#fa0"
        strokeWidth={1}
        className={hasPulse ? "node-pulse" : ""}
      />
    );
  };

  // Edge connector
  const EdgeConnector: React.FC<EdgeConnectorProps> = ({ x, y, width, height, pins = 5 }) => {
    const pinWidth = width / (pins * 2 - 1);

    return (
      <g>
        {Array.from({ length: pins }).map((_, i) => (
          <rect
            key={`pin-${i}`}
            x={x + i * pinWidth * 2}
            y={y}
            width={pinWidth}
            height={height}
            fill="#fa0"
          />
        ))}
      </g>
    );
  };

  return (
    <div className="circuit-container" style={{ width: '100%', height: '100%', background: '#001' }}>
      <style>{`
        @keyframes pulseAlong {
          0% {
            stroke-dashoffset: 100%;
            opacity: 0.2;
          }
          20% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.2;
          }
        }

        .animated-path {
          filter: drop-shadow(0 0 2px #fa0);
        }

        .component-highlight {
          animation: glow 2s infinite alternate;
        }

        @keyframes glow {
          from {
            filter: drop-shadow(0 0 1px #fa0);
            opacity: 0.8;
          }
          to {
            filter: drop-shadow(0 0 5px #fa0);
            opacity: 1;
          }
        }

        /* Additional animation for nodes */
        .node-pulse {
          animation: nodePulse 3s infinite alternate;
        }

        @keyframes nodePulse {
          0% {
            r: 3;
            filter: drop-shadow(0 0 1px #fa0);
          }
          50% {
            r: 4;
            filter: drop-shadow(0 0 3px #fa0);
          }
          100% {
            r: 3;
            filter: drop-shadow(0 0 1px #fa0);
          }
        }

        /* Test point node animation */
        .node-pulse-test {
          animation: testNodePulse 4s infinite alternate;
        }

        @keyframes testNodePulse {
          0% {
            r: 3;
            filter: drop-shadow(0 0 1px #fa0);
          }
          33% {
            r: 4;
            filter: drop-shadow(0 0 4px #fa0);
            stroke: #fd0;
          }
          66% {
            r: 3.5;
            filter: drop-shadow(0 0 2px #fa0);
            stroke: #fa0;
          }
          100% {
            r: 3;
            filter: drop-shadow(0 0 1px #fa0);
          }
        }

        /* Trace congestion effect */
        .trace-congested {
          animation-duration: 150% !important;
          filter: drop-shadow(0 0 3px #f50) !important;
        }

        /* Main bus styling */
        .main-bus {
          filter: drop-shadow(0 0 3px #fa0);
        }
      `}</style>

      <svg viewBox="0 0 800 600" width="100%" height="100%" ref={svgRef}>
        <defs>
          <pattern id="gridPattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#fa0" strokeWidth="0.2" opacity="0.3" />
          </pattern>

          {/* Add a gradient for a more cyberpunk feel */}
          <linearGradient id="cyberpunkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000" />
            <stop offset="50%" stopColor="#052" />
            <stop offset="100%" stopColor="#031" />
          </linearGradient>

          {/* For component highlights */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Circuit texture pattern */}
          <pattern id="circuitTexture" patternUnits="userSpaceOnUse" width="100" height="100">
            <rect width="100" height="100" fill="none" />
            <circle cx="50" cy="50" r="1" fill="#fa0" opacity="0.5" />
            <circle cx="20" cy="80" r="0.8" fill="#fa0" opacity="0.4" />
            <circle cx="80" cy="20" r="0.8" fill="#fa0" opacity="0.4" />
            <path d="M10,10 h10 v10 h-10 z" fill="none" stroke="#fa0" strokeWidth="0.3" opacity="0.3" />
            <path d="M80,80 h10 v10 h-10 z" fill="none" stroke="#fa0" strokeWidth="0.3" opacity="0.3" />
          </pattern>
        </defs>

        {/* Background with gradient and textures */}
        <rect width="100%" height="100%" fill="url(#cyberpunkGradient)" />
        <rect width="100%" height="100%" fill="url(#gridPattern)" opacity="0.7" />
        <rect width="100%" height="100%" fill="url(#circuitTexture)" opacity="0.3" />

        {/* Main circuit elements organized in functional zones */}
        <g className="circuit-elements">
          {/* Main horizontal and vertical buses */}
          <CircuitTrace
            id="main-bus-h"
            d="M 50 100 H 750"
            strokeWidth={4}
            className="main-bus"
          />

          <CircuitTrace
            id="main-bus-v1"
            d="M 150 50 V 550"
            strokeWidth={3}
            className="main-bus"
          />

          <CircuitTrace
            id="main-bus-v2"
            d="M 650 50 V 550"
            strokeWidth={3}
            className="main-bus"
          />
        </g>

        {/* Main circuit elements */}
        <g className="circuit-elements">
          {/* Horizontal main bus */}
          <CircuitTrace
            id="path-0"
            d="M 50 100 H 750"
            strokeWidth={4}
          />

          {/* Vertical main bus */}
          <CircuitTrace
            id="path-1"
            d="M 150 50 V 550"
            strokeWidth={3}
          />

          {/* Top section with branching paths based on Steiner tree principles */}
          <CircuitTrace
            id="path-2"
            d="M 150 80
                C 180 80, 190 60, 220 60
                L 270 60
                C 290 60, 300 80, 320 80
                L 370 80
                C 390 80, 400 60, 420 60
                L 470 60
                C 490 60, 500 80, 520 80
                L 570 80
                C 590 80, 600 60, 620 60
                L 670 60"
            strokeWidth={1.8}
          />

          {/* Steiner tree-like branching paths from main oscillating path */}
          <CircuitTrace
            id="path-3"
            d="M 220 60
                L 220 90
                C 220 110, 240 120, 240 140
                L 240 170"
          />

          <CircuitTrace
            id="path-4"
            d="M 320 80
                L 320 110
                C 320 125, 300 135, 300 150
                L 300 180
                C 300 200, 320 210, 320 230"
          />

          <CircuitTrace
            id="path-5"
            d="M 420 60
                L 420 90
                C 420 110, 440 120, 440 140
                L 440 170
                C 440 190, 420 200, 420 220
                L 420 240
                C 420 260, 440 270, 440 290"
          />

          <CircuitTrace
            id="path-6"
            d="M 520 80
                L 520 110
                C 520 130, 500 140, 500 160
                L 500 190"
          />

          <CircuitTrace
            id="path-7"
            d="M 620 60
                L 620 90
                C 620 110, 640 120, 640 140
                L 640 170
                C 640 190, 620 200, 620 220"
          />

          {/* Parallel path structures inspired by multicommodity flow models */}
          <CircuitTrace
            id="path-8"
            d="M 240 170
                C 240 200, 270 210, 300 210
                L 350 210
                C 370 210, 380 190, 400 190
                L 450 190
                C 480 190, 490 220, 520 220"
            className="trace-congested"
          />

          <CircuitTrace
            id="path-9"
            d="M 240 170
                C 242 190, 260 200, 290 200
                L 340 200
                C 365 200, 375 180, 395 180
                L 445 180
                C 470 180, 485 210, 515 210"
            strokeWidth={1.2}
          />

          <CircuitTrace
            id="path-10"
            d="M 300 180
                L 350 180
                C 380 180, 390 160, 410 160
                L 470 160
                C 490 160, 500 140, 520 140
                L 570 140
                C 590 140, 600 120, 620 120"
          />

          {/* Recursive minimum cut-like partitioning with connecting paths */}
          <CircuitTrace
            id="path-11"
            d="M 440 290
                L 440 320
                C 440 340, 460 350, 460 370
                L 460 400
                C 460 420, 440 430, 440 450"
          />

          <CircuitTrace
            id="path-12"
            d="M 500 190
                L 500 220
                C 500 250, 530 260, 530 290
                L 530 320
                C 530 340, 510 350, 510 370"
          />

          <CircuitTrace
            id="path-13"
            d="M 620 220
                L 620 250
                C 620 270, 640 280, 640 300
                L 640 330
                C 640 350, 620 360, 620 380
                L 620 410"
            className="trace-congested"
          />

          {/* Balanced bipartition with 45-degree diagonal connections */}
          <CircuitTrace
            id="path-14"
            d="M 150 350
                H 250
                L 290 310
                L 350 310
                L 390 350
                H 440"
          />

          <CircuitTrace
            id="path-15"
            d="M 150 450
                H 220
                L 260 410
                L 320 410
                L 360 450
                H 440"
          />

          {/* Layer transitions visualized with vertical jumps */}
          <CircuitTrace
            id="path-16"
            d="M 510 370
                L 560 370
                C 580 370, 590 390, 610 390
                L 670 390"
          />

          <CircuitTrace
            id="path-17"
            d="M 440 450
                L 500 450
                C 520 450, 530 430, 550 430
                L 600 430
                C 620 430, 630 450, 650 450
                L 700 450"
          />

          {/* Additional paths for higher density routing */}
          <CircuitTrace
            id="path-18"
            d="M 350 310
                C 360 310, 365 300, 375 300
                L 410 300
                C 430 300, 440 320, 460 320
                L 500 320"
            strokeWidth={1.5}
          />

          <CircuitTrace
            id="path-19"
            d="M 320 410
                C 330 410, 340 400, 350 400
                L 390 400
                C 410 400, 420 390, 440 390
                L 480 390"
            strokeWidth={1.5}
          />

          {/* Complex multicommodity Steiner tree model for central area */}
          <CircuitTrace
            id="path-20"
            d="M 300 250
                C 310 250, 320 240, 340 240
                L 360 240
                C 380 240, 390 260, 410 260
                L 440 260
                C 460 260, 470 240, 490 240
                L 520 240"
          />

          <CircuitTrace
            id="path-21"
            d="M 300 280
                C 320 280, 330 270, 350 270
                L 370 270
                C 390 270, 400 290, 420 290
                L 450 290
                C 470 290, 480 270, 500 270"
          />

          {/* Diagonal interconnects with 45° angles */}
          <CircuitTrace
            id="path-22"
            d="M 250 500
                L 300 450
                L 350 500
                L 400 450
                L 450 500
                L 500 450
                L 550 500"
            strokeWidth={1.2}
          />

          <CircuitTrace
            id="path-23"
            d="M 150 150
                L 200 200
                L 250 150
                L 300 200
                L 350 150"
            strokeWidth={1.2}
          />

          {/* Static elements */}
          <path d="M 50 150 H 100 V 200 H 50 V 150" stroke="#fa0" strokeWidth={1} fill="none" />
          <path d="M 700 100 V 150 H 750 V 100" stroke="#fa0" strokeWidth={1} fill="none" />
          <path d="M 50 300 H 100 V 350 H 50 V 300" stroke="#fa0" strokeWidth={1} fill="none" />
          <path d="M 50 400 H 100 V 450 H 50 V 400" stroke="#fa0" strokeWidth={1} fill="none" />

          {/* ICs and components */}
          <ICPattern x={260} y={110} width={80} height={30} pins={6} />
          <ICPattern x={480} y={230} width={100} height={40} pins={8} />
          <ICPattern x={350} y={250} width={60} height={25} pins={4} />
          <ICPattern x={570} y={360} width={70} height={30} pins={6} />

          {/* Component nodes at path intersections and key points */}
          <ComponentNode x={220} y={60} />
          <ComponentNode x={320} y={80} />
          <ComponentNode x={420} y={60} />
          <ComponentNode x={520} y={80} />
          <ComponentNode x={620} y={60} />
          <ComponentNode x={240} y={170} />
          <ComponentNode x={300} y={180} />
          <ComponentNode x={440} y={290} />
          <ComponentNode x={500} y={190} />
          <ComponentNode x={620} y={220} />
          <ComponentNode x={440} y={370} />
          <ComponentNode x={510} y={370} />
          <ComponentNode x={440} y={450} />
          <ComponentNode x={640} y={300} />
          <ComponentNode x={620} y={410} />

          {/* Edge connectors */}
          <EdgeConnector x={50} y={550} width={100} height={10} pins={5} />
          <EdgeConnector x={650} y={550} width={100} height={10} pins={5} />

          {/* Small electronic components */}
          <rect x={220} y={120} width={15} height={7} fill="#111" stroke="#fa0" strokeWidth={1} className="component-highlight" />
          <rect x={320} y={170} width={15} height={7} fill="#111" stroke="#fa0" strokeWidth={1} className="component-highlight" />
          <rect x={420} y={120} width={15} height={7} fill="#111" stroke="#fa0" strokeWidth={1} className="component-highlight" />
          <rect x={520} y={170} width={15} height={7} fill="#111" stroke="#fa0" strokeWidth={1} className="component-highlight" />
          <rect x={380} y={350} width={15} height={7} fill="#111" stroke="#fa0" strokeWidth={1} className="component-highlight" />
          <rect x={550} y={450} width={15} height={7} fill="#111" stroke="#fa0" strokeWidth={1} className="component-highlight" />

          {/* Small capacitors (circle pairs) */}
          <circle cx={250} cy={250} r={3} fill="#111" stroke="#fa0" strokeWidth={1} />
          <circle cx={260} cy={250} r={3} fill="#111" stroke="#fa0" strokeWidth={1} />

          <circle cx={420} cy={320} r={3} fill="#111" stroke="#fa0" strokeWidth={1} />
          <circle cx={430} cy={320} r={3} fill="#111" stroke="#fa0" strokeWidth={1} />

          <circle cx={580} cy={420} r={3} fill="#111" stroke="#fa0" strokeWidth={1} />
          <circle cx={590} cy={420} r={3} fill="#111" stroke="#fa0" strokeWidth={1} />

          {/* Resistor patterns */}
          <path d="M 240 200 h 5 v -5 h 5 v 10 h 5 v -10 h 5 v 10 h 5 v -5 h 5"
            stroke="#fa0" strokeWidth={1.5} fill="none" />

          <path d="M 320 350 h 5 v -5 h 5 v 10 h 5 v -10 h 5 v 10 h 5 v -5 h 5"
            stroke="#fa0" strokeWidth={1.5} fill="none" />

          <path d="M 460 200 h 5 v -5 h 5 v 10 h 5 v -10 h 5 v 10 h 5 v -5 h 5"
            stroke="#fa0" strokeWidth={1.5} fill="none" />

          <path d="M 550 400 h 5 v -5 h 5 v 10 h 5 v -10 h 5 v 10 h 5 v -5 h 5"
            stroke="#fa0" strokeWidth={1.5} fill="none" />
        </g>
      </svg>
    </div>
  );
};

export default CyberpunkCircuit;