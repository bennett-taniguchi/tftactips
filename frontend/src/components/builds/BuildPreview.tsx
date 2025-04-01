import React from 'react';
import TraitIcon from '../trait/TraitIcon';
import { cn } from '@/lib/utils';

const TFTCompPreview = ({tier}:any) => {
  // Sample data
  const compName = "Anima Squad Vertical";
  const traits = [
    { name: "Anima Squad", count: 8 },
    { name: "Challenger", count: 4 },
    { name: "Marksman", count: 2 },
    { name: "Duelist", count: 2 }
  ];
  
  const units = [
    { name: "Riven", cost: "blue", image: "/api/placeholder/60/60" },
    { name: "Jinx", cost: "gold", image: "/api/placeholder/60/60" },
    { name: "Miss Fortune", cost: "purple", image: "/api/placeholder/60/60" },
    { name: "Jhin", cost: "gold", image: "/api/placeholder/60/60" },
    { name: "Kai'Sa", cost: "purple", image: "/api/placeholder/60/60" },
    { name: "Irelia", cost: "green", image: "/api/placeholder/60/60" },
    { name: "Yasuo", cost: "blue", image: "/api/placeholder/60/60" },
    { name: "Neeko", cost: "silver", image: "/api/placeholder/60/60" }
  ];
  
  const placement = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 0],
    [1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
  
  const carries = [
    { 
      name: "Jinx", 
      image: "/api/placeholder/60/60",
      items: [
        { name: "Infinity Edge", filled: true },
        { name: "Last Whisper", filled: true },
        { name: "Giant Slayer", filled: true }
      ]
    },
    { 
      name: "Miss Fortune", 
      image: "/api/placeholder/60/60",
      items: [
        { name: "Jeweled Gauntlet", filled: true },
        { name: "Archangel's Staff", filled: true },
        { name: "Blue Buff", filled: false }
      ]
    }
  ];

  // Cost color mapping
  const getCostColor = (cost:any) => {
    switch(cost) {
      case 'silver': return 'border-gray-400 bg-gray-800';
      case 'green': return 'border-green-500 bg-green-900';
      case 'blue': return 'border-blue-500 bg-blue-900';
      case 'purple': return 'border-purple-500 bg-purple-900';
      case 'gold': return 'border-yellow-400 bg-yellow-900';
      default: return 'border-gray-400 bg-gray-800';
    }
  };
  let gradientString = "from-purple-400 to-blue-500"
 // let bgString= "bg-gradient-to-r from-gray-900 from-50% via-red-500/50 via-70% to-black to-90% "
   let bgString= " bg-linear-[155deg,black_5%,red_60%,orange_90%,yellow] "
  if(tier=='S') {
    gradientString = 'from-red-400 to-orange-500'
   
  } else if(tier=="A") {
gradientString = 'from-blue-400 to-purple-500'
 bgString= "bg-linear-[155deg,teal_5%,purple_60%,blue_90%,teal]"
  } else {
gradientString = 'from-green-200 to-amber-200'
  bgString= "bg-linear-[155deg,teal_5%,pink_60%,green_90%,lime]"
  }
 
  return (
    <div className={cn("w-full   p-4  rounded-lg border border-purple-500/50 mb-5 ",bgString)}>
      <div className="flex flex-col gap-4">
        {/* Row with all sections */}
        <div className="flex flex-row items-start gap-4">
          {/* Comp Name */}
          <div className="w-48 ">
            <h3 className={cn("text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r   mb-1" , gradientString)}>  {compName} </h3>
            
            <div className="w-64f">
            <h3 className={cn("text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r  mb-1",gradientString)}>Traits</h3>
            <div className="  flex flex-wrap gap-2 bg-gray-900/50 p-5">
              {traits.map((trait, index) => (
                <div key={index} className="relative   flex items-center justify-center" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
                   <TraitIcon   isPrismatic bgColor='bg-black/30' size={60} src="https://tft-set14.s3.us-east-2.amazonaws.com/traits/tft14_emblem_cyberboss-tft_set14+(1).png"/>
                  
                 </div>
              ))}

<div className='border-black border bg-white rounded-full w-7 h-7 text-center   z-50    text-xl font-extrabold  '>   <span className=' text-purple-600'>{3}</span>
</div>
            </div>
          </div>
          </div>
          
          {/* Traits */}
         
          
          {/* Units */}
          <div className="w-64">
            <h3 className={cn("text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r   mb-1 ",gradientString)}>Units</h3>
            <div className="flex flex-wrap gap-2">
              {units.map((unit, index) => (
                <div key={index} className={`w-12 h-12 rounded-full ${getCostColor(unit.cost)} border-2 overflow-hidden flex items-center justify-center`}>
                  <img src={unit.image} alt={unit.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Placement */}
          <div className="w-200 ">
            <h3 className={cn("text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r   mb-1 ",gradientString)}>Placement</h3>
            <div className="flex flex-col gap-1">
              {placement.map((row, rowIndex) => (
                <div key={rowIndex} className="flex" style={{ marginLeft: rowIndex % 2 === 0 ? '0' : '20px' }}>
                  {row.map((cell, cellIndex) => (
                    <div 
                      key={cellIndex} 
                      className={`w-17 h-17 m-0.5 ${cell ? 'bg-purple-800' : 'bg-blue-200'}`}
                      style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Carries Section */}
        <div  >
          <h3 className={cn("text-right text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r   mb-1 ", gradientString)}>Carries</h3>
          <div className="flex gap-4  justify-end">
            {carries.map((carry, index) => (
              <div key={index} className="flex bg-gray-800/60 p-2 rounded border border-purple-500/30">
                <div className="w-12 h-12 rounded-full border-2 border-yellow-400 bg-yellow-900 overflow-hidden mr-2">
                  <img src={carry.image} alt={carry.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-gray-100 font-medium mb-1">{carry.name}</p>
                  <div className="flex gap-1">
                    {carry.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex} 
                        className={`w-6 h-6 rounded ${item.filled ? 'bg-gradient-to-br from-purple-500 to-blue-600' : 'bg-gray-700'} flex items-center justify-center text-xs text-white`}
                      >
                        {itemIndex + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TFTCompPreview;