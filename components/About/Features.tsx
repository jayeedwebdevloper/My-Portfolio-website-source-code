import { motion } from "motion/react";

interface Props {
    features: {
        icon: React.ComponentType<{ className?: string }>;
        title: string;
        description: string;
    }[];
}

const Features = ({ features }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <h3 className="text-3xl text-white mb-8">Why Choose Our Services?</h3>
            <div className="space-y-6">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="text-lg text-white mb-2">{feature.title}</h4>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Features;