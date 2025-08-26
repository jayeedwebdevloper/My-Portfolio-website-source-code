"use client";

import { ContextApi } from "@/Context/Context";
import axios from "axios";
import Image from "next/image";
import React, { FormEvent, useContext, useState } from "react";
import { RgbaColorPicker } from "react-colorful";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";

interface AddTechStackModalProps {
    fetchTechStack: () => void;
    show: boolean;
    onClose: () => void;
}

const AddTechStackModal: React.FC<AddTechStackModalProps> = ({
    show,
    onClose,
    fetchTechStack
}) => {
    const { userInformation } = useContext<any>(ContextApi);
    const [icon, setIcon] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [color1st, setColor1st] = useState({
        r: 0, g: 0, b: 0, a: 1
    });
    const [color2nd, setColor2nd] = useState({
        r: 0, g: 0, b: 0, a: 1
    });

    const uploadToServer = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post("/api/photos", formData, {
            headers: {
                "x-uid": userInformation.uid,
            }
        });

        const data = await res.data;
        return data.url;
    };

    const handleFileUpload = async (files: FileList | null) => {
        if (!files) return;
        setLoading(true)

        try {
            const file = files[0];
            const url = await uploadToServer(file);
            setIcon(url);
        } catch (error) {
            console.log(error);
            toast.error("Upload Failed")
        } finally {
            setLoading(false);
        }
    };

    const handleAddTech = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const titleInput = form.elements.namedItem("title") as HTMLInputElement;
        const descriptionTextarea = form.elements.namedItem("description") as HTMLInputElement;
        const title = titleInput.value.trim();
        const description = descriptionTextarea.value.trim();

        const dataToSend = {
            title,
            description,
            color1st: `rgba(${color1st.r}, ${color1st.g}, ${color1st.b}, ${color1st.a})`,
            color2nd: `rgba(${color2nd.r}, ${color2nd.g}, ${color2nd.b}, ${color2nd.a})`,
            icon
        }

        try {
            const res = await axios.post("/api/techs", dataToSend, {
                headers: {
                    "x-uid": userInformation.uid,
                }
            });

            if (res.data) {
                form.reset();
                setIcon("");
                toast.success("Tech-stack is added");
                onClose();
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed")
        } finally {
            setLoading(false);
            fetchTechStack();
        }
    }

    if (!show) return null;

    return (
        <form onSubmit={handleAddTech} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Add New Tech Stack
                    </h2>
                    <button
                        type="button"
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
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center border-2 border-dashed border-white/20"
                            style={{
                                backgroundImage: `linear-gradient(to right, rgba(${color1st.r}, ${color1st.g}, ${color1st.b}, ${color1st.a}), rgba(${color2nd.r}, ${color2nd.g}, ${color2nd.b}, ${color2nd.a}))`
                            }}
                        >
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
                            onChange={(e) => handleFileUpload(e.target.files)}
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
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="w-full color-select">
                        <label className="block text-sm text-gray-400 mb-2">First Color</label>
                        <RgbaColorPicker color={color1st} onChange={setColor1st} />
                    </div>
                    <div className="w-full color-select">
                        <label className="block text-sm text-gray-400 mb-2">Second Color</label>
                        <RgbaColorPicker color={color2nd} onChange={setColor2nd} />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm text-gray-400 mb-2">Preview</label>
                        <div className="w-full h-24 rounded-2xl"
                            style={{
                                backgroundImage: `linear-gradient(to right, rgba(${color1st.r}, ${color1st.g}, ${color1st.b}, ${color1st.a}), rgba(${color2nd.r}, ${color2nd.g}, ${color2nd.b}, ${color2nd.a}))`
                            }}
                        ></div>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                    <label className="block text-sm text-gray-400 mb-2">Description</label>
                    <textarea name="description" className="border border-white/20 rounded-lg bg-white/10 min-h-[120px] w-full p-4 text-gray-200 focus:outline-none prose prose-invert prose-sm max-w-none" placeholder="Describe this technology, its uses, and your experience with it..."></textarea>
                </div>

                {/* Form Actions */}
                <div className="flex space-x-4">
                    <button
                        disabled={loading}
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                    >
                        Add Tech Stack
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 bg-white/10 text-gray-300 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddTechStackModal;