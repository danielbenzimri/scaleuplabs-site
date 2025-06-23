
import { Checkbox } from "@/components/ui/checkbox";

interface ServiceOption {
  value: string;
  label: string;
}

interface ServiceCheckboxesProps {
  selectedServices: string[];
  onServiceChange: (serviceValue: string, checked: boolean) => void;
}

const ServiceCheckboxes = ({ selectedServices, onServiceChange }: ServiceCheckboxesProps) => {
  const serviceOptions: ServiceOption[] = [
    { value: "data-science", label: "Data Science" },
    { value: "generative-ai", label: "Generative AI" },
    { value: "data-pipelines", label: "Data Pipelines" },
    { value: "full-stack", label: "Full-Stack Development" },
    { value: "outsourcing", label: "Tech Outsourcing" },
    { value: "recruitment", label: "Tech Recruitment" },
    { value: "consultation", label: "General Consultation" }
  ];

  return (
    <div>
      <label className="block text-sm font-medium mb-4">Service Interest (select all that apply)</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {serviceOptions.map((service) => (
          <div key={service.value} className="flex items-center space-x-3">
            <Checkbox
              id={service.value}
              checked={selectedServices.includes(service.value)}
              onCheckedChange={(checked) => onServiceChange(service.value, checked as boolean)}
              className="border-gray-600 data-[state=checked]:bg-blue-600"
            />
            <label
              htmlFor={service.value}
              className="text-sm text-gray-300 cursor-pointer"
            >
              {service.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCheckboxes;
