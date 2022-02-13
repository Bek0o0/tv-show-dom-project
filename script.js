
function setup() {
  const allshows = getAllShows();
  theMainPageWithShows(allshows);
  selectAShow(allshows);
  backTOAllShows(allshows);
}

// creating the main page of divs...
let rootElem = document.getElementById("root");

function makePageForEpisodes(episodeList) {
  rootElem.innerHTML = "";
  var theEpisodes = document.createElement("div");
  rootElem.appendChild(theEpisodes);
  theEpisodes.id = "TheMainDiv";

  for (var i = 0; i < episodeList.length; i++) {
    var theEpisodesDivs = document.createElement("div");
    theEpisodesDivs.className = "EpDivs";

    var h2 = document.createElement("h3");
    h2.className = "H2";
    if (episodeList[i].season < 10 && episodeList[i].number < 10) {
      h2.textContent =
        episodeList[i].name +
        " - " +
        "S0" +
        episodeList[i].season +
        "E0" +
        episodeList[i].number;
    } else {
      h2.textContent =
        episodeList[i].name +
        " - " +
        "S0" +
        episodeList[i].season +
        "E" +
        episodeList[i].number;
    }
    var theImage = document.createElement("img");
    theImage.src = episodeList[i].image.medium;
    var theSummary = document.createElement("p");
    theSummary.textContent = episodeList[i].summary;
    theEpisodesDivs.appendChild(h2);
    theEpisodesDivs.appendChild(theImage);
    theEpisodesDivs.appendChild(theSummary);

    theEpisodes.appendChild(theEpisodesDivs);
  }

  searchLive(rootElem.firstChild);
}

// The live search function
function searchLive(allTheEpisodesDivs) {
  var theEpCounter = document.getElementById("lab");
  // theEpCounter.innerText = `display: 0/ ${allEpis.length}`;
  var theInput = document.getElementsByClassName("input")[0]; // search input..

  var allEpis = Array.from(allTheEpisodesDivs.children); // get an array of all the episodes divs..
  // The Event listener of the search input..
  theInput.addEventListener("keyup", function (insertedLetters) {
    const term = insertedLetters.target.value.toLowerCase();
    var counter = 0;
    // cycle through every div in the array and check the text content after change all to lower case..
    allEpis.forEach(function (oneEpisode) {
      // console.log(oneEpisode.style.display);
      if (oneEpisode.textContent.toLowerCase().indexOf(term) != -1) {
        oneEpisode.style.display = "block";
        counter++;
      } else {
        oneEpisode.style.display = "none";
      }
    });
    theEpCounter.innerText = `display: ${counter} / ${allEpis.length}`;
  });
  theEpCounter.innerHTML = "display: 0/ 0";
}

// The select episode menu ...
function selectEpisodeMenu(theEpisodes) {
  var theSelectElement = document.getElementById("select");
  console.log(theSelectElement);

  theEpisodes.forEach(function (title) {
    var newOption = document.createElement("option");
    newOption.innerText = title.name;
    theSelectElement.appendChild(newOption);
    showUphtheSelectionResult(theSelectElement);
  });
}

// This function is to show up the matched results of the episodes search ...
function showUphtheSelectionResult() {
  var theEpis = document.querySelectorAll("div .EpDivs");

  var theEpDivsArray = Array.from(theEpis);

  var theSelectedEpisode = document.getElementById("select").value;
  theEpDivsArray.forEach(function (oneEpisode) {
    if (oneEpisode.firstChild.textContent.indexOf(theSelectedEpisode) != -1) {
      oneEpisode.style.display = "block";
    } else {
      oneEpisode.style.display = "none";
    }
  });
}

// Creating a select menu for the shows..
function selectAShow(shows) {
  var showSelector = document.getElementById("selectShow");
  shows.forEach(function (oneShow) {
    var newOption = document.createElement("option");
    newOption.innerHTML = oneShow.name;
    newOption.value = oneShow.id;
    showSelector.appendChild(newOption);
  });
}

// Here's getting the selected show episodes by fetching by show id...
function getTheShowEpis(theShows) {
  var theShowSelector = document.getElementById("selectShow").value;

  fetch(`https://api.tvmaze.com/shows/${theShowSelector}/episodes`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var theSelectElement = document.getElementById("select");
      theSelectElement.style.display = "block";
      makePageForEpisodes(data);
      selectEpisodeMenu(data);
    });
}

// The main page with all the shows...
function theMainPageWithShows(allTheShows) {
  rootElem.innerHTML = "";

  var theSelectElement = document.getElementById("select");
  theSelectElement.style.display = "none";
  allTheShows.forEach(function (oneShow) {
    var theMainDiv = document.createElement("div");
    var NameImgSumDiv = document.createElement("div");
    NameImgSumDiv.className = "NameImgSumDiv";
    var otherStuffDiv = document.createElement("div");
    otherStuffDiv.className = "OtherStuffDiv";
    var theRate = document.createElement("p");
    theRate.innerHTML = "Rate: " + oneShow.rating.average;
    var theGenres = document.createElement("p");
    theGenres.innerHTML = "Genres: " + oneShow.genres;
    var theStatus = document.createElement("p");
    theStatus.innerHTML = "Starus: " + oneShow.status;
    var theRuntime = document.createElement("p");
    theRuntime.innerHTML = "Runtime: " + oneShow.schedule.time;

    otherStuffDiv.appendChild(theRate);
    otherStuffDiv.appendChild(theGenres);
    otherStuffDiv.appendChild(theStatus);
    otherStuffDiv.appendChild(theRuntime);

    theMainDiv.className = "TheAllShowsDiv";
    var showName = document.createElement("h2");
    showName.innerHTML = oneShow.name;
    showName.className = "H2";
    var showImg = document.createElement("img");
    showImg.src = oneShow.image;
    var showSummary = document.createElement("p");
    showSummary.innerHTML = oneShow.summary;

    NameImgSumDiv.appendChild(showName);
    NameImgSumDiv.appendChild(showImg);
    NameImgSumDiv.appendChild(showSummary);

    theMainDiv.appendChild(NameImgSumDiv);
    theMainDiv.appendChild(otherStuffDiv);

    rootElem.appendChild(theMainDiv);
  });
  searchLive(rootElem);
}
// Here is the Back to the all showa page...
function backTOAllShows(allTheShows) {
  var theBackBtn = document.getElementsByClassName("btn")[0];
  theBackBtn.addEventListener("click", function () {
    theMainPageWithShows(allTheShows);
  });
}

window.onload = setup;
// the episode's summary tex
