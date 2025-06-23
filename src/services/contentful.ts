
import { createClient, Entry } from 'contentful';
import { ProjectSkeleton, TestimonialSkeleton, Project, Testimonial } from '@/types/contentful';

// Environment variables for Contentful
const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
const USE_CONTENTFUL = import.meta.env.VITE_USE_CONTENTFUL === 'true';

console.log('[Contentful ENV]', {
  VITE_CONTENTFUL_SPACE_ID: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  VITE_CONTENTFUL_ACCESS_TOKEN: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  VITE_USE_CONTENTFUL: import.meta.env.VITE_USE_CONTENTFUL,
});

 // Initialize Contentful client
const client = SPACE_ID && ACCESS_TOKEN ? createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
}) : null;

console.log('[Contentful] Client initialized:', !!client, { SPACE_ID, ACCESS_TOKEN });

// Transform Contentful project data to our Project interface
const transformProject = (entry: Entry<ProjectSkeleton>): Project => {
  console.log('Transforming Contentful project entry:', entry);
  const fields = entry.fields;

  // Debug: log the fields structure to determine correct mapping
  console.log('Contentful project entry.fields:', fields);

  // Handle image field safely
  let imageUrl: string | undefined;
  if (fields.image && typeof fields.image === 'object' && 'url' in fields.image) {
    imageUrl = fields.image.url;
  }

  return {
    id: entry.sys.id,
    title: fields.title,
    description: fields.description,
    tags: fields.tags || [],
    category: fields.category,
    metrics: fields.metrics,
    icon: fields.icon,
    image: imageUrl,
    challenges: fields.challenges,
    solutions: fields.solutions,
    technologies: fields.technologies,
    timeline: fields.timeline,
    results: fields.results,
    clientTestimonial: fields.clientTestimonial,
    detailedDescription: fields.detailedDescription,
    demoUrl: fields.demoUrl,
    githubUrl: fields.githubUrl,
    images: fields.images,
  };
};

// Transform Contentful testimonial data to our Testimonial interface
const transformTestimonial = (entry: Entry<TestimonialSkeleton>): Testimonial => {
  const fields = entry.fields;

  return {
    id: entry.sys.id,
    name: fields.name,
    role: fields.role,
    company: fields.company,
    image: fields.image,
    rating: fields.rating,
    testimonial: fields.testimonial,
  };
};

export const fetchProjects = async (): Promise<Project[]> => {
  if (!USE_CONTENTFUL || !client) {
    console.log('🔧 Using mock data for projects (Contentful disabled or not configured)');
    throw new Error('Contentful not configured - using fallback data');
  }

  try {
    console.log('📡 Fetching projects from Contentful...');
    const params = { content_type: 'projects' };
    console.log('[Contentful] Request params:', params);
    const response = await client.getEntries<ProjectSkeleton>(params);

    const projects = response.items.map(transformProject);
    console.log(`✅ Successfully fetched ${projects.length} projects from Contentful`);
    console.log('Fetched projects:', projects);
    return projects;
  } catch (error) {
    console.error('❌ Error fetching projects from Contentful:', error);
    if (error && typeof error === 'object') {
      console.error('[Contentful] Error details:', JSON.stringify(error, null, 2));
    }
    throw error;
  }
};

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  if (!USE_CONTENTFUL || !client) {
    console.log('🔧 Using mock data for testimonials (Contentful disabled or not configured)');
    throw new Error('Contentful not configured - using fallback data');
  }

  try {
    console.log('📡 Fetching testimonials from Contentful...');
    const response = await client.getEntries<TestimonialSkeleton>({
      content_type: 'testimonial',
    });

    const testimonials = response.items.map(transformTestimonial);
    console.log(`✅ Successfully fetched ${testimonials.length} testimonials from Contentful`);
    return testimonials;
  } catch (error) {
    console.error('❌ Error fetching testimonials from Contentful:', error);
    throw error;
  }
};

/**
 * Fetch team members from Contentful.
 */
import { TeamMember, TeamMemberSkeleton } from '@/types/contentful';

const transformTeamMember = (entry: Entry<TeamMemberSkeleton>): TeamMember => {
  const fields = entry.fields;
  return {
    id: entry.sys.id,
    name: fields.name,
    role: fields.role,
    bio: fields.bio,
    image: fields.image,
    linkedin: fields.linkedin,
    email: fields.email,
  };
};

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  if (!USE_CONTENTFUL || !client) {
    console.log('🔧 Using mock data for team members (Contentful disabled or not configured)');
    throw new Error('Contentful not configured - using fallback data');
  }

  try {
    console.log('📡 Fetching team members from Contentful...');
    const response = await client.getEntries<TeamMemberSkeleton>({
      content_type: 'teamMember',
    });

    const teamMembers = response.items.map(transformTeamMember);
    console.log(`✅ Successfully fetched ${teamMembers.length} team members from Contentful`);
    return teamMembers;
  } catch (error) {
    console.error('❌ Error fetching team members from Contentful:', error);
    throw error;
  }
};
