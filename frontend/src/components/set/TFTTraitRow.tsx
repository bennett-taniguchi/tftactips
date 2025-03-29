import TraitIcon from "../trait/TraitIcon";

  const TFTTraitRow = () => {
  // Sample data - replace with your actual data
  const traitData = {
    name: "Anima Squad",
    description: "Anima Squad champions gain bonus health and damage. When an Anima Squad champion scores a takedown, they gain a stack of Fame, increasing their bonus health and damage.",
    levels: [
      { threshold: 3, bonus: "15% bonus health and 15% bonus damage" },
      { threshold: 5, bonus: "40% bonus health and 40% bonus damage" },
      { threshold: 7, bonus: "70% bonus health and 70% bonus damage" }
    ],
    champions: [
      { name: "Sylas", cost: 1, image: "https://tft-set14.s3.us-east-2.amazonaws.com/champions/tft14_sylas_small.png" },
      { name: "Vayne", cost: 2, image: "https://tft-set14.s3.us-east-2.amazonaws.com/champions/tft14_vayne_small.png" },
      { name: "Yuumi", cost: 3, image: "https://tft-set14.s3.us-east-2.amazonaws.com/champions/tft14_yuumi_small.png" },
      { name: "Xayah", cost: 4, image: "https://tft-set14.s3.us-east-2.amazonaws.com/champions/tft14_xayah_small.png" },
      { name: "Aurora", cost: 5, image: "https://tft-set14.s3.us-east-2.amazonaws.com/champions/tft14_aurora_small.png" }
    ],
    image: "https://tft-set14.s3.us-east-2.amazonaws.com/traits/animasquadcrest_ii-tft_set14+(1).png"
  };

  // Cost-based border colors
  const getCostBorderColor = (cost:number) => {
    switch(cost) {
      case 1: return "border-gray-400"; // Gray for 1-cost
      case 2: return "border-green-500"; // Green for 2-cost
      case 3: return "border-blue-500"; // Blue for 3-cost
      case 4: return "border-purple-500"; // Purple for 4-cost
      case 5: return "border-yellow-500"; // Gold for 5-cost
      default: return "border-gray-300";
    }
  };
function getBgColor(num:number) {
  if(num == 3) return "bg-amber-600"
   if(num == 5) return "bg-amber-400"
    if(num == 7) return "bg-purple-400"
}
  return (
    <div className="flex flex- md:flex-row bg-gray-800 rounded-lg p-4 my-2 text-white w-full">
      {/* Trait Icon Section */}
      <div className="flex-shrink-0 mr-4 mt-2">
        <div className="flex justify-center items-center h-16 w-16  border-2 border-amber-300 rounded-md overflow-hidden">
          <img 
            src={traitData.image} 
            alt={traitData.name} 
            className="max-h-12 max-w-12 object-contain  "
          />
        </div>
        <div className="text-center mt-1">
          {/* <span className="text-sm font-medium">{traitData.name}</span> */}
        </div>
      </div>
     
      {/* Trait Info Section */}
      <div className="flex-grow mt-2 md:mt-0">
        <div className="mb-2">
          <h3 className="text-xl font-bold text-amber-300">{traitData.name}</h3>
          <p className="text-gray-300 text-sm">{traitData.description}</p>
        </div>
        
        {/* Trait Levels */}
        <div className="mb-3">
  <div className="flex flex-col   bg-gray-700 w-[300px]">
    {traitData.levels.map((level, index) => (
      <div key={index} className="flex flex-row items-center border-b-4 border-gray-800  ">
        
       {level.threshold==7
       ?
       <TraitIcon    num={level.threshold} size={20}   isPrismatic={true} borderWidth={2}/>
        :
        <TraitIcon    num={level.threshold} size={20} bgColor={getBgColor(level.threshold)}  />
        
       }
        
       
        <span className="text-xs ml-1">{level.bonus}</span>
      </div>
    ))}
  </div>
</div>
        
        {/* Champions */}
        <div>
          <h4 className="text-sm text-gray-400 mb-1">Champions:</h4>
          <div className="flex flex-wrap gap-2">
            {traitData.champions.map((champion, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`rounded-full h-15 w-15 overflow-hidden border-4 ${getCostBorderColor(champion.cost)} flex items-center justify-center bg-gray-700`}>
            
                  <img 
                    src={champion.image} 
                    alt={champion.name} 
                    className="h-40 w-40 object-contain rounded-full  "
                  />

                </div>
                <span className="text-xs mt-1">{champion.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TFTTraitRow