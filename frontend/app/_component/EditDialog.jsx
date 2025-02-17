'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormStatus } from "react-dom";
import { updateTransaction } from "../_lib/action";

function EditDialog({ data }) {
   // Initialize state with incoming data
   const [date, setDate] = useState(data.date);
   const [name, setName] = useState(data.name);
   const [category, setCategory] = useState(data.category);
   const [amount, setAmount] = useState(data.amount);

   useEffect(() => {
      // Update state if the data prop changes
      setDate(data.date);
      setName(data.name);
      setCategory(data.category);
      setAmount(data.amount);
   }, [data]);

   return (
      <>
         <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
         </DialogHeader>
         <form
            action={async (formData) => {
               await updateTransaction(formData, data.id); // Use 'data.id' for the transaction ID
               closeDialog();
            }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
         >
            <div className="w-full col-span-3">
               <Label htmlFor="date">Date</Label>
               <Input
                  type="date"
                  name="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)} // Update state on change
                  className="w-full"
               />
            </div>
            <div className="w-full col-span-3">
               <Label htmlFor="name">Name</Label>
               <Input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Update state on change
                  className="w-full"
               />
            </div>
            <div className="w-full col-span-3">
               <Label htmlFor="category">Category</Label>
               <select
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)} // Update state on change
                  className="w-full p-2 border rounded-md"
               >
                  <option value="Entertainment">Entertainment</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Health">Health</option>
                  <option value="Other">Other</option>
               </select>
            </div>

            <div className="w-full col-span-3">
               <Label htmlFor="amount">Amount</Label>
               <Input
                  type="number"
                  name="amount"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)} // Update state on change
                  className="w-full"
               />
            </div>

            <SaveButton />
         </form>
      </>
   );
}

export default EditDialog;

export function SaveButton() {
   const status = useFormStatus();
   return (
      <Button className="col-span-3" disabled={status.pending} type="submit">
         {status.pending ? (
            <span className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span>
         ) : (
            <span>Save</span>
         )}
      </Button>
   );
}
