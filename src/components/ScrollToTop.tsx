import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Calculate progress (0 to 100%)
      if (docHeight > 0) {
        const progress = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
        setScrollProgress(progress);
      }

      // Show button after scrolling down 350px
      if (scrollTop > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-24 right-6 z-40 group"
        >
          {/* Tooltip on hover */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-gray-900 text-white text-[11px] font-semibold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap hidden sm:block border border-gray-800">
            Scroll to Top
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45 border-t border-r border-gray-800"></div>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="relative w-12 h-12 rounded-full bg-white text-gray-800 shadow-xl border border-gray-200/80 flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue hover:shadow-2xl transition-all duration-300 transform active:scale-90 cursor-pointer focus:outline-none focus:ring-4 focus:ring-brand-blue/20"
          >
            {/* Circular SVG scroll progress ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 48 48"
            >
              <circle
                cx="24"
                cy="24"
                r="21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-gray-100 group-hover:text-white/20 transition-colors"
              />
              <circle
                cx="24"
                cy="24"
                r="21"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray={2 * Math.PI * 21}
                strokeDashoffset={2 * Math.PI * 21 * (1 - scrollProgress / 100)}
                strokeLinecap="round"
                className="text-brand-green group-hover:text-white transition-all duration-150"
              />
            </svg>

            {/* Icon */}
            <ArrowUp 
              size={18} 
              className="relative z-10 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform duration-200" 
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
