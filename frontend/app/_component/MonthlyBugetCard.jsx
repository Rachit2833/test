'use client'
import { IndianRupee } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Importing a shadcn/ui button (optional)
import BudgetDialog from "./BugetDialog";

function MonthlyBudgetCard({ data, trxData }) {

   const [budget, setBudget] = useState(data?.totalBudget);

   // Calculate total expenditure from trxData
   const totalExpenditure = trxData?.transactions?.reduce((acc, tx) => acc + tx?.amount, 0);
   const remainingAmount = budget - totalExpenditure;

   const handleChangeBudget = () => {
      const newBudget = prompt("Enter new budget:");
      if (newBudget && !isNaN(newBudget)) {
         setBudget(Number(newBudget));
      }
   };

   return (
      <div className="border-2 w-[50%] flex flex-col items-center p-6 rounded-lg shadow-lg bg-white">
         {/* Monthly Budget Heading */}
         <h3 className="text-lg font-semibold text-gray-600 mb-4">Monthly Budget</h3>

         {/* Budget Amount with Rupee Icon */}
         <div className="flex items-center space-x-2">
            <IndianRupee size={32} className="text-black" />
            <h2 className="text-4xl font-bold text-black">{budget.toLocaleString()}</h2>
         </div>

         {/* Left Amount Display */}
         <p className="text-lg font-semibold text-green-600 mt-2">
            Left: ₹{remainingAmount.toLocaleString()}
         </p>

         {/* Date Below */}
         <p className="text-sm text-gray-500 mt-1">Set on: 1st February 2025</p>

         <BudgetDialog />

         <div className="flex flex-col mt-5 w-full">
            <h2 className="text-lg font-semibold text-gray-700 mx-2">Category-wise Budget</h2>

            {data?.categories.map((i, index) => (
               <div key={index} className="flex justify-between border-b py-2 mx-2">
                  <span className="text-gray-600">{i.name}</span>
                  <span className="font-medium text-black">₹{i.amount.toLocaleString()}</span>
               </div>
            ))}
         </div>
      </div>
   );
}

export default MonthlyBudgetCard;
