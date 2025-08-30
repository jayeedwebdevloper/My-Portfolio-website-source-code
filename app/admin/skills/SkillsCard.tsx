"use client";

import { ContextApi } from "@/Context/Context";
import axios from "axios";
import React, { useContext, useState } from "react";
import { FaCode, FaTrash } from "react-icons/fa6";

interface Skill {
    _id: string;
    title: string;
    percentage: number;
    rangeColor: string;
}

interface SkillsCardProps {
    skill: Skill;
    fetchSkills: () => void;
}

const SkillsCard: React.FC<SkillsCardProps> = ({ skill, fetchSkills }) => {
    const { userInformation } = useContext<any>(ContextApi);
    const [loading, setLoading] = useState(false);
    const deleteSkill = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this skill?");
        if (!confirmDelete) return;

        if (!userInformation || !userInformation.uid) {
            alert("You must be logged in to delete a skill.");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.delete(`/api/skills/${id}`, {
                headers: {
                    "x-uid": userInformation.uid,
                }
            });

            if (res.data.deleted) { 
                fetchSkills();
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <FaCode className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl text-gray-200 mb-1">{skill.title}</h3>
                        <span className="text-sm text-gray-400">Proficiency Level</span>
                    </div>
                </div>

                <button
                    disabled={loading}
                    onClick={() => deleteSkill(skill._id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 cursor-pointer"
                    title="Delete skill"
                >
                    <FaTrash className="w-4 h-4" />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Progress</span>
                    <span className="text-lg text-gray-200">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.percentage}%`, backgroundImage: skill.rangeColor }}
                    />
                </div>
            </div>

            {/* Skill Level Indicator */}
            <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                    {skill.percentage < 25 ? 'Beginner' :
                        skill.percentage < 50 ? 'Intermediate' :
                            skill.percentage < 75 ? 'Advanced' : 'Expert'}
                </span>
                <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                        <div
                            key={level}
                            className={`w-2 h-2 rounded-full ${level <= Math.ceil(skill.percentage / 20)
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                                : 'bg-gray-700'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillsCard;