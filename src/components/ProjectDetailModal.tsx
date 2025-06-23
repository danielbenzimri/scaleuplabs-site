import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github, Clock, Target, Lightbulb, Award } from "lucide-react";
import { Project } from "@/types/contentful";

interface ProjectDetailModalProps {
  projectId: string;
  projects: Project[];
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal = ({ projectId, projects, isOpen, onClose }: ProjectDetailModalProps) => {
  // Find the project by ID in the provided projects array
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <div className="text-center py-12">
            <p className="text-gray-500">Project not found</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const IconComponent = project.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
              {IconComponent && <IconComponent className="w-6 h-6 text-blue-600" />}
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {project.title}
              </DialogTitle>
              <Badge variant="secondary" className="mt-1">
                {project.category}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        {/* Hero Image */}
        {project.image && (
          <div className="mb-6">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Results</span>
            </div>
            <p className="text-green-700 text-sm">{project.metrics}</p>
          </div>
          
          {project.timeline && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-800">Timeline</span>
              </div>
              <p className="text-blue-700 text-sm">{project.timeline}</p>
            </div>
          )}
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-800">Category</span>
            </div>
            <p className="text-purple-700 text-sm">{project.category}</p>
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
                <p className="text-gray-600 leading-relaxed">
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
                <Lightbulb className="w-6 h-6 text-orange-600" />
                <h3 className="text-lg font-semibold">The Challenge</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {project.challenges || "This project presented unique challenges that required innovative solutions and deep technical expertise."}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="solution" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Our Solution</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {project.solutions || "We developed a comprehensive solution that addressed all technical requirements while ensuring scalability and maintainability."}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Award className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold">Results & Impact</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                {project.results || `The project achieved significant results: ${project.metrics}`}
              </p>
              
              {project.clientTestimonial && (
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-700 italic">"{project.clientTestimonial}"</p>
                  <p className="text-sm text-gray-500 mt-2">— Client Testimonial</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pt-6 border-t">
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
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
