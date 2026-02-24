import React from 'react';
import { cn } from '@/lib/utils';

interface YellowTabIndicatorProps {
  isActive?: boolean;
  className?: string;
}

export const YellowTabIndicator: React.FC<YellowTabIndicatorProps> = ({ isActive, className }) => {
  return (
    <div
      className={cn(
        "absolute -bottom-px left-1/2 -translate-x-1/2 w-5 h-0.75 bg-primary transition-transform duration-200 ease-out z-20",
        // Logic for standard buttons
        isActive !== undefined && (isActive ? "scale-x-100" : "scale-x-0"),
        // Logic for Shadcn TabsTrigger (using the 'group' class on parent)
        isActive === undefined && "scale-x-0 group-data-[state=active]:scale-x-100",
        className
      )}
    />
  );
};