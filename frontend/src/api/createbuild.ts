import { GamePhaseType, PhaseState } from "@/components/builds/Build/EditableBuildScreen/EditableBuildScreen";
import CrudService from "./crudapiservice";
import { useAuth0 } from "@auth0/auth0-react";
export default function createBuild(
  token:string,
  title: string,
  desc: string,
 user:any,
  phaseData:   Record<GamePhaseType, PhaseState>
) {

  // check title,desc,phaseData
  if (title == "" || title == "My TFT Build") {
    // edit title case
    // might just send info
    // shouldn't be permitted to have identical or non title based on localData
    // possible to edit js to get here though so it will be handled in the backend
  }

  if (desc == "") {
    // handle empty desc if needed
  }

  if(!user||!user.email) return;
 
    let buildItem = {
    "BUILD#": title,  // This follows DynamoDB naming convention for partition keys
    "METADATA": new Date()+"",  // This follows DynamoDB naming convention for sort keys
    title: title,
    desc: desc,
    name: title,
    data: phaseData,
    email:user.email,
  
  };

  try {
   
    CrudService.create("tft_builds", buildItem,token);
  } catch (e) {
    console.log(e);
  }

 
  // fill in with proper
  if(!user)
console.log("createbuild.ts : Error user or item schema invalid for build insertion!")
 
}
