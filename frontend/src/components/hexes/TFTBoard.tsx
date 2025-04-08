import  { useState } from 'react';

const Hex = ({ row, col, children }:any) => {
  return (
    <div 
      className="relative flex items-center justify-center"
      style={{
        width: '100px',
        height: '87px',
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        backgroundColor: ((row + col) % 2 === 0) ? '#8a9eb5' : '#647d98',
        border: '1px solid #3a4a5c',
      }}
    >
      {children || `${row},${col}`}
    </div>
  );
};

export const TFTBoard = ({ renderHexContent }:any) => {
  // Define board layout: 4 rows, alternating between 7 hexes
  const boardLayout = [
    { rowIndex: 0, hexCount: 7, offset: false },
    { rowIndex: 1, hexCount: 7, offset: true },
    { rowIndex: 2, hexCount: 7, offset: false },
    { rowIndex: 3, hexCount: 7, offset: true },
  ];

  // Calculate dimensions
  const hexWidth = 100;  // width of a hex in pixels
  const hexHeight = 100;  // height of a hex in pixels
  const horizontalSpacing = 1;  // Horizontal spacing between hexes
  const verticalSpacing = 19;    // Additional vertical spacing
  
  // Calculate row y-positions with proper spacing
  const rowVerticalOffset = hexHeight * 0.75 + verticalSpacing; // 75% of hex height + spacing

  return (
    <div className="relative mx-auto my-8" style={{ width: `${(hexWidth + horizontalSpacing) * 8}px`, height: `${rowVerticalOffset * 4}px` }}>
      {boardLayout.map((row) => (
        <div 
          key={`row-${row.rowIndex}`} 
          className="relative"
          style={{ 
            position: 'absolute',
            top: `${row.rowIndex * rowVerticalOffset}px`,
            left: row.offset ? `${hexWidth / 1.85}px` : 0,
          }}
        >
          <div className="flex flex-row gap-2">
            {Array.from({ length: row.hexCount }).map((_, colIndex) => (
              <div 
                key={`hex-${row.rowIndex}-${colIndex}`} 
                className="relative "
                style={{ 
                  marginRight: `${horizontalSpacing}px`,
                }}
              >
                <Hex 
                  row={row.rowIndex} 
                  col={colIndex}
                >
                  {renderHexContent && renderHexContent(row.rowIndex, colIndex)}
                </Hex>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Enhanced TFT Board with Container
const TFTBoardWithContainer = () => {
  const [containerBgColor, setContainerBgColor] = useState('#1e293b');
  const [containerBorderColor, setContainerBorderColor] = useState('#475569');
  
  const renderCustomHexContent = (row:any, col:any) => {
    return (
      <div className="text-white font-bold">
        {row},{col}
      </div>
    );
  };

  // Calculate the container dimensions based on the board size
  // Adding extra padding around the board
  const containerWidth = 900; // Wide enough to contain the board
  const containerHeight = 500; // Tall enough to contain all rows

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-center mb-4">TFT Board</h1>
      
      {/* Color controls - optional */}
      <div className="mb-4 flex gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Background:</label>
          <input 
            type="color" 
            value={containerBgColor}
            onChange={(e) => setContainerBgColor(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Border:</label>
          <input 
            type="color" 
            value={containerBorderColor}
            onChange={(e) => setContainerBorderColor(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      
      {/* Container with background and border */}
      <div 
        className="relative rounded-lg p-4 flex items-center justify-center"
        style={{
          backgroundColor: containerBgColor,
          borderColor: containerBorderColor,
          borderWidth: '3px',
          borderStyle: 'solid',
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
          overflow: 'hidden'
        }}
      >
        {/* Board container with proper centering and scaling if needed */}
        <div className="transform scale-100 flex items-center justify-center" style={{ width: '100%', height: '100%' }}>
          <TFTBoard renderHexContent={renderCustomHexContent} />
        </div>
      </div>
    </div>
  );
};

export default TFTBoardWithContainer;