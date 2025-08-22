"use client";

import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes, FaUpload } from 'react-icons/fa';
import RichTextEditor from './RichTextEditor';
import parse from 'html-react-parser';
import Image from 'next/image';

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
    onUpdate?: (id: string, data: Partial<Service>) => void;
    onDelete?: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<Partial<Service>>({});

    const handleEdit = () => {
        setIsEditing(true);
        setEditData(service);
    };

    const handleSave = () => {
        // onUpdate(service._id, editData);
        setIsEditing(false);
        setEditData({});
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData({});
    };

    const addFeature = (value: string) => {
        if (!value.trim()) return;
        setEditData(prev => ({
            ...prev,
            features: [...(prev.features || []), value.trim()]
        }));
    };

    const removeFeature = (index: number) => {
        setEditData(prev => ({
            ...prev,
            features: prev.features?.filter((_, i) => i !== index) || []
        }));
    };

    const addTechnology = (value: string) => {
        if (!value.trim()) return;
        setEditData(prev => ({
            ...prev,
            technology: [...(prev.technology || []), value.trim()]
        }));
    };

    const removeTechnology = (index: number) => {
        setEditData(prev => ({
            ...prev,
            technology: prev.technology?.filter((_, i) => i !== index) || []
        }));
    };

    const currentData = isEditing ? editData : service;

    return (
        <div className="backdrop-blur-lg bg-white/5 border-white/10 shadow-2xl rounded-2xl border hover:bg-white/8 transition-all duration-300">
            <div className="p-6">
                {/* Service Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        {isEditing ? (
                            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center border-2 border-dashed border-white/20">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id={`icon-${service._id}`}
                                />
                                <label htmlFor={`icon-${service._id}`} className="cursor-pointer">
                                    <FaUpload className="w-6 h-6 text-gray-400" />
                                </label>
                            </div>
                        ) : (
                            <Image
                                width={500}
                                height={500}
                                src={service.icon}
                                alt={service.title}
                                className="w-16 h-16 rounded-xl object-cover border border-white/20"
                            />
                        )}

                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={currentData.title || ''}
                                    onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/15"
                                    placeholder="Service title"
                                />
                            ) : (
                                <h3 className="text-xl text-gray-200 mb-1">{service.title}</h3>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        {!isEditing ? (
                            <>
                                <button
                                    onClick={handleEdit}
                                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                >
                                    <FaEdit className="w-4 h-4" />
                                </button>
                                <button
                                    // onClick={() => onDelete(service._id)}
                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <FaTrash className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition-colors"
                                >
                                    <FaSave className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <FaTimes className="w-4 h-4" />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Description</label>
                    {isEditing ? (
                        <RichTextEditor
                            value={currentData.description || ''}
                            onChange={(value: any) => setEditData(prev => ({ ...prev, description: value }))}
                            placeholder="Enter service description..."
                        />
                    ) : (
                        <div
                            className="bg-white/5 rounded-lg p-4 border border-white/10 text-gray-300 prose prose-invert prose-sm max-w-none"
                        >
                            {parse(service.description)}
                        </div>
                    )}
                </div>

                {/* Features */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Features</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {(currentData.features || []).map((feature, index) => (
                            <div key={index} className="flex items-center bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                                <span>{feature}</span>
                                {isEditing && (
                                    <button
                                        onClick={() => removeFeature(index)}
                                        className="ml-2 text-blue-200 hover:text-red-300"
                                    >
                                        <FaTimes className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {isEditing && (
                        <input
                            type="text"
                            placeholder="Add feature and press Enter"
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:border-blue-400/50"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    addFeature(e.currentTarget.value);
                                    e.currentTarget.value = '';
                                }
                            }}
                        />
                    )}
                </div>

                {/* Technology */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Technology</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {(currentData.technology || []).map((tech, index) => (
                            <div key={index} className="flex items-center bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                                <span>{tech}</span>
                                {isEditing && (
                                    <button
                                        onClick={() => removeTechnology(index)}
                                        className="ml-2 text-purple-200 hover:text-red-300"
                                    >
                                        <FaTimes className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {isEditing && (
                        <input
                            type="text"
                            placeholder="Add technology and press Enter"
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:border-purple-400/50"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    addTechnology(e.currentTarget.value);
                                    e.currentTarget.value = '';
                                }
                            }}
                        />
                    )}
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