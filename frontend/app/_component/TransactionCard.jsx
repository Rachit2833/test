'use client'
import { Button } from "@/components/ui/button";
import { Edit, Edit2, Trash2 } from "lucide-react";
import React, { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ContextMenuItem } from "@radix-ui/react-context-menu";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DialogComp from "./DialogComp";
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
   // Destructure fields from data
   const { name, date, category, amount } = data;

   return (
      <ContextMenu>
         <ContextMenuTrigger className="relative grid grid-cols-3 items-center bg-white border border-gray-300 shadow-md rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:border-gray-400 w-full gap-4">
            <ContextMenuContent className="w-32 ">

                  <Dialog>
                     <DialogTrigger className="w-full p-2 flex justify-between">
                        Edit <Edit />
                     </DialogTrigger>
                     <DialogContent>
                        <EditDialog data={data} />
                     </DialogContent>
                  </Dialog>

               <Separator />
            </ContextMenuContent>
            <div className="flex flex-col space-y-1">
               <h3
                  className="text-lg font-semibold text-gray-900 cursor-pointer"
                  onClick={() => setEditingField("name")}
               >
                  {name}
               </h3>

               <p
                  className="text-sm text-gray-500 cursor-pointer"
                  onClick={() => setEditingField("date")}
               >
                  {date.split("T")[0]}
               </p>
            </div>
            <div>
               <select
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full border ${categoryColors[category] || categoryColors.Other} w-full`}
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
                  <h2
                     className="text-xl font-bold text-gray-800 cursor-pointer"
                     onClick={() => setEditingField("amount")}
                  >
                     ₹ {Number(amount).toLocaleString()}
                  </h2>
                  {/* <Button variant="outline" ><Trash2 /></Button> */}
                  <DeleteDialog id={data._id} />
               </div>
            </div>
         </ContextMenuTrigger>
      </ContextMenu>
   );
}

export default TransactionCard;
