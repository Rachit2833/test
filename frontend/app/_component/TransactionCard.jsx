'use client'
import { useState } from "react";
import { Edit } from "lucide-react";
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";

// Category color mapping
const categoryColors = {
   Food: "bg-red-100 text-red-600 border-red-300",
   Entertainment: "bg-purple-100 text-purple-600 border-purple-300",
   Health: "bg-green-100 text-green-600 border-green-300",
   Travel: "bg-blue-100 text-blue-600 border-blue-300",
   Shopping: "bg-yellow-100 text-yellow-600 border-yellow-300",
   Other: "bg-gray-100 text-gray-600 border-gray-300",
};

function TransactionCard({ data }) {
   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
   const [transaction, setTransaction] = useState({
      name: data.name,
      amount: data.amount,
      date: data.date.split("T")[0], // Extract only YYYY-MM-DD
      category: data.category,
      id:data._id
   });

   return (
      <ContextMenu>
         <ContextMenuTrigger className="relative grid grid-cols-3 items-center bg-white border border-gray-300 shadow-md rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:border-gray-400 w-full gap-4">
            <ContextMenuContent className="w-32">
               <ContextMenuItem className="p-2 flex w-full justify-between" onSelect={() => setIsEditDialogOpen(true)}>
                  Edit <Edit />
               </ContextMenuItem>
               <Separator />
               <ContextMenuItem className="p-2">Forward</ContextMenuItem>
            </ContextMenuContent>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
               <DialogContent>
                  <EditDialog
                     transaction={transaction}
                     setTransaction={setTransaction}
                     closeDialog={() => setIsEditDialogOpen(false)}
                  />
               </DialogContent>
            </Dialog>

            <div className="flex flex-col space-y-1">
               <h3 className="text-lg font-semibold text-gray-900">{transaction.name}</h3>
               <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>

            <div>
               <select
                  name="category"
                  value={transaction.category}
                  onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
                  className={`px-3 py-1 text-xs font-semibold rounded-full border ${categoryColors[transaction.category] || categoryColors.Other
                     } w-full`}
               >
                  {Object.keys(categoryColors).map((cat) => (
                     <option key={cat} value={cat}>
                        {cat}
                     </option>
                  ))}
               </select>
            </div>

            <div className="text-right">
               <div className="flex h-16 items-center align-middle">
                  <h2 className="text-xl font-bold text-gray-800">₹ {Number(transaction.amount).toLocaleString()}</h2>
                  <DeleteDialog id={data._id} />
               </div>
            </div>
         </ContextMenuTrigger>
      </ContextMenu>
   );
}

export default TransactionCard;
