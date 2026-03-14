
import { ArrowRight, Hexagon } from "lucide-react";

const logos = [
  { src: "/logos/annapurna.png", alt: "Annapurna Labs", height: "h-8", invert: true },
  { src: "/logos/slice_logo_lg.png", alt: "Slice", height: "h-8", invert: true },
  { src: "/logos/opster.png", alt: "Opster", height: "h-12", invert: true },
  { src: "/logos/inteli-chain.png", alt: "Intelichain", height: "h-7", invert: true },
  { src: "/logos/biondata.png", alt: "BionData", height: "h-8", invert: true },
  { src: "/logos/Eezyimport_logo_vertical.png", alt: "Eezyimport", height: "h-14", invert: true },
  { src: "/logos/leo.png", alt: "Leo", height: "h-10", invert: true },
  { src: "/logos/aws.png", alt: "AWS", height: "h-10", invert: true },
  { src: "/logos/ikido.png", alt: "Ikido", height: "h-8", invert: true },
  { src: "/logos/modelcode.png", alt: "Modelcode AI", height: "h-9", invert: true },
];

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-tech-modern-section overflow-x-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-5 py-2.5 bg-slate-800/80 text-teal-300 border border-teal-500/30 rounded-full text-base font-medium mb-8 tracking-wide shadow-[0_0_15px_rgba(20,184,166,0.1)]">
          <Hexagon className="w-5 h-5 mr-2" />
          Boutique AI Agency
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Build Your AI Product
          <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"> the Right Way.</span>
        </h1>

        <p className="text-base sm:text-xl md:text-2xl text-slate-400 mb-12 max-w-4xl mx-auto leading-relaxed">
          We design and implement scalable <span className="font-semibold text-slate-300">Data Infrastructure</span>, pipelines, and <span className="font-semibold text-slate-300">AI Systems</span> - from solid foundations to <span className="font-semibold text-slate-300">LLM-Powered Features</span> - without overengineering or wasted budget.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollToSection('contact')}
            className="group bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center"
          >
            Start Your AI Journey
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="border-2 border-slate-600 hover:border-teal-400 text-slate-300 hover:text-teal-400 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
          >
            Our Services
          </button>
        </div>

        <div className="mt-16 text-base text-slate-400 tracking-wide">
          <p>Senior engineers only · No outsourcing · Direct founder access</p>
        </div>

        <div className="mt-10">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">Trusted by</p>
          <div className="relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0f172a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0f172a] to-transparent z-10 pointer-events-none" />
            <div className="flex w-max animate-scroll-logos hover:[animation-play-state:paused]">
              {[...logos, ...logos].map((logo, index) => (
                <img
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  className={`${logo.height} flex-shrink-0 object-contain opacity-80 mx-8 ${logo.invert ? "brightness-0 invert" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
