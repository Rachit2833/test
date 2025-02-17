function LastTrans() {
   return (
      <div className="flex flex-col mt-3 w-full gap-3">
         <h2 className="text-lg font-semibold text-gray-700 mx-2">Last 3 Transactions</h2>

         {transactions.map((tx, index) => {
            // Define category-based styles
            const categoryColors = {
               Entertainment: { bg: "bg-purple-100", border: "border-purple-500", text: "text-purple-700" },
               Food: { bg: "bg-orange-100", border: "border-orange-500", text: "text-orange-700" },
               Travel: { bg: "bg-blue-100", border: "border-blue-500", text: "text-blue-700" },
               Shopping: { bg: "bg-pink-100", border: "border-pink-500", text: "text-pink-700" },
               Bills: { bg: "bg-yellow-100", border: "border-yellow-500", text: "text-yellow-700" },
               Health: { bg: "bg-green-100", border: "border-green-500", text: "text-green-700" },
               Others: { bg: "bg-gray-100", border: "border-gray-500", text: "text-gray-700" }
            };

            const { bg, border, text } = categoryColors[tx.initialCategory] || categoryColors["Others"];

            return (
               <div
                  key={index}
                  className={`rounded-xl px-4 py-1 flex items-center justify-between w-full border-l-4 shadow-sm ${bg} ${border}`}
               >
                  <p className="text-gray-700 font-medium">{tx.initialName}</p>
                  <p className={`font-semibold ${text}`}>₹{tx.initialAmount.toLocaleString()}</p>
               </div>
            );
         })}
      </div>
   )
}

export default LastTrans
