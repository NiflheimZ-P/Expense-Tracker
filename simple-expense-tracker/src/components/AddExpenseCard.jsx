"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpenseCard from "./AddCard/ExpenseCard";
import CategoryCard from "./AddCard/CategoryCard";
import { toast } from "sonner";

const ExpenseFormCard = ({ categories, setExpenses, setCategories }) => {

  const [isOpen, setIsOpen] = useState(false);
  const expenseForm = useForm({
    defaultValues: {
      title: "",
      amount: "",
      category: categories[0]?.id.toString() || "",
      date: new Date().toISOString().split("T")[0],
    },
  });
  const categoryForm = useForm({ defaultValues: { name: "" } });

const handleExpenseSubmit = async (data) => {
  try {
    const res = await fetch("/api/expense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, categoryId: Number(data.category) }),
    });
    const result = await res.json();
    if (res.ok) {
      toast.success(result.message, { duration: 3000 });
      expenseForm.reset();
      setIsOpen(false);
      setExpenses((prev) => [...prev, result.expense]);
    } else {
      toast.error(result.error , { duration: 3000 });
    }
  } catch (error) {
    toast.error(error.message , { duration: 3000 });
  }
};

const handleCategorySubmit = async (data) => {
  try {
    const res = await fetch("/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (res.ok) {
      toast.success(result.message, { duration: 3000 });
      categoryForm.reset();
      setIsOpen(false);
      setCategories((prev) => [...prev, result.category]);

    } else {
      toast.error(result.error, { duration: 3000 });
    }
  } catch (error) {
    toast.error(error.message, { duration: 3000 });
  }
};

  if (!isOpen) {
    return (
      <Card
        className="cursor-pointer transition-all hover:shadow-md"
        onClick={() => setIsOpen(true)}
      >
        <CardContent className="flex items-center justify-center p-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Plus className="h-5 w-5" />
            <span>Add New Expense Or Add New Category</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <Tabs defaultValue="expense">
        <TabsList className="w-full mb-2">
          <TabsTrigger value="expense">Add New Expense</TabsTrigger>
          <TabsTrigger value="category">Add New Category</TabsTrigger>
        </TabsList>
        <TabsContent value="expense">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 mb-3">
              <Plus className="h-5 w-5" /> Add New Expense
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseCard
              categories={categories}
              form={expenseForm}
              onSubmit={handleExpenseSubmit}
              onCancel={() => setIsOpen(false)}
            />
          </CardContent>
        </TabsContent>
        <TabsContent value="category">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 mb-3">
              <Plus className="h-5 w-5" /> Add New Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryCard
              form={categoryForm}
              onSubmit={handleCategorySubmit}
              onCancel={() => setIsOpen(false)}
            />
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ExpenseFormCard;
