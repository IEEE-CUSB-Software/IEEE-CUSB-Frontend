import { NavLink, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaCalendarAlt,
  FaFlask,
  FaUserCircle,
  FaInfo,
} from 'react-icons/fa';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '@/shared/hooks/useTheme';
import logo from '@/assets/logo.png';

export const MobileNavbar = () => {
  const { pathname } = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const NAV_ITEMS = [
    { icon: FaHome, to: '/', title: 'Home' },
    { icon: FaInfo, to: '/about-us', title: 'About Us' },
    { icon: FaCalendarAlt, to: '/events', title: 'Events' },
    { icon: FaFlask, to: '/workshops', title: 'Workshops' },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 w-full flex md:hidden justify-between items-center px-4 h-16 border-t rounded-t-3xl shadow-lg transition-all duration-300 ${
        isDark
          ? 'bg-gray-900/80 backdrop-blur-xl border-gray-800 shadow-blue-900/10'
          : 'bg-white/80 backdrop-blur-xl border-gray-100 shadow-gray-200/50'
      }`}
    >
      {NAV_ITEMS.map(({ icon: Icon, to, title }, index) => {
        const active = to === '/' ? pathname === '/' : pathname.startsWith(to);
        return (
          <NavLink
            className={`${
              active
                ? 'text-primary'
                : isDark
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-500 hover:text-primary'
            } inline-flex flex-col items-center gap-1 ${
              index === 2 ? 'mr-10' : index === 3 ? 'ml-10' : ''
            } cursor-pointer transition-all duration-300`}
            key={title}
            to={to}
          >
            <Icon
              size={22}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span
              className={`${
                active
                  ? 'text-primary'
                  : isDark
                    ? 'text-gray-400'
                    : 'text-gray-500'
              } text-[10px] font-medium transition-colors duration-300`}
            >
              {title}
            </span>
          </NavLink>
        );
      })}

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="inline-flex flex-col items-center gap-1 cursor-pointer group transition-all duration-300"
        aria-label="Toggle Theme"
      >
        <div
          className={`p-1 rounded-lg transition-colors duration-300 ${isDark ? 'group-hover:bg-yellow-400/10' : 'group-hover:bg-blue-600/10'}`}
        >
          {isDark ? (
            <HiSun size={20} className="text-yellow-400" />
          ) : (
            <HiMoon size={20} className="text-blue-600" />
          )}
        </div>
        <span
          className={`text-[10px] font-medium transition-colors duration-300 ${isDark ? 'text-gray-400 group-hover:text-yellow-400' : 'text-gray-500 group-hover:text-blue-600'}`}
        >
          Theme
        </span>
      </button>

      {/* Profile/Join Us Button */}
      <NavLink
        to="/join"
        className="inline-flex flex-col items-center gap-1 cursor-pointer group transition-all duration-300"
      >
        <FaUserCircle
          size={22}
          className={`transition-all duration-300 ${isDark ? 'text-gray-400 group-hover:text-primary' : 'text-gray-500 group-hover:text-primary'}`}
        />
        <span
          className={`text-[10px] font-medium transition-colors duration-300 ${isDark ? 'text-gray-400 group-hover:text-primary' : 'text-gray-500 group-hover:text-primary'}`}
        >
          Join
        </span>
      </NavLink>

      {/* Centered Logo Badge */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-7">
        <div className="relative">
          {/* Soft pedestal shadow */}
          <div
            aria-hidden
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2.5 w-14 rounded-full bg-black/10 blur-md"
          />
          {/* Badge */}
          <div
            className={`rounded-full p-1.5 border shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 ${
              isDark
                ? 'bg-gray-900 border-gray-800'
                : 'bg-white border-gray-200'
            }`}
          >
            <div
              className={`rounded-full p-1 bg-gradient-to-b transition-all duration-300 ${
                isDark
                  ? 'from-gray-800 to-blue-950/30'
                  : 'from-white to-blue-50'
              }`}
            >
              <img
                src={logo}
                alt="IEEE CUSB"
                className="block h-10 w-10 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
