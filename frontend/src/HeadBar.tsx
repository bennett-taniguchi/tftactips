import React from "react";

import Svg1 from "./img/svg/haikei.svg"; //https://haikei.app/ -> waves
export default function HeadBar() {
  // Menu items array for easier management
  const menuItems = [
    { label: "Explore", key: "explore" },
    { label: "Map", key: "map" },
    { label: "OpenAscent", key: "openascent", isLogo: true },
    { label: "Progression", key: "progression" },
    { label: "Profile", key: "profile" },
  ];

  // Styles
  const linkStyle =
    "hover:bg-yellow-100 hover:cursor-pointer text-lg mr-[10px] border-[1px] rounded-full mb-[-5px] py-[3px] px-[10px] border-white bg-white";
  const logoStyle =
    "hover:bg-yellow-100 hover:cursor-pointer font-bold mr-[10px] border-[1px] rounded-full mb-[10px] py-[15px] border-white bg-white";

  return (
    <div className="relative  flex-row">
      {/* Header items */}
      <div className="text-orange-400 text-3xl   flex justify-center items-center pb-[5px]">
        {menuItems.map((item) => (
          <span key={item.key} className={item.isLogo ? logoStyle : linkStyle}>
            {item.isLogo ? (
              <span className="p-[5px]">{item.label}</span>
            ) : (
              item.label
            )}
          </span>
        ))}
      </div>

      
       {/* <div
        style={{
          zIndex: 9999,
          background:
            "url(\"data:image/svg+xml,%3Csvg width='25' height='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='1' x2='12' y2='1' stroke='orange' stroke-width='2' stroke-dasharray='20 2'/%3E%3C/svg%3E\") repeat-x",
        }}
        className="overflow-hidden ml-[-300px] mt-[-50px] w-[95svw] absolute h-[1px]"
      />{" "} */}
    
      <div className="w-full h-[40px] relative  ml-[5px] my-[-20px] pb-[120px]  ">
        <svg
          width={1000}
          height={100}
          viewBox="0 340 932 525"
          className="scale-x-[307.1%] "
        >
          {" "}
          <Svg1 />
        </svg>
      </div>
    </div>
  );
}
