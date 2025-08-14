"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

interface NavItem {
    navItems: {
        name: string;
        href: string;
        icon?: React.ElementType;
    }[];
}

const DesktopNav = ({ navItems }: NavItem) => {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
                {navItems.map((item, index) => {
                    const isActive = pathname === item.href;

                    return (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                            whileHover="hovered"
                        >
                            <Link
                                href={item.href}
                                className="relative group px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center space-x-2"
                            >
                                {/* Background */}
                                <div
                                    className={`absolute inset-0 rounded-xl z-0 transition-opacity duration-300 ${isActive
                                            ? "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-100"
                                            : "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100"
                                        }`}
                                />

                                {/* Icon + Text */}
                                {item.icon && (
                                    <item.icon className="w-4 h-4 text-gray-300 group-hover:text-white z-10" />
                                )}
                                <span
                                    className={`text-sm z-10 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                </span>

                                {/* Active indicator */}
                                <motion.div
                                    className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 z-10"
                                    style={{ x: "-50%" }}
                                    animate={{
                                        width: isActive ? "2rem" : "0rem",
                                    }}
                                    variants={{
                                        hovered: { width: "2rem" },
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default DesktopNav;