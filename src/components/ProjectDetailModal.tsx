import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { X, Award, Clock, Target, Lightbulb, Quote } from "lucide-react";
import { Project } from "@/types/contentful";

interface ProjectDetailModalProps {
  projectId: string;
  projects: Project[];
  isOpen: boolean;
  onClose: () => void;
}

// Fallback images by category
const categoryImages: Record<string, string> = {
  "Data Science": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
  "Generative AI": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=600&fit=crop",
  "Data Engineering": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop",
  "AI/ML": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop",
  "ML Engineering and Generative AI": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=600&fit=crop",
  "AI Consulting": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
  "ML": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop",
};
const defaultImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop";

const ProjectDetailModal = ({ projectId, projects, isOpen, onClose }: ProjectDetailModalProps) => {
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-full sm:max-w-[90vw] overflow-y-auto">
          <div className="text-center py-12">
            <p className="text-slate-600">Project not found</p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  const heroImage = project.image || categoryImages[project.category] || defaultImage;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-[720px] p-0 overflow-y-auto border-l border-slate-200">
        {/* Hero Image Header */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/20" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-6 left-8 right-8">
            <Badge className="bg-teal-500/90 text-white border-0 mb-3">
              {project.category}
            </Badge>
            <h2 className="text-2xl font-bold text-white leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="flex items-stretch divide-x divide-slate-200 border-b border-slate-200 bg-slate-50">
          <div className="flex-1 px-5 py-4">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">
              <Award className="w-3.5 h-3.5" />
              Results
            </div>
            <p className="text-sm text-slate-700 leading-snug">{project.metrics}</p>
          </div>
          {project.timeline && (
            <div className="flex-1 px-5 py-4">
              <div className="flex items-center gap-2 text-xs font-medium text-teal-600 uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5" />
                Timeline
              </div>
              <p className="text-sm text-slate-700 leading-snug">{project.timeline}</p>
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="px-8 py-8 space-y-10">

          {/* Overview */}
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Project Overview</h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
              {project.detailedDescription || project.description}
            </p>
          </section>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Challenge */}
          {project.challenges && (
            <section className="border-l-4 border-amber-400 pl-6">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-slate-900">The Challenge</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {project.challenges}
              </p>
            </section>
          )}

          {/* Solution */}
          {project.solutions && (
            <section className="border-l-4 border-teal-400 pl-6">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-teal-500" />
                <h3 className="text-lg font-bold text-slate-900">Our Solution</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {project.solutions}
              </p>
            </section>
          )}

          {/* Results */}
          {project.results && (
            <section className="border-l-4 border-emerald-400 pl-6">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-emerald-500" />
                <h3 className="text-lg font-bold text-slate-900">Results & Impact</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {project.results}
              </p>
            </section>
          )}

          {/* Client Testimonial */}
          {project.clientTestimonial && (
            <section className="bg-slate-50 rounded-xl p-6">
              <Quote className="w-8 h-8 text-teal-500/30 mb-3" />
              <p className="text-slate-700 italic leading-relaxed">
                "{project.clientTestimonial}"
              </p>
              <p className="text-sm text-slate-400 mt-3">— Client Testimonial</p>
            </section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectDetailModal;
