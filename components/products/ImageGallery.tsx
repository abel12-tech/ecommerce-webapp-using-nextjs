"use client";

import { useState } from "react";
import Image from "next/image";

type ImageGalleryProps = {
  image: string;
  title: string;
};

export default function ImageGallery({ image, title }: ImageGalleryProps) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div
      className={`relative bg-gray-50 rounded-2xl overflow-hidden aspect-square cursor-zoom-in ${
        zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
      }`}
      onClick={() => setZoomed((z) => !z)}
    >
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-contain p-10 transition-transform duration-300 ${
          zoomed ? "scale-150" : "scale-100"
        }`}
      />

      {/* Zoom hint */}
      <div className="absolute bottom-3 right-3 bg-white border border-gray-200 text-xs text-gray-400 px-2 py-1 rounded-lg">
        {zoomed ? "Click to zoom out" : "Click to zoom in"}
      </div>
    </div>
  );
}