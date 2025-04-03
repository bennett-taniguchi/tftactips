export default function TraitBox({ item}: any) {
    if (!item) {
      return <div></div>;
    }

    function dealwithurl(url: string) {
      return (
        "https://tft-set14.s3.us-east-2.amazonaws.com/" +
        url.split("/").slice(3).join("/")
      );
    }

    const data = JSON.parse(item.data);

   
    return (
      <div className="bg-gray-800/50 drop-shadow-lg shadow-gray-700 p-5 rounded">
        <p className="text-4xl font-bold shadow-">Name: {data.name}</p>
        <p className="text-lg font-light">Description: {data.desc}</p>
        <p className="text-lg font-light">Effect: {data.bonus}</p>
        <img className="w-20 h-20" src={dealwithurl(data.imageLowS3)} />
      </div>
    );
  }