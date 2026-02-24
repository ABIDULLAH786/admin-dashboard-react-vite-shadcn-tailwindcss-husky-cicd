import React from 'react';
import {
  Moon,
  Sun
} from 'lucide-react';
import { useUserPreferences } from '@/store/useUserPreferences';
import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';


export const MainHeader: React.FC = () => {
  const theme = useUserPreferences((state) => state.theme);

  const toggleTheme = useUserPreferences((state) => state.toggleTheme);
  return (
      <header className="h-15 flex items-center border-b bg-card justify-between px-4 select-none">
        <SidebarTrigger />
        {/* LEFT: Logo & Main Nav */}
        <div className="flex items-center gap-6 h-full">
          
        </div>
        {/* RIGHT: Utilities & Auth */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-muted-foreground mr-2">

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleTheme}
              className={theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
          </div>
        </div>
      </header>

  );
};