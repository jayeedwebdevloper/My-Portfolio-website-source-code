"use client";

import Link from "next/link";
import { FC, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import parse from "html-react-parser";
import { LuCalendar, LuExternalLink, LuGithub, LuGlobe, LuMaximize2, LuUser } from "react-icons/lu";
import Image from "next/image";
import GalleryLightbox from "@/lib/GalleryLightBox";

interface Project {
    _id: string;
    title: string;
    description: string;
    category: string;
    gallery: string[];
    link: string;
    tags: string[];
    client: string;
    covered: boolean;
    technologies: string[];
    duration: string;
    keyFeatures: string[];
    githubLink?: string;
}

interface ProjectDetailsProps {
    project: Project;
}

const ProjectDetails: FC<ProjectDetailsProps> = ({ project }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [zoom, setZoom] = useState(0.5);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
        setIsLightboxOpen(true);
        setZoom(0.5);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
        setSelectedImageIndex(null);
        setZoom(0.5);
    };

    const nextImage = () => {
        if (project && selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % project.gallery.length);
            setZoom(0.5);
        }
    };

    const prevImage = () => {
        if (project && selectedImageIndex !== null) {
            setSelectedImageIndex(selectedImageIndex === 0 ? project.gallery.length - 1 : selectedImageIndex - 1);
            setZoom(0.5);
        }
    };

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.2));

    if (!project) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            <div className="fixed inset-0 -z-50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.15)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
            </div>

            <div className="container mx-auto px-4 lg:px-6">
                <div className="mb-8">
                    <Link
                        href="/projects"
                        className="mb-6 text-slate-300 hover:text-white hover:bg-slate-800/50 flex items-center px-3 py-2 rounded-lg w-fit transition-all duration-300"
                    >
                        <BsArrowLeft className="w-4 h-4 mr-2" />
                        Back to Projects
                    </Link>

                    {/* heading */}
                    <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-4 capitalize flex-wrap">
                                    <p className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-2 py-px rounded-2xl text-sm">
                                        {project.category}
                                    </p>
                                    {
                                        project?.tags?.map((tag, index) =>
                                            <p key={index} className={`border-green-500/30 text-pink-300 bg-pink-500/10 px-2 py-px rounded-2xl text-sm`} >
                                                {tag}
                                            </p>)
                                    }
                                </div>

                                <h1 className="mb-4 text-white">{project.title}</h1>
                                <div className="text-slate-300 mb-6 leading-relaxed">
                                    {parse(`${project.description}`)}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    {project.client && (
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <LuUser className="w-4 h-4 text-blue-400" />
                                            <span className="text-sm">Client: {project.client}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <LuCalendar className="w-4 h-4 text-purple-400" />
                                        <span className="text-sm">Duration: {project.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <LuGlobe className="w-4 h-4 text-green-400" />
                                        <span className="text-sm">Category: {project.category}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                {project.link && (
                                    <Link
                                        target="_blank"
                                        href={project.link}
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center justify-center rounded-xl px-4 py-2"
                                    >
                                        <LuExternalLink className="w-4 h-4 mr-2" />
                                        Live Demo
                                    </Link>
                                )}
                                {project.githubLink && (
                                    <Link
                                        target="_blank"
                                        className="border-slate-600 text-slate-300 hover:bg-slate-800 flex items-center justify-center rounded-xl px-4 py-2"
                                        href={project.githubLink}
                                    >
                                        <LuGithub className="w-4 h-4 mr-2" />
                                        View Code
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* tech & feature */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-12 mt-12 capitalize">
                        <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-2xl shadow-2xl">
                            <div className="p-6">
                                <h3 className="mb-4 text-white">Technologies Used</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project?.technologies?.map((tech, index) => (
                                        <p
                                            key={index}
                                            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-slate-200 border-slate-600 px-3 py-1 rounded-2xl"
                                        >
                                            {tech}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-2xl shadow-2xl">
                            <div className="p-6">
                                <h3 className="mb-4 text-white">Key Features</h3>
                                <ul className="space-y-2">
                                    {project?.keyFeatures?.map((feature, index) => (
                                        <li key={index} className="text-slate-300 flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Project Gallery */}
                    <div className="backdrop-blur-xl bg-slate-800/30 border border-slate-700/50 rounded-2xl shadow-2xl">
                        <div className="p-6">
                            <h3 className="mb-6 text-white">Project Gallery</h3>

                            {/* Masonry Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
                                {project?.gallery?.map((image, index) => {
                                    const spanClasses = [
                                        "col-span-1 row-span-1",
                                        "col-span-2 row-span-1",
                                        "col-span-1 row-span-2",
                                    ];
                                    const randomClass = spanClasses[index % spanClasses.length];

                                    return (
                                        <div
                                            key={index}
                                            className={`relative cursor-pointer group overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl ${randomClass}`}
                                            onClick={() => openLightbox(index)}
                                        >
                                            <Image
                                                src={image}
                                                width={600}
                                                height={600}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                                                <span className="text-white text-sm">{project.title}</span>
                                                <LuMaximize2 className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <GalleryLightbox isLightboxOpen={isLightboxOpen} selectedImageIndex={selectedImageIndex} closeLightbox={closeLightbox} handleZoomOut={handleZoomOut} handleZoomIn={handleZoomIn} zoom={zoom} gallery={project?.gallery} nextImage={nextImage} prevImage={prevImage} />
            
        </div>
    );
};

export default ProjectDetails;