import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  size?: number; // Added Lucide size as a prop
}

const IconWrapper = ({ 
  icon: Icon, 
  size = 18, // Default value as requested
  className, 
  ...props 
}: IconWrapperProps) => {
  return (
    <div 
      className={cn(
        'hover:text-foreground/50 cursor-pointer transition-colors inline-flex items-center justify-center', 
        className
      )} 
      {...props}
    >
      <Icon size={size} />
    </div>
  );
};

export default IconWrapper;