'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { addTransaction } from "../_lib/action";

function DialogComp() {
   return (
      <Dialog>
         <DialogTrigger className="bg-primary h-9 px-4 py-2 text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
            Add
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Add a new Transction</DialogTitle>
            </DialogHeader>
            <form action={addTransaction} className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
               <div className="w-full col-span-3">
                  <Label htmlFor="date">Date</Label>
                  <Input type="date" name="date" id="date" className="w-full" />
               </div>
               <div className="w-full col-span-3">
                  <Label htmlFor="date">Name</Label>
                  <Input type="text" name="name" id="date" className="w-full" />
               </div>
               <div className="w-full col-span-3">
                  <Label htmlFor="category">Category</Label>
                  <select name="category" id="category" className="w-full p-2 border rounded-md">
                     <option value="">Select a category</option>
                     <option value="Entertainment">Entertainment</option>
                     <option value="Food">Food</option>
                     <option value="Travel">Travel</option>
                     <option value="Shopping">Shopping</option>
                     <option value="Bills">Bills</option>
                     <option value="Health">Health</option>
                     <option value="Others">Others</option>
                  </select>
               </div>

               <div className="w-full col-span-3">
                  <Label htmlFor="amount">Amount</Label>
                  <Input type="number" name="amount" id="amount" placeholder="₹ Amount" className="w-full" />
               </div>
               <SaveButton />
            </form>


         </DialogContent>
      </Dialog>
   )
}

export default DialogComp
export function SaveButton() {
   const status = useFormStatus();
   return (
      <Button className=" col-span-3" disabled={status.pending} type="submit">
         {status.pending ? <span className="animate-spin  inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span> : <span>Add</span>}
         {/* <span> Save</span> */}
      </Button>
   )
}
