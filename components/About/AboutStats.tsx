"use client";
import { motion } from "motion/react";
import { FC } from "react";

interface AboutStatsProps {
    experience?: {
        years: number;
        projects: number;
        clients: number;
        countries: number;
    };
}

const AboutStats: FC<AboutStatsProps> = ({experience}) => {
    const personalStats = [
        { label: "Years of Experience", value: experience ? `${experience.years}+` : "0" },
        { label: "Projects Completed", value: experience ? `${experience.projects}+` : "0" },
        { label: "Happy Clients", value: experience ? `${experience.clients}+` : "0" },
        { label: "Countries Served", value: experience ? `${experience.countries}+` : "0" }
    ];
    return (
        <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
        >
            {personalStats.map((stat, index) => (
                <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300 rounded-2xl">
                        <motion.div
                            className="text-3xl lg:text-4xl text-white mb-2"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
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

export default AboutStats;