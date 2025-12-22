import { Edit2, Trash2 } from "lucide-react";
import Button from "../ui/Button";
import { getCategoryDisplayProps } from "../../utils/categoryUtils";
import EmptyState from "../ui/EmptyState";
import clsx from "clsx";

const TransactionTable = ({ transactions, onEdit, onDelete }) => {
    if (!transactions || transactions.length === 0) {
        return (
            <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-base)]">
                <EmptyState type="transactions" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-hidden bg-[var(--bg-card)] rounded-2xl border border-[var(--border-base)] shadow-premium transition-colors duration-300">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[var(--border-base)]">
                        <thead className="bg-[var(--bg-surface)]">
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Description</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Category</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Type</th>
                                <th className="px-6 py-4 text-left text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Amount</th>
                                <th className="px-6 py-4 text-right text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-[var(--bg-card)] divide-y divide-[var(--border-base)]">
                            {transactions.map((t) => (
                                <tr key={t.id} className="hover:bg-[var(--bg-surface)]/50 transition-colors duration-150 group">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-muted)] font-medium">
                                        {new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[var(--text-main)] tracking-tight">
                                        {t.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-muted)]">
                                        {(() => {
                                            const categoryDisplay = getCategoryDisplayProps({ name: t.category });
                                            return (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-main)]">
                                                    <span>{categoryDisplay.icon}</span>
                                                    {t.category || "Uncategorized"}
                                                </span>
                                            );
                                        })()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={clsx(
                                            "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                            t.type?.toLowerCase() === 'income' ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'
                                        )}>
                                            {t.type?.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className={clsx(
                                        "px-6 py-4 whitespace-nowrap text-sm font-bold tracking-tight",
                                        t.type?.toLowerCase() === 'income' ? 'text-emerald-500' : 'text-[var(--text-main)]'
                                    )}>
                                        ₹{t.amount?.toLocaleString('en-IN')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => onEdit(t)}
                                                className="p-1.5 text-[var(--text-muted)] hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-all"
                                                title="Edit"
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(t.id)}
                                                className="p-1.5 text-[var(--text-muted)] hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {transactions.map((t) => {
                    const categoryDisplay = getCategoryDisplayProps({ name: t.category });
                    const isIncome = t.type?.toLowerCase() === 'income';
                    return (
                        <div key={t.id} className="bg-[var(--bg-card)] p-5 rounded-2xl border border-[var(--border-base)] shadow-premium space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                                        {new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </p>
                                    <h4 className="text-base font-bold text-[var(--text-main)] tracking-tight leading-tight">
                                        {t.description}
                                    </h4>
                                </div>
                                <p className={clsx(
                                    "text-lg font-black tracking-tight",
                                    isIncome ? 'text-emerald-500' : 'text-rose-500'
                                )}>
                                    {isIncome ? '+' : '-'}₹{t.amount?.toLocaleString('en-IN')}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-main)]">
                                    <span>{categoryDisplay.icon}</span>
                                    {t.category || "Uncategorized"}
                                </span>
                                <span className={clsx(
                                    "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                    isIncome ? 'text-emerald-500 bg-emerald-500/10 border border-emerald-500/20' : 'text-rose-500 bg-rose-500/10 border border-rose-500/20'
                                )}>
                                    {t.type?.toUpperCase()}
                                </span>
                            </div>

                            <div className="pt-4 border-t border-[var(--border-base)] flex justify-end gap-3">
                                <button
                                    onClick={() => onEdit(t)}
                                    className="flex items-center gap-2 px-4 py-2 text-primary-600 bg-primary-50 dark:bg-primary-500/10 rounded-xl transition-all font-bold text-xs"
                                >
                                    <Edit2 size={14} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(t.id)}
                                    className="flex items-center gap-2 px-4 py-2 text-rose-600 bg-rose-50 dark:bg-rose-500/10 rounded-xl transition-all font-bold text-xs"
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TransactionTable;
