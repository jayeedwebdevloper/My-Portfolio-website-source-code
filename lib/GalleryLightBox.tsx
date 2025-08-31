"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    FiX,
    FiChevronLeft,
    FiChevronRight,
    FiZoomIn,
    FiZoomOut,
} from "react-icons/fi";

interface GalleryLightboxProps {
    isLightboxOpen: boolean;
    selectedImageIndex: number | null;
    closeLightbox: () => void;
    prevImage: () => void;
    nextImage: () => void;
    handleZoomOut: () => void;
    handleZoomIn: () => void;
    zoom: number;
    gallery: string[];
}

export default function GalleryLightbox({
    isLightboxOpen,
    selectedImageIndex,
    closeLightbox,
    prevImage,
    nextImage,
    handleZoomOut,
    handleZoomIn,
    zoom,
    gallery,
}: GalleryLightboxProps) {
    const [isLoading, setIsLoading] = useState(true);

    // reset loading when image changes
    useEffect(() => {
        if (isLightboxOpen) setIsLoading(true);
    }, [selectedImageIndex, isLightboxOpen]);

    return (
        <div>
            {isLightboxOpen && (
                <div className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center">
                    {/* Close */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white hover:bg-black/10 bg-black/25 rounded-full p-2 z-[300]"
                    >
                        <FiX className="w-6 h-6" />
                    </button>

                    {/* Prev / Next */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-2 z-[300]"
                    >
                        <FiChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-2 z-[300]"
                    >
                        <FiChevronRight className="w-8 h-8" />
                    </button>

                    {/* Zoom */}
                    <div className="absolute bottom-4 z-[300] left-1/2 -translate-x-1/2 flex items-center gap-2">
                        <button
                            onClick={handleZoomOut}
                            className="text-white hover:bg-black/10 rounded-full p-2 bg-black/30 bg-blend-multiply cursor-pointer"
                        >
                            <FiZoomOut className="w-4 h-4" />
                        </button>
                        <span className="text-white px-3 py-2 bg-black/50 rounded">
                            {Math.round(zoom * 100)}%
                        </span>
                        <button
                            onClick={handleZoomIn}
                            className="text-white hover:bg-black/10 rounded-full p-2 bg-black/30 bg-blend-multiply cursor-pointer"
                        >
                            <FiZoomIn className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Image + Loader */}
                    <div className="relative overflow-auto max-w-full max-h-full p-8 flex items-center justify-center">
                        {/* Loader (visible while loading) */}
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                            </div>
                        )}

                        {selectedImageIndex !== null && (
                            <Image
                                width={1200}
                                height={1000}
                                src={gallery[selectedImageIndex]}
                                alt="Gallery Image"
                                className="max-w-full transition-transform duration-200"
                                style={{ transform: `scale(${zoom})` }}
                                onLoadingComplete={() => setIsLoading(false)}
                            />
                        )}
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-4 right-4 text-white bg-black/50 px-3 py-2 rounded">
                        {selectedImageIndex !== null ? selectedImageIndex + 1 : 0} /{" "}
                        {gallery.length}
                    </div>
                </div>
            )}
        </div>
    );
}