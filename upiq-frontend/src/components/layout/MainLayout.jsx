import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Menu } from "lucide-react";

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--bg-main)] transition-colors duration-300 font-sans flex overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 lg:ml-64 min-h-screen transition-all duration-300 flex flex-col overflow-y-auto w-full">
                {/* Mobile Header */}
                <header className="lg:hidden flex items-center justify-between p-4 bg-[var(--bg-card)] border-b border-[var(--border-base)] sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] rounded-xl transition-all"
                        >
                            <Menu size={24} />
                        </button>
                        <span className="font-black tracking-tight text-xl text-[var(--text-main)]">UPIQ</span>
                    </div>
                </header>

                <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
                    <Outlet />
                </div>
                <Footer />
            </main>
        </div>
    );
};

export default MainLayout;
