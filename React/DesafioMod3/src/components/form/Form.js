import React from 'react'


export default function Form({ montante, taxaJuros, periodo, onChangeValues}) {
 
  const handleNewMontante = (event) => {
  const newMontanteInicial = event.target.value;
  const newTaxa = taxaJuros;
  const newPeriodo = periodo;
  const allValues = [newMontanteInicial, newTaxa, newPeriodo];
  onChangeValues(allValues);
 }
 const handleNewTaxa = (event) => {
   const newMontanteInicial = montante;
   const newTaxa = event.target.value;
   const newPeriodo = periodo;
   const allValues = [newMontanteInicial, newTaxa, newPeriodo];
    onChangeValues(allValues);
 }
 const handleNewPeriodo = (event) => {
   const newMontanteInicial = montante;
   const newTaxa = taxaJuros;
   const newPeriodo = event.target.value;
   const allValues = [newMontanteInicial, newTaxa, newPeriodo];
   onChangeValues(allValues);

 }
 
  return (
    <div>
      <span>Montante inicial</span>
      <input type="number" value={montante} onChange={handleNewMontante}/>
      <span>Taxa de juros inicial</span>
      <input type="number" value={taxaJuros} step="0.1" onChange={handleNewTaxa}/>
      <span>Periodo (meses):</span>
      <input type="number" value={periodo} onChange={handleNewPeriodo} />
    </div>
  )
}
