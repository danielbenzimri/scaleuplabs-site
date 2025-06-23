import { useState } from "react";
import { ExternalLink, Github, Brain, Database, BarChart3, Zap } from "lucide-react";
import { useProjects, getMockProjects } from "@/hooks/useProjects";
import ProjectDetailModal from "./ProjectDetailModal";

const ProjectsSection = () => {
  const { data: contentfulProjects, isLoading, error } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  // Use Contentful data if available, otherwise fall back to mock data
  const projects = contentfulProjects || getMockProjects();

  // Debug: log the projects data to verify all fields are present
  console.log('[ProjectsSection] projects:', projects);

  const handleViewDetails = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleCloseModal = () => {
    setSelectedProjectId(null);
  };

  // Show loading state
  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Loading our latest projects...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">Using demo data - Contentful integration available</p>
          </div>
        )}
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-world solutions that showcase our expertise in AI, Data Science, and scalable technology implementations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div key={project.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-green-600">
                        {project.metrics}
                      </span>
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleViewDetails(project.id)}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProjectId && (
        <ProjectDetailModal
          projectId={selectedProjectId}
          projects={projects}
          isOpen={!!selectedProjectId}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
