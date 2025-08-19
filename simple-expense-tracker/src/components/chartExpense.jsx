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

const getRandomColor = (minHue = 90, maxHue = 210) => {
  const hue = Math.floor(Math.random() * (maxHue - minHue)) + minHue;
  const saturation = Math.floor(Math.random() * 40) + 40;
  const lightness = Math.floor(Math.random() * 20) + 50;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const ExpenseChart = ({ expenses, categories }) => {
    const categoryData = Object.entries(categories).map(([_, category]) => {
    const categoryExpenses = expenses.filter(expense => Number(expense.categoryId ) === Number(category.id));
    const total = Number(categoryExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0));

    return {
      name: category.name,
      amount: Number(total),
      count: Number(categoryExpenses.length),
    };
  }).filter(item => item.amount > 0);
 
  const monthlyData = expenses.reduce((acc, expense) => {
    const month = expense.date.slice(0, 7);
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += Number(expense.amount);
    return acc;
  }, {});

  const monthlyChartData = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
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
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getRandomColor()}
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
                  fill="#289e8c"
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
