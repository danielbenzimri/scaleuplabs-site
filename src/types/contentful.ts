export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  metrics: string;
  icon: string;
  image?: string;
  // Detailed project fields
  detailedDescription?: string;
  images?: string[];
  challenges?: string;
  solutions?: string;
  technologies?: string[];
  timeline?: string;
  results?: string;
  clientTestimonial?: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  testimonial: string;
}

// Contentful asset type - localized format
export interface ContentfulAsset {
  sys: {
    id: string;
    type: string;
  };
  fields: {
    file: {
      'en-US': {
        url: string;
        fileName: string;
        contentType: string;
      };
    };
  };
}

// Contentful skeleton types - localized format
export interface ProjectSkeleton {
  contentTypeId: 'project';
  fields: {
    title: {
      'en-US': string;
    };
    description: {
      'en-US': string;
    };
    tags: {
      'en-US': string[];
    };
    category: {
      'en-US': string;
    };
    metrics: {
      'en-US': string;
    };
    icon: {
      'en-US': string;
    };
    image?: ContentfulAsset;
    detailedDescription?: {
      'en-US': string;
    };
    images?: ContentfulAsset[];
    challenges?: {
      'en-US': string;
    };
    solutions?: {
      'en-US': string;
    };
    technologies?: {
      'en-US': string[];
    };
    timeline?: {
      'en-US': string;
    };
    results?: {
      'en-US': string;
    };
    clientTestimonial?: {
      'en-US': string;
    };
    demoUrl?: {
      'en-US': string;
    };
    githubUrl?: {
      'en-US': string;
    };
  };
}

export interface TestimonialSkeleton {
  contentTypeId: 'testimonial';
  fields: {
    name: {
      'en-US': string;
    };
    role: {
      'en-US': string;
    };
    company: {
      'en-US': string;
    };
    image: ContentfulAsset | {
      'en-US': string;
    };
    rating: {
      'en-US': number;
    };
    testimonial: {
      'en-US': string;
    };
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  email: string;
}

export interface TeamMemberSkeleton {
  contentTypeId: 'teamMember';
  fields: {
    name: {
      'en-US': string;
    };
    role: {
      'en-US': string;
    };
    bio: {
      'en-US': string;
    };
    image: ContentfulAsset | {
      'en-US': string;
    };
    linkedin: {
      'en-US': string;
    };
    email: {
      'en-US': string;
    };
  };
}
