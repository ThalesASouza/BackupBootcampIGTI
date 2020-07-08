import React, { useState } from 'react'
import Form from './components/form/Form'

export default function App() {
  const [montanteInicial,setMontanteInicial] = useState(1000);
  const [taxa,setTaxa] = useState(0.5);
  const [peridoInicial,setPeriodoInicial] = useState(1);
  const [allParcelas,setParcelas] = useState([]);

  useEffect(() => {
  const inicial = () =>{
    let newArray =  [montanteInicial,taxa,peridoInicial];
    setParcelas(newArray);
  }
  inicial();
})

inicial();
  const handleNewValue = (newValues) =>{
    const [newMontanteInicial,newTaxa,newPeriodo] = newValues;
    setMontanteInicial(newMontanteInicial);
    setTaxa(newTaxa);
    setPeriodoInicial(newPeriodo); 
  }
console.log(allParcelas);

  return (
    <div className="container">
      <h1 style={{textAlign:'center'}}>React - Juros Compostos</h1>
      <Form montante={montanteInicial} taxaJuros={taxa} periodo={peridoInicial} onChangeValues={handleNewValue} />
    </div>
  )
}
