
import { Star } from "lucide-react";
import { useTestimonials, getMockTestimonials } from "@/hooks/useTestimonials";

const TestimonialsSection = () => {
  const { data: contentfulTestimonials, isLoading, error } = useTestimonials();

  // Use Contentful data if available, otherwise fall back to mock data
  const testimonials = contentfulTestimonials || getMockTestimonials();

  // Show loading state
  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Loading testimonials...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-48 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">Using demo data - Contentful integration available</p>
          </div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Trusted by startups and growing companies to build their AI capabilities the right way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id || index} className="p-8 bg-blue-50 rounded-2xl shadow-sm border border-blue-100 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-gray-700 mb-6 leading-relaxed text-lg">
                "{testimonial.testimonial}"
              </blockquote>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  {typeof testimonial.image === 'string' && testimonial.image.startsWith('http') ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = '👤';
                      }}
                    />
                  ) : (
                    <span className="text-2xl">{testimonial.image}</span>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-blue-50 text-blue-800 rounded-full">
            <Star className="w-5 h-5 mr-2 fill-current" />
            <span className="font-semibold">4.9/5 average rating from 50+ projects</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
