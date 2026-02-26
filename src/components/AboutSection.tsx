
import { Target, Users, Award, TrendingUp } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: <Award className="w-8 h-8 text-teal-400" />,
      title: "Enterprise Experience",
      description: "Years of experience leading data science departments at major companies like ZoomInfo, bringing enterprise-grade expertise to startups."
    },
    {
      icon: <Target className="w-8 h-8 text-teal-400" />,
      title: "Startup-Focused",
      description: "We understand the unique challenges startups face and provide tailored solutions that scale with your growth."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-amber-400" />,
      title: "Responsible AI",
      description: "We prioritize ethical AI practices, ensuring your AI implementations are responsible, transparent, and aligned with best practices."
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-400" />,
      title: "Trusted Advisors",
      description: "More than service providers, we're your strategic partners in building and scaling your AI capabilities the right way."
    }
  ];

  return (
    <section id="about" className="py-20 bg-tech-modern-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Scaleup Labs?
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              We're not just another consulting firm. With years of experience in both startups
              and enterprise environments, we understand what it takes to build AI departments
              that actually work and scale.
            </p>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Our team has led data science initiatives at companies like ZoomInfo, and we bring
              that enterprise-level expertise to help startups and tech companies integrate AI
              responsibly and professionally from day one.
            </p>
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                Enterprise-grade solutions
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                Startup-friendly approach
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
