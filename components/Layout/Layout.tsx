"use client";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import Header from "../Headers/Header";
import Footer from "../Footer/Footer";
import { ContextApi } from "@/Context/Context";
import SignIn from "../Account/SignIn";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const { userInformation, isLoading } = useContext<any>(ContextApi);
    return (
        <div className="w-full overflow-x-hidden">
            <Toaster
                toastOptions={{
                    duration: 3000,
                    style: {
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#fff',
                        background: 'rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    }
                }}
            />
            {
                pathname.startsWith("/admin") ? (
                    <div className="w-full min-h-screen">
                        {
                            isLoading ? (
                                <div className="w-full min-h-screen flex items-center justify-center">
                                    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin duration-1000"></div>
                                </div>
                            ) :
                            userInformation?.uid ? (
                                children
                            ) : <SignIn />
                        }
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