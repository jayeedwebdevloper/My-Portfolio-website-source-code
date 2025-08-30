"use client";

import { ContextApi } from "@/Context/Context";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

interface AddSkillModalProps {
    show: boolean;
    onClose: () => void;
    fetchSkills: () => void;
}

interface RangeColor {
    from: string;
    to: string;
    direction: string;
}

const AddSkillModal: React.FC<AddSkillModalProps> = ({ show, onClose, fetchSkills }) => {
    const { userInformation } = useContext<any>(ContextApi);
    const [loading, setLoading] = useState(false);
    const [rangeColor, setRangeColor] = useState<RangeColor>({
        from: "#3b82f6",
        to: "#8b5cf6",
        direction: "to right"
    });
    const [skillsPercentage, setSkillsPercentage] = useState(0);

    if (!show) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const title = formData.get("title") as string;
        const bgColor = `linear-gradient(${rangeColor.direction}, ${rangeColor.from}, ${rangeColor.to})`;

        const newSkill = {
            title,
            percentage: skillsPercentage,
            rangeColor: bgColor
        }

        setLoading(true);

        try {
            const res = await axios.post("/api/skills", newSkill, {
                headers: {
                    "Content-Type": "application/json",
                    "x-uid": userInformation.uid,
                }
            });

            if (res.data) {
                fetchSkills();
                onClose();
                form.reset();
                setSkillsPercentage(0);
                setRangeColor({
                    from: "#3b82f6",
                    to: "#8b5cf6",
                    direction: "to right"
                });
                toast.success("Skill added successfully!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add skill")
        } finally {
            setLoading(false);
        }
    };

    const handlePercentageChange = (value: number) => {
        const clampedValue = Math.max(0, Math.min(100, value));
        setSkillsPercentage(clampedValue);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl max-w-md w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Add New Skill
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-400 hover:text-gray-200 transition-all duration-200"
                    >
                        <FaTimes className="w-4 h-4" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Skill Title */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Skill Title
                        </label>
                        <input
                            type="text"
                            // value={newSkill.title}
                            name="title"
                            placeholder="e.g., React, Python, UI/UX Design..."
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            required
                        />
                    </div>

                    {/* Percentage Slider */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Proficiency Level
                        </label>
                        <div className="space-y-4">
                            {/* Slider */}
                            <div className="relative">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={skillsPercentage}
                                    onChange={(e) => handlePercentageChange(parseInt(e.target.value))}
                                    className="w-full h-3 bg-gray-700/50 rounded-full appearance-none cursor-pointer slider"
                                    style={{
                                        background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(147, 51, 234) ${skillsPercentage}%, rgb(55, 65, 81) ${skillsPercentage}%, rgb(55, 65, 81) 100%)`
                                    }}
                                />
                                <style jsx>{`
                  .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: linear-gradient(45deg, rgb(59, 130, 246), rgb(147, 51, 234));
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                  }
                  .slider::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: linear-gradient(45deg, rgb(59, 130, 246), rgb(147, 51, 234));
                    cursor: pointer;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                  }
                `}</style>
                            </div>

                            {/* Percentage Display */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">
                                    {skillsPercentage < 25 ? 'Beginner' :
                                        skillsPercentage < 50 ? 'Intermediate' :
                                            skillsPercentage < 75 ? 'Advanced' : 'Expert'}
                                </span>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={skillsPercentage}
                                        onChange={(e) => handlePercentageChange(parseInt(e.target.value) || 0)}
                                        className="w-16 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-200 text-center focus:outline-none focus:border-blue-500/50"
                                    />
                                    <span className="text-gray-400">%</span>
                                </div>
                            </div>

                            {/* Level Indicators */}
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((level) => (
                                    <div
                                        key={level}
                                        className={`flex-1 h-2 rounded-full ${level <= Math.ceil(skillsPercentage / 20)
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                                            : 'bg-gray-700'
                                            } transition-all duration-200`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                                
                    {/* color */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Range Color
                        </label>

                        <div style={{
                            backgroundImage: `linear-gradient(${rangeColor.direction}, ${rangeColor.from}, ${rangeColor.to})`
                        }} className={`w-full h-12 mb-3 rounded-xl`}></div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input
                                type="text"
                                value={rangeColor.direction}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRangeColor({
                                    ...rangeColor, direction: e.target.value
                                })}
                                placeholder="direction"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                                required
                            />
                            <input
                                type="color"
                                value={rangeColor.from}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRangeColor({
                                    ...rangeColor, from: e.target.value
                                })}
                                placeholder="From"
                                className="w-full px-1 py-1 rounded-xl bg-white/5 border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 h-full"
                                required
                            />
                            <input
                                type="color"
                                value={rangeColor.to}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRangeColor({
                                    ...rangeColor, to: e.target.value
                                })}
                                placeholder="To"
                                className="w-full px-1 py-1 rounded-xl bg-white/5 border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 h-full"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || skillsPercentage === 0}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                    >
                        <FaPlus className="w-4 h-4" />
                        <span>Add Skill</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddSkillModal;