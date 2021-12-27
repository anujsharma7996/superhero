const searchInput = document.getElementById("hero-input");
const displayHeroesContainer = document.querySelector(".hero-container");
const favList = [];
let waiting;
let waitingInterval = 600;
let favCheck = false;
const favIcon = "assests/favstar.png";
const notFavIcon = "assests/unfavstar.png";

checkLocalStorage();

displayHeroesContainer.innerHTML = `<h3>Type something to begin search...</h3>`;

// checking storage
function checkLocalStorage() {
  if (localStorage.getItem("heroFavs") == null) {
    localStorage.setItem("heroFavs", JSON.stringify(Array()));
  }
}

// prevent reloading if user presses enter on search
document.querySelector(".hero-form").addEventListener("submit", (e) => {
  e.preventDefault();
});

// taking input
searchInput.addEventListener("keyup", async () => {
  clearList();
  clearTimeout(waiting);
  displayHeroesContainer.innerHTML = `<h2>Loading...</h2>`;

  if (searchInput.value.length > 3) {
    waiting = setTimeout(finishedTyping, waitingInterval);
  }
});

// clearing search list if any
clearList = () => {
  document.querySelectorAll(".hero-card").forEach((child) => child.remove());
};

// timer to reduce fetch requests while typing
function finishedTyping() {
  fetchHeroes(searchInput.value);
}

// fething superheroes from api
fetchHeroes = (hero) => {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var data = JSON.parse(xhrRequest.response);
    var hero = searchInput.value;
    displayHeroes(data);
  };
  xhrRequest.open(
    "get",
    `https://www.superheroapi.com/api.php/10223699581429766/search/${hero}`
  );
  xhrRequest.send();
};

// handling fav/unfav
addEventListener("click", (e) => {
  if (e.target.id == "addFav") {
    // console.log(e.target.src);
    var id = e.target.parentNode.id;
    var favs = JSON.parse(localStorage.getItem("heroFavs"));

    if (favs.indexOf(id) != -1) {
      favs = favs.filter((hero) => hero != id);
      localStorage.setItem("heroFavs", JSON.stringify(favs));
      e.target.src = notFavIcon;
    } else {
      favs.push(id);
      localStorage.setItem("heroFavs", JSON.stringify(favs));
      e.target.src = favIcon;
    }
  }
});

// displaying heros on page
displayHeroes = (heroesArray) => {
  // console.log(heroesArray.response);
  if (heroesArray.response == "error") {
    displayHeroesContainer.innerHTML = `<h2>No results</h2>`;
    return;
  }
  displayHeroesContainer.innerHTML = "";
  heroesArray.results.forEach((hero) => {
    const heroName = hero.name;
    const img = hero.image.url;
    const id = hero.id;

    var favSRC;
    var favs = JSON.parse(localStorage.getItem("heroFavs"));

    // Check if the hero is favourite or not
    if (favs.indexOf(hero.id) !== -1) {
      favSRC = favIcon;
    } else {
      favSRC = notFavIcon;
    }

    const html = `<div class="hero-card" id=${hero.id}>
        <img
          src="${img}"
          alt="hero"
          class="hero-img"
        />
        <span class="hero-name"> <a href="hero.html?id=${hero.id}">${heroName}</a> </span>
        <br/>
        <img alt="fav" src="${favSRC}" class="fav-icon" id="addFav">
      </div>`;

    //https://cdn-icons-png.flaticon.com/128/130/130193.png

    displayHeroesContainer.innerHTML += html;
  });
};
