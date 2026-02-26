
import { Star } from "lucide-react";
import { useTestimonials, getMockTestimonials } from "@/hooks/useTestimonials";

const TestimonialsSection = () => {
  const { data: contentfulTestimonials, isLoading, error } = useTestimonials();

  // Use Contentful data if available, otherwise fall back to mock data
  const testimonials = contentfulTestimonials || getMockTestimonials();

  // Show loading state
  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Loading testimonials...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-slate-800 rounded-2xl h-48 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-tech-modern-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-3 bg-amber-900/20 border border-amber-700/50 rounded-lg">
            <p className="text-amber-300 text-sm">Using demo data - Contentful integration available</p>
          </div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted By Leading Companies
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-3xl mx-auto">
            We partner with industry leaders across technology, data analytics, e-commerce, and supply chain management.
          </p>
          <div className="flex justify-center w-full">
            <img
              src="/logos/companies-banner.png"
              alt="Our trusted partners: Eezyimport, Intelichain, Slice Global Equity, Annapurna Labs (Amazon), Leo, and BionData"
              className="w-full max-w-6xl h-auto rounded-lg"
            />
          </div>
        </div>


      </div>
    </section>
  );
};

export default TestimonialsSection;
