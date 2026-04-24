import { PageHeroSection } from '@/shared/components/PageHeroSection';

export const MembershipHeroSection = () => {
  return (
    <PageHeroSection
      eyebrow="Join • Connect • Grow"
      title="Become an IEEE Member"
      description="Join a global community of technology professionals, build your network, access exclusive resources, and accelerate your career. Take the first step towards shaping the future of engineering."
      ctaContent={
        <a
          href="https://www.ieee.org/membership/join/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Join IEEE Now →
        </a>
      }
    />
  );
};
