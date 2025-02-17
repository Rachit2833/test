import TransactionCard from "./TransactionCard";

async function TransactionWrapper() {

   const date = new Date
   const year = date.getFullYear();
   const month = date.getMonth() + 1;
   const response = await fetch(`http://localhost:2833/transactions/65b3e1d2c5a4e6a2b3c9d2e2/${year}/${month}`);
   const data= await  response.json();
   return (
      <>
         {data?.transactions?.map((tx, index) => (
            <TransactionCard key={index} data={tx} />
         ))}
      </>
   )
}

export default TransactionWrapper
