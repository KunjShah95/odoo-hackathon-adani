import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';

export function MainLayout() {
    const { logout } = useAuth();

    return (
        <div className="flex min-h-screen bg-surface-dark">
            {/* Background gradient */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-400/3 blur-[120px] rounded-full" />
            </div>

            {/* Sidebar */}
            <Sidebar onLogout={logout} />

            {/* Main Content */}
            <main className="flex-1 relative overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    );
}
