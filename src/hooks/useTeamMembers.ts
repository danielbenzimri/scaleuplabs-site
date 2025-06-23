
import { useQuery } from '@tanstack/react-query';
import { TeamMember } from '@/types/contentful';
import { fetchTeamMembers } from '@/services/contentful';

// Mock data as fallback - using placeholder URLs for consistency
const mockTeamMembers: TeamMember[] = [
  {
    id: 'mock-1',
    name: "Daniel Aviram",
    role: "Founder & CEO",
    bio: "Experienced leader with years of expertise in data science and AI, focused on helping startups build scalable AI departments.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    email: "daniel@scaleuplabs.com"
  },
  {
    id: 'mock-2',
    name: "Niv Yulevich",
    role: "Founder & CTO",
    bio: "Technical visionary with deep expertise in AI architecture and full-stack development, bringing enterprise-grade solutions to startups.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin: "#",
    email: "niv@scaleuplabs.com"
  }
];

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['teamMembers'],
    queryFn: async () => {
      try {
        return await fetchTeamMembers();
      } catch (error) {
        console.log('🔄 Falling back to mock team members data');
        return mockTeamMembers;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

export const getMockTeamMembers = () => mockTeamMembers;
