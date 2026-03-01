import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github, Clock, Target, Lightbulb, Award, X } from "lucide-react";
import { Project } from "@/types/contentful";

interface ProjectDetailModalProps {
  projectId: string;
  projects: Project[];
  isOpen: boolean;
  onClose: () => void;
}

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

  const IconComponent = project.icon;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-[90vw] lg:max-w-[85vw] p-0 overflow-y-auto">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-100 px-8 py-5">
          <SheetHeader className="flex-row items-center gap-4 space-y-0">
            <div className="w-11 h-11 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center shrink-0">
              {IconComponent && <IconComponent className="w-5 h-5 text-teal-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-xl font-bold text-slate-900 truncate">
                {project.title}
              </SheetTitle>
              <Badge variant="secondary" className="mt-1">
                {project.category}
              </Badge>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </SheetHeader>
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-8">
          {/* Hero Image */}
          {project.image && (
            <div>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-72 object-cover rounded-xl"
              />
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-emerald-700">Results</span>
              </div>
              <p className="text-emerald-600 text-sm">{project.metrics}</p>
            </div>

            {project.timeline && (
              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-teal-600" />
                  <span className="font-semibold text-teal-700">Timeline</span>
                </div>
                <p className="text-teal-600 text-sm">{project.timeline}</p>
              </div>
            )}

            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-5 h-5 text-amber-600" />
                <span className="font-semibold text-amber-700">Category</span>
              </div>
              <p className="text-amber-600 text-sm">{project.category}</p>
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="challenge">Challenge</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {project.detailedDescription || project.description}
                  </p>
                </div>

                {project.technologies && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {project.images && project.images.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Project Gallery</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {project.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="challenge" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Lightbulb className="w-6 h-6 text-amber-400" />
                  <h3 className="text-lg font-semibold">The Challenge</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {project.challenges || "This project presented unique challenges that required innovative solutions and deep technical expertise."}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="solution" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="w-6 h-6 text-teal-400" />
                  <h3 className="text-lg font-semibold">Our Solution</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {project.solutions || "We developed a comprehensive solution that addressed all technical requirements while ensuring scalability and maintainability."}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="results" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Award className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-lg font-semibold">Results & Impact</h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {project.results || `The project achieved significant results: ${project.metrics}`}
                </p>

                {project.clientTestimonial && (
                  <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-teal-500">
                    <p className="text-slate-700 italic">"{project.clientTestimonial}"</p>
                    <p className="text-sm text-slate-500 mt-2">— Client Testimonial</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t">
            {project.demoUrl && (
              <Button asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectDetailModal;
