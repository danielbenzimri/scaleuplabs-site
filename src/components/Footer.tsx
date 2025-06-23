import { Brain, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">Scaleup Labs</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Helping startups and tech companies scale their AI capabilities with professional, 
              responsible, and enterprise-grade solutions.
            </p>
            <div className="flex space-x-4">
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Github className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <a href="mailto:info@scaleuplabs.dev">
                <Mail className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Data Science</span></li>
              <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Generative AI</span></li>
              <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Data Pipelines</span></li>
              <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Full-Stack Dev</span></li>
              <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Outsourcing</span></li>
              <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Recruitment</span></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Case Studies</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Scaleup Labs. All rights reserved. | Scaling AI responsibly for startups worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
