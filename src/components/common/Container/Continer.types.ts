import type { ReactNode } from 'react';

export interface ContainerProps {
  title?: string;
  className?: string;
  headerActions?: ReactNode; 
  children: ReactNode;
}