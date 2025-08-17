import { motion } from "motion/react";
import Image from "next/image";
import { LuCpu } from "react-icons/lu";

interface RightProps {
    technologies: {
        name: string;
        icon: string;
        color: string;
        description: string;
    }[];
}

const Right = ({ technologies }: RightProps) => {
    return (
        < motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }
            }
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            {/* Professional Developer Image */}
            < motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {/* Creative PNG-style design instead of boxed photo */}
                < div className="relative h-96 flex items-center justify-center" >
                    {/* Floating geometric shapes background */}
                    < div className="absolute inset-0" >
                        <motion.div
                            className="absolute top-8 left-8 w-20 h-20 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-2xl backdrop-blur-sm border border-blue-400/30"
                            animate={{
                                rotate: [0, 180, 360],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute top-20 right-12 w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full backdrop-blur-sm border border-purple-400/30"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute bottom-16 left-16 w-12 h-12 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-lg backdrop-blur-sm border border-cyan-400/30"
                            animate={{
                                rotate: [360, 180, 0],
                                x: [0, 10, 0],
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                        <motion.div
                            className="absolute bottom-8 right-8 w-8 h-8 bg-gradient-to-br from-yellow-500/40 to-orange-500/40 rounded-full backdrop-blur-sm border border-yellow-400/30"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div >

                    {/* Central developer silhouette with modern design */}
                    < div className="relative z-10 w-64 h-80 bg-gradient-to-br from-white/10 via-blue-500/20 to-purple-600/20 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20" >
                        {/* Glowing effect */}
                        < div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-600/10 to-cyan-500/10" ></div >

                        {/* Abstract developer representation */}
                        < div className="absolute top-4 left-5 right-3 bottom-0 flex flex-col items-center justify-end" >
                            <Image width={530} height={710} src="/images/jayeed-developer.webp" alt="developer, app, mobile, web, react, jayeed" />
                        </div >

                        {/* Floating code snippets */}
                        < motion.div
                            className="absolute top-6 right-6 text-xs text-green-400/70 font-mono"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            {"<AI/>"}
                        </motion.div >
                        <motion.div
                            className="absolute bottom-6 left-6 text-xs text-blue-400/70 font-mono"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                        >
                            {"{ }"}
                        </motion.div>
                        <motion.div
                            className="absolute top-1/2 left-4 text-xs text-purple-400/70 font-mono"
                            animate={{
                                opacity: [0.5, 1, 0.5],
                                x: [0, 5, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity, delay: 0.8 }}
                        >
                            {"()=>"}
                        </motion.div>

                        {/* Neural network connections */}
                        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 256 320">
                            <motion.path
                                d="M50 50 Q 150 100 200 50 T 200 150 Q 100 200 50 150 T 50 250"
                                stroke="url(#neuralGradient)"
                                strokeWidth="1"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                            <defs>
                                <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div >

                    {/* Additional floating elements */}
                    < motion.div
                        className="absolute top-1/4 -left-4 w-24 h-24 border border-blue-400/30 rounded-2xl backdrop-blur-sm bg-blue-500/5"
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                    < motion.div
                        className="absolute bottom-1/4 -right-4 w-20 h-20 border border-purple-400/30 rounded-full backdrop-blur-sm bg-purple-500/5"
                        animate={{
                            y: [0, -15, 0],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div >

                <div className="mt-6 text-center">
                    <h3 className="text-xl text-white mb-1">Full Stack Developer</h3>
                    <p className="text-gray-400 text-sm">Specializing in OpenAI Integration, Web Development & Mobile Development</p>
                </div>
            </motion.div >

            {/* Technology Stack */}
            < motion.div
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
            >
                <div className="flex items-center space-x-2 mb-6">
                    <LuCpu className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg text-white">Technology Stack</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center text-white text-sm flex-shrink-0`}>
                                    {tech.icon}
                                </div>
                                <div className="min-w-0">
                                    <div className="text-white text-sm truncate">{tech.name}</div>
                                    <div className="text-gray-400 text-xs truncate">{tech.description}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div >
        </motion.div >
    );
};

export default Right;