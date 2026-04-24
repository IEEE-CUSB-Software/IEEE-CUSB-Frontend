import { SectionReveal } from './SectionReveal';
import { HiExternalLink } from 'react-icons/hi';
import logo from '@/assets/logo.png';

const IEEE_LINKS = [
  { label: 'IEEE.org', href: 'https://www.ieee.org/' },
  { label: 'IEEE Xplore', href: 'https://ieeexplore.ieee.org/Xplore/home.jsp' },
  { label: 'IEEE Spectrum', href: 'https://spectrum.ieee.org/' },
  { label: 'Join IEEE', href: 'https://www.ieee.org/membership/join/index.html' },
];

export const AboutIEEESection = () => {
  return (
    <section id="about-ieee" className="py-12 md:py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <SectionReveal>
            <div className="flex items-center justify-center">
              <a
                href="https://www.ieee.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={logo}
                  alt="IEEE Logo"
                  className="w-48 h-48 md:w-64 md:h-64 object-contain hover:scale-105 transition-transform duration-300"
                />
              </a>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About IEEE
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              IEEE (Institute of Electrical and Electronics Engineers) is the
              world's largest technical professional organization with +450,000
              members dedicated to advancing technology for the benefit of
              humanity.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              IEEE and its members inspire a global community through its highly
              cited publications, conferences, technology standards, and
              professional and educational activities. IEEE is, and remains,
              strongly committed to diversity, equity, and inclusion.
            </p>

            <div className="flex flex-wrap gap-3">
              {IEEE_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  {label}
                  <HiExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};
