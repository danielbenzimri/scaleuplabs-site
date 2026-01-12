
import { Linkedin, Mail } from "lucide-react";
import { useTeamMembers, getMockTeamMembers } from "@/hooks/useTeamMembers";

const TeamSection = () => {
  const { data: contentfulTeamMembers, isLoading, error } = useTeamMembers();

  // Use Contentful data if available, otherwise fall back to mock data
  const team = contentfulTeamMembers || getMockTeamMembers();

  // Show loading state
  if (isLoading) {
    return (
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Founders
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Loading team information...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-20 bg-tech-modern-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">Using demo data - Contentful integration available</p>
          </div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Founders
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experienced leaders with a proven track record in both startups and enterprise environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <div key={member.id} className="bg-blue-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-blue-100">
              <div className="p-8 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden">
                  {member.image.startsWith('http') ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = '👤';
                      }}
                    />
                  ) : (
                    <span className="text-6xl">{member.image}</span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>

                <p className="text-lg text-blue-600 font-semibold mb-4">
                  {member.role}
                </p>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {member.bio}
                </p>

                <div className="flex justify-center space-x-4">
                  <a href={member.linkedin} className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </a>
                  <a href={`mailto:${member.email}`} className="flex items-center text-gray-600 hover:text-gray-700 font-medium transition-colors">
                    <Mail className="w-5 h-5 mr-2" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
