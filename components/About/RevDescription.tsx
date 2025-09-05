"use client";
import { motion } from "motion/react";
import { LuMessageCircle, LuQuote, LuStar } from "react-icons/lu";

const RevDescription = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
        >
            <h3 className="text-3xl text-white mb-8">Building Lasting Relationships</h3>

            <div className="space-y-6 w-full">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 rounded-2xl">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-3 flex-shrink-0">
                            <LuMessageCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h4 className="text-lg text-white mb-2">Clear Communication</h4>
                            <p className="text-gray-400 leading-relaxed">
                                I believe in transparent, regular communication throughout every project. My clients always know where we stand and what comes next.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 rounded-2xl">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-3 flex-shrink-0">
                            <LuStar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h4 className="text-lg text-white mb-2">Exceeding Expectations</h4>
                            <p className="text-gray-400 leading-relaxed">
                                I don't just deliver what's asked for—I deliver what's needed. Often this means going above and beyond to create something truly exceptional.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 rounded-2xl">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-3 flex-shrink-0">
                            <LuQuote className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h4 className="text-lg text-white mb-2">Long-term Partnership</h4>
                            <p className="text-gray-400 leading-relaxed">
                                Many of my relationships with clients extend far beyond a single project. I'm committed to being a trusted technology partner for the long haul.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                    <div className="text-2xl text-white mb-1">5.0</div>
                    <div className="text-sm text-gray-400">Average Rating</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl text-white mb-1">100%</div>
                    <div className="text-sm text-gray-400">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl text-white mb-1">95%</div>
                    <div className="text-sm text-gray-400">Repeat Clients</div>
                </div>
            </div>
        </motion.div>
    );
};

export default RevDescription;