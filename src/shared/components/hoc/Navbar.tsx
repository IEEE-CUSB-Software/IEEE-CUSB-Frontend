import { Link, NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { MdAdminPanelSettings } from 'react-icons/md';
import logo from '@/assets/logo.png';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/shared/store/hooks';
import { useLogout } from '@/shared/queries/auth';
import { RoleName } from '@/shared/types/auth.types';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  const { mutate: logout } = useLogout();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-lg font-medium transition-colors ${
      isActive
        ? scrolled
          ? 'text-blue-400'
          : 'text-primary'
        : scrolled
          ? 'text-white/90 hover:text-blue-300'
          : 'text-gray-600 hover:text-primary'
    }`;

  const isAdmin =
    user?.role.name === RoleName.ADMIN ||
    user?.role.name === RoleName.SUPER_ADMIN;

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[1237px] h-[74px] rounded-full flex items-center px-4 lg:px-8 transition-all duration-300
        ${
          scrolled
            ? 'bg-[#010619]/60 backdrop-blur-2xl border border-white/10 shadow-lg shadow-blue-900/10'
            : 'bg-white/50 backdrop-blur-md border border-white/20'
        }`}
    >
      {/* Centered Navigation Group */}
      <div className="flex-1 flex justify-center items-center gap-6 lg:gap-10">
        {/* Left Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About Us
          </NavLink>
          <NavLink to="/committees" className={linkClass}>
            Committees
          </NavLink>
        </div>

        {/* Logo */}
        <Link to="/" className="shrink-0 mx-2">
          <div
            className={`p-1.5 rounded-full shadow-lg transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-primary/20' : 'bg-primary/5 shadow-none'}`}
          >
            <img
              src={logo}
              alt="IEEE Logo"
              className="h-12 w-12 object-contain hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        {/* Right Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <NavLink to="/events" className={linkClass}>
            Events
          </NavLink>
          <NavLink to="/workshops" className={linkClass}>
            Workshops
          </NavLink>
          <NavLink to="/join" className={linkClass}>
            Join Us
          </NavLink>
        </div>
      </div>

      {/* Right Action (Avatar / Sign In) */}
      <div className="absolute right-6 lg:right-10 flex items-center">
        {isAuthenticated && user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center gap-2 transition-colors ${scrolled ? 'text-white hover:text-accent' : 'text-secondary hover:text-secondary/80'}`}
            >
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                />
              ) : (
                <FaUserCircle className="w-10 h-10" />
              )}
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                  {/* User Info */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {user.role.name}
                    </span>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <MdAdminPanelSettings className="w-5 h-5" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FiUser className="w-5 h-5" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FiSettings className="w-5 h-5" />
                      <span>Settings</span>
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <FiLogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-full font-medium bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
