'use client'
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import DeleteDialog from "./DeleteDialog";
   const categoryColors = {
      Food: "bg-red-100 text-red-600 border-red-300",
      Entertainment: "bg-purple-100 text-purple-600 border-purple-300",
      Health: "bg-green-100 text-green-600 border-green-300",
      Travel: "bg-blue-100 text-blue-600 border-blue-300",
      Shopping: "bg-yellow-100 text-yellow-600 border-yellow-300",
      Other: "bg-gray-100 text-gray-600 border-gray-300",
   };


  
function EditForm({ name, setName, amount, setAmount, date, setDate, setCategory, setEditingField,category }) {


      return (
         <div className=" relative grid grid-cols-3 items-center bg-white border border-gray-300 shadow-md rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:border-gray-400 w-full gap-4">

            <div className="flex flex-col space-y-1">
                  <input
                     name="name"
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     onBlur={() => setEditingField(false)}
                     autoFocus
                     className="text-lg font-semibold text-gray-900 border-b border-gray-400 outline-none bg-transparent w-full"
                  />
                  <input
                     name="date"
                     type="date"
                     value={date}
                     onChange={(e) => setDate(e.target.value)}
                     onBlur={() => setEditingField(false)}
                     autoFocus
                     className="text-sm text-gray-500 border-b border-gray-400 outline-none bg-transparent w-28"
                  />

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
                  <input
                     name="amount"
                     type="number"
                     value={amount}
                     onChange={(e) => setAmount(e.target.value)}
                     onBlur={() => setEditingField(false)}
                     autoFocus
                     className="text-xl font-bold text-gray-800 border-b border-gray-400 outline-none bg-transparent w-16"
                  />
            </div>
         </div>
      );
   }



export default EditForm
