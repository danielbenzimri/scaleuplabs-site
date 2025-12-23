import { Briefcase, Clock, Handshake, ArrowRight } from "lucide-react";

const DeliveryCard = ({ model }: { model: any }) => (
    <div className="group bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-blue-100 p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-600 group-hover:text-white text-blue-600 mr-4">
                {model.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {model.title}
            </h3>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
            {model.description}
        </p>
    </div>
);

const DeliveryModelsSection = () => {
    const deliveryModels = [
        {
            icon: <Briefcase className="w-6 h-6" />,
            title: "Project-Based",
            description: "End-to-end delivery for well-scoped AI or data projects with clear deliverables."
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Retainer-Based",
            description: "Ongoing support and advisory, adapting to your evolving business priorities."
        },
        {
            icon: <Handshake className="w-6 h-6" />,
            title: "Integrated Team",
            description: "Fractional Data & AI team embedded within your organization for long-term success."
        }
    ];

    return (
        <section id="delivery-models" className="py-12 bg-blue-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 border-indigo-600 inline-block border-b-4 pb-2">
                        Delivery Models
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Flexible engagement options tailored to your stage and needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {deliveryModels.map((model, index) => (
                        <DeliveryCard key={index} model={model} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DeliveryModelsSection;
