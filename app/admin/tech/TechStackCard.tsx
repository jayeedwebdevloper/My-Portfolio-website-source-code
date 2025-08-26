"use client";

import { ContextApi } from "@/Context/Context";
import axios from "axios";
import Image from "next/image";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";

interface TechStack {
    _id: string;
    icon: string;
    title: string;
    description: string;
    color1st: string;
    color2nd: string;
}

interface TechStackCardProps {
    techStack: TechStack;
    fetchTechStack: () => void;
}

const TechStackCard: React.FC<TechStackCardProps> = ({ techStack, fetchTechStack }) => {

    const { userInformation } = useContext<any>(ContextApi);
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this tech?")) return;

        try {
            setLoading(true);

            const res = await axios.delete(`/api/techs/${id}`, {
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
            fetchTechStack();
        }
    }

    return (
        <div className="backdrop-blur-lg bg-white/5 border-white/10 shadow-2xl rounded-2xl border hover:bg-white/8 transition-all duration-300 hover:scale-105">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div
                            className="w-16 h-16 flex justify-center items-center p-1 rounded-xl border border-white/20"
                            style={{
                                background: `linear-gradient(to right, ${techStack?.color1st}, ${techStack?.color2nd})`,
                            }}
                        >
                            <Image
                                width={500}
                                height={500}
                                src={techStack.icon}
                                alt={techStack.title}
                                style={{
                                    borderWidth: 2,
                                    borderColor: techStack?.color1st
                                }}
                                className={`w-full object-cover rounded-md`}
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl text-gray-200 mb-1">{techStack.title}</h3>
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        onClick={() => handleDelete(techStack._id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <FaTrash className="w-4 h-4" />
                    </button>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Description</label>
                    <div
                        className="bg-white/5 rounded-lg p-4 border border-white/10 text-gray-300 prose prose-invert prose-sm max-w-none"
                    >
                        <p>{techStack.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechStackCard;