import retrieveBuild from "@/api/retrievebuild";
import BuildScreen from "@/components/builds/Build/BuildScreen";
import { transformBuildData } from "@/components/builds/YourBuilds/YourBuilds";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleBuild() {
    const params = useParams();
    let buildid = params["*"];
    const [build,setBuild] = useState<any>({})
    const [transformedBuild,setTransformedbuild] = useState<any>({})
    const {user,getAccessTokenSilently} = useAuth0()

    async function fetchBuild() {
        console.log(buildid,user)
        if(buildid && buildid != "" && user && user.email) {
          
            let data = await retrieveBuild(buildid,await getAccessTokenSilently(),user.email);

            setBuild(data['0'])
            setTransformedbuild(transformBuildData(data['0']))

        }
       
    }
useEffect(() => {
    
    fetchBuild()
},[user,buildid])

useEffect(() => {
console.log(build)
 
},[build])
// use context or a function to fetch single build from the backend
    // only if build is public or the user signed in matches the build
    // add under single api case (file)
//  

if(build&& build.id)
    return (
        <div>


               <BuildScreen
                  {...transformedBuild}
                  build={build}
                 />
        </div>
    )
}