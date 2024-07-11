// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.

// 3 - Passer les données à une variable

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// coutry.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays

//---------------------------//
//---------------------------//
const countries = []; // Initialisation d'un tableau vide
//Sélection des éléments dans le html
const countriesDiv = document.querySelector(".countries-container");
const inputSearch = document.getElementById("inputSearch");
const inputRange = document.getElementById("inputRange");
const rangeValue = document.getElementById("rangeValue");

// Sélection des boutons de tri
const minToMaxBtn = document.getElementById("minToMax");
const maxToMinBtn = document.getElementById("maxToMin");
const alphaBtn = document.getElementById("alpha");

// Fonction pour récupérer les pays depuis l'API
const fetchCountries = () => {
  return fetch("https://restcountries.com/v3.1/all")
    .then((response) => {
      return response.json(); // Transforme la réponse en JSON
    })
    .then((data) => {
      countries.push(...data); // Ajoute chaque pays de `data` dans `countries`
    });
};

// Fonction pour afficher les pays en fonction du filtre sélectionné
const displayCountries = () => {
  // Récupère la valeur de recherche depuis l'input et le deuxième récupère la valeur dans l'input range puis la converti en un number
  const searchText = inputSearch.value.toLowerCase();
  const rangeNumber = parseInt(inputRange.value);

  // Trier les pays en fonction du bouton cliqué
  if (minToMaxBtn.classList.contains("active")) {
    countries.sort((a, b) => a.population - b.population);
  } else if (maxToMinBtn.classList.contains("active")) {
    countries.sort((a, b) => b.population - a.population);
  } else if (alphaBtn.classList.contains("active")) {
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  }

  // Met à jour le nombre de pays affiché dans le span
  rangeValue.textContent = inputRange.value;

  // Créer une liste HTML des pays filtrés, triés et limités par la valeur du range
  const countriesHTML = countries
    .filter((country) => {
      return country.name.common.toLowerCase().includes(searchText);
    })
    .slice(0, rangeNumber)
    .map(
      (country) => `<li class="card">
                    <img src="${country.flags.png}" alt="${
        country.name.common
      }">
                    <h2>${country.name.common}</h2>
                    <h3>${country.capital}</h3>
                    <p>Population : ${country.population.toLocaleString()}</p>
                </li>`
    );

  // Afficher les pays dans la div
  countriesDiv.innerHTML = countriesHTML.join("");
};

//------------------------------
// Les écouteurs d'événements
//------------------------------

// Écouter les changements dans l'input de recherche pour filtrer les pays en temps réel
inputSearch.addEventListener("input", () => {
  displayCountries();
});

// Écouter les changements dans l'input range pour limiter le nombre de pays à afficher
inputRange.addEventListener("input", () => {
  displayCountries();
});

//-------------------------------------------
// Écouter les clics sur les boutons de tri
//-------------------------------------------

minToMaxBtn.addEventListener("click", () => {
  minToMaxBtn.classList.toggle("active");
  maxToMinBtn.classList.remove("active");
  alphaBtn.classList.remove("active");
  displayCountries();
});

maxToMinBtn.addEventListener("click", () => {
  maxToMinBtn.classList.toggle("active");
  minToMaxBtn.classList.remove("active");
  alphaBtn.classList.remove("active");
  displayCountries();
});

alphaBtn.addEventListener("click", () => {
  alphaBtn.classList.toggle("active");
  minToMaxBtn.classList.remove("active");
  maxToMinBtn.classList.remove("active");
  displayCountries();
});

//-------------------------------
// Lancement de l'application
//-------------------------------

// Fonction initiale pour charger et afficher les pays
fetchCountries().then(() => {
  displayCountries();
});
