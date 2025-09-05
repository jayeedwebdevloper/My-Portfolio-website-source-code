"use client";
import axios from "axios";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuChevronRight, LuChevronLeft, LuQuote, LuStar } from "react-icons/lu";

interface Reviews {
    _id: string;
    name: string;
    position: string;
    company: string;
    image: string;
    quote: string;
    rating: number;
    projectType: string;
    color: string;
}

const RevSlider = () => {
    const [clientTestimonials, setClientTestimonials] = useState<Reviews[]>([]);
    const fetchTestimonial = async () => {
        try {
            const res = await axios.get("/api/testimonial");
            if (res.data) {
                setClientTestimonials(res.data);
            } else {
                setClientTestimonials([]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTestimonial();
    }, [])

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-advance testimonials
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % clientTestimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, clientTestimonials.length]);

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
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 relative overflow-hidden min-h-[400px] rounded-2xl flex justify-between flex-col">
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
                                    {
                                        currentTestimonial?.image ? <Image
                                            width={500}
                                            height={500}
                                            src={currentTestimonial.image}
                                            alt={currentTestimonial.name}
                                            className={`w-full h-full object-cover`}
                                        /> : <div className="w-full h-full flex justify-center items-center" style={{
                                            backgroundColor: currentTestimonial?.color
                                        }}>
                                            <p className="text-xl font-semibold mix-blend-difference">{currentTestimonial?.name?.charAt(0).toUpperCase()}</p>
                                        </div>
                                    }
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full p-2">
                                    <LuQuote className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-white text-lg">{currentTestimonial?.name}</h4>
                                <p className="text-gray-400 text-sm">{currentTestimonial?.position}</p>
                                <p className="text-blue-400 text-sm">{currentTestimonial?.company}</p>
                            </div>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex items-center mb-6">
                            {[...Array(currentTestimonial?.rating)].map((_, i) => (
                                <LuStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                            <span className="ml-3 text-gray-400 text-sm">
                                {currentTestimonial?.projectType}
                            </span>
                        </div>

                        {/* Testimonial Quote */}
                        <blockquote className="text-lg text-gray-300 leading-relaxed italic mb-6">
                            "{currentTestimonial?.quote}"
                        </blockquote>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between mt-8">
                    <div className="flex gap-2">
                        {clientTestimonials?.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToTestimonial(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
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