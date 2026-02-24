import React from 'react';
import { CONTAINER_BG_STYLE, CONTAINER_HEADER_STYLE } from './Continer.styles.constants';
import type { ContainerProps } from './Continer.types';

export const Container: React.FC<ContainerProps> = ({ 
  title, 
  children, 
  className = "", 
  headerActions 
}) => {
  return (
    <div className={`flex flex-col ${CONTAINER_BG_STYLE} ${className}`}>
      {title && (
        <div className={`${CONTAINER_HEADER_STYLE} flex justify-between items-center`}>
           <h3>{title}</h3>
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};