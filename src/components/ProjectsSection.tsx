import { useState } from "react";
import { useProjects, getMockProjects } from "@/hooks/useProjects";
import ProjectDetailModal from "./ProjectDetailModal";

// Fallback images by category when project has no image
const categoryImages: Record<string, string> = {
  "Data Science": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
  "Generative AI": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=400&fit=crop",
  "Data Engineering": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
  "AI/ML": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
  "ML Engineering and Generative AI": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=400&fit=crop",
  "AI Consulting": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  "ML": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
};
const defaultImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop";

const ProjectsSection = () => {
  const { data: contentfulProjects, isLoading, error } = useProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const projects = contentfulProjects || getMockProjects();

  const handleViewDetails = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleCloseModal = () => {
    setSelectedProjectId(null);
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-20 bg-light-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Loading our latest projects...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-slate-200 rounded-2xl h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 bg-light-section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-700 text-sm">Using demo data - Contentful integration available</p>
          </div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real-world solutions that showcase our expertise in AI, Data Science, and scalable technology implementations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {projects.map((project) => {
            const metricsList = project.metrics.split(',').map(m => {
              const trimmed = m.trim();
              if (!trimmed) return null;
              return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
            }).filter(Boolean) as string[];

            const imageUrl = project.image || categoryImages[project.category] || defaultImage;

            return (
              <div
                key={project.id}
                onClick={() => handleViewDetails(project.id)}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col"
              >
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-teal-600/20" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-slate-600 mb-5 leading-relaxed text-sm line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mt-auto space-y-4">
                    {/* Impact */}
                    <div className="text-sm">
                      <span className="font-semibold text-emerald-600 block mb-2">Impact:</span>
                      <ul className="space-y-1.5">
                        {metricsList.map((metric, idx) => (
                          <li key={idx} className="flex items-start text-slate-700">
                            <span className="mr-2 text-emerald-500 font-bold mt-0.5">•</span>
                            <span className="leading-snug">{metric}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
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
