import { useState, useRef, useEffect } from 'react';
import { getChampionImageUrl } from '../champion/ChampionBox';
import { ChampionRow } from '../champion/ChampionHierarchy';
import { cn } from '@/lib/utils';

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
  onDrop: (row: number, col: number, champion: Champion, sourcePosition: { row: number, col: number } | null) => void;
  onRemove: (row: number, col: number) => void;
  size: number;
}

interface TFTBoardProps {
  onDropChampion: (row: number, col: number, champion: Champion, sourcePosition: { row: number, col: number } | null) => void;
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
  onDropChampion?: (row: number, col: number, champion: Champion, sourcePosition: { row: number, col: number } | null) => void;
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
    // change to remove from starting square
    isOver;
    onRemove(row,col)
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    const championData = JSON.parse(e.dataTransfer.getData('champion'));
    
    // Get source position if this was dragged from another hex
    const sourcePosition = e.dataTransfer.getData('sourcePosition');
    
    onDrop(row, col, championData, sourcePosition ? JSON.parse(sourcePosition) : null);
  };

  // Add drag start functionality for occupied hexes
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (champion) {
      e.dataTransfer.setData('champion', JSON.stringify(champion));
      // Store the source position to handle swapping
      e.dataTransfer.setData('sourcePosition', JSON.stringify({ row, col }));
     
    }
  };

  const handleClick = () => {
    if (champion) {
      onRemove(row, col);
    }
  };
function getHexColor(champion: Champion | null) {
  if(!champion) return " "
  if(champion.parsedData.cost==1) {
    return "bg-stone-500 "
  }
  if(champion.parsedData.cost==2) {
    return "bg-green-400 "
  }
  if(champion.parsedData.cost==3) {
    return "bg-blue-400"
  }
  if(champion.parsedData.cost==4) {
     return "bg-purple-400"
  }
   return "bg-orange-400"
}
// function getBorderColor(champion: Champion) {
//   if(champion.parsedData.cost==1) {
//     return "border-white "
//   }
//   if(champion.parsedData.cost==2) {
//     return "border-green-400 "
//   }
//   if(champion.parsedData.cost==3) {
//     return "border-blue-400"
//   }
//   if(champion.parsedData.cost==4) {
//      return "border-purple-400"
//   }
//    return "border-orange-400"
// }
  return (
    <div 
      ref={hexRef}
      className={cn(` relative flex items-center justify-center transition-colors duration-200  `, getHexColor(champion!))}
      style={{
        width: `${hexWidth}px`,
        height: `${hexHeight}px`,
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        backgroundColor: champion 
          ? ' ' 
          : ((row + col) % 2 === 0) ? 'rgba(100, 125, 152, 0.5)' : 'rgba(100, 125, 152, 0.5)',
       
        cursor: champion ? 'grab' : 'default',
      }}
      draggable={champion !== null}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {champion ? (
        <div className={cn("inset-0 flex items-center justify-center   ", getHexColor(champion))}>
          <img 
            src={getChampionImageUrl(champion.parsedData.apiName)}
            alt={champion.name}
            className="w-4/5 h-4/5 object-contain rounded-full"
          />
          <div className={cn("bottom-1 text-center text-xs font-light bg-black/90 mx-2  w-5/8 border-b-3 border-black -mb-2 rounded-xl align-text-bottom text-white absolute " )}>
            {champion.parsedData.name}
          </div>
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
    boardSize;
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
      className="m-auto flex mt-2 w-15/20 relative"
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
                  onDrop={(row, col, champion, sourcePosition) => onDropChampion(row, col, champion, sourcePosition)}
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
      className="relative flex flex-col items-center justify-center rounded cursor-grab outline-none hover:outline-dotted outline-white/50 transition-colors"
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

  const handleDropChampion = (
    row: number, 
    col: number, 
    champion: Champion, 
    sourcePosition: { row: number, col: number } | null
  ) => {
    if (onDropChampion) {
      // If using external state management
      onDropChampion(row, col, champion, sourcePosition);
    } else {
      // Using internal state management
      const targetPosition = `${row},${col}`;
      
      if (sourcePosition) {
        // This is a drag from another hex
        const sourcePos = `${sourcePosition.row},${sourcePosition.col}`;
        const targetChampion = placedChampions[targetPosition];
        
        setInternalPlacedChampions(prev => {
          const updated = { ...prev };
          
          if (targetChampion) {
            // Swap champions
            updated[sourcePos] = targetChampion;
          } else {
            // Just remove from the old position
            delete updated[sourcePos];
          }
          
          // Set the champion in the new position
          updated[targetPosition] = champion;
          
          return updated;
        });
      } else {
        // Regular drop from outside
        setInternalPlacedChampions(prev => ({
          ...prev,
          [targetPosition]: champion
        }));
      }
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
      className="w-full h-full bg-black/30 rounded--b-md relative overflow-hidden border-emerald-400/50 border"
      style={{
       
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

export default TFTBoardContainer;