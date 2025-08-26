'use client';

import { useEffect, useState } from "react";
import { FaCode, FaPlus } from "react-icons/fa6";
import TechStackCard from "./TechStackCard";
import AddTechStackModal from "./AddTechStackModal";
import axios from "axios";

interface TechStack {
    _id: string;
    icon: string;
    title: string;
    description: string;
    color1st: string;
    color2nd: string;
}

const TechStack = () => {
    const [techStacks, setTechStacks] = useState<TechStack[]>([]);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchTechStack = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/techs");
            if (res.data) {
                setTechStacks(res.data);
            } else {
                setTechStacks([])
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTechStack();
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 p-6 overflow-y-auto">
            <div className="w-full mb-8">
                <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                Tech Stack Management
                            </h1>
                            <p className="text-gray-400">Manage your technology expertise and skills</p>
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <FaPlus className="w-4 h-4" />
                            <span>Add New Tech</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {techStacks.map((techStack) => (
                    <TechStackCard
                        fetchTechStack={fetchTechStack}
                        key={techStack._id}
                        techStack={techStack}
                    />
                ))}

                {techStacks.length === 0 && !loading && (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-4">
                            <FaCode className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl text-gray-400 mb-2">No tech stack yet</h3>
                        <p className="text-gray-500 mb-6">Start building your technology portfolio</p>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                        >
                            Add Your First Tech
                        </button>
                    </div>
                )}
            </div>

            <AddTechStackModal
                fetchTechStack={fetchTechStack}
                show={showAddForm}
                onClose={() => setShowAddForm(false)}
            />
        </div>
    )
}

export default TechStack