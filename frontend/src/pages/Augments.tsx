import { AugmentBox } from "@/components/augment/AugmentBox"
import { useGlobalContext } from "@/components/context/context"

export default function Augments() {
    const {augments} = useGlobalContext()




    return (

        <div className="grid grid-cols-4 gap-4 gap-x-0 justify-items-start w-[90svw] ml-[-8svw]">
             {augments ? 
             augments.map((augment) => (
                <div className="w-[20svw]  ">
                    <AugmentBox item={augment} />
                    </div>
             ))

             :

             <></>
            }   
        </div>
    )
}