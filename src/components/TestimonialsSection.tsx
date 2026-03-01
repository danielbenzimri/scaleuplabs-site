
import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTestimonials, getMockTestimonials } from "@/hooks/useTestimonials";

const TestimonialsSection = () => {
  const { data: contentfulTestimonials, isLoading, error } = useTestimonials();
  const testimonials = contentfulTestimonials || getMockTestimonials();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setDirection("right");
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 300);
  }, [testimonials.length, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setDirection("left");
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsTransitioning(false);
    }, 300);
  }, [testimonials.length, isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setDirection(index > currentIndex ? "right" : "left");
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  }, [currentIndex, isTransitioning]);

  // Auto-rotation
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext, testimonials.length]);

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-light-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Loading testimonials...
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-200 rounded-2xl h-64 animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-light-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-700 text-sm">Using demo data - Contentful integration available</p>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Hear from the teams we've helped scale their AI and data capabilities.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div
          className="max-w-4xl mx-auto relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-teal-500 hover:border-teal-200 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-teal-500 hover:border-teal-200 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Testimonial Card */}
          <div className="overflow-hidden">
            <div
              className={`transition-all duration-300 ease-in-out ${
                isTransitioning
                  ? direction === "right"
                    ? "opacity-0 translate-x-8"
                    : "opacity-0 -translate-x-8"
                  : "opacity-100 translate-x-0"
              }`}
            >
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-teal-500/20" />
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8">
                  "{currentTestimonial.testimonial}"
                </blockquote>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < currentTestimonial.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-20 h-20 rounded-full object-cover ring-2 ring-slate-100 grayscale"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{currentTestimonial.name}</p>
                    <p className="text-sm text-slate-500">
                      {currentTestimonial.role}, {currentTestimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-teal-500"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trusted By */}
        <div className="text-center mt-20">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Trusted By the Most Innovative Startups
          </h3>
          <p className="text-sm text-slate-500">
            AI, data analytics, e-commerce, supply chain, fintech, healthtech, and more.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
