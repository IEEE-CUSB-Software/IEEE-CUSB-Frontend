import { ReactNode } from 'react';
import {
    HiOutlineLightningBolt,
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineShieldCheck,
    HiOutlineAcademicCap,
} from 'react-icons/hi';

const SECTION_ICONS: Record<string, ReactNode> = {
    Technical: <HiOutlineLightningBolt className="w-full h-full" />,
    Branding: <HiOutlineColorSwatch className="w-full h-full" />,
    IT: <HiOutlineDesktopComputer className="w-full h-full" />,
    'Quality Control': <HiOutlineShieldCheck className="w-full h-full" />,
    'Board of Advisors': <HiOutlineAcademicCap className="w-full h-full" />,
};

interface SectionIconProps {
    sectionName: string;
    size?: 'sm' | 'md' | 'lg';
    active?: boolean;
}

const sizeClasses = {
    sm: 'w-8 h-8 p-1.5',
    md: 'w-10 h-10 p-2',
    lg: 'w-12 h-12 p-2.5',
};

export const SectionIcon = ({ sectionName, size = 'md', active }: SectionIconProps) => {
    const icon = SECTION_ICONS[sectionName];
    if (!icon) return null;

    return (
        <div
            className={`rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${sizeClasses[size]} ${active
                    ? 'bg-white/20 text-white'
                    : 'bg-primary/10 text-primary'
                }`}
        >
            {icon}
        </div>
    );
};
