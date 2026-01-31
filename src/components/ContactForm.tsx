
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ServiceRadioGroup from "./ServiceRadioGroup";
import SourceRadioGroup from "./SourceRadioGroup";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("");
  const { toast } = useToast();

  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeROFhZqvh_kqKgU2vZHkEtTCZ26aNhf4u3bvUxiGn6zwMQVQ/formResponse";

  // Entry mappings for the Google Form fields
  const FORM_ENTRIES = {
    firstName: 'entry.1235181365',
    lastName: 'entry.231172584',
    email: 'entry.1252231773',
    company: 'entry.1023043322',
    services: 'entry.1098171232',
    message: 'entry.499026935'
  };

  const handleServiceChange = (serviceValue: string) => {
    setSelectedService(serviceValue);
  };

  const handleSourceChange = (sourceValue: string) => {
    setSelectedSource(sourceValue);
  };

  // Direct form submission method
  const submitDirectly = (formData: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    services: string;
    message: string;
  }) => {
    // Create a temporary form element
    const tempForm = document.createElement('form');
    tempForm.action = GOOGLE_FORM_URL;
    tempForm.method = 'POST';
    tempForm.target = '_blank'; // Opens in new tab to avoid navigation issues
    tempForm.style.display = 'none';

    // Add all form fields
    Object.entries(FORM_ENTRIES).forEach(([key, entryId]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = entryId;
      input.value = formData[key as keyof typeof formData] || ''; // Handle empty values
      tempForm.appendChild(input);
    });

    // Append to body, submit, then remove
    document.body.appendChild(tempForm);
    tempForm.submit();
    document.body.removeChild(tempForm);

    // Show success message
    toast({
      title: "Form Submitted!",
      description: "Thank you for your interest. The form has been submitted in a new tab. We'll get back to you within 24 hours.",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataElement = new FormData(e.currentTarget);

    const formData = {
      firstName: formDataElement.get('firstName') as string,
      lastName: formDataElement.get('lastName') as string,
      email: formDataElement.get('email') as string,
      company: (formDataElement.get('company') as string) || '',
      services: selectedService || '',
      message: `[Source: ${selectedSource || 'Not specified'}]\n\n${(formDataElement.get('message') as string) || ''}`
    };

    console.log('Form submission data:', formData);

    try {
      submitDirectly(formData);

      // Reset form after short delay
      setTimeout(() => {
        (e.target as HTMLFormElement).reset();
        setSelectedService("");
        setSelectedSource("");
        setIsSubmitting(false);
      }, 1000);

    } catch (error) {
      console.error('Error submitting form:', error);

      toast({
        title: "Submission Error",
        description: "There was an issue submitting the form. Please try again.",
        variant: "destructive"
      });

      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-gray-900">First Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-gray-900">Last Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-900">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            placeholder="john@company.com"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2 text-gray-900">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            placeholder="Your startup name"
          />
        </div>

        <SourceRadioGroup
          selectedSource={selectedSource}
          onSourceChange={handleSourceChange}
        />

        <ServiceRadioGroup
          selectedService={selectedService}
          onServiceChange={handleServiceChange}
        />

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-900">Tell us about your project</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            placeholder="Describe your AI/data science needs and goals..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
