import EditableBuildScreen from "@/components/builds/Build/EditableBuildScreen";
import { useGlobalContext } from "@/components/context/context";

export default function NewBuild() {
 const {champions,traits} = useGlobalContext()
    return (
<><EditableBuildScreen title={""} view={undefined} setView={undefined} champions={[]} allChampions={champions as any} traits={{}} description={""}/></>
        
    )
}