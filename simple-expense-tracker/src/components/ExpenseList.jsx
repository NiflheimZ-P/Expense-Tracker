import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { format, parseISO } from "date-fns";

const categoryLabels = {
  food: "🍕 Food",
  transport: "🚗 Transport",
  entertainment: "🎬 Entertainment",
  shopping: "🛍️ Shopping",
  bills: "📄 Bills",
  health: "🏥 Health",
  other: "📝 Other",
};

const categoryColors = {
  food: "bg-orange-100 text-black dark:bg-orange-900/20 dark:text-orange-300",
  transport: "bg-blue-100 text-black dark:bg-blue-900/20 dark:text-blue-300",
  entertainment:
    "bg-purple-100 text-black dark:bg-purple-900/20 dark:text-purple-300",
  shopping: "bg-pink-100 text-black dark:bg-pink-900/20 dark:text-pink-300",
  bills: "bg-red-100 text-black dark:bg-red-900/20 dark:text-red-300",
  health: "bg-green-100 text-black dark:bg-green-900/20 dark:text-green-300",
  other: "bg-gray-100 text-black dark:bg-gray-900/20 dark:text-gray-300",
};

const ExpenseList = ({ expenses, categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    sortBy: "date",
    sortOrder: "desc",
  });

  const filteredExpenses = expenses
    .filter((expense) => {
      const categoryName = expense.category?.name.toLowerCase() || "";
      const matchesSearch =
        categoryName.includes(searchTerm.toLowerCase()) ||
        expense.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !filters.category || categoryName === filters.category;

      let matchesDateRange = true;
      if (filters.dateRange) {
        const expenseDate = new Date(expense.date);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        matchesDateRange = expenseDate >= startDate && expenseDate <= endDate;
      }

      return matchesSearch && matchesCategory && matchesDateRange;
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category?.name.localeCompare(b.category?.name);

          break;
      }

      return filters.sortOrder === "desc" ? -comparison : comparison;
    });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select
              value={filters.category || "all"}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  category: value === "all" ? undefined : value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((value) => (
                  <SelectItem
                    key={value.name.toLowerCase()}
                    value={value.name.toLowerCase()}
                  >
                    {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="amount">Sort by Amount</SelectItem>
                <SelectItem value="category">Sort by Category</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
                }))
              }
              className="flex items-center gap-2"
            >
              <ArrowUpDown className="h-4 w-4" />
              {filters.sortOrder === "asc" ? "Ascending" : "Descending"}
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Content Container */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses ({filteredExpenses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredExpenses.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No expenses found matching your criteria.
              </div>
            ) : (
              filteredExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className={
                        categoryColors[expense.category?.name?.toLowerCase()] ||
                        "bg-gray-100 text-black"
                      }
                    >
                      {expense.category?.name || "No Category"}
                    </Badge>
                    <div>
                      <p className="font-medium">{expense.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(parseISO(expense.date), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ${Number(expense.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseList;
