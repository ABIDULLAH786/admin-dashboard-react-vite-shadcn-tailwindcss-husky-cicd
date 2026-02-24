import { AppSidebar } from '@/components/layout/AppSidebar/AppSidebar';
import { MainHeader } from '@/components/MainHeader';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 w-full flex flex-col min-h-screen">
                <MainHeader />
                {/* The Outlet here will render your private pages (users, settings, etc.) */}
                <main className='p-3'>
                    <Outlet />
                </main>
            </main>
        </SidebarProvider>
    );
};

export default MainLayout;