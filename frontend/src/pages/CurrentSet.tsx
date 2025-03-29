import TFTTraitRow from "@/components/set/TFTTraitRow";
import { cn } from "@/lib/utils";

import React from 'react';


 
export default function CurrentSet() {
  let numbers = [1, 2, 3, 4, 5];
  function getBgColor(idx: number) {
    if (idx == 1) return "bg-zinc-200 hover:bg-zinc-400";
    if (idx == 2) return "bg-green-200 hover:bg-green-400";
    if (idx == 3) return "bg-blue-600 hover:bg-blue-800";
    if (idx == 4) return "bg-purple-200 hover:bg-purple-400";
    if (idx == 5) return "bg-orange-200 hover:bg-orange-400";
  }

  return (
    <div className="text-center pb-[20px]">
      <div className="mx-auto w-[90svw]   flex-grow bg-blue-200 rounded-lg">
        <div className="text-left  ">
          <div className="w-[90svw]   bg-blue-400 rounded-t-lg">
            <div className="pl-[20px] pt-[15px] flex flex-row  ">
              {" "}
              <span className=" font-bold text-4xl  text-white drop-shadow-2xl">
                Traits
              </span>
              <div className="ml-[20px] flex flex-row pl-[10px] pt-[10px] gap-2 bg-blue-500 rounded-full pr-2">
                {numbers.map((num) => (
                  <button
                    className={cn(
                      " mt-[-5px] cursor-pointer  mx-auto   w-[40px]  h-[30px] rounded-full text-center text-black align-text-bottom ",
                      getBgColor(num)
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="m-5">
            <TFTTraitRow />
             <TFTTraitRow />
          </div>
        </div>
      </div>
      <div className="py-[20px]"></div>
      <div className="mx-auto w-[90svw] h-[400px] bg-blue-300 rounded-lg">
        <div className="text-left pl-[20px] ">
          <span className=" font-bold text-4xl  text-blue-700 drop-shadow-2xl">
            Champions
          </span>
        </div>
      </div>
      <div className="py-[20px]"></div>

      <div className="mx-auto w-[90svw] h-[400px] bg-blue-400 rounded-lg">
        <div className="text-left pl-[20px] ">
          <span className=" font-bold text-4xl  text-white drop-shadow-2xl">
            Augments
          </span>
        </div>
      </div>
    </div>
  );
}
