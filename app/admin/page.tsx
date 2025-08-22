"use client";

import { ContextApi } from "@/Context/Context";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTimes } from "react-icons/fa";
import { FaCheck, FaEnvelope, FaFacebook, FaPhone, FaWhatsapp } from "react-icons/fa6";
import { SiFiverr } from "react-icons/si";

interface ContactInfo {
    _id: string;
    email: string;
    facebook: string;
    fiverr: string;
    phone: string;
    whatsapp: string;
}

interface EditingState {
    [key: string]: boolean;
}

interface EditValues {
    [key: string]: string;
}

const Dashboard = () => {
    const { userInformation } = useContext(ContextApi);
    const [information, setInformation] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState<EditingState>({});
    const [editValues, setEditValues] = useState<EditValues>({});

    const fetchInformation = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/api/information', {
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_JWT_SECRET
                }
            });

            if (res.data) {
                setInformation(res.data);
            }

        } catch (error) {
            console.error("Error fetching information:", error);
            setInformation([]);
            
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInformation();
    }, []);

    const updateInformation = async (field: string, value: string) => {
        if (!information[0]?._id) return;

        try {
            await axios.patch(`/api/information/${information[0]._id}`, {
                [field]: value
            }, {
                headers: {
                    "x-uid": userInformation.uid
                }
            });

            setInformation(prev => prev.map(info => ({
                ...info,
                [field]: value
            })));

            toast.success("Information updated successfully!");
        } catch (error) {
            console.error("Error updating information:", error);
            toast.error("Failed to update information");
        }
    };

    const handleEdit = (field: string) => {
        setEditing(prev => ({ ...prev, [field]: true }));
        setEditValues(prev => ({ ...prev, [field]: information[0]?.[field as keyof ContactInfo] || '' }));
    };

    const handleCancel = (field: string) => {
        setEditing(prev => ({ ...prev, [field]: false }));
        setEditValues(prev => ({ ...prev, [field]: '' }));
    };

    const handleUpdate = async (field: string) => {
        const value = editValues[field];
        if (value && value !== information[0]?.[field as keyof ContactInfo]) {
            await updateInformation(field, value);
        }
        setEditing(prev => ({ ...prev, [field]: false }));
    };

    const contactFields = [
        {
            key: 'email',
            label: 'Email Address',
            icon: FaEnvelope,
            color: 'from-blue-600 to-purple-700',
            placeholder: 'Enter your email address'
        },
        {
            key: 'phone',
            label: 'Phone Number',
            icon: FaPhone,
            color: 'from-pink-600 to-rose-700',
            placeholder: 'Enter your phone number'
        },
        {
            key: 'facebook',
            label: 'Facebook Profile',
            icon: FaFacebook,
            color: 'from-blue-700 to-indigo-800',
            placeholder: 'Enter your Facebook URL'
        },
        {
            key: 'whatsapp',
            label: 'WhatsApp',
            icon: FaWhatsapp,
            color: 'from-green-600 to-emerald-700',
            placeholder: 'Enter your WhatsApp URL'
        },
        {
            key: 'fiverr',
            label: 'Fiverr Profile',
            icon: SiFiverr,
            color: 'from-green-700 to-teal-800',
            placeholder: 'Enter your Fiverr URL'
        }
    ];

    if (loading) {
        return (
            <div className="dark min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center">
                <div className="flex items-center space-x-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-to-r from-blue-400 to-purple-500"></div>
                    <span className="text-lg text-gray-200">Loading dashboard...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactFields.map((field) => {
                const IconComponent = field.icon;
                const currentValue = information[0]?.[field.key as keyof ContactInfo] || '';
                const isEditing = editing[field.key];
                const editValue = editValues[field.key] || '';

                return (
                    <div key={field.key} className="backdrop-blur-lg bg-white/5 border-white/10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 hover:bg-white/8 rounded-2xl">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-3 rounded-xl bg-gradient-to-r ${field.color} text-white shadow-lg`}>
                                        <IconComponent className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg text-gray-200">{field.label}</h3>
                                </div>

                                {!isEditing ? (
                                    <button
                                        onClick={() => handleEdit(field.key)}
                                        className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg p-2 cursor-pointer"
                                    >
                                        <FaEdit className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleUpdate(field.key)}
                                                className="text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg p-2 cursor-pointer"
                                        >
                                            <FaCheck className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleCancel(field.key)}
                                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg p-2 cursor-pointer"
                                        >
                                            <FaTimes className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="space-y-3">
                                {!isEditing ? (
                                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 min-h-[48px] flex items-center">
                                        {currentValue ? (
                                            <span className="text-gray-300 break-all">{currentValue}</span>
                                        ) : (
                                            <span className="text-gray-500 italic">No {field.label.toLowerCase()} set</span>
                                        )}
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                                        placeholder={field.placeholder}
                                            className="bg-white/10 border-white/20 text-gray-200 placeholder:text-gray-500 focus:bg-white/15 focus:border-blue-400/50 rounded-lg p-3 w-full outline-none transition-all duration-200"
                                        autoFocus
                                    />
                                )}
                            </div>

                            {/* Quick Action Button */}
                            {!isEditing && currentValue && (
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    {field.key === 'email' && (
                                        <button
                                            onClick={() => window.open(`mailto:${currentValue}`, '_blank')}
                                            className="w-full bg-white/5 hover:bg-white/10 border-white/20 text-gray-300 hover:text-white rounded-lg p-2 cursor-pointer"
                                        >
                                            Send Email
                                        </button>
                                    )}
                                    {field.key === 'phone' && (
                                        <button
                                            onClick={() => window.open(`tel:${currentValue}`, '_blank')}
                                            className="w-full bg-white/5 hover:bg-white/10 border-white/20 text-gray-300 hover:text-white rounded-lg p-2 cursor-pointer"
                                        >
                                            Call Now
                                        </button>
                                    )}
                                    {(field.key === 'facebook' || field.key === 'whatsapp' || field.key === 'fiverr') && (
                                        <button
                                            onClick={() => window.open(currentValue, '_blank')}
                                            className="w-full bg-white/5 hover:bg-white/10 border-white/20 text-gray-300 hover:text-white rounded-lg p-2 cursor-pointer"
                                        >
                                            Open Link
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Dashboard