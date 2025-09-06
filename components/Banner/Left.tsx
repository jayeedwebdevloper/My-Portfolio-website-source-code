import { motion } from "motion/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { MdLightbulbOutline, MdOutlineCode } from "react-icons/md";

interface leftProps {
    stats: {
        value: string;
        label: string;
        icon: React.ElementType;
    }[];
}

const Left = ({ stats }: leftProps) => {
    return (
        <motion.div
            className="space-y-8 pt-16"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* AI Badge */}
            <motion.div
                className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <MdLightbulbOutline className="w-5 h-5 text-purple-400" />
                <span className="text-sm bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Full-Stack Development Solutions
                </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="text-4xl lg:text-6xl mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                        Code The
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                        Future
                    </span>
                </h1>
            </motion.div>

            {/* Subtitle */}
            <p
                className="text-xl lg:text-2xl text-gray-300 leading-normal"
            >
                Transform your vision into reality with cutting-edge technologies,
                AI integration, and expert development that pushes boundaries.
            </p>

            {/* Stats */}
            <motion.div
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center"
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(255,255,255,0.1)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                        <p className="text-xl text-white mb-1">{stat.value}</p>
                        <p className="text-xs text-gray-400">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <Link href="/contact"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-purple-500/25 backdrop-blur-xl group flex gap-4 items-center justify-center px-4 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 cursor-pointer w-fit"
                >
                    <MdOutlineCode className="w-5 h-5 mr-2" />
                    Discuss Your Project
                    <FaArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default Left;