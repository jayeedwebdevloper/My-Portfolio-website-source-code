"use client";
import { IoCodeSharp, IoSparklesOutline } from 'react-icons/io5';
import { LuHeadphones, LuZap } from 'react-icons/lu';
import { motion } from 'motion/react';
import Left from './Left';
import Right from './Right';
import { useEffect } from 'react';

const Banner = () => {
    const technologies = [
        { name: "TypeScript", icon: "TS", color: "from-blue-500 to-blue-600", description: "Type-safe development" },
        { name: "JavaScript", icon: "JS", color: "from-yellow-500 to-yellow-600", description: "Dynamic programming" },
        { name: "React", icon: "⚛", color: "from-cyan-500 to-cyan-600", description: "UI library" },
        { name: "React Native", icon: "RN", color: "from-blue-600 to-purple-600", description: "Mobile development" },
        { name: "Express.js", icon: "EX", color: "from-green-500 to-green-600", description: "Web framework" },
        { name: "Firebase", icon: "FB", color: "from-orange-500 to-red-600", description: "Backend platform" },
        { name: "OpenAI", icon: "AI", color: "from-purple-500 to-pink-600", description: "AI integration" },
        { name: "Node.js", icon: "NJ", color: "from-green-600 to-emerald-600", description: "Runtime environment" }
    ];

    const stats = [
        { value: "200+", label: "Projects Delivered", icon: IoCodeSharp },
        { value: "50+", label: "Happy Clients", icon: IoSparklesOutline },
        { value: "99%", label: "Success Rate", icon: LuZap },
        { value: "24/7", label: "Support", icon: LuHeadphones }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <div className='flex items-center justify-center relative overflow-hidden pt-20'>
            <div className="absolute inset-0 -z-10">
                <motion.div
                    className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-pink-600/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-purple-500/10 to-blue-600/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="container mx-auto px-5 lg:px-6 py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <Left stats={stats} />
                    <Right technologies={technologies} />
                </div>
            </div>
        </div>
    );
};

export default Banner;