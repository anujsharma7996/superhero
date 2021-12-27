const favIcon = "../assests/favstar.png";
const notFavIcon = "../assests/unfavstar.png";

setup();

function setup() {
  var favs = JSON.parse(localStorage.getItem("heroFavs"));
  if (favs.length == 0) {
    document.querySelector(".fav-container").innerHTML =
      "Add your favourite Heroes";
    return;
  }
  favs.forEach((id) => {
    fetchHeroes(id);
  });
}

function fetchHeroes(id) {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var data = JSON.parse(xhrRequest.response);
    if (data.response == "error") {
      console.log("Error fetching some data");
      return;
    }
    displayHeroes(data);
  };
  xhrRequest.open(
    "get",
    `https://www.superheroapi.com/api.php/10223699581429766/${id}`
  );
  xhrRequest.send();
}

addEventListener("click", (e) => {
  if (e.target.id == "addFav") {
    // console.log(e.target.src);
    var id = e.target.parentNode.id;
    var favs = JSON.parse(localStorage.getItem("heroFavs"));

    if (favs.indexOf(id) != -1) {
      favs = favs.filter((hero) => hero != id);
      localStorage.setItem("heroFavs", JSON.stringify(favs));
      e.target.src = notFavIcon;
      document.getElementById(`${id}`).remove();
      // console.log(document.getElementById())
    } else {
      favs.push(id);
      localStorage.setItem("heroFavs", JSON.stringify(favs));
      e.target.src = favIcon;
    }
  }
});

function displayHeroes(hero) {
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
          src="${hero.image.url}"
          alt="hero"
          class="hero-img"
        />
        <span class="hero-name"><a href="/hero.html?id=${hero.id}">${hero.name}</a></span>
        <br/>
        <div class="powerstats">
        <span>Combat: ${hero.powerstats.combat}</span>
        <br/>
        <span>Durability: ${hero.powerstats.durability}</span>
        <br/>
        <span>Intelligence: ${hero.powerstats.intelligence}</span>
        <br/>
        <span>Power: ${hero.powerstats.power}</span>
        <br/>
        <span>Speed: ${hero.powerstats.speed}</span>
        <br/>
        <span>Strength: ${hero.powerstats.strength}</span>
        <br/>
        </div>
        
        <img alt="fav" src="${favSRC}" class="fav-icon" id="addFav">
      </div>`;
  document.querySelector(".fav-container").innerHTML += html;
}
