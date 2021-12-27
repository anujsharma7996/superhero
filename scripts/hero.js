const favIcon = "assests/favstar.png";
const notFavIcon = "assests/unfavstar.png";

setup();

function setup() {
  const id = getID();
  const hero = fetchHero(id);
  checkLocalStorage();
}

// if local storage hasn't been created, create it
function checkLocalStorage() {
  if (localStorage.getItem("heroFavs") == null) {
    localStorage.setItem("heroFavs", JSON.stringify(Array()));
  }
}

// get ID from URL
function getID() {
  const url = location.search;
  return url.substring(url.indexOf("=") + 1);
}

// handling fav/unfav
addEventListener("click", (e) => {
  if (e.target.id == "addFav") {
    var id = e.target.parentNode.id;
    console.log(e.target.parentNode.id);
    var favs = JSON.parse(localStorage.getItem("heroFavs"));

    if (favs.indexOf(id) != -1) {
      favs = favs.filter((hero) => hero != id);
      console.log(favs);
      localStorage.setItem("heroFavs", JSON.stringify(favs));
      e.target.src = notFavIcon;
    } else {
      favs.push(id);
      localStorage.setItem("heroFavs", JSON.stringify(favs));
      e.target.src = favIcon;
      console.log(favs);
    }
  }
});

// display heroes in screen
function displayHero(hero) {
  var favSRC;
  var favs = JSON.parse(localStorage.getItem("heroFavs"));

  // Check if the hero is favourite or not
  if (favs.indexOf(hero.id) !== -1) {
    favSRC = favIcon;
  } else {
    favSRC = notFavIcon;
  }

  const leftSide = `<img class="hero-img" src="${hero.image.url}" alt="" />`;

  const rightSide = `<div class="powerstats">
        <div class="name-fav" id=${hero.id}>
        <h1 class="hero-name">${hero.name}</h1>
        <img class="fav-icon" src="${favSRC}" alt="fav" id="addFav" />
        </div>

            <h2>Powerstats</h2>
          <p class="combat"><b>Combat : </b>${hero.powerstats.combat}</p>
          <p class="durability"><b>Durability : </b>${hero.powerstats.durability}</p>
          <p class="intelligence"><b>Intelligence : </b>${hero.powerstats.intelligence}</p>
          <p class="power"><b>Power : </b>${hero.powerstats.power}</p>
          <p class="speed"><b>Speed : </b>${hero.powerstats.speed}</p>
          <p class="strength"><b>Strength : </b>${hero.powerstats.strength}</p>
        </div>
        <div class="bio">
            <h2>Biography</h2>
          <p class="full-name"><b>Full Name : </b>${hero.biography["full-name"]}</p>
          <p class="aliases"><b>Aliases : </b>${hero.biography.aliases}</p>
          <p class="place-of-birth"><b>Place of Birth : </b>${hero.biography["place-of-birth"]}</p>
          <p class="alter-egos"><b>Full Name : </b>${hero.biography["alter-egos"]}</p>
          <p class="first-appearance"><b>First Appearance : </b>${hero.biography["first-appearance"]}</p>
          <p class="alignment"><b>Alignment : </b>${hero.biography["alignment"]}</p>
          <p class="publisher"><b>Publisher : </b>${hero.biography["publisher"]}</p>

        </div>`;

  // hero.biography.aliases.forEach((name) => {
  //   document.querySelector(".aliases").innerHTML += name;
  // });
  document.querySelector(".left-side").innerHTML = leftSide;
  document.querySelector(".right-side").innerHTML = rightSide;
}

// fetch heroes from api
function fetchHero(id) {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var hero = JSON.parse(xhrRequest.response);
    displayHero(hero);
  };
  xhrRequest.open(
    "get",
    `https://www.superheroapi.com/api.php/10223699581429766/${id}`
  );
  xhrRequest.send();
}
