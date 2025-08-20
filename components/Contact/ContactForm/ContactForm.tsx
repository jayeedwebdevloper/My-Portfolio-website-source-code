"use client";
import { motion } from "motion/react";
import { LuBrain, LuSend, LuSparkles, LuZap } from "react-icons/lu";

const ContactForm = () => {
    const aiFeatures = [
        "Free AI consultation & strategy session",
        "24/7 AI-powered project support",
        "Intelligent development process automation",
        "Post-launch AI optimization & monitoring"
    ];
    return (
        <div className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <motion.div
                    className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div
                        className="bg-white/5 backdrop-blur-xl border border-white/20 mb-6 px-6 py-2 flex justify-center items-center w-[220px] mx-auto rounded-full text-white shadow-lg"
                    >
                        <LuBrain className="w-4 h-4 mr-2 text-purple-400" />
                        Contact Us
                    </div>
                    <h2 className="text-5xl lg:text-6xl mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                        Let's Build Full-Stack Magic Together
                    </h2>
                    <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        Ready to transform your ideas into intelligent reality? Connect with our development experts
                        and let's create something extraordinary with cutting-edge technology.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Enhanced Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 relative overflow-hidden rounded-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-full"></div>

                            <div className="mb-8">
                                <h3 className="text-3xl text-white mb-3 flex items-center">
                                    <LuSparkles className="w-8 h-8 mr-3 text-cyan-400" />
                                    Start Your Journey
                                </h3>
                                <p className="text-gray-400">
                                    Tell us about your vision and we'll craft an intelligent solution or your question.
                                </p>
                            </div>

                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <label className="block text-sm text-gray-300 mb-2">First Name</label>
                                        <input
                                            placeholder="John"
                                            className="backdrop-blur-sm border-white/20 focus:border-cyan-500 transition-all duration-300 text-white placeholder:text-gray-500 w-full border-input flex h-12 min-w-0 rounded-md border px-3 py-1 text-base bg-[#2F3643] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-[#ffffff2a] focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                                        />
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <label className="block text-sm text-gray-300 mb-2">Last Name</label>
                                        <input
                                            placeholder="Doe"
                                            className="backdrop-blur-sm border-white/20 focus:border-cyan-500 transition-all duration-300 text-white placeholder:text-gray-500 w-full border-input flex h-12 min-w-0 rounded-md border px-3 py-1 text-base bg-[#2F3643] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-[#ffffff2a] focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                                        />
                                    </motion.div>
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <label className="block text-sm text-gray-300 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@company.com"
                                        className="backdrop-blur-sm border-white/20 focus:border-cyan-500 transition-all duration-300 text-white placeholder:text-gray-500 w-full border-input flex h-12 min-w-0 rounded-md border px-3 py-1 text-base bg-[#2F3643] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-[#ffffff2a] focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                                    />
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <label className="block text-sm text-gray-300 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Topic of Discussion"
                                        className="backdrop-blur-sm border-white/20 focus:border-cyan-500 transition-all duration-300 text-white placeholder:text-gray-500 w-full border-input flex h-12 min-w-0 rounded-md border px-3 py-1 text-base bg-[#2F3643] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-[#ffffff2a] focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                                    />
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <label className="block text-sm text-gray-300 mb-2">Message</label>
                                    <textarea
                                        placeholder="Describe your AI project vision, specific requirements, and how you envision AI enhancing your solution..."
                                        rows={4}
                                        className="backdrop-blur-sm border-white/20 focus:border-cyan-500 transition-all duration-300 text-white placeholder:text-gray-500 w-full border-input flex h-30 min-w-0 rounded-md border px-3 py-1 text-base bg-[#2F3643] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-[#ffffff2a] focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mb-8"
                                    />
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-purple-500/25 flex justify-between px-4 py-4 rounded-2xl cursor-pointer"
                                    >
                                        <LuSend className="w-5 h-5 mr-2" />
                                        Launch Message
                                        <LuZap className="w-5 h-5 ml-2" />
                                    </button>
                                </motion.div>
                            </form>
                        </div>
                    </motion.div>

                    {/* Enhanced Contact Info */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
                            <h3 className="text-2xl text-white mb-6 flex items-center">
                                <LuBrain className="w-6 h-6 mr-3 text-purple-400" />
                                Contact Personally
                            </h3>
                            <div className="space-y-6">
                                <motion.div
                                    className="flex items-start space-x-4 group"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0 * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        {/* <info.icon className="w-6 h-6 text-white" /> */}
                                    </div>
                                    <div>
                                        <h4 className="text-white mb-1">Email</h4>
                                        <p className="text-cyan-400 mb-1">email</p>
                                        <p className="text-sm text-gray-400">Intelligent email routing & AI responses</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="flex items-start space-x-4 group"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1 * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        {/* <info.icon className="w-6 h-6 text-white" /> */}
                                    </div>
                                    <div>
                                        <h4 className="text-white mb-1">phone</h4>
                                        <p className="text-cyan-400 mb-1">email</p>
                                        <p className="text-sm text-gray-400">Intelligent email routing & AI responses</p>
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="flex items-start space-x-4 group"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 2 * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        {/* <info.icon className="w-6 h-6 text-white" /> */}
                                    </div>
                                    <div>
                                        <h4 className="text-white mb-1">phone</h4>
                                        <p className="text-cyan-400 mb-1">email</p>
                                        <p className="text-sm text-gray-400">Intelligent email routing & AI responses</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
                            <h3 className="text-xl text-white mb-6 flex items-center">
                                <LuZap className="w-5 h-5 mr-2 text-yellow-400" />
                                Why Choose Our AI Services?
                            </h3>
                            <div className="space-y-4">
                                {aiFeatures.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center space-x-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex-shrink-0"></div>
                                        <span className="text-sm text-gray-300">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;