'use client';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PieChartCompo({ catData }) {
   console.log(catData, "Pie Chart Data");

   const categoryColors = {
      Entertainment: "#8884d8",
      Food: "#ff8042",
      Travel: "#0088FE",
      Shopping: "#FF69B4",
      Bills: "#FFD700",
      Health: "#32CD32",
      Others: "#A9A9A9",
      Other: "#A9A9A9", // Added in case of minor spelling variations
   };

   // Transform data to match recharts format
   const chartData = catData.data.map((item) => ({
      name: item._id,         // Use `_id` as the category name
      value: item.totalAmount // Use `totalAmount` as the value for the pie chart
   }));

   return (
      <div className="w-full rounded-lg p-2 border-4 border-emerald-500">
         <h2 className="text-xl font-semibold text-gray-800 mb-4">Expenses by Category</h2>
         <ResponsiveContainer width="100%" height={350}>
            <PieChart>
               <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
               >
                  {chartData.map((entry, index) => (
                     <Cell
                        key={`cell-${index}`}
                        fill={categoryColors[entry.name] || "#A9A9A9"} // Default color for unknown categories
                     />
                  ))}
               </Pie>
               <Tooltip />
               <Legend />
            </PieChart>
         </ResponsiveContainer>
      </div>
   );
}

export default PieChartCompo;
