import {
  Workflow,
  Bot,
  Database,
  LineChart,
  Share2,
  Compass,
  Users,
  Search,
  ArrowRight
} from "lucide-react";

const ServiceCard = ({ service }: { service: any }) => (
  <div className="group bg-blue-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-blue-100 p-8 h-full flex flex-col">
    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-600 group-hover:text-white text-blue-600">
      {service.icon}
    </div>

    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
      {service.title}
    </h3>

    <p className="text-gray-600 mb-6 leading-relaxed flex-grow text-sm">
      {service.description}
    </p>

    {service.features && (
      <ul className="space-y-3 mt-auto">
        {service.features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-start text-sm text-gray-500">
            <ArrowRight className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const ServicesSection = () => {
  const coreExpertise = [
    {
      icon: <Workflow className="w-8 h-8" />,
      title: "AI Automation & Workflows",
      description: "Streamline operations and reduce errors with intelligent, automated workflows.",
      features: ["LLM-powered Automation", "Document Processing", "Decision Support Systems", "Operational Tools"]
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Generative AI & LLMs",
      description: "Integrate GenAI responsibly into your products with custom LLM solutions and RAG systems.",
      features: ["Custom LLM Integration", "RAG Systems", "AI Agents", "Responsible AI Practices"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Engineering & Pipelines",
      description: "Build robust, scalable infrastructure ensuring seamless data flow from collection to insights.",
      features: ["ETL/ELT Pipelines", "Real-time Processing", "Data Quality Frameworks", "Cloud Architecture"]
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Data Science & Analytics",
      description: "Transform data into actionable insights with advanced analytics and predictive models.",
      features: ["Predictive Analytics", "Machine Learning Models", "Statistical Analysis", "Data Visualization"]
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "CRM & Integrations",
      description: "Centralize your customer data with seamless CRM setups and system integrations.",
      features: ["HubSpot/Salesforce Setup", "SaaS Tool Integration", "Automated Workflows", "Data Enrichment"]
    },
    {
      icon: <Compass className="w-8 h-8" />,
      title: "Strategic Advisory",
      description: "A clear, actionable path to becoming an AI-enabled organization with expert guidance.",
      features: ["AI Readiness Assessment", "Architecture Design", "Adoption Roadmaps", "CTO Advisory"]
    }
  ];

  const operationalCapabilities = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Tech Outsourcing",
      description: "Access top-tier talent for your projects with our vetted specialists in AI and data.",
      features: ["Dedicated Teams", "Project-based Work", "Flexible Engagement", "Quality Assurance"]
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Tech Recruitment",
      description: "Find and hire the best talent in data science and AI with our specialized services.",
      features: ["Technical Screening", "Cultural Fit Assessment", "Fast Hiring Process", "Long-term Success"]
    }
  ];



  return (
    <section id="services" className="py-20 bg-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive AI and data science solutions designed to scale your startup from concept to market leader.
          </p>
        </div>

        <div className="mb-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 border-indigo-600 inline-block border-b-4 pb-2">
            Core Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreExpertise.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>

        <div className="mb-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 border-indigo-600 inline-block border-b-4 pb-2">
            Operational Capabilities
          </h3>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
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
