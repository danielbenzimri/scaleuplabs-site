
import { useQuery } from '@tanstack/react-query';
import { fetchTestimonials } from '@/services/contentful';
import { Testimonial } from '@/types/contentful';

// Mock data as fallback - using placeholder URLs for consistency
const mockTestimonials: Testimonial[] = [
  {
    id: 'mock-1',
    name: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Startup",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    testimonial: "Scaleup Labs transformed our data strategy completely. Their expertise in AI and data science helped us build a robust ML pipeline that increased our user engagement by 300%. Professional, reliable, and truly understand startup needs."
  },
  {
    id: 'mock-2',
    name: "Marcus Rodriguez",
    role: "Head of Data",
    company: "GrowthCorp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    testimonial: "Working with Daniel and Niv was exceptional. They didn't just implement solutions - they educated our team and built sustainable AI capabilities. The generative AI integration they delivered exceeded all expectations."
  },
  {
    id: 'mock-3',
    name: "Emily Watson",
    role: "Founder & CEO",
    company: "DataDriven Inc",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    testimonial: "As a non-technical founder, I was worried about building our AI department. Scaleup Labs made it seamless. They provided both the technical expertise and strategic guidance we needed to scale responsibly."
  },
  {
    id: 'mock-4',
    name: "David Kim",
    role: "VP Engineering",
    company: "InnovateLab",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    testimonial: "The data pipeline architecture they built handles millions of events flawlessly. Their experience from enterprise environments like ZoomInfo really shows in the quality and scalability of their solutions."
  }
];

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    meta: {
      onError: (error: Error) => {
        console.log('🔄 Falling back to mock testimonials data');
      }
    }
  });
};

export const getMockTestimonials = () => mockTestimonials;
