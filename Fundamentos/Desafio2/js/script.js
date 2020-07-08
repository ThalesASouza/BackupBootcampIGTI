let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let allFavoritesCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

window.addEventListener('load',() => {
  tabCountries = document.querySelector('#tabCountries');
  tabFavorites = document.querySelector('#tabFavorites');
  countCountries = document.querySelector('#countCountries');
  countFavorites = document.querySelector('#countFavorites');

  totalPopulationList = document.querySelector('#totalPopulationList');
  totalPopulationFavorites = document.querySelector('#totalPopulationFavorites');

  numberFormat = Intl.NumberFormat('pt-BR');
  fetchCountries();
});

async function fetchCountries(){
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();
  allCountries = json.map(country =>{
    const {numericCode,translations,population,flag}=country;

    return {
      id: numericCode,
      name: translations.pt,
      population: population,
      formattedPopulation: formatNumber(population),
      flag: flag
    };
  });
  
  render();
  
}

function render(){
  renderCountryList();
  renderFavorites();
  renderSumary();
  handleCountryButtons();
}
function renderCountryList(){
  let countriesHTML = '<div>';

  allCountries.forEach(country =>{
    const {name,flag,id,population, formattedPopulation} = country;

    const countryHTML = `
    <div class='country'>
      <div>
        <a id="${id}" class="waves-effect waves-light btn">+</a>
      </div>
      <div>
        <img src="${flag}" alt="${name}">
      </div>
      <div>
        <ul>
          <li>${name}</li>
          <li>${formattedPopulation}</li>
        </ul>
      </div>
    </div>`;
    countriesHTML += countryHTML

  });
  countriesHTML += '</div>';
  tabCountries.innerHTML = countriesHTML;
}


function renderFavorites(){
  let favoritesHTML =  '<div>';
  
  allFavoritesCountries.forEach(country =>{
    const { name, flag, id, population,formattedPopulation } = country;
    
    const favoriteHTML = `
    <div class='country'>
      <div>
        <a id="${id}" class="waves-effect waves-light btn red darken-4">-</a>
      </div>
      <div>
        <img src="${flag}" alt="${name}">
      </div>
      <div>
        <ul>
          <li>${name}</li>
          <li>${formattedPopulation}</li>
        </ul>
      </div>
    </div>`;
    favoritesHTML +=favoriteHTML;
  })



  favoritesHTML += '</div>';
  tabFavorites.innerHTML = favoritesHTML;
}
function renderSumary(){
  countCountries.textContent = allCountries.length;
  countFavorites.textContent = allFavoritesCountries.length;

  const totalPopulation = allCountries.reduce((acc , current)=>{
    return acc + current.population;
  },0);

  const totalFavorites = allFavoritesCountries.reduce((acc, current) => {
    return acc + current.population;
  }, 0);

  totalPopulationList.textContent = formatNumber(totalPopulation);
  totalPopulationFavorites.textContent =  formatNumber(totalFavorites);
}
function handleCountryButtons(){
  const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

  countryButtons.forEach(button =>{
    button.addEventListener('click', () => addToFavorties(button.id));
  });
  favoriteButtons.forEach(button =>{
    button.addEventListener('click', () => removeFromFavorties(button.id));
  });
  

}

function addToFavorties(id){
  const countryToadd = allCountries.find(country => country.id === id);
  allFavoritesCountries = [...allFavoritesCountries, countryToadd];
  allFavoritesCountries.sort((a,b) =>{
    return a.name.localeCompare(b.name);
  });

  allCountries = allCountries.filter(country => country.id !== id);
  render();

}

function removeFromFavorties(id){
  const conutryToRemove = allFavoritesCountries.find(country => country.id === id);
  allCountries = [...allCountries, conutryToRemove];
  allCountries.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  allFavoritesCountries = allFavoritesCountries.filter(country => country.id !== id);
  render();
}

function formatNumber(number){
  return numberFormat.format(number);
}