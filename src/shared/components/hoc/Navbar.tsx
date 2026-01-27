import { Link, NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import logo from '@/assets/logo.png';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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
        <button
          className={`transition-colors ${scrolled ? 'text-white hover:text-accent' : 'text-secondary hover:text-secondary/80'}`}
        >
          <FaUserCircle className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};
