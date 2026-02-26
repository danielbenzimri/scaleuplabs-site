
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
}

const ProjectCard = ({ title, description, tags, image, demoUrl, githubUrl }: ProjectCardProps) => {
  return (
    <div className="group bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-700">
      <div className="relative overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center">
          <div className="text-6xl opacity-20">{image}</div>
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 mb-4 leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          {demoUrl && (
            <button className="flex items-center text-teal-400 hover:text-teal-300 font-medium transition-colors">
              <ExternalLink className="w-4 h-4 mr-1" />
              Demo
            </button>
          )}
          {githubUrl && (
            <button className="flex items-center text-slate-400 hover:text-slate-300 font-medium transition-colors">
              <Github className="w-4 h-4 mr-1" />
              Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
