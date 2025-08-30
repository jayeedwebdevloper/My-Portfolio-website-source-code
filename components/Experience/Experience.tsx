"use client";

import { ContextApi } from "@/Context/Context";
import axios from "axios";
import { FC, useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaCalendarAlt, FaEdit, FaProjectDiagram, FaSave, FaTimes } from "react-icons/fa";
import { FaHeadset, FaUsers } from "react-icons/fa6";
import { TiWorldOutline } from "react-icons/ti";

interface Experience {
    _id: string;
    clients: number;
    projects: number;
    years: number;
    support: string;
    countries: number;
}

interface ExperienceCardProps {
    experience: Experience;
    fetchExperience: () => void;
}

const Experience: FC<ExperienceCardProps> = ({ experience, fetchExperience }) => {
    const {userInformation} = useContext<any>(ContextApi);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(experience);
    
    const handleSave = async () => {
        const reqBody = {
            clients: editData.clients,
            projects: editData.projects,
            years: editData.years,
            support: editData.support,
        }
        try {
            const res = await axios.patch(`/api/experience/${experience._id}`, reqBody, {
                headers: {
                    "x-uid": userInformation.uid,
                }
            });
            if (res.data) {
                toast.success("Experience updated successfully");
               fetchExperience();
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const stats = [
        {
            icon: FaUsers,
            label: 'Happy Clients',
            value: isEditing ? (
                <input
                    type="number"
                    value={editData.clients}
                    onChange={(e) => setEditData({ ...editData, clients: parseInt(e.target.value) || 0 })}
                    className="w-20 px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-gray-200 text-center focus:outline-none focus:border-blue-500/50"
                    min="0"
                />
            ) : experience.clients,
            color: 'from-green-500 to-emerald-500',
            suffix: '+'
        },
        {
            icon: FaProjectDiagram,
            label: 'Projects Completed',
            value: isEditing ? (
                <input
                    type="number"
                    value={editData.projects}
                    onChange={(e) => setEditData({ ...editData, projects: parseInt(e.target.value) || 0 })}
                    className="w-20 px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-gray-200 text-center focus:outline-none focus:border-blue-500/50"
                    min="0"
                />
            ) : experience.projects,
            color: 'from-blue-500 to-purple-500',
            suffix: '+'
        },
        {
            icon: FaCalendarAlt,
            label: 'Years of Experience',
            value: isEditing ? (
                <input
                    type="number"
                    value={editData.years}
                    onChange={(e) => setEditData({ ...editData, years: parseInt(e.target.value) || 0 })}
                    className="w-20 px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-gray-200 text-center focus:outline-none focus:border-blue-500/50"
                    min="0"
                />
            ) : experience.years,
            color: 'from-orange-500 to-red-500',
            suffix: '+'
        },
        {
            icon: TiWorldOutline,
            label: 'Countries',
            value: isEditing ? (
                <input
                    type="number"
                    value={editData.countries}
                    onChange={(e) => setEditData({ ...editData, years: parseInt(e.target.value) || 0 })}
                    className="w-20 px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-gray-200 text-center focus:outline-none focus:border-blue-500/50"
                    min="0"
                />
            ) : experience.countries,
            color: 'from-blue-500 to-cyan-500',
            suffix: '+'
        }
    ];

    return (
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        Experience Overview
                    </h2>
                    <p className="text-gray-400">Professional journey metrics</p>
                </div>

                <div className="flex space-x-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                            >
                                <FaSave className="w-4 h-4" />
                                <span>Save</span>
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex items-center space-x-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
                            >
                                <FaTimes className="w-4 h-4" />
                                <span>Cancel</span>
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                        >
                            <FaEdit className="w-4 h-4" />
                            <span>Edit</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                            <stat.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-3xl text-gray-200 mb-2 flex items-center justify-center">
                            {typeof stat.value === 'number' ? (
                                <>
                                    <span>{stat.value}</span>
                                    <span className="text-lg text-gray-400 ml-1">{stat.suffix}</span>
                                </>
                            ) : (
                                stat.value
                            )}
                        </div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div>
                <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                        <FaHeadset className="w-4 h-4 text-white" />
                    </div>
                    <label className="block text-sm text-gray-300">
                        Support Availability
                    </label>
                </div>
                {isEditing ? (
                    <input
                        type="text"
                        value={editData.support}
                        onChange={(e) => setEditData({ ...editData, support: e.target.value })}
                        placeholder="e.g., 24/7, Mon-Fri 9AM-6PM, etc."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                    />
                ) : (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-gray-300">
                            {editData.support || (
                            <span className="text-gray-500 italic">No support time set</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Experience;