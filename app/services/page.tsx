"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { TbLoader2 } from "react-icons/tb";
import { motion } from "motion/react";
import { LuArrowRight, LuBriefcase } from "react-icons/lu";
import Image from "next/image";
import parse from "html-react-parser";
import Link from "next/link";

interface ExperienceState {
    _id: string;
    clients: number;
    projects: number;
    years: number;
    support: string;
    countries: number;
}

interface Service {
    _id: string;
    title: string;
    description: string;
    features: string[];
    gallery: string[];
    icon: string;
    technology: string[];
}

const Services = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>();

    const fetchServices = async () => {
        setIsLoading(true);

        try {
            const res = await axios.get("/api/services");
            if (res.data) {
                setServices(res.data);
            } else {
                setServices([]);
            }
        } catch (error) {
            setError(error);
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    const [experience, setExperience] = useState<ExperienceState>({
        _id: "",
        clients: 0,
        projects: 0,
        years: 0,
        support: "",
        countries: 0
    });

    const fetchExperience = async () => {
        setIsLoading(true);
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
            setIsLoading(false);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Full-Stack Services"
        fetchServices();
        fetchExperience();
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark flex items-center justify-center">
                <div className="text-center">
                    <TbLoader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
                    <p className="text-white text-xl">Loading amazing services...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark flex items-center justify-center">
                <div className="bg-white/5 backdrop-blur-xl border border-red-500/30 p-8 text-center max-w-md rounded-2xl">
                    <IoAlertCircleOutline className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h2 className="text-white text-xl mb-4">Oops! Something went wrong</h2>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <button
                        onClick={fetchServices}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 w-full py-1 px-3 rounded-xl"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

            <div className="relative z-10">
                <section className="pt-32 pb-20">
                    <div className="container mx-auto px-4 lg:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <div
                                className="bg-white/5 backdrop-blur-lg border border-white/20 mb-6 px-6 py-3 w-fit mx-auto flex justify-center items-center rounded-2xl"
                            >
                                <LuBriefcase className="w-5 h-5 mr-2 text-blue-400" />
                                <p>Our Services</p>
                            </div>
                            <h1 className="text-3xl lg:text-5xl mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent leading-tight">
                                What We Build
                            </h1>
                            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                                From mobile apps to AI-powered solutions, we craft digital experiences that transform businesses and delight users.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="pb-20">
                    <div className="container mx-auto px-4 lg:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            {services?.map((service, index) => {
                                return (
                                    <motion.div
                                        key={service._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: index * 0.2 }}
                                        whileHover={{ y: -10 }}
                                        className="group"
                                    >
                                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 h-full hover:bg-white/10 transition-all duration-500 relative overflow-hidden rounded-2xl">
                                            {/* Background Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

                                            {/* Floating Elements */}
                                            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

                                            <div className="relative z-10">
                                                {/* Service Icon */}
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl p-4 group-hover:scale-110 transition-transform duration-300">
                                                        <Image width={200} height={200} src={service?.icon} alt={service?.title} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-2xl text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                                                            {service?.title}
                                                        </h3>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <div className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
                                                    {parse(service?.description)}
                                                </div>

                                                {/* Features */}
                                                <div className="mb-6">
                                                    <h4 className="text-white mb-3">Key Features:</h4>
                                                    <div className="space-y-2">
                                                        {service?.features?.slice(0, 3).map((feature, featureIndex) => (
                                                            <div key={featureIndex} className="flex items-center gap-2">
                                                                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                                                                <span className="text-gray-300 text-sm">{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Technologies */}
                                                <div className="mb-8">
                                                    <div className="flex flex-wrap gap-2">
                                                        {service?.technology?.map((tech, techIndex) => (
                                                            <p
                                                                key={techIndex}
                                                                className="border-blue-500/30 text-blue-400 bg-blue-500/10 rounded-2xl px-3 text-sm py-1"
                                                            >
                                                                {tech}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Learn More Button */}
                                                <Link
                                                    href={`/services/${service?._id}`}
                                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 group/btn flex justify-center items-center py-2 px-3 rounded-2xl"
                                                >
                                                    <span>Learn More</span>
                                                    <LuArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="pb-20">
                    <div className="container mx-auto px-4 lg:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                                    <div>
                                        <div className="text-4xl text-blue-400 mb-2">{services?.length}+</div>
                                        <div className="text-gray-400">Services Available</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl text-purple-400 mb-2">{experience?.projects}+</div>
                                        <div className="text-gray-400">Projects Delivered</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl text-cyan-400 mb-2">{experience?.clients}+</div>
                                        <div className="text-gray-400">Happy Clients</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl text-green-400 mb-2">{experience?.support}</div>
                                        <div className="text-gray-400">Support Available</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Services;