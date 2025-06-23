
import { useQuery } from '@tanstack/react-query';
import { Brain, Database, BarChart3, Zap } from 'lucide-react';
import { fetchProjects } from '@/services/contentful';
import { Project } from '@/types/contentful';

// Enhanced mock data with detailed project information
const mockProjects: Project[] = [
  {
    id: 'mock-1',
    title: "AI-Powered Customer Analytics",
    description: "Built a comprehensive machine learning pipeline that analyzes customer behavior patterns, providing real-time insights and predictive analytics for e-commerce optimization.",
    tags: ["Python", "TensorFlow", "AWS", "React"],
    icon: "Brain",
    category: "Data Science",
    metrics: "40% increase in conversion rates",
    detailedDescription: "This comprehensive AI solution transformed how our client understood their customer base. We built a sophisticated machine learning pipeline that processes millions of customer interactions daily, identifying patterns that were previously invisible to traditional analytics tools.\n\nThe system integrates seamlessly with existing e-commerce platforms and provides actionable insights through an intuitive dashboard. Our predictive models can forecast customer lifetime value, churn probability, and optimal product recommendations with 92% accuracy.",
    images: ["https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"],
    challenges: "The main challenge was processing massive amounts of unstructured customer data from multiple touchpoints while maintaining real-time performance. Data quality and privacy compliance were also critical concerns.",
    solutions: "We implemented a distributed processing architecture using Apache Kafka for real-time data streaming, combined with TensorFlow for machine learning models. Data privacy was ensured through advanced anonymization techniques and GDPR-compliant data handling.",
    technologies: ["Python", "TensorFlow", "Apache Kafka", "AWS Lambda", "React.js", "PostgreSQL", "Redis", "Docker"],
    timeline: "6 months development, 2 months testing and optimization",
    results: "40% increase in conversion rates, 25% reduction in customer churn, $2.3M additional revenue in first year, 60% faster decision-making process",
    clientTestimonial: "ScaleUp Labs transformed our understanding of our customers. The insights we now have are incredible, and the ROI has exceeded all expectations.",
    demoUrl: "#demo"
  },
  {
    id: 'mock-2',
    title: "GenAI Document Processing",
    description: "Developed an intelligent document processing system using LLMs to extract, categorize, and summarize business documents with 95% accuracy.",
    tags: ["OpenAI API", "LangChain", "Node.js", "MongoDB"],
    icon: "Zap",
    category: "Generative AI",
    metrics: "10x faster document processing",
    detailedDescription: "This cutting-edge GenAI solution revolutionized document management for a Fortune 500 company. Our system can automatically process thousands of documents daily, extracting key information, categorizing content, and generating executive summaries.\n\nUsing advanced prompt engineering and fine-tuned language models, the system understands context and nuance in business documents, making it incredibly accurate for legal contracts, financial reports, and technical specifications.",
    images: ["https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"],
    challenges: "Processing diverse document formats while maintaining accuracy across different industries and document types. Ensuring data security and handling sensitive business information was paramount.",
    solutions: "We developed a multi-model approach using GPT-4 for complex reasoning, specialized models for document structure analysis, and implemented end-to-end encryption for all document processing workflows.",
    technologies: ["OpenAI GPT-4", "LangChain", "Node.js", "MongoDB", "Python", "Docker", "Azure Cognitive Services", "OCR"],
    timeline: "4 months development, 1 month security audit and deployment",
    results: "10x faster document processing, 95% accuracy in data extraction, 80% reduction in manual work, $1.8M annual cost savings",
    clientTestimonial: "The GenAI document system has completely transformed our operations. What used to take weeks now happens in hours, with better accuracy than human processing.",
    githubUrl: "#github"
  },
  {
    id: 'mock-3',
    title: "Real-time Data Pipeline",
    description: "Architected a scalable data pipeline processing millions of events daily, enabling real-time business intelligence and automated decision making.",
    tags: ["Apache Kafka", "Python", "PostgreSQL", "Docker"],
    icon: "Database",
    category: "Data Engineering",
    metrics: "99.9% uptime, 1M+ events/day",
    detailedDescription: "Built a enterprise-grade data pipeline that handles massive scale while maintaining reliability and performance. The system processes real-time events from IoT devices, user interactions, and business systems to provide instant insights.\n\nOur architecture ensures zero data loss and provides sub-second latency for critical business decisions. The pipeline automatically scales based on load and includes comprehensive monitoring and alerting.",
    images: ["https://images.unsplash.com/photo-1649972904349-6e44c42644a7", "https://images.unsplash.com/photo-1500673922987-e212871fec22"],
    challenges: "Handling massive data volumes while ensuring zero data loss, maintaining consistent performance during traffic spikes, and providing real-time analytics without impacting operational systems.",
    solutions: "Implemented a lambda architecture with Apache Kafka for streaming, Apache Spark for batch processing, and ClickHouse for real-time analytics. Auto-scaling and circuit breakers ensure reliability.",
    technologies: ["Apache Kafka", "Apache Spark", "ClickHouse", "Python", "PostgreSQL", "Redis", "Kubernetes", "Prometheus"],
    timeline: "8 months design and development, 2 months performance optimization",
    results: "99.9% uptime achieved, processing 1M+ events daily, 50% faster business decisions, 35% reduction in infrastructure costs",
    clientTestimonial: "The data pipeline has become the backbone of our operations. Real-time insights have given us a competitive edge we never had before."
  },
  {
    id: 'mock-4',
    title: "Predictive Maintenance AI",
    description: "Created an IoT-integrated AI system that predicts equipment failures before they occur, reducing downtime and maintenance costs significantly.",
    tags: ["PyTorch", "IoT", "Time Series", "Azure"],
    icon: "BarChart3",
    category: "AI/ML",
    metrics: "60% reduction in downtime",
    detailedDescription: "This innovative AI system combines IoT sensors with advanced machine learning to predict equipment failures before they happen. Using sophisticated time series analysis and anomaly detection, the system can forecast maintenance needs with remarkable accuracy.\n\nThe solution integrates with existing industrial systems and provides intuitive dashboards for maintenance teams, allowing them to plan repairs during optimal windows and avoid costly unexpected downtime.",
    images: ["https://images.unsplash.com/photo-1501854140801-50d01698950b", "https://images.unsplash.com/photo-1721322800607-8c38375eef04"],
    challenges: "Dealing with noisy IoT sensor data, creating accurate predictive models for diverse equipment types, and integrating with legacy industrial systems without disrupting operations.",
    solutions: "Developed robust data preprocessing pipelines, ensemble machine learning models for different failure types, and created APIs that seamlessly integrate with existing maintenance management systems.",
    technologies: ["PyTorch", "Azure IoT Hub", "Time Series Analysis", "Python", "React.js", "PostgreSQL", "MQTT", "Edge Computing"],
    timeline: "10 months development including extensive testing phase",
    results: "60% reduction in unexpected downtime, 45% decrease in maintenance costs, 30% improvement in equipment lifespan, ROI of 320% in first year",
    clientTestimonial: "The predictive maintenance system has saved us millions in downtime costs. It's like having a crystal ball for our equipment.",
    demoUrl: "#demo",
    githubUrl: "#github"
  }
];

