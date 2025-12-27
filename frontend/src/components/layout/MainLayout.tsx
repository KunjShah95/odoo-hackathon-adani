import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';

export function MainLayout() {
    const { logout } = useAuth();

    return (
        <div className="flex h-screen w-full bg-surface-dark overflow-hidden">
            {/* Sidebar is fixed height, auto width */}
            <Sidebar onLogout={logout} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Background glow for the content area */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] -z-10" />

                {/* Main Content scrollable */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
