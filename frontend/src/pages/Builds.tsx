import TFTCompPreview from "@/components/builds/BuildPreview";

 

export default function Builds() {
    return (
        <div className="mx-auto">

       
           <TFTCompPreview tier={"S"}/>
           <TFTCompPreview tier={"A"}/>
           <TFTCompPreview tier={"B"}/>
        </div>
    )
}