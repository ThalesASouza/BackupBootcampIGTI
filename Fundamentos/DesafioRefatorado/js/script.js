let globalnames = ['um', 'dois', 'tres', 'quatro'];
let inputName = null;
let isEditing = false;
let currretIndex = null;

window.addEventListener('load',() =>{
  inputName = document.querySelector('#name');
  preventFormSubmit();
  activateInput();
  render();
});


function preventFormSubmit(){
  function handleFormSubmit(event){
    event.preventDefault();
  }
  
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);

}

function activateInput(){
  function insertName(name){
    //globalnames.push(name);
    globalnames = [...globalnames,name];
  }
  function updateName(newName){
    globalnames[currretIndex] = newName;
  }
  function handleTyping(event){
    
    var hasText = !!event.target.value && event.target.value.trim() !== '';
    if(!hasText){
      clearInput();
      return;

    }   

    if(event.key==='Enter'){
      if(isEditing){
        updateName(event.target.value);
      }else{
        insertName(event.target.value);
      }
      render();
      isEditing = false;
      clearInput();
    }
  }
  
  inputName.addEventListener('keyup',handleTyping);
  inputName.focus();
}
function render(){
  function createDeleteButton(index){
    function deletename(){
      /*globalnames.splice(index,1);
      globalnames = globalnames.filter((name, i) => {
          if(i === index){
            return false;
          }
          return true;
          return i!==index;
      });*/
      globalnames = globalnames.filter((name,i) => i!==index);
      render();
    }
    var botton = document.createElement('button');
    botton.classList.add('deleteButton');
    botton.textContent = 'x';
    
    botton.addEventListener('click',deletename);
    
    return botton;

  }
  function createSpan(name,index){
    function editItens(){
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currretIndex = index;
    }
    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click',editItens);
    
    return span;
  }

  var divNames =  document.querySelector('#names');
  divNames.innerHTML='';
  var ul = document.createElement('ul');
  
  for(var i = 0; i < globalnames.length;i++){
    var currentName = globalnames[i];
    
    var li = document.createElement('li');
    var botton = createDeleteButton(i);
    var span = createSpan(currentName,i);
    
    li.appendChild(botton);
    li.appendChild(span);

    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  clearInput();
}
/*function clearInput(){
  inputName.value = '';
  inputName.focus();
}*/
const clearInput = () =>{
  inputName.value = '';
  inputName.focus();
};
