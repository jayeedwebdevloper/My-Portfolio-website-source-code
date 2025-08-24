"use client";

import Image from "next/image";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";

interface AddTechStackModalProps {
    show: boolean;
    onClose: () => void;
}

const AddTechStackModal: React.FC<AddTechStackModalProps> = ({
    show,
    onClose,
}) => {
    const [icon, setIcon] = useState<string>("")
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Add New Tech Stack
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white p-2"
                    >
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>

                {/* Icon Upload */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Tech Stack Icon</label>
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center border-2 border-dashed border-white/20">
                            {icon ? (
                                <Image
                                    width={300}
                                    height={300}
                                    src={icon}
                                    alt="Icon preview"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <FaImage className="w-6 h-6 text-gray-400" />
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            // onChange={(e) => handleFileUpload(e.target.files)}
                            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-500/20 file:text-blue-300"
                        />
                    </div>
                </div>

                {/* Title */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:border-blue-400/50"
                        placeholder="Technology name (e.g., React, Node.js, MongoDB)"
                    />
                </div>

                {/* Description */}
                <div className="mb-8">
                    <label className="block text-sm text-gray-400 mb-2">Description</label>
                    <textarea name="description" className="border border-white/20 rounded-lg bg-white/10 min-h-[120px] w-full p-4 text-gray-200 focus:outline-none prose prose-invert prose-sm max-w-none" placeholder="Describe this technology, its uses, and your experience with it..."></textarea>
                </div>

                {/* Form Actions */}
                <div className="flex space-x-4">
                    <button
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                    >
                        Add Tech Stack
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-white/10 text-gray-300 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTechStackModal;