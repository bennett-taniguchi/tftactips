import BuildPreviewTitle, { TFTBuild } from "@/components/home/BuildPreviewTile";
import { Search } from "lucide-react";

export default function Home() {
    return (
        <div className="container mx-auto text-center pb-5">
            <h2 className="my-6 text-xl font-bold text-purple-800">Find your comp</h2>
           
            <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for Builds, Champions, Items, Augments, etc."
                        className="w-full py-3 pl-10 pr-4 bg-blue-50 border border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 shadow-sm placeholder-blue-300 text-blue-800"
                    />
                </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6 shadow-md mx-auto max-w-5xl border border-blue-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                    <FirstBuild/>
                    <BuildPreviewTitle/>
                    <BuildPreviewTitle/>
                    <BuildPreviewTitle/>
                    <BuildPreviewTitle/>
                    <BuildPreviewTitle/>
                </div>
            </div>
        </div>
    )
}


const FirstBuild = () => {
  const sampleBuild = {
    buildName: "Anima Squad Vertical",
    tier: 1,
    difficulty: "medium",
    traits: [
        {name: "Overlord", count:1, level:1},
      { name: "Anima Squad", count: 7, level: 3 },
      { name: "Strategist", count: 2, level: 1 },
      { name: "Bastion", count: 2, level: 1 },
      { name: "Vanguard", count: 2, level: 1 },
      { name: "Divinicorp", count: 2, level: 1 }
    ],
    champions: [
      { name: "Aurora", cost: 5, stars: 1 },
      { name: "Leona", cost: 4, stars: 2 },
      { name: "Xayah", cost: 4, stars: 2 },
      { name: "Yuumi", cost: 3, stars: 2 },
      { name: "Renekton", cost: 5, stars: 1 },
      { name: "Neeko", cost: 4, stars: 1 },
      { name: "Illaoi", cost: 2, stars: 1 },
      { name: "Vayne", cost: 2, stars: 1 },
      { name: "Sylas", cost: 2, stars: 1 }
    ],
    carousel: ["Glove", "Sword", "Belt"],
    augments: ["Anima Squad Crest", "Big Grab Bag", "Glass Cannon II"]
  };

  return <TFTBuild {...sampleBuild} />;
};

const SecondBuild = () => {
    const sampleBuild = {
      buildName: "AMP + Strategist",
      tier: 1,
      difficulty: "hard",
      traits: [
          {name: "Strategist", count:5, level:4},
        { name: "AMP", count: 4, level: 3 },
        { name: "Street Demon", count: 3, level: 1 },
  
      ],
      champions: [
        { name: "Samira", cost: 5, stars: 1 },
        { name: "Ziggs", cost: 4, stars: 2 },
        { name: "Neeko", cost: 4, stars: 2 },
        { name: "Annie", cost: 4, stars: 2 },
        { name: "Yuumi", cost: 3, stars: 1 },
        { name: "Naafiri", cost: 2, stars: 1 },
        { name: "Leblanc", cost: 2, stars: 1 },
        { name: "Ekko", cost: 2, stars: 1 },
       
      ],
      carousel: ["Tear", "Sword", "Rod"],
      augments: ["Anima Squad Crest", "Big Grab Bag", "Glass Cannon II"]
    };
  
    return <TFTBuild {...sampleBuild} />;
  };