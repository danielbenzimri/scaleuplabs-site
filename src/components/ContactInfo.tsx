
import { Mail, MapPin, Calendar } from "lucide-react";

const ContactInfo = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6 text-gray-900">Get In Touch</h3>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Mail className="w-6 h-6 text-blue-600" />
          <div>
            <p className="font-medium text-gray-900">Email</p>
            <a
              href="mailto:info@scaleuplabs.dev"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              info@scaleuplabs.dev
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Calendar className="w-6 h-6 text-blue-600" />
          <div>
            <p className="font-medium text-gray-900">Schedule a Call</p>
            <p className="text-gray-600">Book a free consultation</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <MapPin className="w-6 h-6 text-blue-600" />
          <div>
            <p className="font-medium text-gray-900">Location</p>
            <p className="text-gray-600">Remote-first, Global reach</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-blue-100">
        <h4 className="font-semibold mb-3 text-gray-900">What to expect:</h4>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
            Free initial consultation
          </li>
          <li className="flex items-center">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
            Tailored AI strategy discussion
          </li>
          <li className="flex items-center">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
            No commitment required
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactInfo;
