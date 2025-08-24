"use client";

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import ServiceCard from './ServiceCard';
import AddServiceModal from './AddServiceModal';
import { ContextApi } from '@/Context/Context';

const AdminServices = () => {
    const [services, setServices] = useState<any[]>([]);
    const { userInformation } = useContext<any>(ContextApi);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    console.log(error)
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchServices = async () => {
        setLoading(true);
        const res = await axios.get('/api/services');

        if (res.data) {
            setServices(res.data);
            setError(null);
        } else {
            setError('Failed to fetch services');
            setServices([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchServices();
    }, []);

    if (loading) {
        return (
            <div className="dark min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center">
                <div className="flex items-center space-x-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-to-r from-blue-400 to-purple-500"></div>
                    <span className="text-lg text-gray-200">Loading services...</span>
                </div>
            </div>
        );
    }

    return (
        <div className='p-6'>
            {/* Header */}
            <div className="w-full mb-8">
                <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent pb-2">
                                Services Management
                            </h1>
                            <p className="text-gray-400">Manage your services portfolio</p>
                        </div>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                        >
                            <FaPlus className="w-4 h-4" />
                            <span>Add New Service</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                {services.map((service) => (
                    <ServiceCard
                        fetchServices={fetchServices}
                        key={service._id}
                        service={service}
                    />
                ))}

                {services.length === 0 && !loading && (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-4">
                            <FaPlus className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl text-gray-400 mb-2">No services yet</h3>
                        <p className="text-gray-500 mb-6">Get started by adding your first service</p>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg cursor-pointer"
                        >
                            Add Your First Service
                        </button>
                    </div>
                )}
            </div>

            {/* Add Service Modal */}
            <AddServiceModal
                fetchServices={fetchServices}
                userInformation={userInformation}
                show={showAddForm}
                onClose={() => setShowAddForm(false)}
            />
        </div>
    )
}

export default AdminServices