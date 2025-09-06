"use client";

import axios from "axios";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { LuBrain, LuFacebook, LuGithub, LuLinkedin, LuMail, LuSparkles, LuZap } from "react-icons/lu";

interface Information {
    email: string;
    phone: string;
    fiverr: string;
    whatsApp: string;
    facebook: string;
    github: string;
    linkedIn: string;
}

const Footer = () => {
    const [information, setInformation] = useState<Information>({
        email: "",
        phone: "",
        fiverr: "",
        whatsApp: "",
        facebook: "",
        github: "",
        linkedIn: ""
    });


    const fetchInformation = async () => {
        try {
            const res = await axios.get('/api/information');
            if (res.data) {
                setInformation(res.data[0]);
            } else {
                setInformation({
                    email: "",
                    phone: "",
                    fiverr: "",
                    whatsApp: "",
                    facebook: "",
                    github: "",
                    linkedIn: ""
                });
            }
        } catch (error) {
            console.log(error)
        }
    };

    const socialLinks = [
        { icon: LuGithub, href: information.github, label: "GitHub", color: "hover:text-gray-300" },
        { icon: LuFacebook, href: information.facebook, label: "Facebook", color: "hover:text-blue-400" },
        { icon: LuLinkedin, href: information.linkedIn, label: "LinkedIn", color: "hover:text-blue-600" },
        { icon: LuMail, href: `mailto:${information.email}`, label: "Email", color: "hover:text-purple-400" },
    ];

    const [footerItems, setFooterItems] = useState<any>({});

    const fetchFooterItems = async () => { 
        try {
            const resServices = await axios.get("/api/services");
            const resTechnologies = await axios.get("/api/techs");
            if (resServices.data || resTechnologies.data) {
                setFooterItems({
                    services: resServices.data || [],
                    technologies: resTechnologies.data || []
                })
            }
        } catch (error) {
            console.error("Error fetching footer items:", error);
        }
    }

    useEffect(() => {
        fetchFooterItems();
        fetchInformation();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative border-t border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 -z-10 opacity-20">
                <motion.div
                    className="absolute top-0 left-20 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-full blur-md"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/5 to-pink-600/5 rounded-full blur-md"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="container mx-auto px-6 py-20">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Enhanced Brand Section */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="cursor-pointer">
                            <motion.div
                                className="flex items-center space-x-3 group"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="relative">
                                    <Image width={110} height={100} src="/images/jayeed.png" alt="web developer, app developer, mobile, android, ios" />
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"
                                        style={{ transform: "translate(-50%, -50%)" }}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                            </motion.div>
                        </Link>

                        <p className="text-gray-400 mb-6 leading-relaxed pt-4">
                            Transforming ideas into intelligent digital solutions with cutting-edge AI technologies,
                            OpenAI integration, and expert development services.
                        </p>

                        <div className="mb-6">
                            <div
                                className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-300 border-purple-400/30 mb-3 rounded-2xl flex justify-center items-center w-[220px] py-2"
                            >
                                <LuBrain className="w-3 h-3 mr-1" />
                                Full Stack Development
                            </div>
                        </div>

                        {/* Enhanced Social Links */}
                        <div className="flex space-x-3">
                            {socialLinks.map((social, index) => (
                                <motion.div
                                    key={social.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                >
                                    <Link
                                        href={social.href}
                                        aria-label={social.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-12 h-12 p-0 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 flex justify-center items-center rounded-2xl ${social.color}`}
                                    >
                                        <social.icon className="w-5 h-5" />

                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Links Sections */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0 * 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-white mb-6 flex items-center gap-2">
                            Our Services <LuBrain className="w-4 h-4 mr-2 text-purple-400" />
                        </h4>
                        <ul className="space-y-3">
                            {footerItems?.services?.map((item:any, index:number) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Link
                                        href={`/services/${item._id}`}
                                        className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block hover:bg-white/5 px-2 py-1 rounded-lg"
                                    >
                                        {item.title}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0 * 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-white mb-6 flex items-center gap-2">
                            Technologies <LuZap className="w-4 h-4 mr-2 text-cyan-400" />
                        </h4>
                        <ul className="space-y-3">
                            {footerItems?.technologies
                                ?.reduce((rows: any[][], item: any, index: number) => {
                                    if (index % 3 === 0) rows.push([item]);
                                    else rows[rows.length - 1].push(item);
                                    return rows;
                                }, [])
                                .map((row:any, rowIndex:number) => (
                                    <motion.li
                                        key={rowIndex}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: rowIndex * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <p className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block hover:bg-white/5 px-2 py-1 rounded-lg">
                                            {row.map((tech: any) => tech.title).join(" , ")}
                                        </p>
                                    </motion.li>
                                ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0 * 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-white mb-6 flex items-center gap-2">
                            Resources <LuSparkles className="w-4 h-4 mr-2 text-amber-400" />
                        </h4>
                        <ul className="space-y-3">
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0 * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    href={`/contact`}
                                    className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block hover:bg-white/5 px-2 py-1 rounded-lg"
                                >
                                    Contact Me
                                </Link>
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0 * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    href={`/about`}
                                    className="text-gray-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-1 inline-block hover:bg-white/5 px-2 py-1 rounded-lg"
                                >
                                    About Me
                                </Link>
                            </motion.li>
                        </ul>
                    </motion.div>
                </div>

                {/* Enhanced Bottom Section */}
                <motion.div
                    className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="text-sm text-gray-400 mb-4 sm:mb-0 text-center sm:text-left">
                        © 2025 Jayeed bin hossain. All rights reserved. Built with Next.js, TypeScript.
                    </div>

                    <div className="flex items-center space-x-4">
                        <motion.div
                            className="rounded-2xl"
                            animate={{
                                boxShadow: [
                                    "0 0 0 0 rgba(34, 197, 94, 0.7)",
                                    "0 0 0 10px rgba(34, 197, 94, 0)",
                                    "0 0 0 0 rgba(34, 197, 94, 0)"
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div
                                className="bg-green-500/20 text-green-300 border-green-400/30 px-4 py-2 rounded-2xl flex items-center text-sm hover:bg-green-500/30 transition-all duration-300"
                            >
                                <LuZap className="w-3 h-3 mr-1" />
                                Available for Projects
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <button
                                onClick={scrollToTop}
                                className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 w-12 h-12 p-0 flex justify-center items-center rounded-xl cursor-pointer"
                            >
                                <FaArrowUp className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;