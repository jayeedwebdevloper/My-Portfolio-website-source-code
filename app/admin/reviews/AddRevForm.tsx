"use client";

import { ContextApi } from "@/Context/Context";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { FaImage, FaStar } from "react-icons/fa6";

interface Props {
    fetchReviews: () => void;
    show: boolean;
    onClose: () => void;
}

const AddRevForm: FC<Props> = ({ fetchReviews, show, onClose }) => {
    const { userInformation } = useContext<any>(ContextApi);
    const [image, setImage] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const [color, setColor] = useState<string>("");

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
            setImage(url);
        } catch (error) {
            console.log(error);
            toast.error("Upload Failed")
        } finally {
            setLoading(false);
        }
    };

    const handleAddReview = async (e: FormEvent) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const name = form.elements.namedItem("name") as HTMLInputElement;
        const projectType = form.elements.namedItem("projectType") as HTMLInputElement;
        const position = form.elements.namedItem("position") as HTMLInputElement;
        const company = form.elements.namedItem("company") as HTMLInputElement;
        const quote = form.elements.namedItem("quote") as HTMLInputElement;
        const nameInput = name.value.trim();
        const projectTypeInput = projectType.value.trim();
        const positionInput = position.value.trim();
        const companyInput = company.value.trim();
        const quoteInput = quote.value.trim();

        const dataToSend = {
            name: nameInput,
            quote: quoteInput,
            image,
            position: positionInput,
            company: companyInput,
            projectType: projectTypeInput,
            rating,
            color
        }

        try {
            const res = await axios.post("/api/testimonial", dataToSend, {
                headers: {
                    "x-uid": userInformation.uid,
                }
            });

            if (res.data) {
                form.reset();
                setImage("");
                setColor("");
                toast.success("Review is added");
                onClose();
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed")
        } finally {
            setLoading(false);
            fetchReviews();
        }
    }

    if (!show) return null;

    return (
        <form onSubmit={handleAddReview} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Add New Review
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
                    <label className="block text-sm text-gray-400 mb-2">Client Photo</label>
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center border-2 border-dashed border-white/20">
                            {image ? (
                                <Image
                                    width={300}
                                    height={300}
                                    src={image}
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

                        <input
                            type="color"
                            name="color"
                            id="color"
                            value={color}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setColor(e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-lg w-12 h-12 cursor-pointer px-1 py-px"
                        />
                    </div>
                </div>

                {/* Name */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:border-blue-400/50"
                        placeholder="Jhon doe"
                    />
                </div>

                {/* Position */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Position</label>
                    <input
                        type="text"
                        name="position"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:border-blue-400/50"
                        placeholder="Manager"
                    />
                </div>

                {/* Company */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Company</label>
                    <input
                        type="text"
                        name="company"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:border-blue-400/50"
                        placeholder="Manager"
                    />
                </div>

                {/* Project Type */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Project Type</label>
                    <input
                        type="text"
                        name="projectType"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:border-blue-400/50"
                        placeholder="Mobile App"
                    />
                </div>

                {/* quote */}
                <div className="mb-8">
                    <label className="block text-sm text-gray-400 mb-2">Comment</label>
                    <textarea name="quote" className="border border-white/20 rounded-lg bg-white/10 min-h-[120px] w-full p-4 text-gray-200 focus:outline-none prose prose-invert prose-sm max-w-none" placeholder="Comment...."></textarea>
                </div>

                <div className="flex space-x-1 mb-5">
                    {[...Array(5)].map((_, index) => {
                        const current = index + 1;
                        return (
                            <button
                                key={current}
                                type="button"
                                onClick={() => setRating(current)}
                                onMouseEnter={() => setHover(current)}
                                onMouseLeave={() => setHover(rating)}
                                className="focus:outline-none"
                            >
                                <FaStar
                                    className={`w-8 h-8 transition-colors duration-200 ${current <= (hover || rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                        }`}
                                />
                            </button>
                        );
                    })}
                    <span className="ml-2 text-sm text-gray-500">{rating} / 5</span>
                </div>

                {/* Form Actions */}
                <div className="flex space-x-4">
                    <button
                        disabled={loading}
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                    >
                        Add Review
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

export default AddRevForm;