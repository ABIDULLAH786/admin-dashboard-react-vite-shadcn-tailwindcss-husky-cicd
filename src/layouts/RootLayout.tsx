import { AuthProvider } from '@/providers/AuthProvider';
import { useUserPreferences } from '@/store/useUserPreferences';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout: React.FC = () => {
    const theme = useUserPreferences((state) => state.theme);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    return <AuthProvider>
        <Outlet />;
    </AuthProvider>
};

export default RootLayout;