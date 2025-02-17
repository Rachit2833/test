import MonthlyBudgetCard from "./MonthlyBugetCard"

async function BudgetWrapper() {
   const res = await fetch("https://test-mmpf.onrender.com/current-budget/65b3e1d2c5a4e6a2b3c9d2e2")
   const data = await res.json()
   console.log(data);
   const date = new Date
   const year = date.getFullYear();
   const month = date.getMonth() + 1;
   const response = await fetch(`https://test-mmpf.onrender.com/transactions/65b3e1d2c5a4e6a2b3c9d2e2/${year}/${month}`);
   const trxdata = await response.json();
   return (
      <>
         <MonthlyBudgetCard trxData={trxdata} data={data.budget} />
      </>
   )
}

export default BudgetWrapper
