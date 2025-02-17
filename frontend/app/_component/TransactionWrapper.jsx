import TransactionCard from "./TransactionCard";

async function TransactionWrapper({data}) {

  
   return (
      <>
         {data.transactions.map((tx, index) => (
            <TransactionCard key={index} data={tx} />
         ))}
      </>
   )
}

export default TransactionWrapper
