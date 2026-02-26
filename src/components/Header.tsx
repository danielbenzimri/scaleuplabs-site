
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const sections = ["home", "services", "projects", "testimonials", "about", "team", "contact"];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = (section: string) =>
    `transition-all font-medium text-base pb-1 border-b-2 ${
      activeSection === section
        ? "text-teal-400 border-teal-400"
        : "text-slate-300 hover:text-white border-transparent"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-black backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center -space-x-1">
            <img src="/scaleuplabs_logo.png" alt="Scaleup Labs" className="w-36 h-36 object-contain rounded-lg" style={{ mixBlendMode: 'screen' }} />
            <div>
              <span className="text-xl font-bold text-white">Scaleup <span className="text-teal-400">Labs</span></span>
              <p className="text-xs text-slate-400 -mt-1 font-medium tracking-wider">Professional AI & Data consultancy</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <a key={section} href={`#${section}`} className={linkClass(section)}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden text-slate-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700">
            <nav className="flex flex-col space-y-4">
              {sections.map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={linkClass(section)}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
