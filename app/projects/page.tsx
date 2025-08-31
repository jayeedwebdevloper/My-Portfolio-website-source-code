"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { LuBrain, LuChevronDown, LuFolderOpen, LuGlobe, LuSearch, LuSmartphone } from "react-icons/lu";
import { TbLoader2 } from "react-icons/tb";
import { motion } from "motion/react";
import ProjectsGrid from "@/components/Projects/ProjectsGrid";


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

interface ExperienceState {
    _id: string;
    clients: number;
    projects: number;
    years: number;
    support: string;
    countries: number;
}

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");
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

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('/api/projects');
            if (res.data) {
                setProjects(res.data);
                setFilteredProjects(res.data);
            } else {
                setProjects([]);
                setFilteredProjects([]);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProjects();
        fetchExperience();
    }, []);

    // Filter and sort logic
    useEffect(() => {
        let filtered = [...projects];

        // Filter by category
        if (selectedCategory !== "All") {
            filtered = filtered.filter(project => project.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(project =>
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Sort projects
        const sorted = (() => {
            switch (sortBy) {
                case "newest":
                    return [...filtered].reverse(); // last → first
                case "all":
                default:
                    return filtered; // keep order
            }
        })();

        setFilteredProjects(sorted);
    }, [projects, selectedCategory, searchTerm, sortBy]);

    const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

    const getProjectIcon = (category: string) => {
        if (category.includes("Mobile")) return LuSmartphone;
        if (category.includes("Web")) return LuGlobe;
        if (category.includes("AI")) return LuBrain;
        return LuFolderOpen;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark flex items-center justify-center">
                <div className="text-center">
                    <TbLoader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
                    <p className="text-white text-xl">Loading amazing projects...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="fixed inset-0 -z-50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.15)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(6,182,212,0.1)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-slate-900/90"></div>
            </div>

            <div className="relative z-10">
                <section className="pt-32 pb-20">
                    <div className="container mx-auto px-4 lg:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <p
                                className="bg-white/5 backdrop-blur-xl border border-white/20 mb-6 px-6 py-3 inline-flex items-center rounded-full text-sm"
                            >
                                <LuFolderOpen className="w-5 h-5 mr-2 text-purple-400" />
                                Project Portfolio
                            </p>
                            <h1 className="text-5xl lg:text-7xl pb-8 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent leading-tight">
                                Our Projects
                            </h1>
                            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                                Explore our comprehensive portfolio of cutting-edge projects, from Web applications to Mobile app solutions.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Filters and Search */}
                <section className="pb-12">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 mb-8 rounded-2xl">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Search */}
                                    <div className="relative">
                                        <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search projects..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>

                                    {/* Category Filter */}
                                    <div className="relative">
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none appearance-none cursor-pointer"
                                        >
                                            {categories.map(category => (
                                                <option key={category} value={category} className="bg-slate-800">
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                        <LuChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                                    </div>

                                    {/* Sort */}
                                    <div className="relative">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="newest" className="bg-slate-800">Newest First</option>
                                            <option value="all" className="bg-slate-800">All</option>
                                        </select>
                                        <LuChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Results count */}
                                <div className="mt-4 text-center">
                                    <span className="text-gray-400">
                                        Showing {filteredProjects.length} of {experience.projects} projects
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <ProjectsGrid filteredProjects={filteredProjects} getProjectIcon={getProjectIcon} setSelectedCategory={setSelectedCategory} setSearchTerm={setSearchTerm} setSortBy={setSortBy} />
            </div>
        </div>
    );
};

export default ProjectsPage;