import TFTCompPreview from "@/components/builds/BuildPreview";

export default function Builds() {
  // const colorVariants = {
  //   red: {
  //     primary: "rgba(255,100,0,0.9)",
  //     secondary: "rgba(255,200,0,0.7)",
  //     dark: "rgba(0,0,0,0.4)",
  //     accent: "rgba(255,0,0,0.6)",
  //   },
  //   blue: {
  //     primary: "rgba(0,100,255,0.9)",
  //     secondary: "rgba(100,0,255,0.7)",
  //     dark: "rgba(0,0,0,0.4)",
  //     accent: "rgba(0,200,255,0.6)",
  //   },
  //   green: {
  //     primary: "rgba(0,200,100,0.9)",
  //     secondary: "rgba(100,255,0,0.7)",
  //     dark: "rgba(0,0,0,0.4)",
  //     accent: "rgba(0,255,100,0.6)",
  //   },
  // };

  return (
    <div className="space-y-8">
      {/* S Tier Container with cyberpunk gradient background */}
      <div className="relative overflow-hidden rounded-xl">
        {/* Primary ambient background with animated gradients */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `
              linear-gradient(130deg, rgba(255,0,0,0.5) 0%, rgba(255,60,0,0.5) 40%, transparent 60%),
              linear-gradient(230deg, rgba(255,140,0,0.5) 10%, rgba(255,190,0,0.5) 50%, transparent 70%),
              linear-gradient(20deg, rgba(255,0,100,0.5) 20%, transparent 80%)
            `,
          }}
        ></div>

        <div
        //        className="absolute   inset-0 z-0 opacity-30    "
        //     style={{

        //     backgroundImage: `
        //       /* First row of diamonds */
        //       linear-gradient(135deg, ${colors.dark} 25%, transparent 25%),
        //       linear-gradient(225deg, ${colors.primary} 25%, transparent 25%),

        //       /* Second row of diamonds - filling the gaps */
        //       linear-gradient(315deg, ${colors.secondary} 25%, transparent 25%),
        //       linear-gradient(45deg, ${colors.accent} 25%, transparent 25%),

        //       /* Additional patterns for complete diamond grid */
        //       linear-gradient(135deg, transparent 75%, ${colors.accent} 75%),
        //       linear-gradient(225deg, transparent 75%, ${colors.dark} 75%),
        //       linear-gradient(315deg, transparent 75%, ${colors.primary} 75%),
        //       linear-gradient(45deg, transparent 75%, ${colors.secondary} 75%)
        //     `,
        //     backgroundSize: "18px 18px",
        //     backgroundPosition: "0 0, 0 0, 50px 50px, 50px 50px, 0 0, 0 0, 50px 50px, 50px 50px"
        //   }}
        />

        {/* Content container */}
        <div className="relative z-10 ">
          <TFTCompPreview tier={"S"} />
        </div>
      </div>

      {/* A Tier Container with different color scheme */}
      <div className="relative overflow-hidden rounded-xl">
        {/* Primary ambient background with animated gradients */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `
              linear-gradient(130deg, rgba(60,0,255,0.15) 0%, rgba(100,60,255,0.1) 40%, transparent 60%),
              linear-gradient(230deg, rgba(140,0,255,0.12) 10%, rgba(190,0,255,0.08) 50%, transparent 70%),
              linear-gradient(20deg, rgba(0,100,255,0.1) 20%, transparent 80%)
            `,
          }}
        ></div>

        {/* Cyberpunk grid pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(100,100,255,0.5) 1px, transparent 1px),
              linear-gradient(0deg, rgba(100,0,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            backgroundPosition: "center center",
          }}
        ></div>

        {/* Diagonal accent lines */}
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(0,0,255,0.4) 25%, transparent 25%),
              linear-gradient(225deg, rgba(100,0,255,0.4) 25%, transparent 25%)
            `,
            backgroundSize: "200px 200px",
          }}
        ></div>

        {/* Content container */}
        <div className="relative z-10 p-1">
          <TFTCompPreview tier={"A"} />
        </div>
      </div>

      {/* B Tier Container with different color scheme */}
      <div className="relative overflow-hidden rounded-xl">
        {/* Primary ambient background with animated gradients */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `
              linear-gradient(130deg, rgba(0,255,60,0.15) 0%, rgba(60,255,100,0.1) 40%, transparent 60%),
              linear-gradient(230deg, rgba(0,255,140,0.12) 10%, rgba(0,255,190,0.08) 50%, transparent 70%),
              linear-gradient(20deg, rgba(100,255,0,0.1) 20%, transparent 80%)
            `,
          }}
        ></div>

        {/* Cyberpunk grid pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(100,255,100,0.5) 1px, transparent 1px),
              linear-gradient(0deg, rgba(0,255,100,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            backgroundPosition: "center center",
          }}
        ></div>

        {/* Diagonal accent lines */}
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(0,255,0,0.4) 25%, transparent 25%),
              linear-gradient(225deg, rgba(0,255,100,0.4) 25%, transparent 25%)
            `,
            backgroundSize: "200px 200px",
          }}
        ></div>

        {/* Content container */}
        <div className="relative z-10 p-1">
          <TFTCompPreview tier={"B"} />
        </div>
      </div>
    </div>
  );
}
