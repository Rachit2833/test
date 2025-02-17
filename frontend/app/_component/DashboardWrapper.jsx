
import BarChartContainer from "./BarChartContainer";
import CategoryCards from "./CategoryCards";
import MonthlyBudgetCard from "./MonthlyBugetCard";
import TransactionCard from "./TransactionCard";
import DialogComp from "./DialogComp";
import PieChartCompo from "./PieChartCompo";
import ExpenseSummary from "./ExpenseSummary";
import BudgetVsExpenditure from "./BudgetVsExpenditure";
import TransactionWrapper from "./TransactionWrapper";
import BudgetWrapper from "./BudgetWrapper";
import PieChartWrapper from "./PieChartWrapper";

async function DashboardWrapper() {
   const res = await fetch("https://test-mmpf.onrender.com/monthly-expense/65b3e1d2c5a4e6a2b3c9d2e2")
   const data = await res.json()
   const res2 = await fetch("https://test-mmpf.onrender.com/bud/65b3e1d2c5a4e6a2b3c9d2e2")
   const data2 = await res2.json()
   const res3 = await fetch("https://test-mmpf.onrender.com/analytics/65b3e1d2c5a4e6a2b3c9d2e2")
   const data3 = await res3.json()
   
   return (
      <div className="border-4 h-screen grid overflow-auto  gap-8 grid-cols-7  p-2">
             <div className=" p-4 col-span-5   ">
              <div className=" flex gap-4">
               <BudgetWrapper />
               <BarChartContainer  data={data.data} />
              </div>
                 <div className=" grid grid-cols-2 gap-4 my-2">
                     <PieChartWrapper />
               <BudgetVsExpenditure data={data2} />
               
                 </div>
            </div>
         <div className=" p-2 col-span-2 bg-slate-200  ">
               <div className=" mb-8 h-[35rem]   overflow-auto flex flex-col gap-2"> 
                   <div className=" flex items-center justify-between">
                  <h2 className=" p-2 text-[2rem]">My Transctions</h2> 
                     <DialogComp />
                   </div>
             
               <TransactionWrapper />
               </div>
            <ExpenseSummary data={data3} />
             </div>


      </div>
   )
}

export default DashboardWrapper

