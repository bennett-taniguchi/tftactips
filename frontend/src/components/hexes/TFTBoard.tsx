import { useState, useRef, useEffect } from 'react';
import { getChampionImageUrl } from '../champion/ChampionBox';
import { ChampionRow } from '../champion/ChampionHierarchy';

// Type definitions
interface Champion {
  id?: string;
  name: string;
  imageUrl?: string;
  cost?: number;
  traits?: string[];
  [key: string]: any; // Allow for additional properties
}

interface PlacedChampions {
  [position: string]: Champion;
}

interface BoardLayout {
  rowIndex: number;
  hexCount: number;
  offset: boolean;
}

interface HexProps {
  row: number;
  col: number;
  champion: Champion | null;
  onDrop: (row: number, col: number, champion: Champion) => void;
  onRemove: (row: number, col: number) => void;
  size: number;
}

interface TFTBoardProps {
  onDropChampion: (row: number, col: number, champion: Champion) => void;
  onRemoveChampion: (row: number, col: number) => void;
  placedChampions?: PlacedChampions;
  containerRef: React.RefObject<HTMLDivElement>;
}

interface DraggableChampionProps {
  champion: Champion;
  onDragStart?: (champion: Champion) => void;
}

interface TFTBoardContainerProps {
  champions: Champion[];
  onDropChampion?: (row: number, col: number, champion: Champion) => void;
  onRemoveChampion?: (row: number, col: number) => void;
  placedChampions?: PlacedChampions;
  containerRef?: React.RefObject<HTMLDivElement>;
}

