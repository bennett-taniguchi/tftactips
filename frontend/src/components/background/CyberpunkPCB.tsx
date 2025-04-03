import React, { useState, useEffect, useRef } from 'react';

interface IC {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  pins: number;
}

interface SMD {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'resistor' | 'capacitor';
}

interface Via {
  id: string;
  x: number;
  y: number;
  radius: number;
}

interface TestPoint {
  id: string;
  x: number;
  y: number;
  radius: number;
}

const CyberpunkPCB = () => {
  const [animationActive, setAnimationActive] = useState<boolean>(true);
  const boardRef = useRef<SVGSVGElement | null>(null);

  // Component types - expanded vertically to be 3x taller
  const ICs: IC[] = [
    // Upper section
    { id: 'ic1', x: 100, y: 80, width: 50, height: 30, pins: 12 },
    { id: 'ic2', x: 230, y: 150, width: 60, height: 40, pins: 16 },
    { id: 'ic3', x: 120, y: 220, width: 40, height: 25, pins: 8 },
    { id: 'ic4', x: 320, y: 90, width: 70, height: 35, pins: 14 },
    // Middle section
    { id: 'ic5', x: 150, y: 350, width: 65, height: 35, pins: 16 },
    { id: 'ic6', x: 280, y: 420, width: 55, height: 30, pins: 12 },
    { id: 'ic7', x: 90, y: 480, width: 45, height: 28, pins: 10 },
    { id: 'ic8', x: 340, y: 380, width: 60, height: 32, pins: 14 },
    // Lower section
    { id: 'ic9', x: 180, y: 660, width: 70, height: 40, pins: 16 },
    { id: 'ic10', x: 70, y: 720, width: 50, height: 30, pins: 12 },
    { id: 'ic11', x: 300, y: 700, width: 55, height: 35, pins: 14 },
    { id: 'ic12', x: 240, y: 780, width: 60, height: 30, pins: 12 }
  ];

  const SMDs: SMD[] = [
    // Upper section
    { id: 'r1', x: 80, y: 40, width: 12, height: 6, type: 'resistor' },
    { id: 'r2', x: 190, y: 110, width: 12, height: 6, type: 'resistor' },
    { id: 'r3', x: 270, y: 200, width: 12, height: 6, type: 'resistor' },
    { id: 'c1', x: 150, y: 60, width: 10, height: 8, type: 'capacitor' },
    { id: 'c2', x: 210, y: 230, width: 10, height: 8, type: 'capacitor' },
    { id: 'c3', x: 300, y: 150, width: 10, height: 8, type: 'capacitor' },
    { id: 'c4', x: 100, y: 180, width: 10, height: 8, type: 'capacitor' },
    { id: 'r4', x: 330, y: 50, width: 12, height: 6, type: 'resistor' },
    { id: 'r5', x: 280, y: 120, width: 12, height: 6, type: 'resistor' },
    { id: 'c5', x: 60, y: 140, width: 10, height: 8, type: 'capacitor' },
    { id: 'r6', x: 170, y: 190, width: 12, height: 6, type: 'resistor' },
    { id: 'c6', x: 240, y: 70, width: 10, height: 8, type: 'capacitor' },
    { id: 'r7', x: 350, y: 180, width: 12, height: 6, type: 'resistor' },

    // Middle section
    { id: 'r8', x: 120, y: 310, width: 12, height: 6, type: 'resistor' },
    { id: 'c8', x: 200, y: 330, width: 10, height: 8, type: 'capacitor' },
    { id: 'r9', x: 260, y: 360, width: 12, height: 6, type: 'resistor' },
    { id: 'c9', x: 320, y: 340, width: 10, height: 8, type: 'capacitor' },
    { id: 'r10', x: 70, y: 390, width: 12, height: 6, type: 'resistor' },
    { id: 'c10', x: 130, y: 420, width: 10, height: 8, type: 'capacitor' },
    { id: 'r11', x: 220, y: 450, width: 12, height: 6, type: 'resistor' },
    { id: 'c11', x: 300, y: 480, width: 10, height: 8, type: 'capacitor' },
    { id: 'r12', x: 380, y: 430, width: 12, height: 6, type: 'resistor' },
    { id: 'c12', x: 160, y: 500, width: 10, height: 8, type: 'capacitor' },
    { id: 'r13', x: 250, y: 520, width: 12, height: 6, type: 'resistor' },
    { id: 'c13', x: 330, y: 510, width: 10, height: 8, type: 'capacitor' },

    // Lower section
    { id: 'r14', x: 90, y: 600, width: 12, height: 6, type: 'resistor' },
    { id: 'c14', x: 150, y: 620, width: 10, height: 8, type: 'capacitor' },
    { id: 'r15', x: 240, y: 640, width: 12, height: 6, type: 'resistor' },
    { id: 'c15', x: 310, y: 630, width: 10, height: 8, type: 'capacitor' },
    { id: 'r16', x: 130, y: 680, width: 12, height: 6, type: 'resistor' },
    { id: 'c16', x: 220, y: 710, width: 10, height: 8, type: 'capacitor' },
    { id: 'r17', x: 280, y: 740, width: 12, height: 6, type: 'resistor' },
    { id: 'c17', x: 180, y: 760, width: 10, height: 8, type: 'capacitor' },
    { id: 'r18', x: 350, y: 670, width: 12, height: 6, type: 'resistor' },
    { id: 'c18', x: 120, y: 750, width: 10, height: 8, type: 'capacitor' },
    { id: 'r19', x: 210, y: 800, width: 12, height: 6, type: 'resistor' },
    { id: 'c19', x: 320, y: 770, width: 10, height: 8, type: 'capacitor' }
  ];

  const vias: Via[] = [
    // Upper section
    { id: 'v1', x: 90, y: 50, radius: 3 },
    { id: 'v2', x: 180, y: 100, radius: 3 },
    { id: 'v3', x: 260, y: 180, radius: 3 },
    { id: 'v4', x: 330, y: 130, radius: 3 },
    { id: 'v5', x: 140, y: 170, radius: 3 },
    { id: 'v6', x: 200, y: 60, radius: 3 },
    { id: 'v7', x: 270, y: 110, radius: 3 },
    { id: 'v8', x: 110, y: 140, radius: 3 },
    { id: 'v9', x: 300, y: 200, radius: 3 },

    // Middle section - connecting sections
    { id: 'v10', x: 150, y: 280, radius: 4 },
    { id: 'v11', x: 250, y: 280, radius: 4 },

    // Middle section
    { id: 'v12', x: 100, y: 320, radius: 3 },
    { id: 'v13', x: 180, y: 350, radius: 3 },
    { id: 'v14', x: 270, y: 380, radius: 3 },
    { id: 'v15', x: 340, y: 350, radius: 3 },
    { id: 'v16', x: 120, y: 400, radius: 3 },
    { id: 'v17', x: 220, y: 430, radius: 3 },
    { id: 'v18', x: 280, y: 450, radius: 3 },
    { id: 'v19', x: 350, y: 410, radius: 3 },
    { id: 'v20', x: 180, y: 480, radius: 3 },
    { id: 'v21', x: 240, y: 510, radius: 3 },
    { id: 'v22', x: 300, y: 490, radius: 3 },

    // Middle-to-lower connection
    { id: 'v23', x: 120, y: 560, radius: 4 },
    { id: 'v24', x: 220, y: 560, radius: 4 },
    { id: 'v25', x: 320, y: 560, radius: 4 },

    // Lower section
    { id: 'v26', x: 90, y: 620, radius: 3 },
    { id: 'v27', x: 150, y: 650, radius: 3 },
    { id: 'v28', x: 230, y: 670, radius: 3 },
    { id: 'v29', x: 280, y: 640, radius: 3 },
    { id: 'v30', x: 350, y: 630, radius: 3 },
    { id: 'v31', x: 120, y: 690, radius: 3 },
    { id: 'v32', x: 200, y: 720, radius: 3 },
    { id: 'v33', x: 290, y: 750, radius: 3 },
    { id: 'v34', x: 170, y: 780, radius: 3 },
    { id: 'v35', x: 250, y: 810, radius: 3 },
    { id: 'v36', x: 320, y: 790, radius: 3 }
  ];

  const testPoints: TestPoint[] = [
    // Upper section
    { id: 'tp1', x: 50, y: 70, radius: 4 },
    { id: 'tp2', x: 310, y: 220, radius: 4 },
    { id: 'tp3', x: 190, y: 40, radius: 4 },

    // Middle section
    { id: 'tp4', x: 60, y: 350, radius: 4 },
    { id: 'tp5', x: 340, y: 450, radius: 4 },
    { id: 'tp6', x: 200, y: 380, radius: 4 },

    // Lower section
    { id: 'tp7', x: 70, y: 650, radius: 4 },
    { id: 'tp8', x: 330, y: 710, radius: 4 },
    { id: 'tp9', x: 220, y: 820, radius: 4 }
  ];

  // Primary trace paths - Upper section
  const primaryTracesUpper: string[] = [
    "M 30,20 H 100 V 80 H 150 V 150 H 230 V 190 H 320 V 250",
    "M 30,60 H 80 V 140 H 120 V 220 H 200 V 250",
    "M 30,100 H 60 V 180 H 120 V 220",
    "M 100,80 H 180 V 40 H 350",
    "M 230,150 H 270 V 90 H 320",
    "M 80,140 H 170 V 190 H 240 V 230",
    "M 320,90 H 380 V 150 H 350 V 180"
  ];

  // Primary trace paths - Middle section
  const primaryTracesMiddle: string[] = [
    "M 150,280 V 350 H 220 V 420 H 280 V 460 H 350",
    "M 250,280 V 330 H 340 V 380 H 390",
    "M 30,300 H 90 V 390 H 120 V 480 H 90 V 560",
    "M 30,350 H 70 V 420 H 130 V 500 H 160 V 560",
    "M 120,350 H 180 V 430 H 220 V 510 H 240 V 560",
    "M 280,450 H 300 V 500 H 320 V 560",
    "M 340,380 H 390 V 430 H 350 V 480"
  ];

  // Primary trace paths - Lower section
  const primaryTracesLower: string[] = [
    "M 120,560 V 600 H 180 V 660 H 240 V 700 H 300 V 780",
    "M 220,560 V 620 H 280 V 700 H 350 V 750",
    "M 320,560 V 630 H 350 V 670 H 370 V 720",
    "M 30,580 H 90 V 650 H 130 V 720 H 70 V 780",
    "M 30,650 H 70 V 690 H 120 V 750 H 180 V 780",
    "M 180,660 H 230 V 710 H 280 V 750",
    "M 300,700 H 380 V 770 H 320 V 820"
  ];

  // Secondary traces - Upper section with oscillating patterns
  const secondaryTracesUpper: string[] = [
    "M 80,40 H 100 V 60 H 140 Q 150,70 160,60 H 200 V 90 H 240 V 70",
    "M 270,110 Q 290,120 310,110 H 330 V 130 H 350",
    "M 110,140 Q 115,150 120,160 H 140 V 170 H 180 Q 190,180 200,170 V 150",
    "M 150,60 H 170 V 80 Q 180,90 190,100 H 210 V 120 H 270",
    "M 270,200 Q 280,210 290,200 H 310 V 180 Q 320,170 330,165 V 150",
    "M 180,100 Q 190,110 200,120 V 140 H 230",
    "M 100,180 H 130 V 200 Q 140,210 150,215 H 170",
    "M 330,50 Q 340,60 350,70 H 370 V 90",
    "M 60,140 H 70 V 160 Q 75,170 80,180 H 100",
    "M 240,70 Q 250,80 260,90 H 290 V 110 H 310",
    "M 210,230 H 230 V 210 Q 240,200 250,190 H 270",
    "M 330,130 Q 335,140 340,150 V 170 H 350",
    "M 270,110 H 290 V 130 H 310 V 150",
    "M 140,170 Q 150,180 160,180 H 180 V 190",
    "M 300,150 H 320 V 170 Q 330,180 340,180 H 350"
  ];

  // Secondary traces - Middle section
  const secondaryTracesMiddle: string[] = [
    "M 100,320 H 120 V 340 H 150 Q 160,350 170,340 H 200 V 360 H 220",
    "M 270,380 Q 290,390 310,380 H 340 V 350",
    "M 120,400 Q 130,410 140,420 H 160 V 430 H 190 Q 200,440 210,430 V 410",
    "M 180,350 H 200 V 370 Q 210,380 220,390 H 240 V 410 H 280",
    "M 280,450 Q 290,460 300,450 H 320 V 430 Q 330,420 340,415 V 400",
    "M 220,430 Q 230,440 240,450 V 470 H 260",
    "M 90,480 H 120 V 490 Q 130,500 140,510 H 160",
    "M 340,350 Q 350,360 360,370 H 380 V 390",
    "M 220,510 H 240 V 490 Q 250,480 260,470 H 280",
    "M 300,490 Q 310,500 320,510 V 530 H 340",
    "M 180,480 H 200 V 500 H 220 V 520",
    "M 70,390 Q 80,400 90,410 H 100 V 420"
  ];

  // Secondary traces - Lower section
  const secondaryTracesLower: string[] = [
    "M 90,620 H 110 V 640 H 130 Q 140,650 150,640 H 180 V 660 H 210",
    "M 280,640 Q 300,650 320,640 H 350 V 630",
    "M 120,690 Q 130,700 140,710 H 160 V 720 H 180 Q 190,730 200,720 V 700",
    "M 150,650 H 170 V 670 Q 180,680 190,690 H 210 V 710 H 250",
    "M 290,750 Q 300,760 310,750 H 330 V 730 Q 340,720 350,715 V 700",
    "M 200,720 Q 210,730 220,740 V 760 H 240",
    "M 70,720 H 100 V 740 Q 110,750 120,760 H 140",
    "M 350,630 Q 360,640 370,650 H 390 V 670",
    "M 230,670 H 250 V 690 Q 260,700 270,710 H 290",
    "M 250,810 H 270 V 790 Q 280,780 290,770 H 310",
    "M 320,790 Q 330,800 340,810 V 830 H 360",
    "M 170,780 H 190 V 800 H 210 V 820",
    "M 120,750 Q 130,760 140,770 H 160 V 780"
  ];

  // Connection traces between sections
  const sectionConnectors: string[] = [
    "M 150,250 V 280", // Upper to middle connector 1
    "M 250,250 V 280", // Upper to middle connector 2
    "M 120,530 V 560", // Middle to lower connector 1
    "M 220,530 V 560", // Middle to lower connector 2
    "M 320,530 V 560"  // Middle to lower connector 3
  ];

  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

  // Animation timing for pulse effects
  useEffect(() => {
    if (!animationActive || !boardRef.current) return;

    const animateTraces = () => {
      const allPrimaryPaths = [
        ...Array.from(boardRef.current.querySelectorAll('.primary-trace-upper path')),
        ...Array.from(boardRef.current.querySelectorAll('.section-connectors path')),
        ...Array.from(boardRef.current.querySelectorAll('.primary-trace-middle path')),
        ...Array.from(boardRef.current.querySelectorAll('.section-connectors path')),
        ...Array.from(boardRef.current.querySelectorAll('.primary-trace-lower path'))
      ];

      const allSecondaryPaths = [
        ...Array.from(boardRef.current.querySelectorAll('.secondary-trace-upper path')),
        ...Array.from(boardRef.current.querySelectorAll('.secondary-trace-middle path')),
        ...Array.from(boardRef.current.querySelectorAll('.secondary-trace-lower path'))
      ];

      const viaElements = boardRef.current.querySelectorAll('.via circle');
      const icElements = boardRef.current.querySelectorAll('.ic-chip');

      const totalPrimaryDuration = allPrimaryPaths.reduce((max, path, index) => {
        const length = path.getTotalLength();
        const delay = index * 200;
        const duration = Math.min(length * 8, 3000);
        return Math.max(max, delay + duration);
      }, 0);

      const totalSecondaryDuration = allSecondaryPaths.reduce((max, path, index) => {
        const length = path.getTotalLength();
        const delay = 1500 + index * 150;
        const duration = Math.min(length * 6, 2000);
        return Math.max(max, delay + duration);
      }, 0);

      const animationEndTime = Math.max(totalPrimaryDuration, totalSecondaryDuration) + 1000; // Add a buffer

      // Reset styles before re-animating
      allPrimaryPaths.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length as any;
        path.style.strokeDashoffset = length as any;
      });
      allSecondaryPaths.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length as any;
        path.style.strokeDashoffset = length as any;
      });
      viaElements.forEach(via => via.classList.remove('active'));
      icElements.forEach(ic => {
        const rect = ic.querySelector('rect');
        if (rect) {
          rect.classList.remove('active');
        }
      });

      // Animate primary traces
      allPrimaryPaths.forEach((path, index) => {
        const length = path.getTotalLength();
        const delay = index * 200;
        const duration = Math.min(length * 8, 3000);

        path.animate([
          { strokeDashoffset: length },
          { strokeDashoffset: 0 }
        ], {
          duration,
          delay,
          fill: 'forwards',
          easing: 'cubic-bezier(0.37, 0, 0.63, 1)'
        });

        // Start pulse animation immediately after the trace starts
        setTimeout(() => {
          createPulseAnimation(path, duration);
        }, delay);
      });

      // Animate secondary traces with staggered timing
      allSecondaryPaths.forEach((path, index) => {
        const length = path.getTotalLength();
        const delay = 1500 + index * 150;
        const duration = Math.min(length * 6, 2000);

        path.animate([
          { strokeDashoffset: length },
          { strokeDashoffset: 0 }
        ], {
          duration,
          delay,
          fill: 'forwards',
          easing: 'cubic-bezier(0.37, 0, 0.63, 1)'
        });

        // Start secondary pulse animation
        setTimeout(() => {
          createPulseAnimation(path, duration * 0.8);
        }, delay);
      });

      // Activate vias with a glow effect after traces are drawn
      viaElements.forEach((via, index) => {
        setTimeout(() => {
          via.classList.add('active');
        }, 2500 + index * 100);
      });

      // Activate ICs with a pulsing effect
      icElements.forEach((ic, index) => {
        setTimeout(() => {
          const rect = ic.querySelector('rect');
          if (rect) {
            rect.classList.add('active');
          }
        }, 4000 + index * 300);
      });

      // Schedule the next animation cycle
      animationTimeout.current = setTimeout(animateTraces, animationEndTime);
    };

    // Start the initial animation
    animateTraces();

    // Cleanup timeout on unmount
    return () => {
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }
    };
  }, [animationActive]);

  // Helper function to generate random colors
  const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Helper function to create pulse animations that travel along paths with random color
  const createPulseAnimation = (path: SVGPathElement, duration: number) => {
    const length = path.getTotalLength();
    const pulse = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    pulse.setAttribute("r", "2");
    pulse.setAttribute("class", "pulse");
    // pulse.setAttribute("fill", getRandomColor()); // Set random color

    path.parentNode?.appendChild(pulse);

    // Animation that follows the path
    const animatePulse = () => {
      const pulseDuration = duration * 0.7;
      let start: number | null = null;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / pulseDuration;

        if (progress < 1) {
          const point = path.getPointAtLength(length * progress);
          pulse.setAttribute("cx", point.x.toString());
          pulse.setAttribute("cy", point.y.toString());
          requestAnimationFrame(step);
        } else {
          pulse.remove();
          // Restart the pulse animation after a delay
          setTimeout(animatePulse, Math.random() * 2000 + 1000);
        }
      };

      requestAnimationFrame(step);
    };

    animatePulse();
  };

  // Function to generate pin connections for IC chips
  const generateICPins = (ic: IC): React.ReactNode[] => {
    const pins: React.ReactNode[] = [];
    const pinsPerSide = Math.floor(ic.pins / 4);
    const pinSpacing = {
      top: ic.width / (pinsPerSide + 1),
      right: ic.height / (pinsPerSide + 1),
      bottom: ic.width / (pinsPerSide + 1),
      left: ic.height / (pinsPerSide + 1)
    };

    // Top pins
    for (let i = 1; i <= pinsPerSide; i++) {
      pins.push(
        <rect key={`${ic.id}-top-${i}`} x={ic.x + i * pinSpacing.top} y={ic.y - 3} width="2" height="3" fill="#0f8" />
      );
    }

    // Right pins
    for (let i = 1; i <= pinsPerSide; i++) {
      pins.push(
        <rect key={`${ic.id}-right-${i}`} x={ic.x + ic.width} y={ic.y + i * pinSpacing.right} width="3" height="2" fill="#0f8" />
      );
    }

    // Bottom pins
    for (let i = 1; i <= pinsPerSide; i++) {
      pins.push(
        <rect key={`${ic.id}-bottom-${i}`} x={ic.x + i * pinSpacing.bottom} y={ic.y + ic.height} width="2" height="3" fill="#0f8" />
      );
    }

    // Left pins
    for (let i = 1; i <= pinsPerSide; i++) {
      pins.push(
        <rect key={`${ic.id}-left-${i}`} x={ic.x - 3} y={ic.y + i * pinSpacing.left} width="3" height="2" fill="#0f8" />
      );
    }

    return pins;
  };

  return (
    <div className="cyberpunk-pcb-container">
      <svg
        ref={boardRef}
        viewBox="0 0 400 900"
        className="cyberpunk-pcb"
        style={{
          background: 'linear-gradient(to bottom, #000, #001a09)',
          width: '100vw',
          height: '450vh'
        }}
      >
        {/* Grid pattern overlay */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0f8" strokeWidth="0.5" strokeOpacity="0.15" />
          </pattern>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <rect width="400" height="900" fill="url(#grid)" />

        {/* Edge connectors */}
        <g className="edge-connectors">
          {/* Upper section */}
          <rect x="10" y="20" width="20" height="5" fill="#0f8" />
          <rect x="10" y="60" width="20" height="5" fill="#0f8" />
          <rect x="10" y="100" width="20" height="5" fill="#0f8" />

          {/* Middle section */}
          <rect x="10" y="300" width="20" height="5" fill="#0f8" />
          <rect x="10" y="350" width="20" height="5" fill="#0f8" />

          {/* Lower section */}
          <rect x="10" y="580" width="20" height="5" fill="#0f8" />
          <rect x="10" y="650" width="20" height="5" fill="#0f8" />

          {/* Right side connections */}
          <rect x="370" y="250" width="20" height="5" fill="#0f8" />
          <rect x="370" y="390" width="20" height="5" fill="#0f8" />
          <rect x="370" y="670" width="20" height="5" fill="#0f8" />
          <rect x="370" y="720" width="20" height="5" fill="#0f8" />
          <rect x="370" y="830" width="20" height="5" fill="#0f8" />
        </g>

        {/* Section connectors - these connect the three main sections */}
        <g className="section-connectors">
          {sectionConnectors.map((d, i) => (
            <path
              key={`connector-${i}`}
              d={d}
              fill="none"
              stroke="#0f8"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* Primary traces - Upper section */}
        <g className="primary-trace-upper">
          {primaryTracesUpper.map((d, i) => (
            <path
              key={`primary-upper-${i}`}
              d={d}
              fill="none"
              stroke="#0f8"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* Primary traces - Middle section */}
        <g className="primary-trace-middle">
          {primaryTracesMiddle.map((d, i) => (
            <path
              key={`primary-middle-${i}`}
              d={d}
              fill="none"
              stroke="#0f8"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* Primary traces - Lower section */}
        <g className="primary-trace-lower">
          {primaryTracesLower.map((d, i) => (
            <path
              key={`primary-lower-${i}`}
              d={d}
              fill="none"
              stroke="#0f8"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* Secondary traces - Upper section */}
        <g className="secondary-trace-upper">
          {secondaryTracesUpper.map((d, i) => (
            <path
              key={`secondary-upper-${i}`}
              d={d}
              fill="none"
              stroke="#0f8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* Secondary traces - Middle section */}
        <g className="secondary-trace-middle">
          {secondaryTracesMiddle.map((d, i) => (
            <path
              key={`secondary-middle-${i}`}
              d={d}
              fill="none"
              stroke="#0f8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* Secondary traces - Lower section */}
        <g className="secondary-trace-lower">
          {secondaryTracesLower.map((d, i) => (
            <path
              key={`secondary-lower-${i}`}
              d={d}
              fill="none"
              stroke="#0f8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* Vias/Connection nodes */}
        <g className="vias">
          {vias.map(via => (
            <circle
              key={via.id}
              cx={via.x}
              cy={via.y}
              r={via.radius}
              fill="#111"
              stroke="#0f8"
              strokeWidth="1"
              className="via"
            />
          ))}
        </g>

        {/* Test points */}
        <g className="test-points">
          {testPoints.map(point => (
            <g key={point.id}>
              <circle
                cx={point.x}
                cy={point.y}
                r={point.radius}
                fill="#111"
                stroke="#0f8"
                strokeWidth="1"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={point.radius - 2}
                fill="#0f8"
                opacity="0.5"
              />
            </g>
          ))}
        </g>

        {/* IC chips */}
        <g className="ic-components">
          {ICs.map(ic => (
            <g key={ic.id} className="ic-chip">
              <rect
                x={ic.x}
                y={ic.y}
                width={ic.width}
                height={ic.height}
                fill="#111"
                stroke="#222"
                strokeWidth="1"
                rx="2"
                ry="2"
              />
              <text
                x={ic.x + ic.width / 2}
                y={ic.y + ic.height / 2 + 4}
                fill="#0f8"
                fontSize="8"
                textAnchor="middle"
              >
                {ic.id.toUpperCase()}
              </text>
              {generateICPins(ic)}
            </g>
          ))}
        </g>

        {/* SMD components */}
        <g className="smd-components">
          {SMDs.map(smd => (
            <g key={smd.id}>
              <rect
                x={smd.x}
                y={smd.y}
                width={smd.width}
                height={smd.height}
                fill={smd.type === 'resistor' ? '#121' : '#112'}
                stroke="#0f8"
                strokeWidth="0.5"
                rx="1"
                ry="1"
              />
              {smd.type === 'resistor' && (
                <line
                  x1={smd.x + 2}
                  y1={smd.y + smd.height / 2}
                  x2={smd.x + smd.width - 2}
                  y2={smd.y + smd.height / 2}
                  stroke="#0f8"
                  strokeWidth="0.5"
                  strokeDasharray="1,1"
                />
              )}
              {smd.type === 'capacitor' && (
                <>
                  <line
                    x1={smd.x + smd.width / 2}
                    y1={smd.y + 1}
                    x2={smd.x + smd.width / 2}
                    y2={smd.y + smd.height - 1}
                    stroke="#0f8"
                    strokeWidth="0.5"
                  />
                  <line
                    x1={smd.x + smd.width / 2 - 2}
                    y1={smd.y + smd.height / 2}
                    x2={smd.x + smd.width / 2 + 2}
                    y2={smd.y + smd.height / 2}
                    stroke="#0f8"
                    strokeWidth="0.5"
                  />
                </>
              )}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default CyberpunkPCB;