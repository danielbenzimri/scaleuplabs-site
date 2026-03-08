import { ArrowRight } from "lucide-react";

interface Service {
  image: string;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard = ({ service }: { service: Service }) => (
  <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 h-full flex flex-col">
    {/* Image Header */}
    <div className="relative h-44 overflow-hidden">
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-teal-600/20" />
      <h3 className="absolute bottom-4 left-6 right-6 text-lg font-bold text-white">
        {service.title}
      </h3>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-slate-600 mb-5 leading-relaxed text-sm">
        {service.description}
      </p>

      {service.features && (
        <ul className="space-y-2.5 mt-auto">
          {service.features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start text-sm text-slate-500">
              <ArrowRight className="w-4 h-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

const ServicesSection = () => {
  const coreExpertise: Service[] = [
    {
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
      title: "AI Automation & Workflows",
      description: "Streamline operations and reduce errors with intelligent, automated workflows.",
      features: ["LLM-powered Automation", "Document AI", "Decision Support Systems", "Operational Tools"]
    },
    {
      image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=400&fit=crop",
      title: "Generative AI & LLMs",
      description: "Integrate GenAI responsibly into your products with custom LLM solutions and RAG systems.",
      features: ["Custom LLM Integration", "RAG Systems", "AI Agents", "Responsible AI Practices"]
    },
    {
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      title: "Data Engineering & Pipelines",
      description: "Build robust, scalable infrastructure ensuring seamless data flow from collection to insights.",
      features: ["ETL/ELT Pipelines", "Real-time Processing", "Data Quality Frameworks", "Cloud Architecture"]
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      title: "Data Science & Analytics",
      description: "Transform data into actionable insights with advanced analytics and predictive models.",
      features: ["Predictive Analytics", "Machine Learning Models", "Statistical Analysis", "Data Visualization"]
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      title: "CRM & Integrations",
      description: "Centralize your customer data with seamless CRM setups and system integrations.",
      features: ["HubSpot/Salesforce Setup", "SaaS Tool Integration", "Automated Workflows", "Data Enrichment"]
    },
    {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
      title: "Strategic Advisory",
      description: "A clear, actionable path to becoming an AI-enabled organization with expert guidance.",
      features: ["AI Readiness Assessment", "Architecture Design", "Adoption Roadmaps", "CTO Advisory"]
    }
  ];

  const operationalCapabilities: Service[] = [
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
      title: "Tech Outsourcing",
      description: "Access top-tier talent for your projects with our vetted specialists in AI and data.",
      features: ["Dedicated Teams", "Project-based Work", "Flexible Engagement", "Quality Assurance"]
    },
    {
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop",
      title: "Tech Recruitment",
      description: "Find and hire the best talent in data science and AI with our specialized services.",
      features: ["Technical Screening", "Cultural Fit Assessment", "Fast Hiring Process", "Long-term Success"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-light-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive AI and data science solutions designed to scale your startup from concept to market leader.
          </p>
        </div>

        <div className="mb-16 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 border-teal-500 inline-block border-b-4 pb-2">
            Core Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreExpertise.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>

        <div className="mb-16 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 border-teal-500 inline-block border-b-4 pb-2">
            Operational Capabilities
          </h3>
          <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
            Beyond core technology, we provide the talent and development capacity to execute your vision and scale your teams.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-2/3 mx-auto">
            {operationalCapabilities.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
