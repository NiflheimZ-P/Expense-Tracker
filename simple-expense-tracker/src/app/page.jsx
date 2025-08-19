"use client"

import { useState, useEffect } from 'react';
import ExpenseCard from "@/components/ExpenseSummary";
import AddExpenseCard from "@/components/AddExpenseCard"; 
import ExpenseList from "@/components/ExpenseList";
import ExpenseChart from '@/components/chartExpense';



export default function Home() {
  const [expense, setExpense] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);
  
  useEffect(()=>{
    fetch("/api/expense")
    .then((res) => res.json())
    .then((data) => {
      setExpense(data);
    })
    .catch((err) => console.log(err));
  },[]);
  return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-3 rounded-full bg-primary/10">
              {/* <Wallet className="h-8 w-8 text-primary" /> */}
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Expense Tracker
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take control of your finances with smart expense tracking and insightful analytics
          </p>
        </div>

        {/* Summary Cards */}
        <ExpenseCard expenses={expense} />


        {/* Add Expense Form */}
        <AddExpenseCard categories={categories} setExpenses={setExpense} setCategories={setCategories} />



        {/* Charts */}
        <ExpenseChart expenses={expense} categories={categories} />



        {/* Expense List */}
        <ExpenseList expenses={expense} categories={categories} />
      </div>
    </div>
  );
};
