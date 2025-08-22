"use client";
import { ContextApi } from "@/Context/Context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { FiBarChart2 } from "react-icons/fi";
import { GoCodeReview } from "react-icons/go";
import { LuAward, LuBriefcase, LuCode, LuFolderOpen, LuSettings } from "react-icons/lu";

const AdminMenu = () => {
    const pathname = usePathname();
    const {logOutUser} = useContext<any>(ContextApi);

    return (
        <div className="w-full h-screen overflow-y-auto border-r border-white/10 bg-[#161616af] backdrop-blur-xl relative z-10">
            <div className="p-6 border-b border-white/10 ">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-2">
                        <LuSettings className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-white text-lg">Admin Panel</h2>
                        <p className="text-gray-400 text-sm">Content Management</p>
                    </div>
                </div>
            </div>
            <p className="text-gray-400 px-6 py-4 text-sm">Content Management</p>
            <ul className="w-full px-5 space-y-2">
                <li>
                    <Link href="/admin" className={`flex items-center justify-start gap-2 p-2 rounded-xl ${pathname === "/admin" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "text-gray-400 hover:text-white hover:bg-white/10"}`}><FiBarChart2 className="w-5" /> Dashboard</Link>
                </li>
                <li>
                    <Link href="/admin/services" className={`flex items-center justify-start gap-2 p-2 rounded-xl ${pathname === "/admin/services" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "text-gray-400 hover:text-white hover:bg-white/10"}`}><LuBriefcase className="w-5" /> Services</Link>
                </li>
                <li>
                    <Link href="/admin/projects" className={`flex items-center justify-start gap-2 p-2 rounded-xl ${pathname === "/admin/projects" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "text-gray-400 hover:text-white hover:bg-white/10"}`}><LuFolderOpen className="w-5" /> Projects</Link>
                </li>
                <li>
                    <Link href="/admin/reviews" className={`flex items-center justify-start gap-2 p-2 rounded-xl ${pathname === "/admin/reviews" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "text-gray-400 hover:text-white hover:bg-white/10"}`}><GoCodeReview className="w-5" /> Reviews</Link>
                </li>
                <li>
                    <Link href="/admin/tech" className={`flex items-center justify-start gap-2 p-2 rounded-xl ${pathname === "/admin/tech" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "text-gray-400 hover:text-white hover:bg-white/10"}`}><LuCode className="w-5" /> Tech Stack</Link>
                </li>
                <li>
                    <Link href="/admin/skills" className={`flex items-center justify-start gap-2 p-2 rounded-xl ${pathname === "/admin/skills" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "text-gray-400 hover:text-white hover:bg-white/10"}`}><LuAward className="w-5" /> Skills</Link>
                </li>
            </ul>

            <div className="fixed border-t border-white/10 bg-black/10 z-[20] bottom-0 left-0 right-0 p-6">
                <button onClick={() => logOutUser()} className="px-3 py-1 cursor-pointer rounded-lg bg-red-500">Logout</button>
            </div>
        </div>
    );
};

export default AdminMenu;