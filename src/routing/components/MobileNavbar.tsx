import { NavLink } from 'react-router-dom';
import { FaHome, FaSearch, FaShoppingBag, FaUser } from 'react-icons/fa';

export const MobileNavbar = () => {
  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/search', icon: FaSearch, label: 'Search' },
    { path: '/cart', icon: FaShoppingBag, label: 'Cart' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe">
      {/* Background container */}
      <div className="relative h-[100px] pointer-events-none">
        {/* Main bar background */}
        <div className="absolute bottom-0 left-0 right-0 h-[75px] bg-white dark:bg-[#1E1E1E] rounded-t-[26px] shadow-lg" />

        {/* Navigation items */}
        <div className="absolute bottom-0 left-0 right-0 h-[75px] flex justify-around items-end px-12 pointer-events-auto">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 pb-3 relative transition-all duration-300 ${
                  isActive ? 'pt-0 gap-5' : 'pt-3'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Floating circle for active item */}
                  {isActive && (
                    <div className="absolute -top-[36px] left-1/2 -translate-x-1/2 w-[70px] h-[70px] bg-white dark:bg-[#1E1E1E] rounded-full shadow-lg" />
                  )}

                  {/* Icon container */}
                  <div
                    className={`relative z-10 flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'w-[54px] h-[54px] bg-white dark:bg-[#1E1E1E] rounded-full -mt-[11px]'
                        : 'w-6 h-6'
                    }`}
                  >
                    <item.icon
                      className={`transition-all duration-300 ${
                        isActive
                          ? 'text-[#386BF6] w-6 h-6'
                          : 'text-[#9DB2CE] w-6 h-6'
                      }`}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs font-normal transition-colors duration-300 ${
                      isActive ? 'text-[#386BF6]' : 'text-[#9DB2CE]'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
