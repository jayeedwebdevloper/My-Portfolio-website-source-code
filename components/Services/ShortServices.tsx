"use client";
import axios from "axios";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { LuBrain, LuSparkles } from "react-icons/lu";
import parse from 'html-react-parser';
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Service {
    _id: string;
    title: string;
    description: string;
    features: string[];
    gallery: string[];
    icon: string;
    technology: string[];
}

const ShortServices = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMain, setLoadingMain] = useState(true);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/services');
            const data = await response.data;
            setServices(data);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, [])
    return (
        <div className="py-24 container mx-auto px-5 lg:px-6">
            {/* titles */}
            <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div
                    className="bg-white/5 backdrop-blur-xl border border-white/20 mb-6 px-6 py-2 flex justify-center items-center w-[220px] mx-auto rounded-full text-white shadow-lg"
                >
                    <LuSparkles className="w-4 h-4 mr-2 text-cyan-400" />
                    <p>Full-Stack Services</p>
                </div>
                <h2 className="text-5xl lg:text-6xl pb-8 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                    Comprehensive Development Solutions
                </h2>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                    From concept to deployment, we offer end-to-end development services using
                    the latest technologies, AI integration, and best practices to build the future.
                </p>
            </motion.div>

            <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                {loading ? (
                    <p className="text-center text-gray-400 col-span-3">Loading services...</p>
                ) : (
                    services?.map((service, index) => (
                        <div key={index} className="px-4">
                            <motion.div
                                className="h-full"
                                whileHover={{ y: -10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="bg-white/5 backdrop-blur-md border border-white/20 p-8 hover:bg-white/8 transition-all duration-500 group relative overflow-hidden h-full rounded-3xl shadow-2xl shadow-black/20">
                                    {/* Subtle gradient overlay on hover - much more subtle */}
                                    <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-3 transition-opacity duration-500 rounded-3xl`}></div>

                                    {/* Subtle animated border - reduced opacity */}
                                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500">
                                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 p-px opacity-20`}>
                                            <div className="w-full h-full bg-slate-900/80 rounded-3xl backdrop-blur-md"></div>
                                        </div>
                                    </div>

                                    {/* Icon */}
                                    <motion.div
                                        className={`w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-5 mb-8 relative z-10 shadow-lg`}
                                        whileHover={{ scale: 1.05, rotate: 3 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        {loadingMain && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                                <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-400" />
                                            </div>
                                        )}
                                        <Image width={200} height={200} className={`w-full ${loadingMain ? "opacity-0" : "opacity-100"
                                            }`} onLoadingComplete={() => setLoadingMain(false)} src={service.icon} alt={service.title} />
                                        <div className="absolute inset-0 bg-white/10 rounded-3xl blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                    </motion.div>

                                    <h3 className="text-2xl text-white mb-4 relative z-10 group-hover:text-gray-100 transition-all duration-300">
                                        {service.title}
                                    </h3>

                                    <div className="text-gray-400 group-hover:text-gray-300 mb-6 leading-relaxed relative z-10 transition-colors duration-300 line-clamp-3">
                                        {parse(service.description)}
                                    </div>

                                    {/* Features */}
                                    <div className="mb-6 relative z-10">
                                        <h4 className="text-sm text-gray-500 group-hover:text-gray-400 mb-3 uppercase tracking-wider transition-colors duration-300">Key Features</h4>
                                        <div className="space-y-2">
                                            {service?.features?.map((feature, featureIndex) => (
                                                <motion.div
                                                    key={featureIndex}
                                                    className="flex items-center space-x-2"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: featureIndex * 0.1 }}
                                                    viewport={{ once: true }}
                                                >
                                                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                                                    <span className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{feature}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                                        {service?.technology?.map((tech, techIndex) => (
                                            <motion.div
                                                key={tech}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: techIndex * 0.1 }}
                                                viewport={{ once: true }}
                                            >
                                                <div
                                                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-xs hover:bg-white/15 transition-colors duration-200 hover:scale-105 text-gray-300 hover:text-white px-2.5 py-1 rounded-2xl"
                                                >
                                                    {tech}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/services/${service?._id}`}
                                        className="w-full justify-between group-hover:bg-white/10 transition-all duration-200 mt-auto relative z-10 rounded-2xl border border-white/10 hover:border-white/30 text-gray-300 hover:text-white flex items-center px-6 py-3 text-sm font-semibold bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-xl cursor-pointer"
                                    >
                                        Learn More
                                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    ))
                )}
            </div>

            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
            >
                <div className="bg-gradient-to-br from-blue-500/10 via-purple-600/10 to-cyan-500/10 backdrop-blur-lg border border-white/20 p-12 max-w-4xl mx-auto relative overflow-hidden rounded-3xl mt-16">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <LuBrain className="w-16 h-16 mx-auto mb-6 text-purple-400" />
                        <h3 className="text-3xl lg:text-4xl text-white mb-6">Ready to Build the Future?</h3>
                        <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                            Let's discuss your requirements and create something extraordinary together.
                        </p>
                        <Link
                            href="/services"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-purple-500/25 rounded-2xl flex items-center justify-center px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl mx-auto cursor-pointer"
                        >
                            <LuBrain className="w-5 h-5 mr-2" />
                            View All Services
                            <FaArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ShortServices;