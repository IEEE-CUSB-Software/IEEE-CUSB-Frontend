import React from 'react';
import {
  FiHome,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiBarChart2,
  FiLogOut,
  FiBookOpen,
} from 'react-icons/fi';
import logo from '@/assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/shared/hooks/useTheme';
import { useLogout } from '@/shared/queries/auth';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpen = true,
  onClose,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const { mutate: logout } = useLogout();

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FiHome className="w-5 h-5" />,
      path: '/admin',
    },
    {
      id: 'events',
      label: 'Events',
      icon: <FiCalendar className="w-5 h-5" />,
      path: '/admin/events',
    },
    {
      id: 'workshops',
      label: 'Workshops',
      icon: <FiBookOpen className="w-5 h-5" />,
      path: '/admin/workshops',
    },
    {
      id: 'posts',
      label: 'Posts',
      icon: <FiBookOpen className="w-5 h-5" />,
      path: '/admin/posts',
    },
    {
      id: 'locations',
      label: 'Locations',
      icon: <FiMapPin className="w-5 h-5" />,
      path: '/admin/locations',
    },
    {
      id: 'users',
      label: 'Users',
      icon: <FiUsers className="w-5 h-5" />,
      path: '/admin/users',
    },
    {
      id: 'statistics',
      label: 'Statistics',
      icon: <FiBarChart2 className="w-5 h-5" />,
      path: '/admin/statistics',
    },
  ];

  const handleNavClick = (item: NavItem) => {
    navigate(item.path);
    if (onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <aside
        className={`
          fixed left-0 top-0 z-40
          transition-all duration-300 ease-in-out
          h-screen w-64
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isDark ? 'bg-gray-900 border-gray-800 shadow-xl shadow-black/20' : 'bg-white border-r border-gray-200'}
        `}
      >
        <div className="h-full flex flex-col py-6">
          {/* Logo / Brand Area */}
          <div className="px-6 pb-8 flex items-center justify-center gap-3">
            <div
              className={`p-1.5 rounded-lg transition-colors duration-300 ${isDark ? 'bg-white/10' : 'bg-primary/5'}`}
            >
              <img
                src={logo}
                alt="IEEE Logo"
                className="h-10 w-10 object-contain"
              />
            </div>
            <span
              className={`font-bold text-lg transition-colors duration-300 ${isDark ? 'text-white' : 'text-primary'}`}
            >
              IEEE Admin
            </span>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`
                    w-full h-12
                    flex items-center gap-3
                    px-4
                    rounded-lg
                    cursor-pointer
                    transition-all duration-200
                    ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-primary font-semibold'
                        : isDark
                          ? 'text-gray-400 hover:bg-gray-800 hover:text-white font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                    }
                  `}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div
            className={`px-3 mt-auto pt-6 border-t transition-colors duration-300 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}
          >
            <button
              onClick={handleLogout}
              className="
                w-full h-12
                flex items-center gap-3
                px-4
                rounded-lg
                cursor-pointer
                transition-all duration-200
                ${isDark ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300' : 'text-red-500 hover:bg-red-50 hover:text-red-600'}
              "
            >
              <span className="flex-shrink-0">
                <FiLogOut className="w-5 h-5" />
              </span>
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
