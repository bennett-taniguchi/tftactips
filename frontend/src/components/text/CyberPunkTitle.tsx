 
export default function CyberPunkTitle({ text }:any) {
  return (
    <div className="relative pt-8 px-8 pb-6 flex justify-center font-inter font-extrabold ">
      <h1 className=" text-6xl font-bold tracking-wider text-emerald-400 uppercase relative">
        {/* Base shadow layer - larger text below */}
        <span className="absolute z-8 text-yellow-900 blur-sm text-5xl" 
              style={{ 
                animation: 'cyberpunkPulse 6s infinite',
                left: '0px', 
                top: '10px' 
              }}>
          {text}
        </span>

        {/* Middle shadow layer */}
        <span className="absolute z-9 text-emerald-900 text-6xl"
              style={{ 
                  animation: 'cyberpunkPulse 3s infinite',
                left: '-8px', 
                top: '0px',
                textShadow: '0 0 8px rgba(5, 150, 105, 0.6)',
                fontSize: '105%'
              }}>
          {text}
        </span>

        {/* Main text with glow effect */}
        <span className="relative z-10 text-6xl  " 
              style={{
                        
                textShadow: '0 0 12px rgba(16, 185, 129, 0.8), 0 0 4px rgba(16, 185, 129, 0.4)'
              }}>
          {text}
        </span>

        {/* Highlight overlay for top edge */}
        <span className="absolute inset-0 text-emerald-300 opacity-70"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 30%)',
                transform: 'translateY(-2px)',
               
              }}>
          {text}
        </span>

        {/* Glitch accent layer */}
        {/* <span className="absolute inset-0  z-9 text-yellow-400 opacity-30"
              style={{
                left: '-2px',
                top: '1px',
                clipPath: 'inset(40% 0 40% 0)',
                animation: 'cyberpunkPulse 4s infinite'
              }}>
          {text}
        </span> */}

        {/* CSS Animations */}
        <style>{`
          @keyframes cyberpunkPulse {
            0%, 100% { opacity: 0.1; transform: translateX(0); }
            50% { opacity: 0.9; transform: translateX(1px); }
            75% { opacity: 0.2; transform: translateX(-1px); }
          }
        `}</style>
      </h1>
    </div>
  );
}