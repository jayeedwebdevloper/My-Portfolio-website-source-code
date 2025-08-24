"use client";

import { FaTrash } from "react-icons/fa6";

interface TechStack {
    _id: string;
    icon: string;
    title: string;
    description: string;
}

interface TechStackCardProps {
    techStack: TechStack;
}

const TechStackCard: React.FC<TechStackCardProps> = ({ techStack }) => {
    return (
        <div className="backdrop-blur-lg bg-white/5 border-white/10 shadow-2xl rounded-2xl border hover:bg-white/8 transition-all duration-300 hover:scale-105">
            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <img
                            src={techStack.icon}
                            alt={techStack.title}
                            className="w-16 h-16 rounded-xl object-cover border border-white/20"
                        />
                        <div className="flex-1">
                            <h3 className="text-xl text-gray-200 mb-1">{techStack.title}</h3>
                        </div>
                    </div>

                    <button
                        // onClick={() => onDelete(techStack._id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <FaTrash className="w-4 h-4" />
                    </button>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Description</label>
                    <div
                        className="bg-white/5 rounded-lg p-4 border border-white/10 text-gray-300 prose prose-invert prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: techStack.description }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TechStackCard;