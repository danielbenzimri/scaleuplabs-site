
import { Mail, MapPin, Calendar } from "lucide-react";

const ContactInfo = () => {
  const calcomUsername = 'scaleuplabs';

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6 text-slate-900">Get In Touch</h3>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Mail className="w-6 h-6 text-teal-500" />
          <div>
            <p className="font-medium text-slate-900">Email</p>
            <a
              href="mailto:info@scaleuplabs.dev"
              className="text-slate-600 hover:text-teal-600 transition-colors"
            >
              info@scaleuplabs.dev
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Calendar className="w-6 h-6 text-teal-500" />
          <div>
            <p className="font-medium text-slate-900">Schedule a Call</p>
            <a
              href={`https://cal.eu/${calcomUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-500 font-medium transition-colors"
            >
              Book a free consultation
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <MapPin className="w-6 h-6 text-teal-500" />
          <div>
            <p className="font-medium text-slate-900">Location</p>
            <p className="text-slate-600">Remote-first, Global reach</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-slate-50 rounded-lg shadow-sm border border-slate-200">
        <h4 className="font-semibold mb-3 text-slate-900">What to expect:</h4>
        <ul className="space-y-2 text-slate-600">
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
