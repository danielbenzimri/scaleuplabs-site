
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Scaleup Labs" className="w-10 h-10 object-contain" />
            <div>
              <span className="text-xl font-bold text-gray-900">Scaleup <span className="text-blue-600">Labs</span></span>
              <p className="text-xs text-gray-500 -mt-1 font-medium tracking-wider">Professional AI & Data consultancy</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Services</a>
            <a href="#projects" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Projects</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Testimonials</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
            <a href="#team" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Team</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Services</a>
              <a href="#projects" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Projects</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Testimonials</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
              <a href="#team" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Team</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
