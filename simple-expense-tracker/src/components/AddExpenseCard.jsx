import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { useToast } from '@/hooks/use-toast';

const expenseSchema = z.object({
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  category: z.enum(['food', 'transport', 'entertainment', 'shopping', 'bills', 'health', 'other']),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
});

const categoryLabels = {
  food: '🍕 Food & Dining',
  transport: '🚗 Transportation',
  entertainment: '🎬 Entertainment',
  shopping: '🛍️ Shopping',
  bills: '📄 Bills & Utilities',
  health: '🏥 Health & Medical',
  other: '📝 Other',
};

const AddExpenseCard = ({ onAddExpense }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: 0,
      category: 'food',
      description: '',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = (data) => {
    onAddExpense(data);
    form.reset();
    setIsOpen(false);
    // toast({
    //   title: "Expense Added",
    //   description: `${data.description} - $${data.amount}`,
    // });
  };

  if (!isOpen) {
    return (
      <Card className="cursor-pointer transition-all hover:shadow-md" onClick={() => setIsOpen(true)}>
        <CardContent className="flex items-center justify-center p-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Plus className="h-5 w-5" />
            <span>Add New Expense</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Expense
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(categoryLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="What did you spend on?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Add Expense
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddExpenseCard;
