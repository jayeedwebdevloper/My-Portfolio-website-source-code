"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RiHome6Line } from "react-icons/ri";
import { PiInfo } from "react-icons/pi";
import { LuBrain, LuSparkles } from "react-icons/lu";
import { MdOutlineSupportAgent } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import DesktopNav from "./DesktopNav";
import { IoMdClose } from "react-icons/io";
import { HiMiniBars3 } from "react-icons/hi2";
import MobileNav from "./MobileNav";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: "Home", href: "/", icon: RiHome6Line },
        {
            name: "About", href: "/about", icon: PiInfo
        },
        { name: "Services", href: "/services", icon: LuBrain },
        { name: "Projects", href: "/projects", icon: LuSparkles },
        { name: "Contact", href: "/contact", icon: MdOutlineSupportAgent }
    ];

    return (
        <motion.header
            className={
                `fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${scrolled
                    ? 'backdrop-blur-2xl bg-black/30 border-b border-white/20 shadow-2xl shadow-purple-500/10'
                    : 'backdrop-blur-xl bg-black/20 border-b border-white/10'
                }`
            }
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <nav className="container mx-auto px-5 lg:px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="cursor-pointer block pr-4">
                        <motion.div
                            className="flex items-center space-x-3 group"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="relative">
                                <Image width={110} height={100} style={{
                                    width: "auto",
                                    height: 'auto'
                                }} src="/images/jayeed.png" alt="web developer, app developer, mobile, android, ios" />
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"
                                    style={{ transform: "translate(-50%, -50%)" }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </motion.div>
                    </Link>

                    <DesktopNav navItems={navItems} />

                    <motion.div
                        className="md:hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <button
                            className="relative w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 rounded-xl overflow-hidden group flex justify-center items-center text-white"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <IoMdClose className="h-5 w-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <HiMiniBars3 className="h-5 w-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </motion.div>
                </div>

                <MobileNav navItems={navItems} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            </nav>
        </motion.header>
    );
};

export default Header;