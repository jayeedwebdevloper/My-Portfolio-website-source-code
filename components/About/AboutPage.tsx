"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuCalendar, LuHeart, LuMapPin, LuStar } from "react-icons/lu";
import AboutStats from "./AboutStats";
import Testimonial from "./Testimonial";
import axios from "axios";

interface ExperienceState {
    _id: string;
    clients: number;
    projects: number;
    years: number;
    support: string;
    countries: number;
}


const AboutPage = () => {
    const [loading, setLoading] = useState(false);
    const [experience, setExperience] = useState<ExperienceState>({
        _id: "",
        clients: 0,
        projects: 0,
        years: 0,
        support: "",
        countries: 0
    });

    const fetchExperience = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/experience");
            if (res.data && res.data.length > 0) {
                setExperience(res.data[0]);
            } else {
                setExperience({ _id: "", clients: 0, projects: 0, years: 0, support: "", countries: 0 });
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "About Me | Jayeed Bin Hossian";
        fetchExperience();
    }, []);

    if (loading) {
        return (
            <div className="dark min-h-screen bg-transparent flex items-center justify-center">
                <div className="flex items-center space-x-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-to-r from-blue-400 to-purple-500"></div>
                    <span className="text-lg text-gray-200">Loading dashboard...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-3 md:px-5 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Large Photo Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="order-2 lg:order-1"
                >
                    <div className="bg-white/5 backdrop-blur-xl border border-white/20 p-6 relative overflow-hidden group rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative">
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative aspect-[4/5] rounded-2xl overflow-hidden"
                            >
                                <Image
                                    width={1000}
                                    height={1000}
                                    src="/images/jayeed.webp"
                                    alt="jayeed, web developer, mobile developer, android, ios, react native, next js, react js"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent"></div>
                            </motion.div>

                            {/* Floating Elements */}
                            <motion.div
                                className="absolute -top-3 -right-3 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-3 shadow-2xl backdrop-blur-sm"
                                animate={{
                                    y: [-3, 3, -3],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <LuHeart className="w-8 h-8 text-white" fill="currentColor" />
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-3 -left-3 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-3 shadow-2xl backdrop-blur-sm"
                                animate={{
                                    y: [3, -3, 3],
                                    rotate: [0, -5, 5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 2
                                }}
                            >
                                <LuStar className="w-8 h-8 text-white" fill="currentColor" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Personal Content Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="order-1 lg:order-2"
                >
                    <div
                        className="bg-white/5 backdrop-blur-xl border border-white/20 mb-6 px-6 py-2 flex justify-center items-center rounded-2xl w-[220px] ms-0"
                    >
                        <LuStar className="w-4 h-4 mr-2 text-yellow-400" />
                        <p>Nice to meet you!</p>
                    </div>

                    <h1 className="text-4xl lg:text-6xl mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent leading-tight">
                        I'm jayeed bin hossian
                    </h1>

                    <p className="text-2xl lg:text-3xl text-gray-300 mb-8 leading-relaxed">
                        Full-Stack Developer
                    </p>

                    <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                        I'm a passionate full-stack developer who believes in creating digital experiences that make a difference. My journey in technology started with curiosity and has evolved into a mission to build innovative solutions that solve real-world problems.
                    </p>

                    {/* Personal Details */}
                    <div className="space-y-4 mb-10">
                        <div className="flex items-center gap-3 text-gray-400">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-2">
                                <LuMapPin className="w-4 h-4 text-blue-400" />
                            </div>
                            <span>Bangladesh</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-2">
                                <LuCalendar className="w-4 h-4 text-purple-400" />
                            </div>
                            <span>{experience?.years}+ years of passionate development</span>
                        </div>
                    </div>

                    {/* Personal Philosophy */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/20 p-6 relative overflow-hidden rounded-2xl">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-3xl"></div>
                        <div className="relative">
                            <h3 className="text-lg text-white mb-3">My Philosophy</h3>
                            <p className="text-gray-400 leading-relaxed">
                                "Great software isn't just about clean code—it's about understanding people and solving their problems in ways they never imagined possible."
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <AboutStats experience={experience} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
            >
                <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/20 p-12 max-w-4xl mx-auto relative overflow-hidden rounded-2xl">
                    <div className="absolute top-4 left-4 text-6xl text-blue-400/20">"</div>
                    <div className="absolute bottom-4 right-4 text-6xl text-purple-400/20 rotate-180">"</div>
                    <div className="relative">
                        <p className="text-2xl lg:text-3xl text-white mb-6 italic leading-relaxed">
                            Technology is at its best when it disappears into the background, leaving only the magic of what becomes possible.
                        </p>
                        <div className="flex items-center justify-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mr-4 overflow-hidden ps-1">
                                <Image width={100} height={100} src="/images/jayeed-developer.webp" alt="web developer, jayeed, mobile developer, ai, android, ios" />
                            </div>
                            <div>
                                <div className="text-white">— Jayeed bin hossain</div>
                                <div className="text-sm text-gray-400">Full-Stack Developer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* <Testimonial /> */}
        </div>
    );
};

export default AboutPage;