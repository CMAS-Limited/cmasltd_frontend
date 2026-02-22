import React, { useState, useEffect } from 'react';

/**
 * ImageSlider Component
 * Automatically cycles through an array of images with a smooth crossfade effect.
 * Expects to be placed inside a parent container with the Tailwind 'group' class 
 * to inherit hover animations.
 * * @param {Array} images - Array of image URL strings.
 * @param {String} title - Used for the alt text for accessibility.
 */
const ImageSlider = ({ images, title }) => {
  // Tracks which image in the array is currently visible
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle the automated sliding logic
  useEffect(() => {
    // Guard clause: If there are no images, or just one, don't start the timer
    if (!images || images.length <= 1) return;

    // Set up an interval to change the image every 4 seconds (4000ms)
    const interval = setInterval(() => {
      // Use modulo (%) to loop back to index 0 when we reach the end of the array
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); 

    // Cleanup function: clears the interval when the component unmounts 
    // or if the 'images' prop changes. This prevents memory leaks.
    return () => clearInterval(interval);
  }, [images]);

  // If the array is missing or completely empty, render nothing to prevent crashes
  if (!images || images.length === 0) return null;

  return (
    // Wrapper container. The 'group-hover:scale-105' assumes the parent has a 'group' class.
    <div className="w-full h-full relative transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
      
      {/* 1. Map through and render all images stacked on top of each other */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`${title} - view ${index + 1}`}
          // Absolute positioning stacks them. Opacity dictates which one is seen.
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* 2. Render pagination dots only if there is more than 1 image to slide through */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <div 
              key={index} 
              // Dynamic width and color based on whether this dot matches the currently active image
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentIndex 
                  ? 'w-6 bg-teal-400' 
                  : 'w-2 bg-white/50 backdrop-blur-sm'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;