import React from 'react';

interface TftacLogoProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const TftacLogo: React.FC<TftacLogoProps> = ({ 
  width = 320, 
  height = 150,
  className = ''
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 320 150"
      width={width}
      height={height}
      className={className}
    >
      <defs>
        <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      
      <style>
        {`
          .unified-outline {
            stroke: #6D28D9;
            stroke-width: 2;
            fill: none;
          }
          
          .quad-panel {
            stroke: none;
            fill: rgba(167, 139, 250, 0.05);
          }
          
          .title {
            font-family: 'Arial', sans-serif;
            font-weight: bold;
            font-size: 15px;
            fill: url(#titleGradient);
          }
        `}
      </style>
      
      <g transform="translate(160, 70)">
        {/* Single unified outline for the entire shape */}
        <polygon 
          className="unified-outline" 
          points="-80,0 -60,-35 0,-35 60,-35 80,0 60,35 0,35 -60,35"
        >
          <animate 
            attributeName="stroke" 
            values="#6D28D9;#3B82F6;#6D28D9" 
            dur="4s" 
            repeatCount="indefinite" 
          />
        </polygon>
        
        {/* Top-Left Panel */}
        <polygon 
          className="quad-panel" 
          points="-80,0 -60,-35 0,-35 0,0"
        >
          <animate 
            attributeName="fill" 
            values="rgba(167, 139, 250, 0.05);rgba(59, 130, 246, 0.3);rgba(167, 139, 250, 0.05)" 
            dur="6s" 
            repeatCount="indefinite" 
            begin="0s" 
          />
        </polygon>
        
        {/* Bottom-Left Panel */}
        <polygon 
          className="quad-panel" 
          points="-80,0 -60,35 0,35 0,0"
        >
          <animate 
            attributeName="fill" 
            values="rgba(167, 139, 250, 0.05);rgba(59, 130, 246, 0.3);rgba(167, 139, 250, 0.05)" 
            dur="6s" 
            repeatCount="indefinite" 
            begin="1.5s" 
          />
        </polygon>
        
        {/* Top-Right Panel */}
        <polygon 
          className="quad-panel" 
          points="0,0 0,-35 60,-35 80,0"
        >
          <animate 
            attributeName="fill" 
            values="rgba(167, 139, 250, 0.05);rgba(59, 130, 246, 0.3);rgba(167, 139, 250, 0.05)" 
            dur="6s" 
            repeatCount="indefinite" 
            begin="3s" 
          />
        </polygon>
        
        {/* Bottom-Right Panel */}
        <polygon 
          className="quad-panel" 
          points="0,0 0,35 60,35 80,0"
        >
          <animate 
            attributeName="fill" 
            values="rgba(167, 139, 250, 0.05);rgba(59, 130, 246, 0.3);rgba(167, 139, 250, 0.05)" 
            dur="6s" 
            repeatCount="indefinite" 
            begin="4.5s" 
          />
        </polygon>
      </g>
      
      {/* Title text with gradient */}
      <text className="title" x="160" y="70" textAnchor="middle" dominantBaseline="middle">
        loading...
      </text>
    </svg>
  );
};

export default TftacLogo;