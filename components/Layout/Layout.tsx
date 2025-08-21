"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "../Headers/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <div className="w-full">
            {
                pathname.startsWith("/admin") ? (
                    <div className="w-full h-screen flex items-center justify-center">
                        <h1 className="text-3xl text-white">Admin Panel</h1>
                        {children}
                    </div>
                ) : (
                    <div className="w-full min-h-screen">
                        <Header />
                        {children}
                        <Footer />
                    </div>
                )
            }
        </div>
    );
};

export default Layout;