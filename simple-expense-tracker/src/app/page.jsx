import Image from "next/image";
import ExpenseCard from "@/components/ExpenseCard";
import AddExpenseCard from "@/components/AddExpenseCard"; 

export default function Home() {
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
        <ExpenseCard />

        {/* Add Expense Form */}
        <AddExpenseCard />

        {/* Charts */}
        {/* <ExpenseChart expenses={expenses} /> */}

        {/* Expense List */}
        {/* <ExpenseList expenses={expenses} /> */}
      </div>
    </div>
  );
};
