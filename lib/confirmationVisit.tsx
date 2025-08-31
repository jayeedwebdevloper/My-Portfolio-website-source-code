"use client";

import { useState } from "react";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

interface ProjectLinkProps {
    link?: string;
    covered?: boolean;
}

export default function ProjectLink({ link, covered }: ProjectLinkProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingLink, setPendingLink] = useState<string | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (covered) {
            e.preventDefault(); // prevent immediate navigation
            setPendingLink(link || null);
            setIsModalOpen(true);
        }
    };

    const handleConfirm = () => {
        if (pendingLink) {
            window.open(pendingLink, "_blank");
            setIsModalOpen(false);
            setPendingLink(null);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setPendingLink(null);
    };

    return (
        <div>
            {link && (
                <Link
                    className="hover:bg-white/10 text-cyan-400 hover:text-cyan-300 p-0 px-3 py-1 text-sm flex items-center border border-cyan-400/30 rounded-lg"
                    href={link}
                    onClick={handleClick}
                >
                    <LuExternalLink className="w-3 h-3 mr-1" />
                    Demo
                </Link>
            )}

            {/* Custom Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                    <div className="bg-gray-900 rounded-xl p-6 max-w-sm w-full text-white">
                        <h3 className="text-lg font-semibold mb-4">18+ Warning</h3>
                        <p className="mb-6">This content is age restricted. Are you sure you want to continue?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 bg-cyan-500 rounded hover:bg-cyan-400"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}