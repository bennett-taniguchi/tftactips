export default function OrbitingHexagons() {
 // Define keyframes and animation styles
 const keyframes = `
 @keyframes orbit1 {
   0% { transform: rotate(190deg) translateX(-25%) translateY(-25%); }
   100% { transform: rotate(550deg) translateX(-25%) translateY(-25%); }
 }
 
 @keyframes orbit2 {
   0% { transform: rotate(145deg) translateX(-25%) translateY(-25%); }
   100% { transform: rotate(505deg) translateX(-25%) translateY(-25%); }
 }
 
 @keyframes orbit3 {
   0% { transform: rotate(100deg) translateX(-25%) translateY(-25%); }
   100% { transform: rotate(460deg) translateX(-25%) translateY(-25%); }
 }
 
 @keyframes orbit4 {
   0% { transform: rotate(100deg) translateX(-25%) translateY(-25%); }
   100% { transform: rotate(460deg) translateX(-25%) translateY(-25%); }
 }
`;

// Common styles for all hexagons
// const hexagonBaseStyle = {
//  background: "linear-gradient(135deg, rgba(250,232,255,0.5) 0%, rgba(80,70,225,0.3) 50%, rgba(250,100,255,0.5) 100%)",
//  filter: "blur(30px)",
//  zIndex: 0,
//  opacity: 0.8,
//  clipPath: "polygon(20% 0%, 80% 0%, 100% 30%, 100% 70%, 80% 100%, 20% 100%, 0% 70%, 0% 30%)"
// };
const hexagonBaseStyle = {

  background: "linear-gradient(135deg, rgba(250,232,255,1) 0%, rgba(80,70,225,1) 50%, rgba(250,100,255,1) 100%)",
  filter: "blur(30px)",
  zIndex: 0,
  opacity: 0.8,
  clipPath: "polygon(20% 0%, 80% 0%, 100% 30%, 100% 70%, 80% 100%, 20% 100%, 0% 70%, 0% 30%)"
 };

    return (

        <div className="   relative h-[100svh] w-[100svw] ">
        {/* Add keyframes to the document */}
        <style>{keyframes}</style>
        
        {/* Hexagon 1 */}
        <div
          className="absolute top-0 mt-[-20svh] left-0 ml-[-25svw] w-[40%] h-[80%]"
          style={{
            ...hexagonBaseStyle,
            animation: "orbit1 90s linear infinite",
          }}
        />
        
        {/* Hexagon 2 */}
        <div
          className="absolute top-0 mt-[-20svh] left-0 ml-[15svw] w-[40%] h-[80%]"
          style={{
            ...hexagonBaseStyle,
            animation: "orbit2 120s linear infinite"
          }}
        />
            
        {/* Hexagon 3 */}
        <div
          className="absolute top-0 mt-[-110svh] left-0 ml-[30svw] w-[40%] h-[80%]"
          style={{
            ...hexagonBaseStyle,
            animation: "orbit3 150s linear infinite"
          }}
        />
  
        {/* Hexagon 4 */}
        <div
          className="absolute top-0 mt-[-30svh] left-0 ml-[60svw] w-[40%] h-[80%]"
          style={{
            ...hexagonBaseStyle,
            animation: "orbit4 105s linear infinite reverse"
          }}
        />
      </div>

    )
}