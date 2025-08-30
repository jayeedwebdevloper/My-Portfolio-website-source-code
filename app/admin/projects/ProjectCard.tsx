"use client";

import { ContextApi } from "@/Context/Context";
import axios from "axios";
import { FC, useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

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

interface ProjectCardProps {
    fetchProjects: () => void;
    project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, fetchProjects }) => {
    const { userInformation } = useContext<any>(ContextApi);
    const [loading, setLoading] = useState(false);
    const currentData = project;

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            setLoading(true);

            const res = await axios.delete(`/api/projects/${id}`, {
                headers: {
                    "x-uid": userInformation.uid,
                },
            });

            const data = await res.data;

            if (!res.data) {
                toast.error(data.error || "Delete failed");
            } else {
                toast.success("Service deleted successfully");
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
            fetchProjects();
        }
    }

    return (
        <div className="backdrop-blur-lg bg-white/5 border-white/10 shadow-2xl rounded-2xl border hover:bg-white/8 transition-all duration-300 p-6">

            <div className="mb-6 flex items-start justify-between">
                <h3 className="text-xl text-gray-200 mb-1">{currentData.title}</h3>
                <div className="flex space-x-2">
                    <button
                        disabled={loading}
                        onClick={() => handleDelete(currentData._id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    >
                        <FaTrash className="w-4 h-4" />
                    </button>

                    {
                        currentData?.link && <Link
                            target="_blank"
                            href={currentData.link}
                            className="px-2 py-1 bg-lime-600 rounded-lg transition-colors cursor-pointer"
                        >
                            Visit
                        </Link>
                    }
                </div>
            </div>

            {/* Description */}
            <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Description</label>

                <div
                    className="bg-white/5 rounded-lg p-4 border border-white/10 text-gray-300 prose prose-invert prose-sm max-w-none"
                >
                    {parse(currentData.description)}
                </div>
            </div>

            {/* Features */}
            <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Features</label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {(currentData.keyFeatures || []).map((feature, index) => (
                        <div key={index} className="flex items-center bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Technology */}
            <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Technology</label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {(currentData.technologies || []).map((tech, index) => (
                        <div key={index} className="flex items-center bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                            <span>{tech}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {(currentData.tags || []).map((tag, index) => (
                        <div key={index} className="flex items-center bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-sm">
                            <span>{tag}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gallery */}
            <div>
                <label className="block text-sm text-gray-400 mb-2">Gallery</label>
                <div className="grid grid-cols-3 gap-3">
                    {(currentData.gallery || []).map((image, index) => (
                        <Image
                            width={800}
                            height={800}
                            key={index}
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            className="aspect-video object-cover rounded-lg border border-white/20"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;