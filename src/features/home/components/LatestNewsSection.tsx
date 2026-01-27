import { SectionReveal } from './SectionReveal';

interface NewsCardProps {
    category: string;
    title: string;
    description: string;
    gradient: string;
    delay?: number;
}

const NewsCard = ({ category, title, description, gradient, delay = 0 }: NewsCardProps) => (
    <SectionReveal delay={delay}>
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className={`h-48 bg-gradient-to-br ${gradient}`} />
            <div className="p-6">
                <span className="text-sm text-primary font-semibold uppercase tracking-wide">
                    {category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <a href="#" className="text-primary font-semibold hover:underline">
                    Read Article
                </a>
            </div>
        </div>
    </SectionReveal>
);

export const LatestNewsSection = () => {
    const newsItems = [
        {
            category: 'Workshop',
            title: 'Global Engineering Summit Recap',
            description:
                'Our members shared insights on cutting-edge technologies and global industry trends.',
            gradient: 'from-primary to-gray-900',
        },
        {
            category: 'Competition',
            title: 'Robotics Hand-on Session',
            description:
                'Students worked hands-on building autonomous robots for engineering challenges.',
            gradient: 'from-gray-800 to-primary',
        },
        {
            category: 'Achievement',
            title: 'Regional Award Winners',
            description: 'Congratulations to our talented members for their award-winning projects.',
            gradient: 'from-primary to-black',
        },
    ];

    return (
        <section id="news" className="py-24 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">Latest News</h2>
                        <p className="text-gray-600">Updates from our chapters and student activities</p>
                    </div>
                    <a href="#" className="text-primary font-semibold hover:underline">
                        View Archive →
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {newsItems.map((item, index) => (
                        <NewsCard key={index} {...item} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};
