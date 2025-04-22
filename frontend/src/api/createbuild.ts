import { GamePhaseType, PhaseState } from "@/components/builds/Build/EditableBuildScreen/EditableBuildScreen";
import CrudService from "./crudapiservice";
export default function createBuild(
  title: string,
  desc: string,
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

  let buildItem = {
    "BUILD#": title,  // This follows DynamoDB naming convention for partition keys
    "METADATA": new Date()+"",  // This follows DynamoDB naming convention for sort keys
    title: title,
    desc: desc,
    name: title,
    data: phaseData,
  };
  // fill in with proper

  try {
    CrudService.create("tft_builds", buildItem);
  } catch (e) {
    console.log(e);
  }
}
