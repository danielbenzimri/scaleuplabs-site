
import { Mail, MapPin, Calendar } from "lucide-react";

const ContactInfo = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6 text-white">Get In Touch</h3>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Mail className="w-6 h-6 text-teal-400" />
          <div>
            <p className="font-medium text-white">Email</p>
            <a
              href="mailto:info@scaleuplabs.dev"
              className="text-slate-400 hover:text-teal-400 transition-colors"
            >
              info@scaleuplabs.dev
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Calendar className="w-6 h-6 text-teal-400" />
          <div>
            <p className="font-medium text-white">Schedule a Call</p>
            <p className="text-slate-400">Book a free consultation</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <MapPin className="w-6 h-6 text-teal-400" />
          <div>
            <p className="font-medium text-white">Location</p>
            <p className="text-slate-400">Remote-first, Global reach</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-slate-800 rounded-lg shadow-sm border border-slate-700">
        <h4 className="font-semibold mb-3 text-white">What to expect:</h4>
        <ul className="space-y-2 text-slate-400">
          <li className="flex items-center">
            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-3"></div>
            Free initial consultation
          </li>
          <li className="flex items-center">
            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-3"></div>
            Tailored AI strategy discussion
          </li>
          <li className="flex items-center">
            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-3"></div>
            No commitment required
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactInfo;
