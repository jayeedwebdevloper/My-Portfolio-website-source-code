"use client";

import React, { useState } from 'react';
import { FaTimes, FaImage } from 'react-icons/fa';
import RichTextEditor from './RichTextEditor';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';


interface AddServiceModalProps {
    show: boolean;
    onClose: () => void;
    userInformation: any;
    fetchServices: () => void;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
    show,
    onClose,
    userInformation,
    fetchServices
}) => {
    const [iconUrl, setIconUrl] = useState<string | null>(null);
    const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
    const [features, setFeatures] = useState<string[]>([]);
    const [technology, setTechnology] = useState<string[]>([]);
    const [description, setDescription] = useState<string>('');
    
    const addFeature = (value: string) => {
        if (!value.trim()) return;
        setFeatures((prev) => [...prev, value.trim()]);
    };

    const removeFeature = (index: number) => {
        setFeatures((prev) => prev.filter((_, i) => i !== index));
    };

    const addTechnology = (value: string) => {
        if (!value.trim()) return;
        setTechnology((prev) => [...prev, value.trim()])
    };

    const removeTechnology = (index: number) => {
        setTechnology((prev) => prev.filter((_, i) => i !== index))
    };

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

    const handleFileUpload = async (files: FileList | null, type: "icon" | "gallery") => {
        if (!files) return;

        // For single icon
        if (type === "icon") {
            const file = files[0];
            const url = await uploadToServer(file);
            console.log(url)
            setIconUrl(url);
        }

        // For gallery (multiple)
        else {
            const fileArray = Array.from(files);
            const uploadedUrls: string[] = [];

            for (const file of fileArray) {
                const url = await uploadToServer(file);
                uploadedUrls.push(url);
            }

            setGalleryUrls((prev) => [...prev, ...uploadedUrls]);
        }
    };

    const removeGalleryImage = async (index: number) => {
        try {
            const urlToRemove = galleryUrls[index];
            
            if (!urlToRemove) return;
            const filename = urlToRemove.split("/").pop();
            
            if (!filename) return;
            await axios.delete(`/api/photos/${filename}`, {
                headers: {
                    "x-uid": userInformation.uid,
                }
            });
            setGalleryUrls((prev) => prev.filter((_, i) => i !== index));
        } catch (err) {
            console.error("Failed to delete image", err);
        }
    };

    const handleAddService = async (e: React.FormEvent) => { 
        e.preventDefault();
        
        if (!iconUrl) {
            toast.error("Please upload a service icon.");
            return;
        }

        const form = e.target as HTMLFormElement;
        const titleInput = form.elements.namedItem("title") as HTMLInputElement;
        const title = titleInput.value.trim();

        if (!title) {
            toast.error("Please enter a service title.");
            return;
        }

        const newService = {
            title,
            description,
            icon: iconUrl,
            features,
            technology,
            gallery: galleryUrls,
        };

        try {
            await axios.post('/api/services', newService, {
                headers: {
                    "x-uid": userInformation.uid,
                }
            });

            // Reset form
            setIconUrl(null);
            fetchServices();
            setGalleryUrls([]);
            setFeatures([]);
            setTechnology([]);
            setDescription('');
            form.reset();
            onClose();
            toast.success("Service added successfully!");
        } catch (err) {
            console.error("Failed to add service", err);
            toast.error("Failed to add service. Please try again.");
        }
    }

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <form onSubmit={handleAddService} className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Add New Service
                    </h2>
                    <button
                        type='button'
                        onClick={onClose}
                        className="text-gray-400 hover:text-white p-2 cursor-pointer"
                    >
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>

                {/* Icon Upload */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Service Icon</label>
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center border-2 border-dashed border-white/20">
                            {iconUrl ? (
                                <Image
                                    width={500}
                                    height={500}
                                    src={iconUrl}
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
                            onChange={(e) => handleFileUpload(e.target.files, 'icon')}
                            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-500/20 file:text-blue-300"
                        />
                    </div>
                </div>

                {/* Title */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Title</label>
                    <input
                        type="text"
                        name='title'
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:border-blue-400/50"
                        placeholder="Service title"
                    />
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Description</label>
                    <RichTextEditor
                        value={description || ''}
                        onChange={(value) => setDescription(value)}
                        placeholder="Enter service description..."
                    />
                </div>

                {/* Features */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Features</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {features?.map((feature, index) => (
                            <div key={index} className="flex items-center bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                                <span>{feature}</span>
                                <button
                                    type='button'
                                    onClick={() => removeFeature(index)}
                                    className="ml-2 text-blue-200 hover:text-red-300"
                                >
                                    <FaTimes className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Add feature and press Enter"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:border-blue-400/50"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                const value = e.currentTarget.value.trim();
                                if (value) {
                                    addFeature(value);
                                    e.currentTarget.value = "";
                                }
                            }
                        }}
                    />
                </div>

                {/* Technology */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Technology</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {technology?.map((tech, index) => (
                            <div key={index} className="flex items-center bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                                <span>{tech}</span>
                                <button
                                    type='button'
                                    onClick={() => removeTechnology(index)}
                                    className="ml-2 text-purple-200 hover:text-red-300"
                                >
                                    <FaTimes className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Add technology and press Enter"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:border-purple-400/50"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addTechnology(e.currentTarget.value);
                                e.currentTarget.value = '';
                            }
                        }}
                    />
                </div>

                {/* Gallery Upload */}
                <div className="mb-8">
                    <label className="block text-sm text-gray-400 mb-2">Gallery Images</label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {galleryUrls?.map((file, index) => (
                            <div key={index} className="relative">
                                <Image
                                    width={800}
                                    height={800}
                                    src={file}
                                    alt={`Gallery ${index + 1}`}
                                    className="aspect-video object-cover rounded-lg border border-white/20"
                                />
                                <button
                                    type='button'
                                    onClick={() => removeGalleryImage(index)}
                                    className="absolute top-2 right-2 bg-red-500/80 text-white p-1 rounded-full hover:bg-red-600 cursor-pointer"
                                >
                                    <FaTimes className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileUpload(e.target.files, 'gallery')}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-green-500/20 file:text-green-300"
                    />
                </div>

                {/* Form Actions */}
                <div className="flex space-x-4">
                    <button
                        type='submit'
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg cursor-pointer"
                    >
                        Create Service
                    </button>
                    <button
                        type='button'
                        onClick={onClose}
                        className="px-6 py-3 bg-white/10 text-gray-300 rounded-xl hover:bg-white/20 transition-colors border border-white/20 cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddServiceModal;