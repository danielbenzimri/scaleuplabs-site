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
      <section id="projects" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Loading our latest projects...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-slate-800 rounded-2xl h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-3 bg-amber-900/20 border border-amber-700/50 rounded-lg">
            <p className="text-amber-300 text-sm">Using demo data - Contentful integration available</p>
          </div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Real-world solutions that showcase our expertise in AI, Data Science, and scalable technology implementations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {projects.map((project) => {
            const IconComponent = project.icon;
            // Split metrics by comma to create bullet points and capitalize first letter
            const metricsList = project.metrics.split(',').map(m => {
              const trimmed = m.trim();
              if (!trimmed) return null;
              return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
            }).filter(Boolean) as string[];

            return (
              <div
                key={project.id}
                onClick={() => handleViewDetails(project.id)}
                className="group flex flex-col items-start h-full p-8 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl hover:shadow-2xl hover:border-teal-500/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                {/* Subtle top accent bar - now visible by default but muted */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-500/80 to-emerald-500/80 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category & Icon */}
                <div className="flex items-center gap-2 mb-4">
                  <IconComponent className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 mb-6 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-auto w-full space-y-4">
                  {/* Impact Section */}
                  <div className="text-sm">
                    <span className="font-semibold text-emerald-400 block mb-2">Impact:</span>
                    <ul className="space-y-1.5">
                      {metricsList.map((metric, idx) => (
                        <li key={idx} className="flex items-start text-slate-300">
                          <span className="mr-2 text-emerald-400 font-bold mt-0.5">•</span>
                          <span className="leading-snug">{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags (Max 3) */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs font-medium text-slate-400 bg-slate-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
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
