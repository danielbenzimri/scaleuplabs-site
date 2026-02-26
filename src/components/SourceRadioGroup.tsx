
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SourceOption {
    value: string;
    label: string;
}

interface SourceRadioGroupProps {
    selectedSource: string;
    onSourceChange: (sourceValue: string) => void;
}

const SourceRadioGroup = ({ selectedSource, onSourceChange }: SourceRadioGroupProps) => {
    const sourceOptions: SourceOption[] = [
        { value: "LinkedIn", label: "LinkedIn" },
        { value: "Google/Search Engine", label: "Google/Search Engine" },
        { value: "Referral", label: "Referral" },
        { value: "Social Media (Twitter/X)", label: "Social Media (Twitter/X)" },
        { value: "Partner/Integration", label: "Partner/Integration" },
        { value: "Advertisement", label: "Advertisement" }
    ];

    return (
        <div>
            <label className="block text-sm font-medium mb-4 text-white">How did you find us?</label>
            <RadioGroup value={selectedSource} onValueChange={onSourceChange} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sourceOptions.map((source) => (
                    <div key={source.value} className="flex items-center space-x-3">
                        <RadioGroupItem
                            value={source.value}
                            id={`source-${source.value}`}
                            className="border-slate-500 text-teal-400"
                        />
                        <label
                            htmlFor={`source-${source.value}`}
                            className="text-sm text-slate-300 cursor-pointer hover:text-teal-400 transition-colors"
                        >
                            {source.label}
                        </label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default SourceRadioGroup;
