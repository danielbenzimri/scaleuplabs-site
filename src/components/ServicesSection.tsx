
import { Brain, Database, Zap, Users, Code, Search } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: <Brain className="w-12 h-12 text-blue-600" />,
      title: "Data Science",
      description: "Transform your data into actionable insights with advanced analytics, machine learning models, and predictive algorithms tailored for your business.",
      features: ["Predictive Analytics", "Machine Learning Models", "Statistical Analysis", "Data Visualization"]
    },
    {
      icon: <Zap className="w-12 h-12 text-indigo-600" />,
      title: "Generative AI",
      description: "Integrate GenAI responsibly into your products and workflows with custom LLM solutions, RAG systems, and AI-powered automation.",
      features: ["Custom LLM Integration", "RAG Systems", "AI Automation", "Responsible AI Practices"]
    },
    {
      icon: <Database className="w-12 h-12 text-purple-600" />,
      title: "Data Pipelines",
      description: "Build robust, scalable data infrastructure that ensures your data flows seamlessly from collection to insights.",
      features: ["ETL/ELT Pipelines", "Real-time Processing", "Data Quality", "Cloud Architecture"]
    },
    {
      icon: <Code className="w-12 h-12 text-green-600" />,
      title: "Full-Stack Development",
      description: "End-to-end development services to bring your AI-powered applications to life with modern, scalable technology stacks.",
      features: ["Web Applications", "API Development", "Cloud Deployment", "Modern Tech Stacks"]
    },
    {
      icon: <Users className="w-12 h-12 text-orange-600" />,
      title: "Tech Outsourcing",
      description: "Access top-tier talent for your projects with our carefully vetted team of specialists in AI, data science, and development.",
      features: ["Dedicated Teams", "Project-based Work", "Flexible Engagement", "Quality Assurance"]
    },
    {
      icon: <Search className="w-12 h-12 text-red-600" />,
      title: "Tech Recruitment",
      description: "Find and hire the best talent in data science, AI, and full-stack development with our specialized recruitment services.",
      features: ["Technical Screening", "Cultural Fit Assessment", "Fast Hiring Process", "Long-term Success"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive AI and data science solutions designed to scale your startup from concept to market leader.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 p-8">
              <div className="flex items-center justify-center w-20 h-20 bg-gray-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
