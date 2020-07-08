//You can edit ALL of the code here
fetch("https://api.tvmaze.com/shows/82/episodes")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    setup(data);
  });
function setup(thData) {
  const allEpisodes = thData;
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
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
  // counter(episodeList, episodeList);
  searchLive(theEpisodes);
}

let theEpCounter = document.getElementById("lab");

// The live search function
function searchLive(allTheEpisodesDivs) {
  var theInput = document.getElementById("input"); // search input..
  var allEpis = Array.from(allTheEpisodesDivs.children); // get an array of all the episodes divs..
  // The Event listener of the search input..
  theInput.addEventListener("keyup", function (insertedLetters) {
    const term = insertedLetters.target.value.toLowerCase();
    // cycle through every div in the array and check the text content after change all to lower case..
    allEpis.forEach(function (oneEpisode) {
      if (oneEpisode.textContent.toLowerCase().indexOf(term) != -1) {
        oneEpisode.style.display = "block";
      } else {
        oneEpisode.style.display = "none";
      }
    });
  });
  //fillering the divs to count the result matched ones...
  var countedEps = allEpis.filter(function (value) {
    value.style.display === "block";
  });
  counThesearchReslut(countedEps, allEpis);
  selectEpisodeMenu(allEpis);
}

//Here we count the matched search result...
function counThesearchReslut(num, total) {
  theEpCounter.innerText = `display: ${num.length} / ${total.length}`;
}

// The select episode menu ...
function selectEpisodeMenu(theEpisodes) {
  var theSelectElement = document.getElementById("select");
  theEpisodes.forEach(function (title) {
    var newOption = document.createElement("option");
    newOption.innerText = title.children[0].textContent;
    newOption.value = title.children[0].textContent;
    theSelectElement.appendChild(newOption);
    showUphtheSelectionResult(theSelectElement);
  });
}

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

window.onload = setup;

// the episode's summary tex
