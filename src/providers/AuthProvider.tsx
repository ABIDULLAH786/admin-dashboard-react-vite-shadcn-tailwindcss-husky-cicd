import { AuthContext, type AuthState } from '@/hooks/useAuth';
import type { UserData } from '@/types/auth.types';
import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<AuthState>({
        isAuthenticated: false,
        isLoading: true,
        error: null,
        user: null,
    });

    const isMounted = useRef(true);

    const login = useCallback((userData: UserData) => {
        // Save to local storage
        localStorage.setItem("userData", JSON.stringify(userData));
        // Instantly update React state so the Sidebar sees it!
        setAuth({
            isAuthenticated: true,
            isLoading: false,
            error: null,
            user: userData
        });
    }, []);

    const verifyAuth = useCallback(async (shouldShowLoading = false) => {
        if (shouldShowLoading) {
            setAuth((prev) => (prev.isLoading ? prev : { ...prev, isLoading: true, error: null }));
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            if (!isMounted.current) return;

            const storedUser = localStorage.getItem("userData");

            if (storedUser) {
                const parsedUser = JSON.parse(storedUser) as UserData;
                setAuth({ isAuthenticated: true, isLoading: false, error: null, user: parsedUser });
            } else {
                setAuth({ isAuthenticated: false, isLoading: false, error: null, user: null });
            }
        } catch (err) {
            if (!isMounted.current) return;
            setAuth({
                isAuthenticated: false,
                isLoading: false,
                error: err instanceof Error ? err.message : 'Unknown error',
                user: null
            });
        }
    }, []);

    useEffect(() => {
        isMounted.current = true;
        const initAuth = async () => { await verifyAuth(false); };
        initAuth();
        return () => { isMounted.current = false; };
    }, [verifyAuth]);

    const logout = useCallback(async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        localStorage.removeItem("userData");
        setAuth({ isAuthenticated: false, isLoading: false, error: null, user: null });
        window.location.href = "/connect";
    }, []);

    return (
        <AuthContext.Provider value={{ ...auth, logout, login, refetch: () => verifyAuth(true) }}>
            {children}
        </AuthContext.Provider>
    );
};