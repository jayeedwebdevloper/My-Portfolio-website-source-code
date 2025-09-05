"use client";

import axios from "axios";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { LuArrowLeft, LuCheck, LuClock, LuCode, LuMessageCircle, LuStar, LuUsers } from "react-icons/lu";
import { TbLoader2 } from "react-icons/tb";
import parse from "html-react-parser";
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

const ServiceDetailsComponent = () => {
    const [service, setService] = useState<Service | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any | null>(null);
    const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
    const [technology, setTechnology] = useState<any[]>([]);

    const [loadingMain, setLoadingMain] = useState(true);
    const [loadingThumbs, setLoadingThumbs] = useState<{ [key: number]: boolean }>(
        {}
    );

    const { id } = useParams();

    const fetchService = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/api/services/${id}`);
            if (res.data) {
                setService(res.data);
            } else {
                setService({
                    _id: "",
                    title: "",
                    description: "",
                    features: [],
                    gallery: [],
                    icon: "",
                    technology: []
                })
            }
        } catch (error) {
            setError(error);
            setService({
                _id: "",
                title: "",
                description: "",
                features: [],
                gallery: [],
                icon: "",
                technology: []
            })
        } finally {
            setIsLoading(false);
        }
    }, [id])

    const fetchTechStack = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/api/techs");
            if (res.data) {
                setTechnology(res.data);
            } else {
                setTechnology([])
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchService();
        fetchTechStack();
    }, [id, fetchService, fetchTechStack]);

    useEffect(() => {
        if (service) {
            document.title = service.title;
        }
    }, [service]);

    const colorSelection = (tech: string, color: "color1st" | "color2nd") => {
        const selectedTech = technology?.find(tc => tc.title === tech);
        if (!selectedTech) return "";

        return color === "color1st" ? selectedTech.color1st : selectedTech.color2nd;
    };

    const imageSelection = (tech: string) => {
        const selectedTech = technology?.find(tc => tc.title === tech);
        if (!selectedTech) return "";

        return selectedTech.icon
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark flex items-center justify-center">
                <div className="text-center">
                    <TbLoader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
                    <p className="text-white text-xl">Loading service details...</p>
                </div>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark flex items-center justify-center">
                <div className="bg-white/5 backdrop-blur-xl border border-red-500/30 p-8 text-center max-w-md rounded-2xl">
                    <IoAlertCircleOutline className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h2 className="text-white text-xl mb-4">Service Not Found</h2>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <Link
                        href="/services"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex justify-center items-center w-full px-3 rounded-xl py-1 gap-2"
                    >
                        <LuArrowLeft className="w-4 h-4 mr-2" />
                        Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="fixed inset-0 -z-50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.15)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(6,182,212,0.1)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90"></div>
            </div>

            <div className="relative z-10">
                <section className="pt-32 pb-12">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Link
                                href="/services"
                                className="border-white/20 text-white hover:bg-white/10 mb-8 flex justify-center items-center px-3 rounded-lg py-1 w-fit"
                            >
                                <LuArrowLeft className="w-4 h-4 mr-2" />
                                Back to Services
                            </Link>

                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                {/* Content */}
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-3xl p-5">
                                            <Image width={200} height={200} src={service?.icon} alt={service?.title} />
                                        </div>
                                        <div>
                                            <h1 className="text-4xl lg:text-6xl text-white mb-2">{service.title}</h1>
                                            <p className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 text-sm w-fit rounded-xl px-3">
                                                Premium Service
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className="text-lg text-gray-300 leading-relaxed mb-8"
                                    >
                                        {parse(service?.description)}
                                    </div>

                                    <div className="flex gap-4">
                                        <Link href="/contact" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex justify-center items-center px-3 py-1 rounded-xl cursor-pointer">
                                            <LuMessageCircle className="w-4 h-4 mr-2" />
                                            Get Quote
                                        </Link>
                                    </div>
                                </div>

                                {/* Gallery */}
                                <div>
                                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                                        {/* Main Image Preview */}
                                        <div className="aspect-video rounded-2xl overflow-hidden mb-4 relative flex items-center justify-center">
                                            {loadingMain && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                                    <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-400" />
                                                </div>
                                            )}

                                            <Image
                                                priority={false}
                                                loading="lazy"
                                                width={800}
                                                height={600}
                                                src={service.gallery[selectedGalleryIndex]}
                                                alt={`${service.title} preview ${selectedGalleryIndex + 1}`}
                                                className={`w-full h-full object-cover transition-opacity duration-500 ${loadingMain ? "opacity-0" : "opacity-100"
                                                    }`}
                                                onLoad={() => setLoadingMain(false)}
                                            />
                                        </div>

                                        {/* Thumbnails */}
                                        <div className="flex gap-2 overflow-x-auto">
                                            {service?.gallery?.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        setSelectedGalleryIndex(index);
                                                        setLoadingMain(true);
                                                    }}
                                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${selectedGalleryIndex === index
                                                        ? "border-blue-500"
                                                        : "border-white/20 hover:border-white/40"
                                                        } relative`}
                                                >
                                                    {loadingThumbs[index] && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                                            <AiOutlineLoading3Quarters className="animate-spin text-xl text-gray-300" />
                                                        </div>
                                                    )}
                                                    <Image
                                                        priority={false}
                                                        loading="lazy"
                                                        width={300}
                                                        height={300}
                                                        src={image}
                                                        alt={`Preview ${index + 1}`}
                                                        className={`w-full h-full object-cover transition-opacity duration-500 ${loadingThumbs[index] ? "opacity-0" : "opacity-100"
                                                            }`}
                                                        onLoad={() =>
                                                            setLoadingThumbs((prev) => ({ ...prev, [index]: false }))
                                                        }
                                                        onLoadStart={() =>
                                                            setLoadingThumbs((prev) => ({ ...prev, [index]: true }))
                                                        }
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>


                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Features List */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl text-white mb-8">What's Included</h2>
                                <div className="space-y-4">
                                    {service?.features?.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
                                        >
                                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-2 flex-shrink-0">
                                                <LuCheck className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-gray-300">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Technology Stack */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl text-white mb-8">Technology Stack</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {service.technology.map((tech, index) => {
                                        const color1 = colorSelection(tech, "color1st");
                                        const color2 = colorSelection(tech, "color2nd");
                                        const img = imageSelection(tech);
                                        return <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300 rounded-2xl">
                                                <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex justify-center items-center`} style={{
                                                    background: `linear-gradient(to bottom right, ${color1}, ${color2})`,
                                                }}>
                                                    <Image className="rounded-xl px-1 py-1" width={200} height={200} src={img} alt={tech} />
                                                </div>
                                                <h3 className="text-white mb-2">{tech}</h3>
                                            </div>
                                        </motion.div>
                                    })}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl text-white mb-6">Our Development Process</h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                We follow a proven methodology to ensure your project's success
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { title: "Discovery", description: "Understanding your requirements and goals", icon: LuUsers },
                                { title: "Planning", description: "Creating detailed project roadmap", icon: LuClock },
                                { title: "Development", description: "Building your solution with best practices", icon: LuCode },
                                { title: "Delivery", description: "Testing, deployment and ongoing support", icon: LuStar }
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300 rounded-2xl h-full">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-4 mx-auto mb-4">
                                            <step.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl text-white mb-3">{step.title}</h3>
                                        <p className="text-gray-400">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/20 p-12 text-center rounded-2xl">
                                <h2 className="text-4xl text-white mb-6">Ready to Get Started?</h2>
                                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                    Let's discuss your project and create something amazing together.
                                    Contact us today for a free consultation.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <Link href="/contact" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-3 py-2 rounded-xl flex justify-center items-center cursor-pointer">
                                        <LuMessageCircle className="w-4 h-4 mr-2" />
                                        Start Your Project
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ServiceDetailsComponent;