import { NavLink } from 'react-router-dom';
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
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-40 w-full hidden max-md:grid grid-cols-7 items-center h-16 border-t rounded-t-3xl shadow-lg transition-all duration-300 ${
        isDark
          ? 'bg-gray-900/80 backdrop-blur-xl border-gray-800 shadow-blue-900/10'
          : 'bg-white/80 backdrop-blur-xl border-gray-100 shadow-gray-200/50'
      }`}
    >
      {/* 1. Home */}
      <NavLink
        className={({ isActive }) =>
          `col-start-1 flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
            isActive
              ? 'text-primary'
              : isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-500 hover:text-primary'
          }`
        }
        to="/"
      >
        <FaHome size={22} />
        <span className="text-[10px] font-medium">Home</span>
      </NavLink>

      {/* 2. About Us */}
      <NavLink
        className={({ isActive }) =>
          `col-start-2 flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
            isActive
              ? 'text-primary'
              : isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-500 hover:text-primary'
          }`
        }
        to="/about-us"
      >
        <FaInfo size={22} />
        <span className="text-[10px] font-medium">About</span>
      </NavLink>

      {/* 3. Events */}
      <NavLink
        className={({ isActive }) =>
          `col-start-3 flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
            isActive
              ? 'text-primary'
              : isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-500 hover:text-primary'
          }`
        }
        to="/events"
      >
        <FaCalendarAlt size={22} />
        <span className="text-[10px] font-medium">Events</span>
      </NavLink>

      {/* 4. LOGO (Centered via Absolute in parent) */}
      <div className="col-start-4 w-full h-full pointer-events-none" />

      {/* 5. Workshops */}
      <NavLink
        className={({ isActive }) =>
          `col-start-5 flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
            isActive
              ? 'text-primary'
              : isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-500 hover:text-primary'
          }`
        }
        to="/workshops"
      >
        <FaFlask size={22} />
        <span className="text-[10px] font-medium">Workshops</span>
      </NavLink>

      {/* 6. Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="col-start-6 flex flex-col items-center justify-center gap-1 cursor-pointer group transition-all duration-300"
        aria-label="Toggle Theme"
      >
        {isDark ? (
          <HiSun size={20} className="text-yellow-400" />
        ) : (
          <HiMoon size={20} className="text-blue-600" />
        )}
        <span
          className={`text-[10px] font-medium transition-colors duration-300 ${
            isDark
              ? 'text-gray-400 group-hover:text-yellow-400'
              : 'text-gray-500 group-hover:text-blue-600'
          }`}
        >
          Theme
        </span>
      </button>

      {/* 7. Join Us Button */}
      <NavLink
        className={({ isActive }) =>
          `col-start-7 flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
            isActive
              ? 'text-primary'
              : isDark
                ? 'text-gray-400 hover:text-primary'
                : 'text-gray-500 hover:text-primary'
          }`
        }
        to="/join"
      >
        <FaUserCircle size={22} />
        <span className="text-[10px] font-medium">Join</span>
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
