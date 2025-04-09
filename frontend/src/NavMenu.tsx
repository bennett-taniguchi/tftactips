import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Home, Grid, Menu, X,  } from 'lucide-react';
 

// Define proper TypeScript interfaces
interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  active?: boolean;
}

const NavMenu = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="font-sans ">
      {/* Navbar Container */}
      <nav className={`bg-gradient-to-b  from-gray-900 to-black fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black bg-opacity-80 backdrop-blur-md border-b border-purple-500 border-opacity-30' 
          : 'bg-transparent'
      }`}>
        <div className="w-6/7 mx-auto   sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 text-xl font-bold">
                tftac.tips
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block  p-2 ">
              <div className=" px-7 flex items-center space-x-6">
               
                <NavItem 
                  icon={<Home size={18} />} 
                  text="Home" 
                  to="/" 
                  active={location.pathname === '/'} 
                />
                <NavItem 
                  icon={<Grid size={18} />} 
                  text="Builds" 
                  to="/builds" 
                  active={location.pathname === '/builds'} 
                />
                  <NavItem 
                  icon={<Grid size={18} />} 
                  text="Champions" 
                  to="/champions" 
                  active={location.pathname === '/champions'} 
                />
                 <NavItem 
                  icon={<Grid size={18} />} 
                  text="Traits" 
                  to="/traits" 
                  active={location.pathname === '/traits'} 
                />
                <NavItem 
                  icon={<Grid size={18} />} 
                  text="Items" 
                  to="/items" 
                  active={location.pathname === '/items'} 
                />
                <NavItemSet14 
                  icon={<img src="./img/cybercity.png" className='w-7 h-7' />} 
                  text="Set 14" 
                  to="/currentset" 
                  active={location.pathname === '/currentset'} 
                />
               
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-purple-400" />
                ) : (
                  <Menu size={24} className="text-purple-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-90 backdrop-blur-md border-b border-purple-500 border-opacity-30">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 ">
              <MobileNavItem 
                icon={<Home size={18} />} 
                text="Home" 
                to="/" 
                active={location.pathname === '/'} 
              />
              <MobileNavItem 
                icon={<Grid size={18} />} 
                text="Builds" 
                to="/builds" 
                active={location.pathname === '/builds'} 
              />
               <MobileNavItem 
                icon={<Grid size={18} />} 
                text="Champions" 
                to="/champions" 
                active={location.pathname === '/champions'} 
              />
               <MobileNavItem 
                icon={<Grid size={18} />} 
                text="Traits" 
                to="/traits" 
                active={location.pathname === '/traits'} 
              />
               <MobileNavItem 
                icon={<Grid size={18} />} 
                text="Items" 
                to="/items" 
                active={location.pathname === '/items'} 
              />
              <MobileNavItem 
                icon={<img src="./img/cybercity.png" className='w-7 h-7' />} 
                text="Set 14" 
                to="/currentset" 
                active={location.pathname === '/currentset'} 
              />
             
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
let NavInactiveStyle='text-white/50 hover:text-white border border-transparent hover:bg-purple-900/40 hover:bg-opacity-10    hover:border-opacity-20'
let NavActiveStyle ='text-purple-400 bg-purple-600/30 bg-opacity-20  border-opacity-30 '

const Nav14ActiveStyle = 'bg-green-900 text-green-400 bg-green-700 animate-pulse';
const Nav14InactiveStyle = 'text-white/50 hover:bg-green-900 ';

// NavItemSet14 Component with humming green border and green text
const NavItemSet14 = ({ icon, text, to, active }: NavItemProps) => (
  <a
    href={to}
    className={`flex items-center px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
      active 
        ? Nav14ActiveStyle
        : Nav14InactiveStyle
    }`}
    style={{
      animation: !active ? 'greenHumming 6s infinite ease-in-out' : 'greenHummingBright 6s infinite ease-in-out',
    }}
  >
    <style>
    
{`  @keyframes greenHumming {
    0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
    50% { box-shadow: 0 0 0 1px rgba(74, 222, 128, 0.6); }
    100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.1); }
  }
    @keyframes greenHummingBright {
    0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.8); }
    50% { box-shadow: 0 0 0 4px rgba(74, 222, 128, 0.9); }
    100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.2); }
  }
 `}
    </style>
    <span className={`mr-2 ${active ? 'text-green-400' : 'text-green-300'}`}>{icon}</span>
    {text}
  </a>
);
// Desktop Nav Item Component
const NavItem = ({ icon, text, to, active }: NavItemProps) => (

  <Link
    to={to}
    className={`  flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
      active 
        ?  NavActiveStyle
        : NavInactiveStyle
    }`}
  >
    <span className={`mr-2 ${active ? 'text-purple-400' : 'text-gray-400'}`}>{icon}</span>
    {text}
  </Link>
);

// Mobile Nav Item Component
const MobileNavItem = ({ icon, text, to, active }: NavItemProps) => (
  <Link
    to={to}
    className={`flex items-center px-3 py-3 text-base font-medium rounded-md ${
      active 
        ? NavActiveStyle
        : NavInactiveStyle
    }`}
  >
    <span className={`mr-3 ${active ? 'text-purple-400' : 'text-gray-400'}`}>{icon}</span>
    {text}
  </Link>
);

export default NavMenu;