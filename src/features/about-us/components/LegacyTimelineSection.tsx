import { motion } from 'framer-motion';

interface TimelineEvent {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '2011',
    title: 'IEEE CUSB Founded',
    subtitle: 'Foundation',
    description:
      'The journey began with a small group of visionary students aiming to bring IEEE activities to Cairo University.',
  },
  {
    year: '2013',
    title: 'First Major Conference',
    subtitle: 'Expansion',
    description:
      'Launched our first technical conference with Egyptian legends participating, marking our presence.',
  },
  {
    year: '2018',
    title: 'Regional Award Winner',
    subtitle: 'Global Recognition',
    description:
      'Won the Region 8 Exemplary Student Branch Award for outstanding activities and membership growth.',
  },
  {
    year: '2023',
    title: 'Record Breaking Membership',
    subtitle: 'Growth',
    description:
      'Reached over 400 active members and launched 6 student technical chapters.',
  },
];

interface LegacyTimelineSectionProps {
  darkMode?: boolean;
}

export const LegacyTimelineSection = ({
  darkMode,
}: LegacyTimelineSectionProps) => {
  return (
    <section
      className={`py-24 px-6 ${
        darkMode
          ? 'bg-gradient-to-b from-gray-900 to-gray-800'
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-xs font-bold tracking-widest text-info uppercase mb-3">
            OUR JOURNEY
          </div>
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            A Legacy of Impact
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-info/50 via-info/30 to-transparent hidden md:block" />

          {/* Timeline Events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${
                    isEven ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Year - Left Side on Desktop */}
                  <div
                    className={`${
                      isEven ? 'md:text-right' : 'md:order-2'
                    } space-y-2`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-block"
                    >
                      <div className="text-5xl md:text-6xl font-bold text-info">
                        {event.year}
                      </div>
                      {event.subtitle && (
                        <div className="text-sm text-gray-500 font-medium mt-1">
                          {event.subtitle}
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                      className={`w-6 h-6 bg-info rounded-full border-4 shadow-lg ${
                        darkMode ? 'border-gray-800' : 'border-white'
                      }`}
                    />
                  </div>

                  {/* Content - Right Side on Desktop */}
                  <div className={isEven ? '' : 'md:order-1'}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow ${
                        darkMode ? 'bg-gray-800' : 'bg-white'
                      }`}
                    >
                      <h3
                        className={`text-2xl font-bold mb-3 ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {event.title}
                      </h3>
                      <p
                        className={`leading-relaxed ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {event.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
