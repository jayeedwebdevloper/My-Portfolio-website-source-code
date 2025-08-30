'use client';

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddSkillModal from "./AddSkillModal";
import axios from "axios";
import SkillsCard from "./SkillsCard";
import { FaBrain } from "react-icons/fa6";
import Experience from "@/components/Experience/Experience";

interface Skill {
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

const SkillsLayout = () => {
    const [loading, setLoading] = useState(false);
    const [showAddSkillForm, setShowAddSkillForm] = useState(false);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [experience, setExperience] = useState<ExperienceState>({
        _id: "",
        clients: 0,
        projects: 0,
        years: 0,
        support: "",
        countries: 0
    });

    const fetchSkills = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/skills");
            if (res.data) {
                setSkills(res.data);
            } else {
                setSkills([]);
            }
        } catch (error) {
            console.error("Error fetching skills:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchExperience = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/experience");
            if (res.data && res.data.length > 0) {
                setExperience(res.data[0]);
            } else {
                setExperience({ _id: "", clients: 0, projects: 0, years: 0, support: "", countries: 0 } );
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSkills();
        fetchExperience();
    }, [])

    if (loading) {
        return (
            <div className="dark min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center">
                <div className="flex items-center space-x-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-to-r from-blue-400 to-purple-500"></div>
                    <span className="text-lg text-gray-200">Loading dashboard...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 p-6 overflow-y-auto">
            <div className="w-full mb-8">
                <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                Skills & Experience Management
                            </h1>
                            <p className="text-gray-400">Manage your technology expertise and skills</p>
                        </div>
                        <button
                            onClick={() => setShowAddSkillForm(true)}
                            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <FaPlus className="w-4 h-4" />
                            <span>Add New Skills</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills?.map((skill) => (
                    <SkillsCard
                        key={skill._id}
                        skill={skill}
                        fetchSkills={fetchSkills}
                    />
                ))}

                {skills.length === 0 && !loading && (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-4">
                            <FaBrain className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl text-gray-400 mb-2">No skills yet</h3>
                        <p className="text-gray-500 mb-6">Start showcasing your expertise</p>
                        <button
                            onClick={() => setShowAddSkillForm(true)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg cursor-pointer"
                        >
                            Add Your First Skill
                        </button>
                    </div>
                )}
            </div>

            <div className="w-full mt-12">
                <Experience
                    experience={experience}
                    fetchExperience={fetchExperience}
                />
            </div>

            <AddSkillModal
                show={showAddSkillForm}
                onClose={() => setShowAddSkillForm(false)}
                fetchSkills={fetchSkills}
            />
        </div>
    );
};

export default SkillsLayout;