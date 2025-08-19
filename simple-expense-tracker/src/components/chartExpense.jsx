"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const categoryLabels = {
  food: 'Food',
  transport: 'Transport', 
  entertainment: 'Entertainment',
  shopping: 'Shopping',
  bills: 'Bills',
  health: 'Health',
  other: 'Other',
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

export function ExpenseChart({ expenses }) {
  // Group expenses by category
  const categoryData = Object.entries(categoryLabels).map(([category, label]) => {
    const categoryExpenses = expenses.filter(expense => expense.category === category);
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return {
      name: label,
      amount: total,
      count: categoryExpenses.length,
    };
  }).filter(item => item.amount > 0);

  // Group expenses by month
  const monthlyData = expenses.reduce((acc, expense) => {
    const month = expense.date.slice(0, 7); // YYYY-MM format
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += expense.amount;
    return acc;
  }, {});

  const monthlyChartData = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6) // Last 6 months
    .map(([month, amount]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      amount,
    }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [
                    `$${Number(value).toFixed(2)}`,
                    "Amount",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Spending Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  formatter={(value) => [
                    `$${Number(value).toFixed(2)}`,
                    "Amount",
                  ]}
                />
                <Bar
                  dataKey="amount"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseChart;


