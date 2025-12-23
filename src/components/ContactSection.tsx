
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-blue-100 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Scale Your AI?
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Let's discuss how we can help you build and scale your AI capabilities. Get in touch for a consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
