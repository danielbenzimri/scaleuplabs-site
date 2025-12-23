
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ServiceOption {
  value: string;
  label: string;
}

interface ServiceRadioGroupProps {
  selectedService: string;
  onServiceChange: (serviceValue: string) => void;
}

const ServiceRadioGroup = ({ selectedService, onServiceChange }: ServiceRadioGroupProps) => {
  const serviceOptions: ServiceOption[] = [
    { value: "Data Science", label: "Data Science" },
    { value: "Generative AI", label: "Generative AI" },
    { value: "Data Pipelines", label: "Data Pipelines" },
    { value: "Full-Stack Development", label: "Full-Stack Development" },
    { value: "Tech Outsourcing", label: "Tech Outsourcing" },
    { value: "Tech Recruitment", label: "Tech Recruitment" },
    { value: "General Consultation", label: "General Consultation" }
  ];

  return (
    <div>
      <label className="block text-sm font-medium mb-4 text-gray-900">Service Interest</label>
      <RadioGroup value={selectedService} onValueChange={onServiceChange} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {serviceOptions.map((service) => (
          <div key={service.value} className="flex items-center space-x-3">
            <RadioGroupItem
              value={service.value}
              id={service.value}
              className="border-gray-400 text-blue-600"
            />
            <label
              htmlFor={service.value}
              className="text-sm text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
            >
              {service.label}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default ServiceRadioGroup;
