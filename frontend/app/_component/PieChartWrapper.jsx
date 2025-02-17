import PieChartCompo from "./PieChartCompo"

async function PieChartWrapper() {
   const res = await fetch("https://test-mmpf.onrender.com/pie/65b3e1d2c5a4e6a2b3c9d2e2")
   const data= await res.json()
   return (
      <>
         <PieChartCompo catData={data} />
      </>
   )
}

export default PieChartWrapper
