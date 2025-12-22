import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { calculateTotalIncome, calculateTotalExpenses } from '../../utils/transactionUtils';

const IncomeExpenseComparison = ({ transactions }) => {
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);

  const data = [
    {
      name: 'Income',
      amount: income,
      type: 'income'
    },
    {
      name: 'Expenses',
      amount: expenses,
      type: 'expense'
    }
  ];

  if (income === 0 && expenses === 0) {
    return (
      <div className="bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--border-base)] shadow-premium h-80 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[var(--bg-surface)] rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--border-base)]">
            <BarChart size={32} className="text-[var(--text-muted)]" />
          </div>
          <p className="text-[var(--text-main)] font-bold">No financial data available</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">Start tracking your income and expenses</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-[var(--bg-card)] p-3 rounded-xl shadow-premium-hover border border-[var(--border-base)] backdrop-blur-md bg-opacity-90">
          <p className="font-bold text-[var(--text-main)]">{data.payload.name}</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            ₹{data.value.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[var(--bg-card)] p-6 lg:p-8 rounded-2xl border border-[var(--border-base)] shadow-premium hover:shadow-premium-hover transition-all duration-300">
      <div className="mb-8">
        <h3 className="text-lg font-bold text-[var(--text-main)] mb-1 tracking-tight">Income vs Expenses</h3>
        <p className="text-sm text-[var(--text-muted)]">Compare your total income and expenses</p>
      </div>

      <div className="h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-base)" opacity={0.5} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--text-muted)', fontSize: 10, fontWeight: 500 }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-surface)', opacity: 0.4 }} />
            <Bar dataKey="amount" radius={[8, 8, 8, 8]} barSize={40}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.type === 'income' ? '#10b981' : '#ef4444'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider mb-1">Total Income</p>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹{income.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-rose-500/5 p-4 rounded-xl border border-rose-500/10">
          <p className="text-xs text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider mb-1">Total Expenses</p>
          <p className="text-2xl font-black text-rose-600 dark:text-rose-400">₹{expenses.toLocaleString('en-IN')}</p>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseComparison;

