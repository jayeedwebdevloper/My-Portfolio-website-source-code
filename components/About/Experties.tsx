import { motion } from "motion/react";
import { LuZap } from "react-icons/lu";

interface Props {
    expertise: {
        _id: string;
        title: string;
        percentage: number;
        rangeColor: string;
    }[];
    loading?: boolean;
}

const Expertise = ({ expertise, loading }: Props) => {

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
        >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 relative overflow-hidden rounded-2xl mt-12">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-full"></div>
                <h3 className="text-2xl text-white mb-8 flex items-center">
                    <LuZap className="w-6 h-6 mr-3 text-yellow-400" />
                    Our Technical Expertise
                </h3>
                <div className="space-y-6">
                    {
                        loading && (
                            <div className="dark min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center">
                                <div className="flex items-center space-x-4">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-to-r from-blue-400 to-purple-500"></div>
                                    <span className="text-lg text-gray-200">Loading...</span>
                                </div>
                            </div>
                        )
                    }

                    {expertise?.map((skill, index) => (
                        <div key={index}>
                            <div className="flex justify-between mb-3">
                                <span className="text-white">{skill.title}</span>
                                <span className="text-gray-400">{skill.percentage}%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                                <motion.div
                                    className={`h-3 rounded-full relative overflow-hidden`}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.percentage}%` }}
                                    transition={{ delay: 0.5 + index * 0.2, duration: 1.5, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    style={{ backgroundImage: skill?.rangeColor }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Expertise;