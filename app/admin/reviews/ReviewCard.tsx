"use client";

import { ContextApi } from "@/Context/Context";
import axios from "axios";
import Image from "next/image";
import { FC, useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaStar, FaTrash } from "react-icons/fa6";

interface Reviews {
    _id: string;
    name: string;
    position: string;
    company: string;
    image: string;
    quote: string;
    rating: number;
    projectType: string;
    color: string;
}

interface ReviewProps {
    review: Reviews;
    fetchReviews: () => void;
}

const ReviewCard: FC<ReviewProps> = ({ review, fetchReviews }) => {
    const { userInformation } = useContext<any>(ContextApi);
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this tech?")) return;

        try {
            setLoading(true);

            const res = await axios.delete(`/api/testimonial/${id}`, {
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
            fetchReviews();
        }
    };


    return (
        <div className="backdrop-blur-lg bg-white/5 border-white/10 shadow-2xl rounded-2xl border hover:bg-white/8 transition-all duration-300 hover:scale-105">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div
                            className={`w-16 h-16 flex justify-center items-center p-1 rounded-xl border`}
                            style={{
                                backgroundColor: review.color,
                                borderColor: review.color
                            }}
                        >
                            {
                                review.image ? <Image
                                    width={500}
                                    height={500}
                                    src={review.image}
                                    alt={review.name}
                                    className={`w-full object-cover rounded-md`}
                                /> : <div className="w-full h-full flex justify-center items-center">
                                        <p className="text-xl font-semibold mix-blend-difference">{review.name?.charAt(0).toUpperCase()}</p>
                                </div>
                            }
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl text-gray-200 mb-1">{review.name}</h3>
                            <div className="flex items-center justify-start gap-2">
                                <FaStar className="text-xl text-amber-400" />
                                <p>{review.rating?.toFixed(1)}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        onClick={() => handleDelete(review._id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <FaTrash className="w-4 h-4" />
                    </button>
                </div>

                {/* company */}
                <div className="mb-3">
                    <label className="block text-sm text-gray-400 mb-2">Company</label>
                    <div
                        className="bg-white/5 rounded-lg p-3 border border-white/10 text-gray-300 prose prose-invert prose-sm max-w-none"
                    >
                        <p>{review.company}</p>
                    </div>
                </div>

                {/* position */}
                <div className="mb-3">
                    <label className="block text-sm text-gray-400 mb-2">Position</label>
                    <div
                        className="bg-white/5 rounded-lg p-3 border border-white/10 text-gray-300 prose prose-invert prose-sm max-w-none"
                    >
                        <p>{review.position}</p>
                    </div>
                </div>

                {/* Project Type */}
                <div className="mb-3">
                    <label className="block text-sm text-gray-400 mb-2">Project Type</label>
                    <div
                        className="bg-white/5 rounded-lg p-3 border border-white/10 text-gray-300 prose prose-invert prose-sm max-w-none"
                    >
                        <p>{review.projectType}</p>
                    </div>
                </div>

                {/* Comment */}
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Comment</label>
                    <div
                        className="bg-white/5 rounded-lg p-4 border border-white/10 text-gray-300 prose prose-invert prose-sm max-w-none"
                    >
                        <p>{review.quote}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;