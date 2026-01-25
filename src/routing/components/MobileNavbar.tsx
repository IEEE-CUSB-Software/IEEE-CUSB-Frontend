import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaFlask, FaUserCircle } from 'react-icons/fa';
import logo from '@/assets/logo.png';

export const MobileNavbar = () => {
  const { pathname } = useLocation();

  const NAV_ITEMS = [
    { icon: FaHome, to: '/', title: 'Home' },
    { icon: FaCalendarAlt, to: '/events', title: 'Events' },
    { icon: FaFlask, to: '/workshops', title: 'Workshops' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 w-full bg-white dark:bg-[#1E1E1E] flex justify-between items-center px-[6%] h-16 border-t border-gray-200 dark:border-gray-700 rounded-t-3xl shadow-lg">
      {NAV_ITEMS.map(({ icon: Icon, to, title }, index) => {
        const active = to === '/' ? pathname === '/' : pathname.startsWith(to);
        return (
          <NavLink
            className={`${
              active ? 'text-primary' : 'text-gray-500'
            } inline-flex flex-col items-center gap-1 ${
              index === 1 ? 'mr-7' : index === 2 ? 'ml-7' : ''
            } cursor-pointer transition-colors`}
            key={title}
            to={to}
          >
            <Icon size={22} />
            <span
              className={`${
                active ? 'text-primary' : 'text-gray-500'
              } text-xs`}
            >
              {title}
            </span>
          </NavLink>
        );
      })}
      
      {/* Profile/Join Us Button */}
      <NavLink
        to="/join"
        className="inline-flex flex-col items-center gap-1 cursor-pointer group"
      >
        <FaUserCircle
          size={22}
          className="text-gray-500 group-hover:text-primary transition-colors duration-200"
        />
        <span className="text-xs text-gray-500 group-hover:text-primary">Join</span>
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
          <div className="rounded-full p-1.5 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
            <div className="rounded-full p-1 bg-gradient-to-b from-white to-blue-50 dark:from-[#1E1E1E] dark:to-blue-950">
              <img
                src={logo}
                alt="IEEE CUSB"
                className="block h-10 w-10"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
