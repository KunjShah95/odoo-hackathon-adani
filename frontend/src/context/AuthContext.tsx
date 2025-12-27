import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, LoginCredentials, RegisterData } from '../types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo purposes - replace with actual API calls
const MOCK_USER: User = {
    id: '1',
    email: 'admin@gearguard.com',
    name: 'John Smith',
    role: 'ADMIN',
    department: 'Facilities',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('gearguard_user');
        const token = localStorage.getItem('gearguard_token');

        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        try {
            // TODO: Replace with actual API call
            // const response = await authApi.login(credentials);

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Mock validation
            if (credentials.email === 'admin@gearguard.com' && credentials.password === 'password') {
                const token = 'mock-jwt-token-' + Date.now();
                localStorage.setItem('gearguard_token', token);
                localStorage.setItem('gearguard_user', JSON.stringify(MOCK_USER));
                setUser(MOCK_USER);
            } else {
                throw new Error('Invalid email or password');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: RegisterData) => {
        setIsLoading(true);
        try {
            // TODO: Replace with actual API call
            // const response = await authApi.register(data);

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const newUser: User = {
                id: Date.now().toString(),
                email: data.email,
                name: data.name,
                role: 'TECHNICIAN',
                department: data.department,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const token = 'mock-jwt-token-' + Date.now();
            localStorage.setItem('gearguard_token', token);
            localStorage.setItem('gearguard_user', JSON.stringify(newUser));
            setUser(newUser);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('gearguard_token');
        localStorage.removeItem('gearguard_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
