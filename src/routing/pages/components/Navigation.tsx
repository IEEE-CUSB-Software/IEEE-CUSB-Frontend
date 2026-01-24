import { motion } from 'framer-motion';
import logoImage from '@/assets/logo.jpg';

export const Navigation = () => {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img src={logoImage} alt="IEEE CUSB" className="w-12 h-12 rounded-full" />
                    <span className="font-bold text-xl text-gray-900">IEEE CUSB</span>
                </div>

                {/* Navigation Links (hidden on mobile) */}
                <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
                    <a href="#about" className="hover:text-primary transition-colors">
                        About
                    </a>
                    <a href="#events" className="hover:text-primary transition-colors">
                        Events
                    </a>
                    <a href="#committees" className="hover:text-primary transition-colors">
                        Committees
                    </a>
                    <a href="#join" className="hover:text-primary transition-colors">
                        Join Us
                    </a>
                </div>

                {/* CTA Button */}
                <motion.a
                    href="#join"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                >
                    Get Started
                </motion.a>
            </div>
        </motion.nav>
    );
};
