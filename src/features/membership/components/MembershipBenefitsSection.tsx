import { SectionReveal } from '@/features/home/components/SectionReveal';
import { BENEFITS } from '../constants/benefits';
import { FaCode, FaMicrochip, FaBook, FaTv, FaFileAlt, FaGlobe } from 'react-icons/fa';

const iconMap: Record<string, React.ReactNode> = {
  FaCode: <FaCode className="w-8 h-8" />,
  FaMicrochip: <FaMicrochip className="w-8 h-8" />,
  FaBook: <FaBook className="w-8 h-8" />,
  FaTv: <FaTv className="w-8 h-8" />,
  FaFileAlt: <FaFileAlt className="w-8 h-8" />,
  FaGlobe: <FaGlobe className="w-8 h-8" />,
};

export const MembershipBenefitsSection = () => {
  return (
    <section className="py-12 md:py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Exclusive Member Benefits
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              As an IEEE member, you get access to a suite of tools, resources, and exclusive programs designed to boost your career.
            </p>
          </div>
        </SectionReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, index) => (
            <SectionReveal key={benefit.id} delay={index * 0.1}>
              <div className="p-8 rounded-2xl bg-muted/40 border border-border hover:border-primary/50 transition-colors h-full flex flex-col group hover:shadow-lg">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform p-4 sm:p-5 border border-gray-200 dark:border-gray-800 shrink-0 mx-auto md:mx-0">
                  {benefit.image ? (
                    benefit.id === 'spc' ? (
                      <div 
                        className="w-full h-full bg-primary" 
                        style={{ 
                          WebkitMaskImage: `url(${benefit.image})`, 
                          WebkitMaskSize: 'contain', 
                          WebkitMaskRepeat: 'no-repeat', 
                          WebkitMaskPosition: 'center',
                          maskImage: `url(${benefit.image})`,
                          maskSize: 'contain',
                          maskRepeat: 'no-repeat',
                          maskPosition: 'center'
                        }} 
                      />
                    ) : (
                      <img src={benefit.image} alt={benefit.name} className="w-full h-full object-contain" />
                    )
                  ) : (
                    <div className="text-primary w-full h-full flex items-center justify-center">
                      {iconMap[benefit.icon as keyof typeof iconMap]}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.name}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{benefit.description}</p>
                <a
                  href={benefit.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:text-primary/80 inline-flex items-center"
                >
                  Learn More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
