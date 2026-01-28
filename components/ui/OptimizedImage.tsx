import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  className, 
  priority = false,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to generate Unsplash URLs with specific widths and formats
  const getUrl = (url: string, width: number) => {
    // Check if it's already an Unsplash URL with params
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}auto=format&fit=crop&q=80&w=${width}`;
  };

  // Generate srcset for standard breakpoints
  const srcSet = `
    ${getUrl(src, 640)} 640w,
    ${getUrl(src, 768)} 768w,
    ${getUrl(src, 1024)} 1024w,
    ${getUrl(src, 1280)} 1280w,
    ${getUrl(src, 1600)} 1600w
  `;

  return (
    <div className={cn("relative overflow-hidden bg-neutral-900", className)}>
      {/* Skeleton / Blur Placeholder */}
      <div 
        className={cn(
          "absolute inset-0 bg-neutral-800 transition-opacity duration-700",
          isLoaded ? "opacity-0" : "opacity-100"
        )} 
      />
      
      <motion.img
        src={getUrl(src, 1280)} // Fallback src
        srcSet={srcSet}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-all duration-700 filter",
          isLoaded ? "blur-0 scale-100 grayscale-0" : "blur-lg scale-105 grayscale",
          className
        )}
        {...props}
      />
    </div>
  );
};