// Helper function to get icon component by name
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    Brain,
    Database,
    BarChart3,
    Zap
  };
  return iconMap[iconName] || Brain;
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        return await fetchProjects();
      } catch (error) {
        console.log('🔄 Falling back to mock projects data');
        return mockProjects;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    select: (data: Project[]) => data.map(project => ({
      ...project,
      icon: getIconComponent(project.icon)
    }))
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      // Try to find the project in the already-fetched projects (from Contentful or mock)
      const allProjects = getMockProjects();
      // Try to access the global cache from react-query for Contentful projects
      // (This is a workaround since we don't have a fetchProjectById)
      const contentfulProjects = window.__REACT_QUERY_STATE__?.queries?.find(
        (q: any) => q.queryKey && q.queryKey[0] === 'projects'
      )?.state?.data || [];
      const all = [...contentfulProjects, ...allProjects];
      const found = all.find((p: any) => p.id === id);
      if (found) return found;
      throw new Error('Project not found');
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    select: (data: Project) => ({
      ...data,
      icon: getIconComponent(data.icon)
    })
  });
};

export const getMockProjects = () => mockProjects.map(project => ({
  ...project,
  icon: getIconComponent(project.icon)
}));

export const getMockProjectById = (id: string) => {
  const project = mockProjects.find(p => p.id === id);
  if (!project) return null;
  return {
    ...project,
    icon: getIconComponent(project.icon)
  };
};
