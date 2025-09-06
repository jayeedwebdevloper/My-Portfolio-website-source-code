"use client";

import { motion, AnimatePresence } from "motion/react";

interface NavItem { 
    isMenuOpen: boolean;
    setIsMenuOpen: (open: boolean) => void;
    navItems: {
        name: string;
        href: string;
        icon?: React.ElementType;
    }[];
}

const MobileNav = ({isMenuOpen, setIsMenuOpen, navItems}:NavItem) => {
    return (
        <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="md:hidden overflow-hidden"
                >
                    <div className="mt-6 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl shadow-purple-500/10">
                        <div className="flex flex-col space-y-3">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    className="group relative flex items-center space-x-3 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 text-gray-300 hover:text-white border border-transparent hover:border-white/20"
                                    onClick={() => setIsMenuOpen(false)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{
                                        opacity: isMenuOpen ? 1 : 0,
                                        x: isMenuOpen ? 0 : -20
                                    }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.icon && (
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                    )}
                                    <span>{item.name}</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileNav;