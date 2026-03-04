import { TeamMember } from '@/shared/types/team.types';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ExecutiveMember extends TeamMember {
    position: string; // e.g. "Chair", "Vice Chair", "Secretary"
}

export interface Committee {
    name: string;
    head?: TeamMember;
    members: TeamMember[];
}

export interface Section {
    name: string;
    icon: string; // emoji icon for the tab
    committees: Committee[];
}

export interface OrgChartNode {
    label: string;
    subtitle?: string;
    avatar?: string;
    children?: OrgChartNode[];
    sectionKey?: string; // maps to SECTIONS index for expansion
}

// ─── Placeholder Photos ──────────────────────────────────────────────────────

const PHOTOS = {
    male1: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    male2: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    male3: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    male4: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    female1: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&h=400&fit=crop',
    female2: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
    female3: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    female4: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
};

// ─── Helper ──────────────────────────────────────────────────────────────────

function member(name: string, role: string, image: string, linkedin?: string): TeamMember {
    return {
        name,
        role,
        bio: '',
        image,
        socials: { linkedin: linkedin || '#' },
    };
}

// ─── Executive Board ─────────────────────────────────────────────────────────

export const EXECUTIVE_BOARD: ExecutiveMember[] = [
    { ...member('Ahmed Mostafa', 'Chair', PHOTOS.male1), position: 'Chair' },
    { ...member('Sara Ibrahim', 'Vice Chair', PHOTOS.female1), position: 'Vice Chair' },
    { ...member('Mohamed Tarek', 'Secretary', PHOTOS.male2), position: 'Secretary' },
    { ...member('Nour El-Din', 'Treasurer', PHOTOS.male3), position: 'Treasurer' },
    { ...member('Hana Youssef', 'PR & FR Head', PHOTOS.female2), position: 'PR & FR' },
    { ...member('Karim Adel', 'OC Head', PHOTOS.male4), position: 'OC' },
];

// ─── Sections & Committees ──────────────────────────────────────────────────

export const SECTIONS: Section[] = [
    {
        name: 'Technical',
        icon: '⚡',
        committees: [
            {
                name: 'Electronics',
                head: member('Liam O.', 'Head of Electronics', PHOTOS.male1),
                members: [
                    member('Emily R.', 'Member', PHOTOS.female3),
                    member('Jacob S.', 'Member', PHOTOS.male2),
                ],
            },
            {
                name: 'Embedded Systems',
                head: member('Omar K.', 'Head of Embedded Systems', PHOTOS.male3),
                members: [
                    member('Emily R.', 'Member', PHOTOS.female1),
                    member('Jacob S.', 'Member', PHOTOS.male4),
                ],
            },
            {
                name: 'AI & Data Analysis',
                head: member('Fatima Z.', 'Head of AI & Data', PHOTOS.female2),
                members: [
                    member('Emily R.', 'Member', PHOTOS.female4),
                    member('Jacob S.', 'Member', PHOTOS.male1),
                ],
            },
            {
                name: 'Cybersecurity',
                head: member('Hassan M.', 'Head of Cybersecurity', PHOTOS.male2),
                members: [
                    member('Jacob S.', 'Member', PHOTOS.male3),
                ],
            },
            {
                name: 'Power',
                head: member('Rana A.', 'Head of Power', PHOTOS.female3),
                members: [
                    member('Emily R.', 'Member', PHOTOS.female1),
                    member('Jacob S.', 'Member', PHOTOS.male4),
                ],
            },
            {
                name: 'Robotics',
                head: member('Youssef H.', 'Head of Robotics', PHOTOS.male4),
                members: [
                    member('Emily R.', 'Member', PHOTOS.female2),
                    member('Jacob S.', 'Member', PHOTOS.male1),
                ],
            },
        ],
    },
    {
        name: 'Branding',
        icon: '🎨',
        committees: [
            {
                name: 'Marketing',
                head: member('Liam Emos', 'Head of Marketing', PHOTOS.male1),
                members: [
                    member('Dania F.', 'Member', PHOTOS.female4),
                ],
            },
            {
                name: 'Multimedia',
                head: member('Doaa Gurran', 'Head of Multimedia', PHOTOS.female3),
                members: [
                    member('Samir T.', 'Member', PHOTOS.male2),
                ],
            },
            {
                name: 'Podcast',
                head: member('Amira W.', 'Head of Podcast', PHOTOS.female1),
                members: [],
            },
            {
                name: 'Magazine',
                head: member('Nichol Burken', 'Head of Magazine', PHOTOS.female2),
                members: [],
            },
        ],
    },
    {
        name: 'IT',
        icon: '💻',
        committees: [
            {
                name: 'Web',
                head: member('Black Mailer', 'Head of Web', PHOTOS.male3),
                members: [
                    member('Hala N.', 'Member', PHOTOS.female4),
                    member('Mostafa K.', 'Member', PHOTOS.male1),
                ],
            },
            {
                name: 'Mobile',
                head: member('Lamar Buani', 'Head of Mobile', PHOTOS.female1),
                members: [],
            },
        ],
    },
    {
        name: 'Quality Control',
        icon: '✅',
        committees: [
            {
                name: 'HR',
                head: member('Mark Motter', 'Head of HR', PHOTOS.male2),
                members: [
                    member('Nada S.', 'Member', PHOTOS.female3),
                ],
            },
            {
                name: 'T&D',
                head: member('Saresor Guruva', 'Head of T&D', PHOTOS.male4),
                members: [
                    member('Kareem L.', 'Member', PHOTOS.male1),
                ],
            },
        ],
    },
    {
        name: 'Board of Advisors',
        icon: '🏛️',
        committees: [
            {
                name: 'Advisory Board',
                head: member('Jana Buuni', 'Head of Robotics', PHOTOS.female2),
                members: [
                    member('Prof. Adel M.', 'Advisor', PHOTOS.male3),
                    member('Dr. Salma K.', 'Advisor', PHOTOS.female4),
                ],
            },
        ],
    },
];

// ─── Org Chart Tree Structure ───────────────────────────────────────────────

export const ORG_CHART_TREE: OrgChartNode = {
    label: 'Chair & Vice Chair',
    subtitle: 'Professional Chair',
    avatar: PHOTOS.male1,
    children: [
        {
            label: 'Secretary',
            subtitle: 'Secretary',
            avatar: PHOTOS.male2,
        },
        {
            label: 'Treasurer',
            subtitle: 'Treasurer',
            avatar: PHOTOS.male3,
            children: [
                { label: 'PR & FR', subtitle: 'Public Relations' },
                { label: 'OC', subtitle: 'Operations Committee' },
            ],
        },
        { label: 'Technical Section', sectionKey: 'Technical' },
        { label: 'Branding Section', sectionKey: 'Branding' },
        { label: 'IT Section', sectionKey: 'IT' },
        { label: 'Quality Control', sectionKey: 'Quality Control' },
        { label: 'Board of Advisors', sectionKey: 'Board of Advisors' },
    ],
};
