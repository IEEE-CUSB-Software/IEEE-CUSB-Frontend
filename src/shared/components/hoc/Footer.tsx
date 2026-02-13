import logoImage from '@/assets/logo.jpg';
import { useTheme } from '@/shared/hooks/useTheme';

export const Footer = () => {
  const { isDark } = useTheme();
  return (
    <footer
      className={`py-16 px-6 transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-600'}`}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={logoImage}
              alt="IEEE CUSB"
              className="w-12 h-12 rounded-full"
            />
            <span
              className={`font-bold text-xl transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              IEEE CUSB
            </span>
          </div>
          <p
            className={`text-sm mb-4 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            Advancing Technology for Humanity. The Official Student Branch of
            Cairo University.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition-all ${
                isDark
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-600 shadow-sm border border-gray-100'
              }`}
            >
              <span className="text-sm font-bold">f</span>
            </a>
            <a
              href="#"
              className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition-all ${
                isDark
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-600 shadow-sm border border-gray-100'
              }`}
            >
              <span className="text-sm font-bold">in</span>
            </a>
            <a
              href="#"
              className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition-all ${
                isDark
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-600 shadow-sm border border-gray-100'
              }`}
            >
              <span className="text-sm font-bold">tw</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3
            className={`font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-primary transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a
                href="#committees"
                className="hover:text-primary transition-colors"
              >
                Our Committees
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Our Team
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3
            className={`font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                IEEE.org
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                IEEE xplore
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Spectrum Online
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3
            className={`font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span>Faculty of Engineering, Cairo University, Giza, Egypt</span>
            </li>
            <li className="flex items-start gap-2">
              <span>📧</span>
              <span>contact@ieeecusb.org</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`max-w-7xl mx-auto mt-12 pt-8 border-t text-center text-sm transition-colors duration-300 ${
          isDark
            ? 'border-gray-800 text-gray-400'
            : 'border-gray-200 text-gray-500'
        }`}
      >
        <p>
          © 2026 IEEE Cairo University Student Branch. All rights reserved.
          Privacy Policy | Terms of Service
        </p>
      </div>
    </footer>
  );
};
