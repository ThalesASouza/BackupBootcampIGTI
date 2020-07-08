//window.addEventListener('load',mudar);
var input = document.querySelector('#ranged');

input.addEventListener('input',mudar);

function mudar(event){
  console.log(event);
  var span = document.querySelector('#span');
  span.textContent = input.value; 
  var color = document.querySelector('#color');
  color= input.value;
}