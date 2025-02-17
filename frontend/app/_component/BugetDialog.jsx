'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import { useFormStatus } from "react-dom";

function BudgetDialog() {
   const [monthlyBudget, setMonthlyBudget] = useState("");
   const [categories, setCategories] = useState([{ id: 1, name: "Food", amount: "" }]);

   // Add a new category budget
   const addCategory = () => {
      setCategories([...categories, { id: Date.now(), name: "", amount: "" }]);
   };

   // Update category name or budget
   const updateCategory = (id, key, value) => {
      setCategories(categories.map(cat => (cat.id === id ? { ...cat, [key]: value } : cat)));
   };

   // Remove a category
   const removeCategory = (id) => {
      setCategories(categories.filter(cat => cat.id !== id));
   };

   return (
      <Dialog>
         <DialogTrigger className="bg-primary h-9 px-4 py-2 text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors">
            Set Budget
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Set Monthly Budget</DialogTitle>
            </DialogHeader>

            <form className="grid grid-cols-1 gap-4 w-full">
               {/* Monthly Budget */}
               <div className="w-full">
                  <Label htmlFor="monthly-budget">Monthly Budget</Label>
                  <Input
                     type="number"
                     id="monthly-budget"
                     value={monthlyBudget}
                     onChange={(e) => setMonthlyBudget(e.target.value)}
                     placeholder="₹ Enter monthly budget"
                     className="w-full"
                  />
               </div>

               {/* Category Budgets */}
               <div className="w-full">
                  <Label>Category-wise Budget</Label>
                  {categories.map((cat, index) => (
                     <div key={cat.id} className="flex items-center gap-2">
                        <select
                           value={cat.name}
                           onChange={(e) => updateCategory(cat.id, "name", e.target.value)}
                           className="w-1/2 p-2 border rounded-md"
                        >
                           <option value="">Select a category</option>
                           <option value="Entertainment">Entertainment</option>
                           <option value="Food">Food</option>
                           <option value="Travel">Travel</option>
                           <option value="Shopping">Shopping</option>
                           <option value="Bills">Bills</option>
                           <option value="Health">Health</option>
                           <option value="Others">Others</option>
                        </select>
                        <Input
                           type="number"
                           value={cat.amount}
                           onChange={(e) => updateCategory(cat.id, "amount", e.target.value)}
                           placeholder="₹ Amount"
                           className="w-1/3"
                        />
                        {categories.length > 1 && (
                           <Button variant="destructive" className="w-8 h-8" onClick={() => removeCategory(cat.id)}>
                              <Trash size={16} />
                           </Button>
                        )}
                     </div>
                  ))}
                  <Button type="button" className="mt-2" onClick={addCategory}>
                     + Add Category
                  </Button>
               </div>

               {/* Save Button */}
               <SaveButton />
            </form>
         </DialogContent>
      </Dialog>
   );
}

export default BudgetDialog;

export function SaveButton() {
   const status = useFormStatus();
   return (
      <Button className="w-full" disabled={status.pending} type="submit">
         {status.pending ? (
            <span className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span>
         ) : (
            <span>Save Budget</span>
         )}
      </Button>
   );
}