// Individual hexagon component with drag-and-drop support
const Hex: React.FC<HexProps> = ({ row, col, champion, onDrop, onRemove, size }) => {
  const [isOver, setIsOver] = useState<boolean>(false);
  const hexRef = useRef<HTMLDivElement>(null);

  // Calculate hex dimensions based on size prop
  const hexWidth = size;
  const hexHeight = size * 0.866; // Height to width ratio for regular hexagon

  // Drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    const championData = JSON.parse(e.dataTransfer.getData('champion'));
    onDrop(row, col, championData);
  };

  const handleClick = () => {
    if (champion) {
      onRemove(row, col);
    }
  };

  return (
    <div 
      ref={hexRef}
      className={`relative flex items-center justify-center transition-colors duration-200 ${isOver ? 'ring-2 ring-yellow-400' : ''}`}
      style={{
        width: `${hexWidth}px`,
        height: `${hexHeight}px`,
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        backgroundColor: champion 
          ? 'rgba(60, 60, 100, 0.5)' 
          : ((row + col) % 2 === 0) ? 'rgba(138, 158, 181, 0.7)' : 'rgba(100, 125, 152, 0.7)',
        border: '1px solid #3a4a5c',
        cursor: champion ? 'pointer' : 'default',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {champion ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={getChampionImageUrl(champion.parsedData.apiName)}
            alt={champion.name}
            className="w-4/5 h-4/5 object-contain rounded-full"
          />
          <span className="absolute bottom-1 text-xs font-bold text-white drop-shadow-md">
            {champion.name}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export const TFTBoard: React.FC<TFTBoardProps> = ({ 
  onDropChampion, 
  onRemoveChampion, 
  placedChampions = {}, 
  containerRef 
}) => {
  // Board layout: 4 rows with 7 hexes each
  const boardLayout: BoardLayout[] = [
    { rowIndex: 0, hexCount: 7, offset: false },
    { rowIndex: 1, hexCount: 7, offset: true },
    { rowIndex: 2, hexCount: 7, offset: false },
    { rowIndex: 3, hexCount: 7, offset: true },
  ];

  const [boardSize, setBoardSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [hexSize, setHexSize] = useState<number>(60); // default size

  // Calculate board dimensions based on container size
  useEffect(() => {
    if (!containerRef?.current) return;

    const resizeBoard = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Calculate the maximum size a hex can be to fit properly
      // We need 7 hexes horizontally (plus some offset)
      const maxHexWidth = containerWidth / 8;
      
      // We need 4 rows, with each row at 75% height of the hex (for overlap)
      const maxHexHeight = containerHeight / (3 + 0.75);
      
      // Calculate max hex size based on width/height constraints
      // For a regular hexagon, height = width * 0.866
      const maxHexSizeByWidth = maxHexWidth;
      const maxHexSizeByHeight = maxHexHeight / 0.866;
      
      // Use the smaller of the two constraints
      const newHexSize = Math.min(maxHexSizeByWidth/1.4, maxHexSizeByHeight/1.4);
      
      setHexSize(newHexSize);
      setBoardSize({
        width: containerWidth,
        height: containerHeight
      });
    };

    // Initial sizing
    resizeBoard();
    
    // Listen for resize events
    window.addEventListener('resize', resizeBoard);
    return () => window.removeEventListener('resize', resizeBoard);
  }, [containerRef]);

  // Calculate spacing for the hexes
  const rowHeight = hexSize * .9; // 75% of hex height for proper overlap
 
  return (
    <div 
      className="mt-10 ml-30  relative w-full h-full flex items-center justify-center"
      style={{ minHeight: `${rowHeight * 4.5}px` }}
    >
      {boardLayout.map((row) => (
        <div 
          key={`row-${row.rowIndex}`} 
          className="absolute"
          style={{ 
            top: `${row.rowIndex * rowHeight}px`,
            left: row.offset ? `${hexSize / 1.85}px` : 0,
            display: 'flex',
            flexDirection: 'row',
            gap: `${hexSize * 0.1}px`
          }}
        >
          {Array.from({ length: row.hexCount }).map((_, colIndex) => {
            const position = `${row.rowIndex},${colIndex}`;
            const champion = placedChampions[position] || null;
            
            return (
              <div 
                key={`hex-${row.rowIndex}-${colIndex}`} 
                className="relative"
              >
                <Hex 
                  row={row.rowIndex} 
                  col={colIndex}
                  champion={champion}
                  onDrop={(row, col, champion) => onDropChampion(row, col, champion)}
                  onRemove={(row, col) => onRemoveChampion(row, col)}
                  size={hexSize}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Draggable champion component for the champion selection
export const DraggableChampion: React.FC<DraggableChampionProps> = ({ champion, onDragStart }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('champion', JSON.stringify(champion));
    if (onDragStart) onDragStart(champion);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center    rounded cursor-grab hover:ring-1 ring-white transition-colors"
      draggable
      onDragStart={handleDragStart}
    >
      <ChampionRow champion={champion as any} style='w-[200px] h-[60px]'/>
      <span className="mt-1 text-xs font-medium text-white">{champion.name}</span>
    </div>
  );
};

// Sample usage in EditableBuildScreen
export const TFTBoardContainer: React.FC<TFTBoardContainerProps> = ({ 
  champions,
  onDropChampion,
  onRemoveChampion,
  placedChampions: externalPlacedChampions,
  containerRef: externalContainerRef
}) => {
  const internalContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = externalContainerRef || internalContainerRef;
  const [internalPlacedChampions, setInternalPlacedChampions] = useState<PlacedChampions>({});
  
  // Use either external or internal state
  const placedChampions = externalPlacedChampions || internalPlacedChampions;

  const handleDropChampion = (row: number, col: number, champion: Champion) => {
    if (onDropChampion) {
      onDropChampion(row, col, champion);
    } else {
      setInternalPlacedChampions(prev => ({
        ...prev,
        [`${row},${col}`]: champion
      }));
    }
  };

  const handleRemoveChampion = (row: number, col: number) => {
    if (onRemoveChampion) {
      onRemoveChampion(row, col);
    } else {
      setInternalPlacedChampions(prev => {
        const updated = { ...prev };
        delete updated[`${row},${col}`];
        return updated;
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-black/30 rounded-md relative overflow-hidden "
      style={{
        boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 100, 0, 0.2)",
        border: "1px solid rgba(255, 100, 0, 0.3)",
        minHeight: "300px" // Set minimum height
      }}
    >
      <TFTBoard
        onDropChampion={handleDropChampion}
        onRemoveChampion={handleRemoveChampion}
        placedChampions={placedChampions}
        containerRef={containerRef as any}
      />
    </div>
  );
};

// // You'll need to implement or import getChampionImage function
// // Here's a placeholder implementation
// const getChampionImage = (championName: string): string => {
//   // Replace with your actual implementation
//   return `/champion-images/${championName.toLowerCase()}.png`;
// };

export default TFTBoardContainer;