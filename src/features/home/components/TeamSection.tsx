import { SectionReveal } from './SectionReveal';
import { IoLogoLinkedin } from 'react-icons/io5';
import { FaGithub, FaTwitter } from 'react-icons/fa';

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
      <div className=" p-4 group transition-all duration-100 ease-in-out delay-200 ">
        <div className="relative">
          <div
            className=" overflow-hidden group-hover:relative md:w-55 md:h-55 w-60 h-60 rounded-full 
          group-hover:rounded-2xl group-hover:w-70 group-hover:h-80 group-hover:-mb-5 group-hover:-mt-16 "
          >
            <img
              src={member.image}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
            />
          </div>
          <div className="transition-all duration-700 delay-200 ease-in-out ">
            <div
              className="hidden group-hover:block opacity-80 bg-primary rounded-xl group-hover:absolute 
        group-hover:bottom-2 group-hover:left-2 group-hover:right-2 "
            >
              <p className="text-2xl text-center font-medium pt-2 group-hover:text-white opacity-100">
                {member.name}
              </p>
              <p className="text-primary text-center text-lg group-hover:text-white opacity-100">
                {member.role}
              </p>
              <p className="text-gray-200 text-sm text-center">{member.bio}</p>
              <div className="flex gap-3 justify-center opacity-100 m-1 ">
                <p>
                  <IoLogoLinkedin />
                </p>
                <p>
                  <FaGithub />
                </p>
                <p>
                  <FaTwitter />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-center text-2xl font-medium pt-2 group-hover:text-white opacity-100">
            {member.name}
          </p>
          <p className="text-primary text-center text-lg group-hover:text-white opacity-100">
            {member.role}
          </p>
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
          <p className="text-lg text-gray-600 leading-relaxed mb-12 text-center ">
            Behind every IEEE success, there’s a remarkable team working
            backstage
            <br />
            let’s get to know them!
          </p>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center-safe pt-9">
            {Team.map((member, index) => (
              <TeamMemberCard member={member} key={index} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
