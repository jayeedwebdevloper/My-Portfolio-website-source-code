"use client";
import axios from "axios";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { LuBrain, LuGithub, LuSparkles, LuZap } from "react-icons/lu";
import parse from "html-react-parser";
import Link from "next/link";
import ProjectLink from "@/lib/confirmationVisit";
import ViewDetails from "@/lib/visitDetailsRestriction";

interface Project {
    _id: string;
    title: string;
    description: string;
    category: string;
    gallery: string[];
    link: string;
    tags: string[];
    client: string;
    covered: boolean;
    technologies: string[];
    duration: string;
    keyFeatures: string[];
    githubLink?: string;
}

const FeaturedProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [information, setInformation] = useState<{github: string}>({github: ''});

    const fetchProjects = async () => {
        const res = await axios.get('/api/projects');

        if (res.data) {
            setProjects(res.data);
        } else {
            setProjects([]);
        }
    };

    const fetchInformation = async () => {
        try {
            const res = await axios.get('/api/information');
            if (res.data) {
                setInformation(res.data[0]);
            } else {
                setInformation({github: ''});
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProjects();
        fetchInformation();
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
                    className="bg-white/5 backdrop-blur-xl border border-white/20 mb-6 px-6 py-2 flex justify-center items-center w-[190px] mx-auto rounded-full text-white shadow-lg"
                >
                    <LuSparkles className="w-4 h-4 mr-2 text-cyan-400" />
                    <p>My Portfolio</p>
                </div>
                <h2 className="text-5xl lg:text-6xl pb-8 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                    Featured Projects
                </h2>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                    Explore our portfolio of cutting-edge projects featuring OpenAI integration, intelligent Web & Mobile app, and next-generation solutions.
                </p>
            </motion.div>

            <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                {projects?.slice(-3)?.map((project, index) => (
                    <div key={index} className="px-4">
                        <motion.div
                            className="h-full"
                            whileHover={{ y: -10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="bg-white/5 backdrop-blur-md border border-white/20 overflow-hidden hover:bg-white/8 transition-all duration-500 group h-full rounded-3xl shadow-2xl shadow-black/20">
                                <div className="relative overflow-hidden">
                                    <Image
                                        width={1000}
                                        height={600}
                                        src={project.gallery[0]}
                                        alt={project.title}
                                        className={`w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-700 ${project.covered ? 'blur-lg' : 'blur-none'}`}
                                    />

                                    {project.covered && (
                                        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
                                            <p className="text-white font-bold text-lg mb-2">Sensitive Content</p>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute top-4 left-4">
                                        <div
                                            className={`bg-green-700/90 text-white border-green-400/50 rounded-3xl px-2`}
                                        >
                                            {project.category}
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <motion.div
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        >
                                            <LuBrain className="w-6 h-6 text-purple-400" />
                                        </motion.div>
                                    </div>
                                    {/* Very subtle animated overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                <div className="p-6 relative z-10 flex flex-col">

                                    <h3 className="text-xl text-white group-hover:text-gray-100 mb-3 transition-all duration-300">
                                        {project.title}
                                    </h3>

                                    <div className="text-gray-400 group-hover:text-gray-300 mb-4 text-sm leading-relaxed transition-colors duration-300 line-clamp-3">
                                        {parse(project.description)}
                                    </div>

                                    {/* AI Features */}
                                    <div className="mb-4">
                                        <h4 className="text-xs text-gray-500 group-hover:text-gray-400 mb-2 uppercase tracking-wider flex items-center transition-colors duration-300">
                                            <LuZap className="w-3 h-3 mr-1" />
                                            Features
                                        </h4>
                                        <div className="flex flex-wrap gap-1">
                                            {project.keyFeatures.slice(0, 3).map((feature, featureIndex) => (
                                                <motion.div
                                                    key={featureIndex}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: featureIndex * 0.1 }}
                                                    viewport={{ once: true }}
                                                >
                                                    <p className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs rounded-full hover:scale-105 transition-transform hover:text-purple-200 px-2 py-1 capitalize">
                                                        {feature}
                                                    </p>
                                                </motion.div>
                                            ))}
                                            {project.keyFeatures.length > 3 && (
                                                <p className="text-purple-300 text-xs px-2 py-1">...</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                            <motion.div
                                                key={tech}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ delay: techIndex * 0.1 }}
                                                viewport={{ once: true }}
                                            >
                                                <p className="bg-white/10 backdrop-blur-sm border border-white/20 text-xs hover:bg-white/15 transition-colors duration-200 rounded-full hover:scale-105 text-gray-300 hover:text-white px-2 py-1 capitalize">
                                                    {tech}
                                                </p>
                                            </motion.div>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <p className="text-gray-300 text-xs px-2 py-1">...</p>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center">
                                        {
                                            project.link ?
                                                <ProjectLink link={project.link} covered={project.covered} /> : <span></span>
                                        }
                                        <ViewDetails link={`/projects/${project._id}`} covered={project.covered} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>

            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="bg-gradient-to-br from-purple-500/10 via-blue-600/10 to-cyan-500/10 backdrop-blur-xl border border-white/20 p-12 max-w-4xl mx-auto relative overflow-hidden rounded-3xl mt-16">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-3xl"></div>
                    </div>

                    <motion.div
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        >
                            <LuSparkles className="w-16 h-16 mx-auto mb-6 text-cyan-400" />
                        </motion.div>
                        <h3 className="text-3xl lg:text-4xl text-white pb-6">Discover More Projects</h3>
                        <p className="text-gray-300 pb-8 text-lg max-w-2xl mx-auto">
                            Explore our complete portfolio of Full-stack applications, Web and Mobile solutions,
                            and cutting-edge development projects that push the boundaries of technology.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/projects"
                                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 shadow-lg shadow-purple-500/25 rounded-full z-10 flex items-center justify-center px-4 py-2 cursor-pointer"
                            >
                                <LuBrain className="w-5 h-5 mr-2" />
                                View All Projects
                                <FaArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                            <Link
                                href={information.github}
                                target="_blank"
                                className="bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10 text-white rounded-full flex items-center justify-center px-4 py-2 cursor-pointer"
                            >
                                <LuGithub className="w-5 h-5 mr-2" />
                                GitHub Repository
                                <FaArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default FeaturedProjects;