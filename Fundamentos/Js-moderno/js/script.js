/*'use strict';
window.addEventListener('load',() =>{
  inputName.addEventListener('keyup', () => {
      var span = document.querySelector('#content');
      span.textContent = inputName.value.length;
  });
  preventFormSubmit();
});
const preventFormSubmit = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
}
const inputName = document.querySelector('#inputName');


function withVar(){
  for(var i = 0; i < 10; i++ ){
    console.log('var' + i);
  }
  i = 20;
  console.log(i);
}

function withLet() {
  for (let i = 0; i < 10; i++) {
    console.log('var' + i);
  }
  //i = 20;
  //console.log(i);
}

withVar();
withLet();

const c = 19;

function soma(a,b){
  return a+b;
}
const soma2 = function(a, b) {
  return a + b;
}
const soma3 = (a,b) =>{
  return a+b;
};

const soma4 = (a,b) => a+b;

console.log(soma(2,3));
console.log(soma2(2,3));
console.log(soma3(2,3));
console.log(soma4(2,3));

const name = 'Thales';
const surName = 'Souza';
const texto1 =  'Meu nome é '+ name + ' ' + surName;
const texto2 = `Meu nome é ${name} ${surName}`;

console.log(texto1);
console.log(texto2);

const soma5 = (a,b)=> a+b;
console.log(soma5(2,8));

console.log(people);
let frase = "Meu time fez um gol";
let primeira =  frase.charAt(0);

let letra = "";
let primeiraPal = "";
let i=0;
while(letra != " "){
  letra = frase.charAt(i);
  primeiraPal += letra;
  i++;
}
console.log(primeiraPal);


function start(){
  function contarCaracteres(){
    var span = document.querySelector('#content');
    span.textContent = inputName.value.length;
  }
  inputName.addEventListener('keyup',contarCaracteres);
  preventFormSubmit();
}
function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);

}
window.addEventListener('load',()=>{
  doMap();
  doFilter();
  doforeach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
})

function doMap(){
  const nameEmailArray = people.results.map(person => {
    return {
      name: person.name,
      email: person.email
    };
  });
  console.log(nameEmailArray);
  return nameEmailArray;
}
function doFilter(){
  const olderThan18 = people.results.filter(person => {
    return person.dob.age > 50;
  });
  console.log(olderThan18);
}

function doforeach(){
  const mappedPeople = doMap();

  mappedPeople.forEach(person => {
    person.nameSize = person.name.title.length + person.name.first.length + person.name.last.length; 
  });
  console.log(mappedPeople);
}

function doReduce(){
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  },0);
  console.log(totalAges);
  let sum = 0;
  /*for(let i = 0; i < people.results.length; i++){
    var current = people.results[i];
    sum += current.dob.age;
  }
  console.log(sum);
}

function doFind(){
  const found =  people.results.find(person => {
    return person.location.state ==='Minas Gerais';
  });
  console.log(found);
}
function doSome(){
  const found =  people.results.some(person => {
    return person.location.state ==='Amazonas';
  });
  console.log(found);

}
function doEvery(){
  const every = people.results.every(person => {
    return person.nat ==='BR';
  });
  console.log(every);
}

function doSort(){
  const mappedNames = people.results.map(person =>{
    return{
      name: person.name.first
    }
  }).filter(person =>{
    return person.name.startsWith('A');
  }).sort((a,b) => {
    return b.name.length - a.name.length;
  })
  console.log(mappedNames);
}

window.addEventListener('load',() =>{
  doSpread();
  doRest();
  doDestructuring();
});

function doSpread(){
  const marriedMen = people.results.filter(
    person => (person.name.title === 'Mr')
  );
  const marriedWomen = people.results.filter(
    person => (person.name.title === 'Ms')
  );

  const marriedPeople = [...marriedMen,...marriedWomen, {msg: 'oi'}];
  console.log(marriedPeople);
}

function doRest(){
  console.log(infiniteSome(1,2));
  console.log(infiniteSome(1,2,1000));
  console.log(infiniteSome(1,2,1000,1,2,3,4,34,34,34,2,23));
  
}
function infiniteSome(...numeros){
  console.log(numeros);
  return numeros.reduce((acc, curr) => acc + curr,0);
 
}

function doDestructuring(){
  const firts = people.results[0];
  //const username = firts.login.username;
  //const password = firts.login.password;

  const {username, password} = firts.login;
  console.log(username);
  console.log(password);

}*/

window.addEventListener('load', () => {
  fetch('https://api.github.com/users/rrgomide').then(res => {
    res.json().then(data => {
      showdata(data);
    })
  }).catch(error => {
    console.log('erro na resquisição');
  })
  /*const div = document.querySelector('#timer');
  let count = 0;
  const interval = setInterval(() =>{
    div.textContent = ++count;
    if(count === 10){
      this.clearInterval(interval);
      return;
    }
    if(count % 5 ===0){
      setTimeout(() => {
        div.textContent = count + ',5';
      },500);

    }
  },1000);*/
  doFetchAsync();
  dividonPromise2();
  dividonPromise2Async();
});


function showdata(data){
  const user = document.querySelector('#timer');
  user.textContent = data.login + '' + data.name;
}

function dividonPromise(a,b){
  return new Promise((resolve, reject) => {
    if(b===0){
      reject('Não é possivel dividir por zero');
    }
    resolve(a/b);
  })
}
function dividonPromise2(){
  dividonPromise(12, 0).then(result => {
    console.log(result);
  }).catch(error => {
    console.log('falha na divisão' + error);
  })
}

async function dividonPromise2Async() {
  const division = await dividonPromise(12,2);
  console.log(division);

}
async function doFetchAsync(){
  const res = await fetch('https://api.github.com/users/rrgomide');
  const json = await res.json();
  console.log(json);
} 