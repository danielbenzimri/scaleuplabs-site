
import { useQuery } from '@tanstack/react-query';
import { fetchTestimonials } from '@/services/contentful';
import { Testimonial } from '@/types/contentful';

// Mock data as fallback
const mockTestimonials: Testimonial[] = [
  {
    id: 'mock-1',
    name: "Yair Armoza",
    role: "Senior Director of Engineering",
    company: "Annapurna Labs",
    image: "/headshots/yair_armoza_annapurna.jpeg",
    rating: 5,
    testimonial: "Scaleup Labs brought deep AI expertise that accelerated our roadmap significantly. Their ability to understand complex technical challenges and deliver production-ready solutions made them an invaluable partner."
  },
  {
    id: 'mock-2',
    name: "Maor Levran",
    role: "CEO",
    company: "Slice",
    image: "/headshots/maor_levran_slice.jpeg",
    rating: 5,
    testimonial: "Working with Scaleup Labs transformed our data infrastructure. They built scalable pipelines that handle millions of events and delivered AI capabilities that directly impacted our bottom line."
  },
  {
    id: 'mock-3',
    name: "Ori Shafir",
    role: "CMO",
    company: "Opster",
    image: "/headshots/ori_shafir_opster.jpeg",
    rating: 5,
    testimonial: "Scaleup Labs didn't just implement solutions — they educated our team and built sustainable AI capabilities. Their strategic approach and technical depth exceeded all expectations."
  },
  {
    id: 'mock-4',
    name: "Roei Aviram",
    role: "CEO",
    company: "Intelichain",
    image: "/headshots/roei_aviram_intelichain.jpeg",
    rating: 5,
    testimonial: "The AI and data science expertise Scaleup Labs provided was exactly what we needed to scale. They understood our startup challenges and delivered solutions that were both innovative and production-ready."
  },
  {
    id: 'mock-5',
    name: "Yarden Cohen",
    role: "CEO",
    company: "BionData",
    image: "/headshots/yarden_cohen_biondata.jpeg",
    rating: 5,
    testimonial: "Scaleup Labs helped us build a robust ML pipeline from the ground up. Their experience in data science and engineering made the entire process seamless, and the results speak for themselves."
  },
  {
    id: 'mock-6',
    name: "Ori Appelbaum",
    role: "CEO",
    company: "Eezyimport",
    image: "/headshots/ori_appelbaum_eezy.jpeg",
    rating: 5,
    testimonial: "As a growing startup, we needed a team that could move fast without cutting corners. Scaleup Labs delivered AI solutions that were both innovative and reliable, helping us stay ahead of the competition."
  },
  {
    id: 'mock-7',
    name: "Liri Halperin",
    role: "CEO",
    company: "Leo",
    image: "/headshots/liri_halperin_leo.jpeg",
    rating: 5,
    testimonial: "Scaleup Labs provided the technical leadership and hands-on expertise we needed to build our AI capabilities. Their collaborative approach made them feel like a true extension of our team."
  },
  {
    id: 'mock-8',
    name: "Roy Dar",
    role: "CTO",
    company: "Ikido",
    image: "/headshots/roy_dar_ikido.jpeg",
    rating: 5,
    testimonial: "The quality and scalability of the solutions Scaleup Labs delivered were exceptional. Their enterprise-level experience really shows in every aspect of their work."
  },
  {
    id: 'mock-9',
    name: "Nir Ben Israel",
    role: "GM Israel Site",
    company: "ModelCode AI",
    image: "/headshots/nir_ben_israel_model_code.jpeg",
    rating: 5,
    testimonial: "Scaleup Labs understood our vision and translated it into a powerful AI platform. Their deep knowledge of generative AI and data engineering was instrumental in bringing our product to market."
  },
  {
    id: 'mock-10',
    name: "Samuel Amar",
    role: "CTO",
    company: "Slice",
    image: "/headshots/samuel_amar_slice.jpeg",
    rating: 5,
    testimonial: "Working with Daniel and Niv was a game-changer. They brought both strategic vision and hands-on technical skills that helped us build data-driven products our customers love."
  },
  {
    id: 'mock-11',
    name: "Assaf Aviram",
    role: "CEO",
    company: "AACE",
    image: "/headshots/assaf_aviram_aace.jpeg",
    rating: 5,
    testimonial: "Scaleup Labs delivered results beyond our expectations. Their expertise in AI and data science gave us a competitive edge and set us up for long-term success."
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
