import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ListOrdered, Upload, Tag, LogOut, X } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import clsx from "clsx";
import logo from "../../assets/logo.png";
import ThemeToggle from "../ui/ThemeToggle";

const Sidebar = ({ isOpen, onClose }) => {
    const { logout } = useAuth();
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { name: "Transactions", path: "/transactions", icon: ListOrdered },
        { name: "Upload PDF", path: "/upload", icon: Upload },
        { name: "Categories", path: "/categories", icon: Tag },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={clsx(
                    "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            <div className={clsx(
                "h-screen w-64 bg-[var(--bg-card)] border-r border-[var(--border-base)] flex flex-col fixed left-0 top-0 transition-all duration-300 z-50",
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="p-8 pb-10 flex items-center justify-between">
                    <Link to="/dashboard" onClick={onClose} className="flex items-center gap-3 group">
                        <img
                            src={logo}
                            alt="UPIQ Logo"
                            className="w-10 h-10 rounded-xl object-cover shadow-md group-hover:scale-110 transition-transform duration-300"
                        />
                        <h1 className="text-2xl font-black tracking-tight text-[var(--text-main)]">
                            UPIQ
                        </h1>
                    </Link>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={onClose}
                            className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] lg:hidden"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                className={clsx(
                                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                                    isActive
                                        ? "bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold"
                                        : "text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-main)]"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute left-0 w-1.5 h-6 bg-primary-600 rounded-r-full" />
                                )}
                                <Icon size={20} className={clsx(
                                    "transition-colors",
                                    isActive ? "text-primary-600 dark:text-primary-400" : "text-[var(--text-muted)] group-hover:text-[var(--text-main)]"
                                )} />
                                <span className="text-base">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-[var(--border-base)]">
                    <button
                        onClick={logout}
                        className="flex items-center gap-4 px-4 py-3 w-full text-red-500/80 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all duration-200 text-base font-semibold"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
