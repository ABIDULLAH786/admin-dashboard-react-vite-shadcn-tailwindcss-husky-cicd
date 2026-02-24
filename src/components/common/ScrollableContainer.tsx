import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils"; // Assuming you use shadcn's cn utility

interface ScrollableContainerProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  scrollAmount?: number;
}

export const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
  className,
  containerClassName,
  scrollAmount = 200,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(false);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Use a 1px threshold to avoid sub-pixel rounding issues
      setShowLeftBtn(scrollLeft > 1);
      setShowRightBtn(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll, children]); // Re-check if children change

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={cn("relative flex-1 h-full overflow-hidden group", containerClassName)}>
      {/* Left Arrow */}
      {showLeftBtn && (
        <button
          onClick={() => handleScroll('left')}
          className="cursor-pointer absolute left-0 top-0 bottom-0 z-20 px-1 bg-gradient-to-r from-card via-card/80 to-transparent text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className={cn(
          "flex items-center h-full overflow-x-auto scrollbar-hide whitespace-nowrap",
          className
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      {/* Right Arrow */}
      {showRightBtn && (
        <button
          onClick={() => handleScroll('right')}
          className="cursor-pointer absolute right-0 top-0 bottom-0 z-20 px-1 bg-gradient-to-l from-card via-card/80 to-transparent text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
};