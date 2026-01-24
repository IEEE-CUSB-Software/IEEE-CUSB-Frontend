import logoImage from '@/assets/logo.jpg';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                {/* Brand */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <img src={logoImage} alt="IEEE CUSB" className="w-12 h-12 rounded-full" />
                        <span className="font-bold text-xl text-white">IEEE CUSB</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">
                        Advancing Technology for Humanity. The Official Student Branch of Cairo University.
                    </p>
                    <div className="flex gap-3">
                        <a
                            href="#"
                            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                        >
                            <span className="text-sm">f</span>
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                        >
                            <span className="text-sm">in</span>
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                        >
                            <span className="text-sm">tw</span>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-bold text-white mb-4">Quick Links</h3>
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
                            <a href="#committees" className="hover:text-primary transition-colors">
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
                    <h3 className="font-bold text-white mb-4">Resources</h3>
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
                    <h3 className="font-bold text-white mb-4">Contact Us</h3>
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

            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
                <p>
                    © 2026 IEEE Cairo University Student Branch. All rights reserved. Privacy Policy | Terms
                    of Service
                </p>
            </div>
        </footer>
    );
};
