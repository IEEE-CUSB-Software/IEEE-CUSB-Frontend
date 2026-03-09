import { TeamMember } from '@/shared/types/team.types';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ExecutiveMember extends TeamMember {
    position: string; // e.g. "Chair", "Vice Chair", "Secretary"
}

export interface Committee {
    name: string;
    slug: string;
    description: string;
    sectionName: string; // e.g. "Technical", "Branding"
    head?: TeamMember;
    viceHead?: TeamMember;
    members: TeamMember[];
}

export interface Section {
    name: string;
    icon: string;
    committees: Committee[];
}

export interface OrgChartNode {
    label: string;
    subtitle?: string;
    avatar?: string;
    children?: OrgChartNode[];
    sectionKey?: string;
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

function member(
    name: string,
    role: string,
    image: string,
    bio = '',
    linkedin?: string
): TeamMember {
    return {
        name,
        role,
        bio,
        image,
        socials: {
            linkedin: linkedin || '#',
        },
    };
}

// ─── Executive Board ─────────────────────────────────────────────────────────

export const EXECUTIVE_BOARD: ExecutiveMember[] = [
    { ...member('Ahmed Mostafa', 'Chair', PHOTOS.male1, 'Leading the student branch with a clear vision for excellence and community building.'), position: 'Chair' },
    { ...member('Sara Ibrahim', 'Vice Chair', PHOTOS.female1, 'Supporting leadership initiatives and coordinating between all sections and committees.'), position: 'Vice Chair' },
    { ...member('Mohamed Tarek', 'Secretary', PHOTOS.male2, 'Managing communications, documentation, and organizational tasks for the branch.'), position: 'Secretary' },
    { ...member('Nour El-Din', 'Treasurer', PHOTOS.male3, 'Overseeing financial planning, budgets, and resource allocation.'), position: 'Treasurer' },
    { ...member('Hana Youssef', 'PR & FR Head', PHOTOS.female2, 'Building connections and promoting growth through public relations and fundraising.'), position: 'PR & FR' },
    { ...member('Karim Adel', 'OC Head', PHOTOS.male4, 'Crafting events that bring the community together.'), position: 'OC' },
];

// ─── Sections & Committees ──────────────────────────────────────────────────

export const SECTIONS: Section[] = [
    {
        name: 'Technical',
        icon: '⚡',
        committees: [
            {
                name: 'Electronics',
                slug: 'electronics',
                description: 'Designing circuits and hardware that power tomorrow\'s innovations.',
                sectionName: 'Technical',
                head: member('Liam O.', 'Electronics Head', PHOTOS.male1, 'A dedicated electronics engineer with extensive experience in circuit design, PCB layout, and embedded hardware. He leads the team in building innovative hardware solutions.'),
                members: [
                    member('Emily R.', 'Member', PHOTOS.female3),
                    member('Jacob S.', 'Member', PHOTOS.male2),
                ],
            },
            {
                name: 'Embedded Systems',
                slug: 'embedded-systems',
                description: 'Programming the hardware that makes smart devices smart.',
                sectionName: 'Technical',
                head: member('Omar K.', 'Embedded Systems Head', PHOTOS.male3, 'An embedded systems specialist with deep expertise in microcontrollers, RTOS, and firmware development. His passion lies in bridging hardware and software.'),
                members: [
                    member('Emily R.', 'Member', PHOTOS.female1),
                    member('Jacob S.', 'Member', PHOTOS.male4),
                ],
            },
            {
                name: 'Artificial Intelligence',
                slug: 'ai',
                description: 'Guiding machines to learn so they don\'t guide us (yet).',
                sectionName: 'Technical',
                head: member('Fatima Z.', 'AI Head', PHOTOS.female2, 'A professional AI Engineer with strong expertise in ML, DL, CV, NLP, and GenAI. She continues to drive innovation and deliver impactful AI solutions.'),
                viceHead: member('Salma A.', 'AI Vice Head', PHOTOS.female4, 'An AI enthusiast with hands-on experience in real projects. Recognized for strong communication skills and delivering sessions with clear explanations.'),
                members: [
                    member('Emily R.', 'Member', PHOTOS.female4),
                    member('Jacob S.', 'Member', PHOTOS.male1),
                ],
            },
            {
                name: 'Cybersecurity',
                slug: 'cybersecurity',
                description: 'Your data\'s bodyguard, 24/7.',
                sectionName: 'Technical',
                head: member('Hassan M.', 'Cybersecurity Head', PHOTOS.male2, 'A cybersecurity specialist focused on network security, penetration testing, and ethical hacking. He trains the next generation of security professionals.'),
                members: [
                    member('Jacob S.', 'Member', PHOTOS.male3),
                ],
            },
            {
                name: 'Power',
                slug: 'power',
                description: 'Energizing the future with sustainable power solutions.',
                sectionName: 'Technical',
                head: member('Rana A.', 'Power Head', PHOTOS.female3, 'A power systems engineer with expertise in renewable energy and smart grid technologies. She leads research into next-generation power solutions.'),
                members: [
                    member('Emily R.', 'Member', PHOTOS.female1),
                    member('Jacob S.', 'Member', PHOTOS.male4),
                ],
            },
            {
                name: 'Robotics',
                slug: 'robotics',
                description: 'Building intelligent machines that move, sense, and interact.',
                sectionName: 'Technical',
                head: member('Youssef H.', 'Robotics Head', PHOTOS.male4, 'A robotics engineer with extensive experience in mechanical design, motion control, and computer vision for autonomous systems.'),
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
                slug: 'marketing',
                description: 'Crafting the story that connects with our audience.',
                sectionName: 'Branding',
                head: member('Liam Emos', 'Marketing Head', PHOTOS.male1, 'A creative marketer with a talent for brand storytelling and digital campaigns that drive engagement.'),
                members: [
                    member('Dania F.', 'Member', PHOTOS.female4),
                ],
            },
            {
                name: 'Multimedia',
                slug: 'multimedia',
                description: 'Turning moments into memories through visual storytelling.',
                sectionName: 'Branding',
                head: member('Doaa Gurran', 'Multimedia Head', PHOTOS.female3, 'A skilled multimedia creator with expertise in video production, photography, and graphic design.'),
                members: [
                    member('Samir T.', 'Member', PHOTOS.male2),
                ],
            },
            {
                name: 'Podcast',
                slug: 'podcast',
                description: 'Amplifying voices and sharing knowledge through audio.',
                sectionName: 'Branding',
                head: member('Amira W.', 'Podcast Head', PHOTOS.female1, 'A podcast producer passionate about creating engaging audio content that inspires and educates.'),
                members: [],
            },
            {
                name: 'Magazine',
                slug: 'magazine',
                description: 'Curating insightful content for the IEEE community.',
                sectionName: 'Branding',
                head: member('Nichol Burken', 'Magazine Head', PHOTOS.female2, 'An editorial lead with a keen eye for design and compelling written content.'),
                members: [],
            },
        ],
    },
    {
        name: 'IT',
        icon: '💻',
        committees: [
            {
                name: 'Web Development',
                slug: 'web-development',
                description: 'From concept to code, bringing ideas online.',
                sectionName: 'IT',
                head: member('Black Mailer', 'Web Dev Head', PHOTOS.male3, 'A full-stack developer with deep expertise in modern web technologies, from React to Node.js.'),
                members: [
                    member('Hala N.', 'Member', PHOTOS.female4),
                    member('Mostafa K.', 'Member', PHOTOS.male1),
                ],
            },
            {
                name: 'Flutter',
                slug: 'flutter',
                description: 'One codebase, endless possibilities.',
                sectionName: 'IT',
                head: member('Lamar Buani', 'Flutter Head', PHOTOS.female1, 'A mobile development specialist building cross-platform solutions with Flutter and Dart.'),
                members: [],
            },
        ],
    },
    {
        name: 'Non-Technical',
        icon: '✅',
        committees: [
            {
                name: 'Human Resources',
                slug: 'hr',
                description: 'People-first, always.',
                sectionName: 'Non-Technical',
                head: member('Mark Motter', 'HR Head', PHOTOS.male2, 'An HR specialist focused on team building, talent development, and organizational culture.'),
                members: [
                    member('Nada S.', 'Member', PHOTOS.female3),
                ],
            },
            {
                name: 'PR & Fundraising',
                slug: 'pr',
                description: 'Building connections and promoting growth.',
                sectionName: 'Non-Technical',
                head: member('Saresor Guruva', 'PR Head', PHOTOS.male4, 'A public relations professional skilled in partnership building and sponsor acquisition.'),
                members: [
                    member('Kareem L.', 'Member', PHOTOS.male1),
                ],
            },
            {
                name: 'Event Coordination',
                slug: 'event-coordination',
                description: 'Crafting events that click.',
                sectionName: 'Non-Technical',
                head: member('Jana Buuni', 'EC Head', PHOTOS.female2, 'An event coordination expert with experience planning and executing large-scale technical events.'),
                members: [
                    member('Prof. Adel M.', 'Member', PHOTOS.male3),
                    member('Dr. Salma K.', 'Member', PHOTOS.female4),
                ],
            },
        ],
    },
];

/** Flat list of all committees for easy lookup */
export const ALL_COMMITTEES: Committee[] = SECTIONS.flatMap((s) => s.committees);

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
        { label: 'Non-Technical', sectionKey: 'Non-Technical' },
    ],
};
