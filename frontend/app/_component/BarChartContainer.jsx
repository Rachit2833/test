'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BarChartContainer({ data }) {
   console.log(data, "dsd");

   // Map of month numbers to month names
   const monthNames = {
      "01": "January", "02": "February", "03": "March", "04": "April",
      "05": "May", "06": "June", "07": "July", "08": "August",
      "09": "September", "10": "October", "11": "November", "12": "December"
   };

   const categoryColors = {
      Entertainment: { fill: "#8884d8" },
      Food: { fill: "#ff4500" },
      Travel: { fill: "#1e90ff" },
      Shopping: { fill: "#ff69b4" },
      Bills: { fill: "#ffd700" },
      Health: { fill: "#32cd32" },
      Others: { fill: "#a9a9a9" },
      Other: { fill: "#a9a9a9" } // Handling inconsistent category names
   };

   // Transform data into a format suitable for recharts
   const transformedData = data.map(entry => {
      const monthNumber = entry._id.split('-')[1]; // Extracting month from _id
      const month = monthNames[monthNumber] || monthNumber; // Convert number to name
      const formattedEntry = { month };
      entry.categories.forEach(category => {
         formattedEntry[category.category] = category.totalAmount;
      });
      return formattedEntry;
   });

   const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
         const total = payload.reduce((sum, entry) => sum + entry.value, 0);
         return (
            <div className="bg-white shadow-md p-3 border border-gray-300 rounded-md">
               <p className="font-semibold text-gray-800">{label}</p>
               {payload.map((entry, index) => (
                  <p key={index} style={{ color: entry.color }}>
                     {entry.name}: ₹{entry.value.toLocaleString()}
                  </p>
               ))}
               <p className="font-bold text-black mt-2">Total: ₹{total.toLocaleString()}</p>
            </div>
         );
      }
      return null;
   };

   return (
      <div className="w-full overflow-auto p-4 bg-white shadow-lg rounded-lg">
         <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Expense Breakdown</h2>
         <div className="w-full overflow-x-auto">
            <div className="w-[1000px]">
               <ResponsiveContainer width="100%"  height={500}>
                  <BarChart className="" barGap={2} data={transformedData}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="month" />
                     <YAxis />
                     <Tooltip content={<CustomTooltip />} />
                     <Legend />
                     {Object.keys(categoryColors).map(category => (
                        <Bar key={category} dataKey={category} barSize={64} stackId="a" fill={categoryColors[category]?.fill || "#ccc"} />
                     ))}
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
   );
}

export default BarChartContainer;
