 
import Build from "@/components/builds/Build";
const buildData = {
  title: "Anima Squad Vertical",
  traits: {
    "AnimaSquad": 6,
    "Amp": 2,
    "Rapidfire": 2,
    "Vanguard": 2
  },
  champions: [
    { 
      name: "Miss Fortune", 
      parsedData: "missfortune", 
      isCarry: true,
      items: ["IE", "LW", "DB"]
    },
    { 
      name: "Sylas", 
      parsedData: "sylas", 
      isTank: true,
      items: ["Warmog", "Dragon's Claw", "Gargoyle"]
    },
    { 
      name: "Aurora", 
      parsedData: "aurora"
    },
    { 
      name: "Leona", 
      parsedData: "leona",
      isTank: true
    },
    { 
      name: "Viego", 
      parsedData: "viego"
    },
    { 
      name: "Urgot", 
      parsedData: "urgot"
    }
  ],
  type: "Vertical",
  difficulty: "Easy",
  description: "This build focuses on maximizing the Anima Squad trait to empower your carries. It's particularly strong in the mid to late game when you can get all 6 Anima Squad members.\n\nIn the early game, focus on collecting Anima Squad units and pair them with Quickdraw or Duelist to create a solid foundation. Miss Fortune should be your primary item holder and main carry throughout the game.\n\nSylas and Leona serve as your frontline tanks, while Aurora provides valuable utility. Position your backline carries safely behind the tanks to maximize their damage output.\n\nFor augments, prioritize trait-specific options like Anima Squad Heart/Crest, or look for options that enhance your carries like Jeweled Lotus or Combat Training.",
  augments: [
    {
      name: "Anima Squad Heart",
      description: "Gain an Anima Squad emblem and +1 to the Anima Squad trait."
    },
    {
      name: "Jeweled Lotus",
      description: "Your units' Ability Power can critically strike."
    },
    {
      name: "Cybernetic Shell 2",
      description: "Champions holding an item gain 200 Health and 25 Armor."
    }
  ]
};
export function Builds() {
  return (
    <div className="justify-items-center     ">
      <div className="text-4xl text-white font-extrabold font-mono text-left justify-self-start underline mb-5">Builds</div>
      <div className="flex flex-col  ">
      <Build {...buildData} />
      </div>
    </div>
  );
}
 
