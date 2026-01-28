import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiBell, FiChevronRight, FiMenu } from 'react-icons/fi';
import logo from '@/assets/logo.png'; // Using logo as a fallback avatar for now

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Mobile Menu + Breadcrumbs */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <FiMenu className="w-6 h-6" />
          </button>

          <nav className="hidden md:flex items-center text-sm font-medium text-gray-500">
            <Link to="/admin" className="hover:text-primary transition-colors">
              Admin
            </Link>
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              // Skip 'admin' since we added it manually
              if (name === 'admin') return null;
              const isLast = index === pathnames.length - 1;

              return (
                <React.Fragment key={name}>
                  <FiChevronRight className="w-4 h-4 mx-2" />
                  {isLast ? (
                    <span className="text-gray-900 capitalize">{name}</span>
                  ) : (
                    <Link
                      to={routeTo}
                      className="hover:text-primary transition-colors capitalize"
                    >
                      {name}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

          <button className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
            <img
              src={logo}
              alt="User Avatar"
              className="w-8 h-8 rounded-full bg-gray-100 object-cover"
            />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-gray-900 leading-none">
                Admin User
              </p>
              <p className="text-xs text-gray-500 mt-1">Administrator</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
