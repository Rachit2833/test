import BarChartContainer from "./BarChartContainer";
import BudgetVsExpenditure from "./BudgetVsExpenditure";
import BudgetWrapper from "./BudgetWrapper";
import DialogComp from "./DialogComp";
import ExpenseSummary from "./ExpenseSummary";
import PieChartWrapper from "./PieChartWrapper";
import TransactionWrapper from "./TransactionWrapper";


async function DashboardWrapper() {
   // Fetch the data for the different sections of the dashboard
   const monthlyExpenseResponse = await fetch("http://localhost:2833/monthly-expense/65b3e1d2c5a4e6a2b3c9d2e2");
   const monthlyExpenseData = await monthlyExpenseResponse.json();

   const budgetResponse = await fetch("http://localhost:2833/bud/65b3e1d2c5a4e6a2b3c9d2e2");
   const budgetData = await budgetResponse.json();

   const analyticsResponse = await fetch("http://localhost:2833/analytics/65b3e1d2c5a4e6a2b3c9d2e2");
   const analyticsData = await analyticsResponse.json();

   const currentDate = new Date();
   const currentYear = currentDate.getFullYear();
   const currentMonth = currentDate.getMonth() + 1; // months are zero-indexed

   const transactionsResponse = await fetch(
      `http://localhost:2833/transactions/65b3e1d2c5a4e6a2b3c9d2e2/${currentYear}/${currentMonth}`
   );
   const transactionsData = await transactionsResponse.json();

   return (
      <div className="border-4 h-screen grid overflow-auto gap-8 grid-cols-7 p-2">
         <div className="p-4 col-span-5">
            <div className="flex gap-4">
               <BudgetWrapper data={budgetData} />
               <BarChartContainer data={monthlyExpenseData.data} />
            </div>
            <div className="grid grid-cols-2 gap-4 my-2">
               <PieChartWrapper />
               <BudgetVsExpenditure data={budgetData} />
            </div>
         </div>
         <div className="p-2 col-span-2 bg-slate-200">
            <div className="mb-8 h-[35rem] overflow-auto flex flex-col gap-2">
               <div className="flex items-center justify-between">
                  <h2 className="p-2 text-[2rem]">My Transactions</h2>
                  <DialogComp />
               </div>
               <TransactionWrapper data={transactionsData} />
            </div>
            <ExpenseSummary data={analyticsData} />
         </div>
      </div>
   );
}

export default DashboardWrapper;
