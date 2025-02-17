'use client';
import React from 'react';
function ExpenseSummary({data}) {
   return (
      <div className="w-full p-4 bg-white shadow-lg rounded-lg">
         <h2 className="text-xl font-semibold text-gray-800 mb-4">Expense Summary</h2>
         <div className="grid grid-cols-4 gap-4 text-gray-700">
            <div className="p-3 border col-span-2 rounded-lg bg-yellow-100 h-32 flex flex-col justify-center">
               <h3 className="font-medium">Total Expenses</h3>
               <p className="text-lg font-bold">₹{data.totalAmountSpent}</p>
            </div>
            <div className="p-3 border col-span-2 rounded-lg bg-gray-100 h-32 flex flex-col justify-center">
               <h3 className="font-medium">Total Transactions</h3>
               <p className="text-lg font-bold">{data.totalTransactions}</p>
            </div>
            <div className="p-3 border col-span-2 rounded-lg bg-purple-100 h-32 flex flex-col justify-center">
               <h3 className="font-medium">Average Transaction</h3>
               <p className="text-lg font-bold">₹{data.avgTransactionValue.toFixed(2)}</p>
            </div>
            <div className="p-3 border col-span-2 rounded-lg bg-green-100 h-32 flex flex-col justify-center">
               <h3 className="font-medium">Most Spent Category</h3>
               <p className="text-lg font-bold">{data.mostSpentCategory._id} – ₹{data.mostSpentCategory.categoryTotal
}</p>
            </div>
            <div className="p-3 border col-span-4 rounded-lg bg-red-100 h-32 flex flex-col justify-center">
               <h3 className="font-medium">Most Expensive Transaction</h3>
               <p className="text-lg font-bold">{data.mostExpensiveTransaction.category} – ₹{data.mostExpensiveTransaction.amount}</p>
            </div>
            
         </div>
      </div>
   );
}

export default ExpenseSummary;
