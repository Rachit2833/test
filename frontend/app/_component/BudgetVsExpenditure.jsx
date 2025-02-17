'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

function BudgetVsExpenditure({ data }) {
   // Format data for the chart
   const formattedData = data.map((item) => ({
      month: new Date(2025, item.month - 1).toLocaleString('default', { month: 'short' }), // Convert month number to name
      budget: item.totalBudget,
      expenditure: item.totalSpent,
   }));

   return (
      <div className="w-full my-6 p-4 bg-white shadow-lg rounded-lg">
         <h2 className="text-xl font-semibold text-gray-800 mb-4">Budget vs Expenditure</h2>
         <ResponsiveContainer width="100%" height={350}>
            <LineChart data={formattedData}>
               <XAxis dataKey="month" />
               <YAxis />
               <Tooltip />
               <Legend />
               <CartesianGrid strokeDasharray="3 3" />
               <Line type="monotone" dataKey="budget" stroke="#8884d8" strokeWidth={2} />
               <Line type="monotone" dataKey="expenditure" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
         </ResponsiveContainer>
      </div>
   );
}

export default BudgetVsExpenditure;
