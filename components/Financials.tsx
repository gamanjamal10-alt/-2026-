import React, { useMemo } from 'react';
import { Expense, Shepherd, FarmWorker } from '../types';
import { PlusIcon, MoneyIcon } from './Icons';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FinancialsProps {
  expenses: Expense[];
  shepherds: Shepherd[];
  farmWorkers: FarmWorker[];
  onAddExpense: () => void;
  onEditExpense: (expense: Expense) => void;
  onDeleteExpense: (id: number) => void;
}

const COLORS = ['#2E7D32', '#5D4037', '#FDD835', '#1B5E20', '#795548', '#FBC02D', '#AED581'];

const Financials: React.FC<FinancialsProps> = ({ expenses, shepherds, farmWorkers, onAddExpense, onEditExpense, onDeleteExpense }) => {
  
  const { totalManualExpenses, totalSalaries, totalExpenses, expenseChartData } = useMemo(() => {
    const manualExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const salaries = shepherds.reduce((sum, s) => sum + s.salary, 0) + farmWorkers.reduce((sum, w) => sum + w.salary, 0);
    const total = manualExpenses + salaries;

    const categoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
    if(salaries > 0) {
        chartData.push({ name: 'الرواتب', value: salaries });
    }

    return {
      totalManualExpenses: manualExpenses,
      totalSalaries: salaries,
      totalExpenses: total,
      expenseChartData: chartData,
    };
  }, [expenses, shepherds, farmWorkers]);

  return (
    <div className="space-y-8">
      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-brand-green text-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">مصاريف يدوية</h3>
          <p className="text-3xl font-bold">{totalManualExpenses.toFixed(2)} د.ج</p>
        </div>
        <div className="bg-brand-brown text-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">إجمالي الرواتب</h3>
          <p className="text-3xl font-bold">{totalSalaries.toFixed(2)} د.ج</p>
        </div>
        <div className="bg-brand-yellow text-brand-brown-dark p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">إجمالي المصروفات</h3>
          <p className="text-3xl font-bold">{totalExpenses.toFixed(2)} د.ج</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-brand-green-dark flex items-center gap-3"><MoneyIcon /> السجلات المالية</h2>
          <button onClick={onAddExpense} className="flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <PlusIcon /> <span>إضافة مصروف</span>
          </button>
        </div>

        {/* Expense Breakdown Chart */}
        {expenseChartData.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-brand-brown mb-4 text-center">توزيع المصاريف</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={expenseChartData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {expenseChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value.toFixed(2)} د.ج`} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Expense List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-brand-brown mb-2 border-b-2 border-brand-green pb-1">قائمة المصروفات اليدوية</h3>
          {expenses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-right p-3 font-semibold text-gray-600">التاريخ</th>
                    <th className="text-right p-3 font-semibold text-gray-600">الفئة</th>
                    <th className="text-right p-3 font-semibold text-gray-600">الوصف</th>
                    <th className="text-right p-3 font-semibold text-gray-600">المبلغ</th>
                    <th className="text-center p-3 font-semibold text-gray-600">إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map(expense => (
                    <tr key={expense.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{expense.date}</td>
                      <td className="p-3">{expense.category}</td>
                      <td className="p-3">{expense.description}</td>
                      <td className="p-3 font-mono">{expense.amount.toFixed(2)} د.ج</td>
                      <td className="p-3 text-center">
                        <button onClick={() => onEditExpense(expense)} className="text-blue-500 hover:underline mx-2">تعديل</button>
                        <button onClick={() => onDeleteExpense(expense.id)} className="text-red-500 hover:underline mx-2">حذف</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">لا توجد مصروفات يدوية مسجلة.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Financials;