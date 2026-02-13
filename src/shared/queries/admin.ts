export interface Location {
  id: string;
  name: string;
  capacity: number;
  image: string;
  address?: string;
  description?: string;
}

// Placeholder for future admin hooks if needed
export const useUpdateLocation = () => {
  return {
    mutateAsync: async (data: any) => Promise.resolve(data),
    isPending: false,
  };
};
