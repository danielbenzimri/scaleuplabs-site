
import { useState } from "react";
import ServiceRadioGroup from "./ServiceRadioGroup";
import SourceRadioGroup from "./SourceRadioGroup";

const FORMSUBMIT_URL = "https://formsubmit.co/daniel@scaleuplabs.dev";
const CC_EMAILS = "niv@scaleuplabs.dev,nivyul@gmail.com,daniel@gaialabs.ai";

const ContactForm = () => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("");

  return (
    <div>
      <form
        action={FORMSUBMIT_URL}
        method="POST"
        className="space-y-6"
      >
        {/* FormSubmit config */}
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_autoresponse" value="Thank you for reaching out to ScaleUp Labs! We've received your message and will get back to you within 24 hours." />
        <input type="hidden" name="_next" value="https://scaleuplabs.dev/#contact" />
        <input type="hidden" name="_subject" value="New inquiry - ScaleUp Labs" />
        {CC_EMAILS && <input type="hidden" name="_cc" value={CC_EMAILS} />}
        {/* Honeypot — hidden from users, catches bots */}
        <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-slate-900">First Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="firstName"
              name="Name"
              required
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 placeholder:text-slate-400"
              placeholder="John"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-slate-900">Last Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="lastName"
              name="Surname"
              required
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 placeholder:text-slate-400"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-900">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 placeholder:text-slate-400"
              placeholder="john@company.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2 text-slate-900">Phone</label>
            <input
              type="tel"
              id="phone"
              name="Phone"
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 placeholder:text-slate-400"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2 text-slate-900">Company</label>
          <input
            type="text"
            id="company"
            name="Company"
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 placeholder:text-slate-400"
            placeholder="Your startup name"
          />
        </div>

        <SourceRadioGroup
          selectedSource={selectedSource}
          onSourceChange={setSelectedSource}
        />
        <input type="hidden" name="Source" value={selectedSource || '-'} />

        <ServiceRadioGroup
          selectedService={selectedService}
          onServiceChange={setSelectedService}
        />
        <input type="hidden" name="Service" value={selectedService || '-'} />

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-900">Tell us about your project</label>
          <textarea
            id="message"
            name="Message"
            rows={4}
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-900 placeholder:text-slate-400"
            placeholder="Describe your AI/data science needs and goals..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
