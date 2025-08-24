"use client";

import React, { useContext, useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes, FaUpload } from 'react-icons/fa';
import RichTextEditor from './RichTextEditor';
import parse from 'html-react-parser';
import Image from 'next/image';
import axios from 'axios';
import { ContextApi } from '@/Context/Context';
import toast from 'react-hot-toast';

interface Service {
    _id: string;
    icon: string;
    title: string;
    description: string;
    features: string[];
    technology: string[];
    gallery: string[];
}

interface ServiceCardProps {
    service: Service;
    fetchServices: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, fetchServices }) => {
    const { userInformation } = useContext<any>(ContextApi);
    const [loading, setLoading] = useState(false);
    const currentData = service;

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        try {
            setLoading(true);

            const res = await axios.delete(`/api/services/${id}`, {
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
            fetchServices();
        }
    }

    return (
        <div className="backdrop-blur-lg bg-white/5 border-white/10 shadow-2xl rounded-2xl border hover:bg-white/8 transition-all duration-300">
            <div className="p-6">
                {/* Service Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">

                        <Image
                            width={500}
                            height={500}
                            src={service.icon}
                            alt={service.title}
                            className="w-16 h-16 rounded-xl object-cover border border-white/20"
                        />

                        <div className="flex-1">

                            <h3 className="text-xl text-gray-200 mb-1">{service.title}</h3>
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <button
                            disabled={loading}
                            onClick={() => handleDelete(service._id)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        >
                            <FaTrash className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Description</label>

                    <div
                        className="bg-white/5 rounded-lg p-4 border border-white/10 text-gray-300 prose prose-invert prose-sm max-w-none"
                    >
                        {parse(service.description)}
                    </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Features</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {(currentData.features || []).map((feature, index) => (
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
                        {(currentData.technology || []).map((tech, index) => (
                            <div key={index} className="flex items-center bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                                <span>{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gallery */}
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Gallery</label>
                    <div className="grid grid-cols-3 gap-3">
                        {(service.gallery || []).map((image, index) => (
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
        </div>
    );
};

export default ServiceCard;