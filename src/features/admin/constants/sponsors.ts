export interface Sponsor {
  id: string;
  companyName: string;
  banner: string;
}

export const AVAILABLE_SPONSORS: Sponsor[] = [
  {
    id: '1',
    companyName: 'TechCorp',
    banner: 'https://via.placeholder.com/150x50?text=TechCorp',
  },
  {
    id: '2',
    companyName: 'InnovateX',
    banner: 'https://via.placeholder.com/150x50?text=InnovateX',
  },
  {
    id: '3',
    companyName: 'DevSolutions',
    banner: 'https://via.placeholder.com/150x50?text=DevSolutions',
  },
];
