import { SectionReveal } from './SectionReveal';

const Team = [
  {
    name: 'mariam',
    role: 'head',
    bio: 'software engineer',
    image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe',
    socials: {
      linkedin: '',
      github: '',
      twitter: '',
    },
  },
  {
    name: 'mariam',
    role: 'head',
    bio: 'software engineer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    socials: {
      linkedin: '',
      github: '',
      twitter: '',
    },
  },
  {
    name: 'mariam',
    role: 'head',
    bio: 'software engineer',
    image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe',
    socials: {
      linkedin: '',
      github: '',
      twitter: '',
    },
  },
  {
    name: 'mariam',
    role: 'head',
    bio: 'software engineer',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
    socials: {
      linkedin: '',
      github: '',
      twitter: '',
    },
  },
];

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}
const TeamMemberCard = ({
  member,
  delay,
}: {
  member: TeamMember;
  delay?: number;
}) => {
  return (
    <SectionReveal delay={delay}>
      <div className="flex flex-col h-full p-4 group">
        <div
          className=" overflow-hidden md:w-55 md:h-55 w-60 h-60 rounded-full transition-transform 
        duration-500 ease-in-out group-hover:rounded-none group-hover:w-63 group-hover:h-63 group-hover:relative group-hover:-mb-8"
        >
          <img
            src={member.image}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="group-hover:absolute group-hover:bottom-5">
          <p className="text-center text-2xl font-medium pt-2 ">
            {member.name}
          </p>
          <p className="text-primary text-center text-lg">{member.role}</p>
        </div>
      </div>
    </SectionReveal>
  );
};
export function TeamSection() {
  return (
    <SectionReveal>
      <section className="py-12 md:py-15 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center dark:text-white">
            Meet our team
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 text-center ">
            Behind every IEEE success, there’s a remarkable team working
            backstage
            <br />
            let’s get to know them!
          </p>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center-safe">
            {Team.map((member, index) => (
              <TeamMemberCard member={member} key={index} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
