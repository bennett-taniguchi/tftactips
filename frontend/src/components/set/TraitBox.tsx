export default function TraitBox({ item}: any) {
    if (!item) {
      return <div></div>;
    }
    console.log(item)
    function traitNameToUrl(trait: string) {
     console.log("TRAIT",trait)
      trait = trait.replace(" ", "");

      if (trait == "BoomBot" ||data.apiName.includes("Ballis")) trait = "BoomBots";
      if (trait.toLowerCase().includes("god")) trait = "netgod"
      if (trait == "A.M.P.") trait = "amp";
      console.log("TRAIT f",trait)
      return `https://tft-set14.s3.us-east-2.amazonaws.com/traits/${trait.toLowerCase()}.png`;
    }

 
    const data = JSON.parse(item.data);

   console.log
    return (
      <div className="bg-gray-800/50 drop-shadow-lg shadow-gray-700 p-5 rounded">
        <p className="text-4xl font-bold shadow-">Name: {data.name}</p>
        <p className="text-lg font-light">Description: {data.desc}</p>
        <p className="text-lg font-light">Effect: {data.bonus}</p>
        <img className="w-20 h-20" src={traitNameToUrl(data.name+"")} />
      </div>
    );
  }