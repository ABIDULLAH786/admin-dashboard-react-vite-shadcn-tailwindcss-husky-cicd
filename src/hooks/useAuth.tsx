import type { UserData } from '@/types/auth.types';
import { createContext, useContext } from 'react';


export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    user: UserData | null; 
}


export interface AuthContextType extends AuthState {
    login: (userData: UserData) => void; // 1. Add this line
    logout: () => Promise<void>;
    refetch: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};