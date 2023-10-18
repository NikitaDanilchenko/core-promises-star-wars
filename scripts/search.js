// Методы, которые могут пригодиться:
// starWars.searchCharacters(query),
// starWars.searchPlanets(query),
// starWars.searchSpecies(query).
// starWars.getCharactersById(id),
// starWars.getPlanetsById(id),
// starWars.getSpeciesById(id)

// Тут ваш код.

//Первый ввод
const btnSearch = document.getElementById("byQueryBtn");
const search = document.getElementById("search_1");
//Второй ввод
const btnGetById = document.getElementById("byQueryBtnGet");
const GetById = document.getElementById("search_2");

//Спиннер
const loading = document.querySelector(".spinner");

//вывод модульного окна с ответом
const data = document.getElementById("result-container");
const content = document.getElementById("content");

//
btnSearch.addEventListener("click", handlerBtn);
// показвывать спинер при клике на btnSearch и модальное окно
function handlerBtn() {
  loading.style.visibility = "visible";
  data.querySelector("p").textContent = search.value;
  content.innerHTML = "";

  const select = document.getElementById("resource");
  if (select.value === "people") {
    getCharacter();
  } else if (select.value === "planets") {
    getPlanet();
  } else if (select.value === "spacies") {
    getSpacies();
  }
}

btnGetById.addEventListener("click", getId);

//===============================
// Character

async function getCharacter() {
  let query = search.value;
  const characterObj = await starWars
    .searchCharacters(query)
    .then((result) => result.results[0]);

  //задание 2
  let id = characterObj.homeworld
    .split("/")
    .filter((item) => isFinite(item))
    .join("");

  let planet = await starWars.getPlanetsById(id).then((result) => result.name);
  characterObj.homeworld = planet;

  for (let key in characterObj) {
    if (Array.isArray(characterObj[key])) {
      content.innerHTML += `${key}: <br>`;
      characterObj[key].forEach((element) => {
        content.innerHTML += `<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>${element}</br>`;
      });
    } else {
      content.innerHTML += `${key}: ${characterObj[key]}</br>`;
    }
  }

  loading.style.visibility = "hidden";
  data.style.visibility = "visible";
}

//==================================
// Planet

async function getPlanet() {
  let query = search.value;
  content.innerHTML = "";
  const planetObj = await starWars
    .searchPlanets(query)
    .then((result) => result.results[0]);

  for (let key in planetObj) {
    if (Array.isArray(planetObj[key])) {
      content.innerHTML += `${key}: <br>`;
      planetObj[key].forEach((element) => {
        content.innerHTML += `<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>${element}</br>`;
      });
    } else {
      content.innerHTML += `${key}: ${planetObj[key]}</br>`;
    }
  }

  loading.style.visibility = "hidden";
  data.style.visibility = "visible";
}
//=====================================
//Spacies
async function getSpacies() {
  let query = search.value;
  content.innerHTML = "";
  const spaciesObj = await starWars
    .searchSpecies(query)
    .then((result) => result.results[0]);

  for (let key in spaciesObj) {
    if (Array.isArray(spaciesObj[key])) {
      content.innerHTML += `${key}: <br>`;
      spaciesObj[key].forEach((element) => {
        content.innerHTML += `<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>${element}</br>`;
      });
    } else {
      content.innerHTML += `${key}: ${spaciesObj[key]}</br>`;
    }
  }

  loading.style.visibility = "hidden";
  data.style.visibility = "visible";
}

async function getId() {
  loading.style.visibility = "visible";
  let id = GetById.value;
  content.innerHTML = "";
  const selectGet = document.getElementById("resource_2");
  if (selectGet.value === "people") {
    let idObj = await starWars.getCharactersById(id);
    for (let key in idObj) {
      if (Array.isArray(idObj[key])) {
        content.innerHTML += `${key}: <br>`;
        idObj[key].forEach((element) => {
          content.innerHTML += `<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>${element}</br>`;
        });
      } else {
        content.innerHTML += `${key}: ${idObj[key]}</br>`;
      }
    }
    loading.style.visibility = "hidden";
    data.style.visibility = "visible";
  } else if (selectGet.value === "planets") {
    let idObj = await starWars.getPlanetsById(id);
    for (let key in idObj) {
      if (Array.isArray(idObj[key])) {
        content.innerHTML += `${key}: <br>`;
        idObj[key].forEach((element) => {
          content.innerHTML += `<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>${element}</br>`;
        });
      } else {
        content.innerHTML += `${key}: ${idObj[key]}</br>`;
      }
    }
    loading.style.visibility = "hidden";
    data.style.visibility = "visible";
  } else if (selectGet.value === "spacies") {
    let idObj = await starWars.getSpeciesById(id);
    for (let key in idObj) {
      if (Array.isArray(idObj[key])) {
        content.innerHTML += `${key}: <br>`;
        idObj[key].forEach((element) => {
          content.innerHTML += `<span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>${element}</br>`;
        });
      } else {
        content.innerHTML += `${key}: ${idObj[key]}</br>`;
      }
    }
    loading.style.visibility = "hidden";
    data.style.visibility = "visible";
  }
}

data.querySelector(".delete").addEventListener("click", () => {
  content.innerHTML = "";
  data.style.visibility = "hidden";
});
