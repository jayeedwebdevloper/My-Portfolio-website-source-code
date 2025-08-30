"use client";
import { LuAward, LuBrain, LuClock, LuRocket, LuTarget, LuUsers, LuZap } from "react-icons/lu";
import { motion } from "motion/react";
import Features from "./Features";
import ShowAble from "./Showable";
import Expertise from "./Experties";
import { useEffect, useState } from "react";
import axios from "axios";
import { TiWorldOutline } from "react-icons/ti";

interface Expertise {
    _id: string;
    title: string;
    percentage: number;
    rangeColor: string;
}

interface ExperienceState {
    _id: string;
    clients: number;
    projects: number;
    years: number;
    support: string;
    countries: number;
}

const HomeAbout = () => {
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

    const stats = [
        { icon: LuUsers, label: "Happy Clients", value: experience ? `${experience.clients}+` : "0", color: "from-blue-500 to-cyan-500" },
        { icon: LuAward, label: "Projects Completed", value: experience ? `${experience.projects}+` : "0", color: "from-purple-500 to-pink-500" },
        { icon: LuClock, label: "Years Experience", value: experience ? `${experience.years}+` : "0", color: "from-green-500 to-emerald-500" },
        { icon: TiWorldOutline, label: "Countries Served", value: experience ? `${experience.countries}+` : "0", color: "from-orange-500 to-red-500" },
    ];

    const [expertise, setExpertise] = useState<Expertise[]>([]);

    const fetchExpertise = async () => { 
        setLoading(true);
        try {
            const res = await axios.get("/api/skills");
            if (res.data) { 
                setExpertise(res.data);
            } else {
                setExpertise([]);
            }
        } catch (error) {
            console.error("Error fetching expertise:", error);
        } finally {
            setLoading(false);
        }
    }

    const features = [
        {
            icon: LuZap,
            title: "Lightning Fast Development",
            description: "Rapid prototyping and development using modern frameworks and AI-assisted coding tools."
        },
        {
            icon: LuBrain,
            title: "AI-Powered Solutions",
            description: "Leverage OpenAI and cutting-edge AI technologies to create intelligent applications."
        },
        {
            icon: LuTarget,
            title: "Precision & Quality",
            description: "Meticulous attention to detail ensuring pixel-perfect designs and robust functionality."
        },
        {
            icon: LuRocket,
            title: "Future-Ready Tech",
            description: "Stay ahead with the latest technologies and best practices in software development."
        }
    ];

    useEffect(() => {
        fetchExpertise();
        fetchExperience();
    }, []);

    return (
        <div className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <motion.div
                    className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-500/10 to-pink-600/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="container mx-auto px-5 lg:px-6">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div
                        className="bg-white/5 backdrop-blur-xl border border-white/20 mb-6 px-6 py-2 flex items-center justify-center rounded-full text-sm text-white w-[290px] mx-auto"
                    >
                        <LuBrain className="w-4 h-4 mr-2 text-purple-400" />
                        <p>About Our Full Stack Approach</p>
                    </div>
                    <h2 className="text-5xl lg:text-6xl pt-5 pb-8 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                        Crafting Digital Excellence
                    </h2>
                    <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        We are a passionate team of developers specializing in modern web and mobile technologies.
                        Our mission is to transform your vision into robust, scalable, and innovative digital solutions.
                    </p>
                </motion.div>

                <ShowAble stats={stats} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <Features features={features} />
                    <Expertise expertise={expertise} loading={loading} />
                </div>
            </div>
        </div>
    );
};

export default HomeAbout;