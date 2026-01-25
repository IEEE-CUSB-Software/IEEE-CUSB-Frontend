import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaVimeoV,
} from 'react-icons/fa';
import logoFooter from '@/assets/logo_footer.png';
import cairoFooter from '@/assets/cairo_footer.png';

export const Footer = () => {
  return (
    <footer className="relative w-full bg-[#0A142F]/90 text-white pt-16 pb-6 mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Top Section: Logos Left | Links Right */}
        <div className="flex flex-row justify-between items-start gap-10 md:gap-20 mb-16">
          {/* Column 1: Logos (Left) - Hidden on mobile via custom CSS */}
          <div className="footer-logos items-center gap-10 opacity-90">
            <img
              src={logoFooter}
              alt="IEEE CUSB"
              className="h-[200px] w-auto object-contain hover:opacity-100 transition-opacity"
            />
            <img
              src={cairoFooter}
              alt="IEEE Cairo Section"
              className="h-[180px] w-auto object-contain hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Column 2: Links (Right) */}
          <div className="flex flex-col gap-10 flex-1 lg:items-start">
            {/* Main Navigation Links */}
            <div className="flex items-center justify-start gap-4 text-2xl md:text-3xl font-light font-sans flex-wrap">
              <Link
                to="/about"
                className="hover:text-primary transition-colors"
              >
                About
              </Link>
              <span className="text-white/50">/</span>
              <Link
                to="/events"
                className="hover:text-primary transition-colors"
              >
                Events
              </Link>
              <span className="text-white/50">/</span>
              <Link
                to="/workshops"
                className="hover:text-primary transition-colors"
              >
                Workshops
              </Link>
              <span className="text-white/50">/</span>
              <Link
                to="/contact"
                className="hover:text-primary transition-colors"
              >
                Contacts
              </Link>
            </div>

            {/* IEEE External Links */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-left text-gray-300">
              <a
                href="https://www.ieee.org/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                IEEE.org
              </a>
              <a
                href="https://ieeexplore.ieee.org/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                IEEE Xplore
              </a>
              <a
                href="https://spectrum.ieee.org/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                IEEE Spectrum
              </a>
              <a
                href="https://standards.ieee.org/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                IEEE Standards
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Policies, Text, Socials */}
        <div className="border-t border-white/10 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Policy Links (Left) */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-4 text-xs text-gray-400 order-2 lg:order-1">
            <a
              href="https://www.ieee.org/security-privacy.html"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <span>|</span>
            <a
              href="https://www.ieee.org/about/help/site-terms-conditions.html"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Terms
            </a>
            <span>|</span>
            <a
              href="https://www.ieee.org/about/corporate/governance/p9-26.html"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Non-Discrimination
            </a>
          </div>

          {/* Copyright Text (Center) */}
          <div className="text-sm text-gray-400 font-light text-center order-1 lg:order-2">
            Made with IEEE CUSB Web Team
          </div>

          {/* Social Icons (Right) */}
          <div className="flex items-center gap-4 order-3">
            <a
              href="#"
              className="bg-white text-[#0A142F] p-2.5 rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              className="bg-white text-[#0A142F] p-2.5 rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="#"
              className="bg-white text-[#0A142F] p-2.5 rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="#"
              className="bg-white text-[#0A142F] p-2.5 rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              <FaVimeoV size={18} />
            </a>
            <a
              href="#"
              className="bg-white text-[#0A142F] p-2.5 rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
