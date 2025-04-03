import TFTCompPreview from "@/components/builds/BuildPreview";
import TftacLogo from "@/components/logo/LoadingLogo";
import LoadingLogo from "@/components/logo/LoadingLogo";

 

export default function Builds() {
    return (
        <div className="mx-auto">
            
     
           <TFTCompPreview tier={"S"}/>
           <TFTCompPreview tier={"A"}/>
           <TFTCompPreview tier={"B"}/>
        </div>
    )
}