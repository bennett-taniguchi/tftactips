import {   useEffect, useState } from "react";
import CrudService, { Item } from "@/api/crudapiservice";
import Build from "@/components/builds/Build/Build";
import BuildPlaceholder from "../BuildPlaceholder";

import { useAuth0 } from "@auth0/auth0-react";
 
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// This function transforms the retrieved build data to match the Build component's expected format
export const transformBuildData = (build: any) => {
 
  // Using optional chaining to safely access nested properties
  const selectedChampions = build?.data?.mid?.selectedChampions || [];
  const selectedAugments = build?.data?.mid?.selectedAugments || [];

  // Map champions to the format expected by the Build component
  const champions = selectedChampions.map((champion: any) => {
    const parsedData = champion.parsedData || {};
    return {
      name: parsedData.name || champion?.CHAMPION || "",
      parsedData: parsedData.apiName?.toLowerCase().replace("tft14_", "") || "",
      // You can determine if a champion is a carry or tank based on your own logic
      isCarry: parsedData.role?.includes("Carry") || false,
      isTank:
        parsedData.role?.includes("Tank") ||
        parsedData.stats?.hp > 700 ||
        false,
      // Add more properties as needed
      items: [], // You might want to extract items if available in your data
    };
  });

  // Map traits based on champions' traits
  const traits = {};
  selectedChampions.forEach((champion: Item) => {
    const champTraits = champion.parsedData?.parsedTraits || [];
    champTraits.forEach((trait: string) => {
      if ((traits as any)[trait]) {
        (traits as any)[trait] += 1;
      } else {
        (traits as any)[trait] = 1;
      }
    });
  });

  // Map augments
  const augments = selectedAugments.map((augment: Item) => ({
    name: augment.name || "",
    description: augment.desc || "",
  }));

  // Return transformed build object
  return {
    id: build.id || "",
    title: build.title || build.name || "Unnamed Build",
    description: build.desc || "No description provided",
    traits,
    champions,
    augments,
    type: "Custom", // Default type
    difficulty: "Medium", // Default difficulty
    // Add any additional properties needed by Build component
  };
};

export default function YourBuilds() {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetch,setRefetch] = useState(false)
  const { user, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<any>(undefined);

  useEffect(() => {
    console.log(token + "");
    if(1*3==2) setError(null)
  }, [token]);

  async function getBuilds() {
    try {
      setLoading(true);
      const [...retrievedBuilds] = await CrudService.getByEmail(
        "tft_builds",
        user!.email!
      );
      console.log(retrievedBuilds);
      if (Array.isArray(retrievedBuilds)) {
        setBuilds(retrievedBuilds as any);
      } else if (retrievedBuilds) {
        // Handle case where a single object is returned
        setBuilds([retrievedBuilds] as any);
      } else {
        setBuilds([]);
      }
    } catch (err) {
      console.error("Error fetching builds:", err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    async function setTokenVal() {
      try {
        const tokenRes = await getAccessTokenSilently();
        setToken(tokenRes);
      } catch (e) {
        return e;
      }
    }
    setTokenVal();
   

    getBuilds();
  }, [user]);

  useEffect(() => {
    console.log("Updated builds:", builds);
  }, [builds]);

  useEffect(() => {
    if(refetch) {
      setTimeout(() => {
        getBuilds();
        setRefetch(false)
      },500)
    
    }
      },[refetch])
  if (loading) {
    return (
      <div className="text-emerald-400 text-xl grid grid-cols-1 gap-8 ml-[-5svw] mt-7">
        <BuildPlaceholder type="loading" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400 text-xl">{error}</div>;
  }

  if (!builds || builds.length === 0) {
    return (
      <div className="text-emerald-400/70 text-xl p-8 text-center grid grid-cols-1 gap-8 ml-[-5svw] mt-7 w-[80svw]">
        You don't have any saved builds yet. Use the + button to create one!
        <div className="">
          <Link to="/newbuild">
            <Button className="right-10 bottom-10 absolute w-20 h-20 border borde-rwhite rounded-full cursor-pointer bg-green-400">
              <div className="text-6xl text-center mb-3">+</div>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 ml-[-5svw] mt-7">
      {builds.map((build, idx) => {
        const transformedBuild = transformBuildData(build);
        return (
          <div key={idx} className=" transition-all duration-200">
            <Build {...transformedBuild} build={build} setRefetch={setRefetch} />
          </div>
        );
      })}
      <div className="">
        {builds.length <= 9 ? (
          <Link to="/newbuild">
            <Button className="right-10 bottom-10 absolute w-20 h-20 border borde-rwhite rounded-full cursor-pointer bg-green-400">
              <div className="text-6xl text-center mb-3">+</div>
            </Button>
          </Link>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="z-10 right-10 bottom-10 absolute w-20 h-20 border borde-rwhite rounded-full cursor-pointer bg-gray-900 hover:none  ">
                  <div className="text-6xl text-center mb-3">+</div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xl  ">
                  10 or more builds! Delete some to make space.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}
