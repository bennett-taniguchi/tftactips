import React from 'react';

export const TFTBuild = ({ buildName, tier, difficulty, traits, champions, carousel, augments } : any) => {
  // Helper function to render stars based on difficulty/tier
  const renderStars = (count: number, max = 3) => {
    return Array(max).fill(0).map((_, i) => (
      <span key={i} className={`text-lg ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
    ));
  };
  
  // Helper to get trait color based on active count
  const getTraitColor = (traitLevel: any) => {
    switch(traitLevel) {
      case 3: return 'bg-gold-500 text-black';
      case 2: return 'bg-silver-500 text-black';
      case 1: return 'bg-bronze-500 text-white';
      default: return 'bg-gray-700 text-white';
    }
  };
  
  return (
    <div className="w-full max-w-md bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
      {/* Header */}
      <div className="bg-blue-900 p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">{buildName}</h3>
          <div className="flex items-center space-x-2">
            <div className="bg-blue-700 px-2 py-1 rounded text-xs text-white">
              Tier {tier} {renderStars(tier)}
            </div>
            <div className="bg-purple-700 px-2 py-1 rounded text-xs text-white">
              {difficulty === 'easy' ? 'Easy' : difficulty === 'medium' ? 'Medium' : 'Hard'} {renderStars(
                difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Traits */}
      <div className="p-4 border-b border-gray-700">
        <h4 className="text-gray-400 font-semibold mb-2 text-sm">TRAITS</h4>
        <div className="flex flex-wrap gap-2">
          {traits.map((trait: { name: boolean | React.Key | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; level: any; count: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
            <div 
              key={trait.name+""} 
              className={`flex items-center px-2 py-1 rounded ${getTraitColor(trait.level)}`}
            >
              <div className="w-5 h-5 bg-gray-600 rounded-full mr-1"></div>
              <span className="text-xs font-medium">{trait.name} ({trait.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Champions */}
      <div className="p-4 border-b border-gray-700">
        <h4 className="text-gray-400 font-semibold mb-2 text-sm">CHAMPIONS</h4>
        <div className="grid grid-cols-4 gap-2">
          {champions.map((champion: { name: boolean | React.Key | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; cost: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; stars: any; }) => (
            <div key={champion.name+""} className="flex flex-col items-center">
              <div className={`w-12 h-12 bg-gray-600 border-2 border-${(champion.cost as any) <= 1 ? 'gray' : (champion.cost as any) <= 2 ? 'green' : (champion.cost as any) <= 3 ? 'blue' : (champion.cost as any) <= 4 ? 'purple' : 'yellow'}-500 rounded-lg relative`}>
                {/* Champion cost */}
                <div className="absolute -bottom-1 -right-1 bg-gray-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold text-yellow-400">{champion.cost}</div>
              </div>
              <span className="text-white text-xs mt-1">{champion.name}</span>
              <div className="flex">
                {renderStars(champion.stars)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Priority */}
      <div className="p-4 border-b border-gray-700">
        <h4 className="text-gray-400 font-semibold mb-2 text-sm">CAROUSEL PRIORITY</h4>
        <div className="flex space-x-2">
          {carousel.map((item: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
            <div key={index} className="flex items-center bg-gray-900 px-2 py-1 rounded">
              <div className="w-4 h-4 bg-gray-600 rounded-full mr-1"></div>
              <span className="text-white text-xs">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Augments */}
      <div className="p-4">
        <h4 className="text-gray-400 font-semibold mb-2 text-sm">AUGMENTS</h4>
        <div className="flex flex-wrap gap-2">
          {augments.map((augment: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
            <div key={index} className="bg-blue-800 px-3 py-1 rounded text-sm text-white">
              {augment}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Example usage with sample data
const BuildPreviewTitle = () => {
  const sampleBuild = {
    buildName: "8 Challenger Warwick",
    tier: 2,
    difficulty: "medium",
    traits: [
      { name: "Challenger", count: 8, level: 3 },
      { name: "Juggernaut", count: 2, level: 1 },
      { name: "Duelist", count: 2, level: 1 }
    ],
    champions: [
      { name: "Warwick", cost: 4, stars: 2 },
      { name: "Yone", cost: 4, stars: 2 },
      { name: "Kayle", cost: 3, stars: 2 },
      { name: "Yasuo", cost: 1, stars: 3 },
      { name: "Jax", cost: 2, stars: 2 },
      { name: "Irelia", cost: 2, stars: 2 },
      { name: "Fiora", cost: 3, stars: 2 },
      { name: "Vi", cost: 2, stars: 2 }
    ],
    carousel: ["Bow", "Sword", "Belt"],
    augments: ["Challenger Crown", "Knife's Edge", "Thrill of the Hunt"]
  };

  return <TFTBuild {...sampleBuild} />;
};

export default BuildPreviewTitle;