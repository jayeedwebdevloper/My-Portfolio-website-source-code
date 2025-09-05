"use client";
import { motion } from "motion/react";
import { LuMessageCircle } from "react-icons/lu";
import RevSlider from "./RevSlider";
import RevDescription from "./RevDescription";

const Testimonial = () => {
    return (
        <div className="pt-16">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <div
                    className="bg-white/5 backdrop-blur-xl border border-white/20 mb-6 px-6 py-2 rounded-2xl w-fit mx-auto flex justify-center items-center"
                >
                    <LuMessageCircle className="w-4 h-4 mr-2 text-green-400" />
                    <p>Client Testimonials</p>
                </div>
                <h2 className="text-4xl lg:text-5xl text-white mb-6">What Clients Say</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    The relationships I build with clients are just as important as the code I write. Here's what they have to say about working together.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Testimonial Slider Side */}
                <RevSlider />

                {/* Review Description Side */}
                <RevDescription />
            </div>
        </div>
    );
};

export default Testimonial;