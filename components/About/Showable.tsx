import { motion } from "motion/react";

interface Props {
    stats: {
        icon: React.ComponentType;
        label: string;
        value: string;
        color: string;
    }[];
}

const Showable = ({ stats }: Props) => {
    return (
        <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
        >
            {stats.map((stat: any, index: number) => (
                <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300 relative overflow-hidden group rounded-2xl">
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                        <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} p-3`}>
                            <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <motion.div
                            className="text-3xl text-white mb-2"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                            viewport={{ once: true }}
                        >
                            {stat.value}
                        </motion.div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default Showable;