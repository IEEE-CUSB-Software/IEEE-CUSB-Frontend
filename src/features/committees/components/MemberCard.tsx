import { TeamMember } from '@/shared/types/team.types';
import { IoLogoLinkedin } from 'react-icons/io5';

interface MemberCardProps {
    member: TeamMember;
    compact?: boolean;
}

export const MemberCard = ({ member, compact }: MemberCardProps) => {
    return (
        <div
            className={`flex items-center gap-3 rounded-xl transition-colors ${compact ? 'p-2' : 'p-3 bg-surface hover:bg-background-light'
                }`}
        >
            <img
                src={member.image}
                alt={member.name}
                className={`rounded-full object-cover flex-shrink-0 ${compact ? 'w-9 h-9' : 'w-12 h-12'
                    }`}
            />
            <div className="flex-1 min-w-0">
                <p
                    className={`font-semibold text-foreground truncate ${compact ? 'text-sm' : 'text-base'
                        }`}
                >
                    {member.name}
                </p>
                <p
                    className={`text-muted-foreground truncate ${compact ? 'text-xs' : 'text-sm'
                        }`}
                >
                    {member.role}
                </p>
            </div>
            {member.socials.linkedin && (
                <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-info transition-colors flex-shrink-0"
                    aria-label={`${member.name}'s LinkedIn`}
                >
                    <IoLogoLinkedin className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
                </a>
            )}
        </div>
    );
};
