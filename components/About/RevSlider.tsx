"use client";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuChevronRight, LuChevronLeft, LuQuote, LuStar } from "react-icons/lu";

const RevSlider = () => {
    const clientTestimonials = [
        {
            id: 1,
            name: "Sarah Chen",
            position: "Product Manager",
            company: "TechFlow Inc.",
            image: "https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwaGVhZHNob3R8ZW58MXx8fHwxNzU1NzAyMjE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
            quote: "Alex transformed our vision into a reality that exceeded all expectations. His attention to detail and innovative approach helped us launch a product that our users absolutely love.",
            rating: 5,
            projectType: "E-commerce Platform"
        },
        {
            id: 2,
            name: "Michael Rodriguez",
            position: "CEO",
            company: "StartupLab",
            image: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NTcwMjIxNnww&ixlib=rb-4.1.0&q=80&w=1080",
            quote: "Working with Alex was a game-changer for our startup. He didn't just build our app—he helped us understand our users better and created something truly innovative.",
            rating: 5,
            projectType: "Mobile Application"
        },
        {
            id: 3,
            name: "Emily Watson",
            position: "Marketing Director",
            company: "Creative Agency",
            image: "https://images.unsplash.com/photo-1738750908048-14200459c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0JTIwY2xpZW50fGVufDF8fHx8MTc1NTcxNzI1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
            quote: "Alex has an incredible ability to translate complex requirements into elegant solutions. His professionalism and expertise made our project a tremendous success.",
            rating: 5,
            projectType: "Web Development"
        },
        {
            id: 4,
            name: "David Kim",
            position: "CTO",
            company: "InnovateCorp",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1NTcwMjIxNnww&ixlib=rb-4.1.0&q=80&w=1080",
            quote: "Alex's technical expertise and creative problem-solving skills helped us overcome challenges we thought were impossible. He's truly a master of his craft.",
            rating: 5,
            projectType: "AI Integration"
        }
    ];


    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-advance testimonials
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % clientTestimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const currentTestimonial = clientTestimonials[currentIndex];

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % clientTestimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + clientTestimonials.length) % clientTestimonials.length);
    };

    const goToTestimonial = (index: number) => {
        setCurrentIndex(index);
    };
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 relative overflow-hidden min-h-[400px] rounded-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full"></div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        {/* Client Photo */}
                        <div className="flex items-center mb-6">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden">
                                    <Image
                                        width={100}
                                        height={100}
                                        src={currentTestimonial.image}
                                        alt={currentTestimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full p-2">
                                    <LuQuote className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-white text-lg">{currentTestimonial.name}</h4>
                                <p className="text-gray-400 text-sm">{currentTestimonial.position}</p>
                                <p className="text-blue-400 text-sm">{currentTestimonial.company}</p>
                            </div>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex items-center mb-6">
                            {[...Array(currentTestimonial.rating)].map((_, i) => (
                                <LuStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                            <span className="ml-3 text-gray-400 text-sm">
                                {currentTestimonial.projectType}
                            </span>
                        </div>

                        {/* Testimonial Quote */}
                        <blockquote className="text-lg text-gray-300 leading-relaxed italic mb-6">
                            "{currentTestimonial.quote}"
                        </blockquote>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between mt-8">
                    <div className="flex gap-2">
                        {clientTestimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToTestimonial(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-blue-500 w-8'
                                    : 'bg-white/20 hover:bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={prevTestimonial}
                            className="border-white/20 text-white hover:bg-white/10 w-10 h-10 p-0 flex justify-center items-center rounded-xl cursor-pointer"
                        >
                            <LuChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="border-white/20 text-white hover:bg-white/10 w-10 h-10 p-0 flex justify-center items-center rounded-xl cursor-pointer"
                        >
                            <LuChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default RevSlider;