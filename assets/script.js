var leagueId = 39; // English Premier League
var today = moment().format("YYYY-MM-DD");

var todaysDate = moment();
console.log(todaysDate);
var weekStart = todaysDate.clone().startOf("isoweek");
for (var i = 0; i <= 6; i++) {
  var weekResults = moment(weekStart).add(i, "days").format("YYYY-MM-DD");
  console.log(weekResults);
}
$.ajax({
  url:
    "https://v3.football.api-sports.io/fixtures/?season=2020&league=" +
    leagueId +
    "&date=" +
    today,
   method: "GET",
  headers: {
    "x-rapidapi-key": "67f27e4f20f674f5d4d4d49ee4d1642e",
    "x-rapidapi-host": "v3.football.api-sports.io",
  },
}).then((res) => {
  console.log("I am the response: ", res);
  var matchesList = res.response;
  console.log(matchesList);
  for (var i = 0; i < matchesList.length; i++) {
    var fixture = matchesList[i].fixture;
    var fixtureId = fixture.id;
    //home and away teams.
    var homeTeam = matchesList[i].teams.home.name;
    var awayTeam = matchesList[i].teams.away.name;
    var fixturesDiv = $("<div>");
    fixturesDiv.attr("data-fixtureId", fixtureId);
    fixturesDiv.attr("id", "fixture-div");
    fixturesDiv.addClass(
      "flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:-mx-1 lg:-mx-1 xl:-mx-1 shadow rounded-lg m-4 pt-8 px-6 "
    );
    var homeTeamText = $("<h3>").text(homeTeam);
    var awayTeamText = $("<h3>").text(awayTeam);
    var homeLogo = matchesList[i].teams.home.logo;
    var awayLogo = matchesList[i].teams.away.logo;
    //logo
    var homeLogoImage = $("<img>").attr("src", homeLogo);
    homeLogoImage.attr("id", "image-home");
    var awayLogoImage = $("<img>").attr("src", awayLogo);
    awayLogoImage.attr("id", "image-away");
    homeLogoImage.addClass("h-24 w-24 ml-5");
    awayLogoImage.addClass("h-24 w-24 ml-5");
    /// Home div on the left to display logo and name, away on left \\\
    var homeTeamDiv = $("<div class='fixture-content'>");
    homeTeamDiv.attr("id", "home-team");
    homeTeamDiv.append(homeLogoImage, homeTeamText);
    homeTeamDiv.addClass(
      "my-1 px-1 w-1/3 overflow-hidden sm:my-1 sm:px-1 sm:w-1/3 md:my-1 md:px-1 md:w-1/3 lg:my-1 lg:px-1 lg:w-1/3 xl:my-1 xl:px-1 xl:w-1/3 h-44 w-84 font-medium"
    );
    var awayTeamDiv = $("<div class='fixture-content'>");
    awayTeamDiv.append(awayLogoImage, awayTeamText);
    awayTeamDiv.attr("id", "away-team");
    awayTeamDiv.addClass(
      "my-1 px-1 w-1/3 overflow-hidden sm:my-1 sm:px-1 sm:w-1/3 md:my-1 md:px-1 md:w-1/3 lg:my-1 lg:px-1 lg:w-1/3 xl:my-1 xl:px-1 xl:w-1/3 h-44 w-84 font-medium"
    );
    //half-time and full time scores - to be displayed in the middle of card.
    var halfTimeHome = matchesList[i].score.halftime.home;
    halfTimeHome = halfTimeHome == null ? "0" : halfTimeHome;
    var halfTimeAway = matchesList[i].score.halftime.away;
    halfTimeAway = halfTimeAway == null ? "0" : halfTimeAway;
    var fullTimeHome = matchesList[i].score.fulltime.home;
    fullTimeHome = fullTimeHome == null ? "0" : fullTimeHome;
    var fullTimeAway = matchesList[i].score.fulltime.away;
    fullTimeAway = fullTimeAway == null ? "0" : fullTimeAway;
    // goals.
    var homeGoals = matchesList[i].goals.home;
    homeGoals = homeGoals == null ? "0" : homeGoals;
    var awayGoals = matchesList[i].goals.away;
    awayGoals = awayGoals == null ? "0" : awayGoals;
    console.log(awayGoals);
    var homeGoalsText = $("<h3>").text(homeGoals);
    var middleSymbol = $("<button type='button'><i id='football-icon' class='far fa-futbol'></i></button>");
    var awayGoalsText = $("<h3>").text(awayGoals);
    homeGoalsText.attr("id", "home-goals");
    awayGoalsText.attr("id", "away-goals");
    homeGoalsText.addClass("text-7xl");
    awayGoalsText.addClass("text-7xl");
    var goalsDiv = $("<div>")
    goalsDiv.append(homeGoalsText, middleSymbol, awayGoalsText);
    goalsDiv.attr("id", "goals-div");
    goalsDiv.addClass("content-center place-self-center ")
    //central div to display goals.
    var centralDiv = $("<div class='fixture-content'>");
    centralDiv.attr("id", "central-div");
    centralDiv.append(goalsDiv);
    centralDiv.addClass(
      "my-1 px-1 w-1/3 overflow-hidden sm:my-1 sm:px-1 sm:w-1/3 md:my-1 md:px-1 md:w-1/3 lg:my-1 lg:px-1 lg:w-1/3 xl:my-1 xl:px-1 xl:w-1/3 flex-col content-center flex-wrap font-semibold"
    );
    //button\\
    var buttonBettings = $("<button>").text("Betting Odds");
    buttonBettings.attr("id", "button-bettings");
    buttonBettings.click(addBettings);
    //div underneath to display info on match.
    var infoMatchDiv = $("<div class='info-fixture'>");
    infoMatchDiv.attr("id", "info-div");

    //league---logo
    var leagueLogo = matchesList[i].league.logo;
    var leagueLogoImage = $("<img>").attr("src", leagueLogo);
    leagueLogoImage.attr("id", "league-logo");
    //venue
    var venue = matchesList[i].fixture.venue.name;
    var venueText = $("<h5>").text(venue);
    venueText.addClass("h-24 w-44 font-medium text-xs pt-12 pr-10");

    //match date (to be append to cards and betting pop-up)
    var matchDate = matchesList[i].fixture.date;
    var matchDateSplit = matchDate.substr(0, 10);
    var matchDateSplitTwo = matchDate.substr(11, 15);
    var matchDateThree = matchDateSplitTwo.substr(0, 5);
    
    dateDiv = $("<div>").attr("id", "date-div");
    dateDiv.append($("<h6>").text(matchDateThree));
    dateDiv.append($("<h6>").text(matchDateSplit));

    //referee >
    // var referee = matchesList[i].fixture.referee;
    // var refereeText = $("<h5").text(referee);

    infoMatchDiv.append(dateDiv, venueText, buttonBettings);
    centralDiv.append(infoMatchDiv);
    fixturesDiv.append(homeTeamDiv, centralDiv, awayTeamDiv);
    $("#main-div").append(fixturesDiv);
  }

  ////////////////////////////////////////////////////////////

  /////////////////////////////predictions from same api as first.
  // $(".fixture-div").click(function () {
  //   var clickedElement = $(this);
  //   var fixtureId = clickedElement.attr("data-fixtureId");
  //   $.ajax({
  //     url: "https://v3.football.api-sports.io/predictions?fixture=" + fixtureId,
  //     method: "GET",
  //     headers: {
  //       "x-rapidapi-key": "67f27e4f20f674f5d4d4d49ee4d1642e",
  //       "x-rapidapi-host": "v3.football.api-sports.io",
  //     },
  //   }).then((resp) => {
  //     console.log("I am the predictions ajax: ", resp);
  //   });
  // });
  function addBettings(event) {
    var queryURL =
      "https://api.the-odds-api.com/v3/odds/?sport=soccer_epl&region=uk&apiKey=";
    apiKEY = "996e8a5064fd232fe8ffa1272584f8f3";
    $("#boi").empty();
    //when button is pressed it gets the Central Div (parent element) then the previous sibling(Home div) then the name of team.
    var homeTeamBettings =
      event.target.parentElement.parentElement.previousSibling.children[1].innerText;
    console.log(homeTeamBettings);
    homeTeamBettings =
      homeTeamBettings == "Sheffield Utd"
        ? "Sheffield United"
        : homeTeamBettings;
    homeTeamBettings =
      homeTeamBettings == "Tottenham" ? "Tottenham Hotspur" : homeTeamBettings;
    homeTeamBettings =
      homeTeamBettings == "Brighton"
        ? "Brighton Hove Albion"
        : homeTeamBettings;
    homeTeamBettings =
      homeTeamBettings == "Wolves" ? "Wolverhampton Wanderers" : homeTeamBettings;
      homeTeamBettings = homeTeamBettings == "Newcastle" ? "Newcastle United" : homeTeamBettings;
      homeTeamBettings = homeTeamBettings == "West Brom" ? "West Bromwich Albion" : homeTeamBettings;



    //when button is pressed it gets Central Div (parent element) then the next sibling (Away Div) then the name of team
    var awayTeamBettings =
      event.target.parentElement.parentElement.nextSibling.children[1].innerText;
      console.log(awayTeamBettings);
    awayTeamBettings =
      awayTeamBettings == "Sheffield Utd"
        ? "Sheffield United"
        : awayTeamBettings;
    awayTeamBettings =
      awayTeamBettings == "Tottenham" ? "Tottenham Hotspur" : awayTeamBettings;
    awayTeamBettings =
      awayTeamBettings == "Brighton"
        ? "Brighton and Hove Albion"
        : awayTeamBettings;
    awayTeamBettings =
      awayTeamBettings == "Leicester" ? "Leicester City" : awayTeamBettings;
      awayTeamBettings = awayTeamBettings == "Wolves" ? "Wolverhampton Wanderers" : awayTeamBettings;
    awayTeamBettings = awayTeamBettings == "Newcastle" ? "Newcastle United" : awayTeamBettings;
    awayTeamBettings = awayTeamBettings == "West Brom" ? "West Bromwich Albion" : awayTeamBettings;
    $.ajax({
      url:
        "https://api.the-odds-api.com/v3/odds/?sport=soccer_epl&region=uk&apiKey=320677a935e3705075dd09ae22ed3fe4",
      method: "GET",
    }).then((resp) => {
      console.log("I am the bettings ajax: ", resp);
      var bettingsData = resp.data;
      console.log(bettingsData);
      var array = [];
      // problem, the-odds-api is showing teams playing home or away when actually it is the opposite, so cannot
      // match first api with second api using home and away.
      // push all teams in second-api (the odds api) into one place and match up with first api that way.
      for (var i = 0; i < bettingsData.length; i++) {
        //loop through bettungs data.
        var dataTeamNames = bettingsData[i].teams;
        console.log(dataTeamNames);
        var teamNamesOne = dataTeamNames[0]; //assign variable to home team.
        array.push(teamNamesOne);
        var teamNamesTwo = dataTeamNames[1]; //assign variable to away team.
        array.push(teamNamesTwo); //push both to an array.
        console.log(array);
        if (
          array.includes(homeTeamBettings) &&
          array.includes(awayTeamBettings)
        ) {
          console.log("hello");
          console.log(dataTeamNames); //should come up with selected home and away team.
          var bettingsSites = bettingsData[i].sites; //betting odds for selected fixture (checked -- results match with original response for particular fixutre);
          var newBettingsDiv =
            event.target.parentElement.parentElement.nextSibling.nextSibling;
          console.log(newBettingsDiv);
          var bettingsSitesHeading = $("<ul>").text("Betting Sites: ");
          bettingsSitesHeading.attr("id", "bettings-sites-heading");
          var homeHeading = $("<ul>").text(homeTeamBettings);
          homeHeading.attr("id", "home-heading");
          var drawHeading = $("<ul>").text("Draw: ");
          drawHeading.attr("id", "draw-heading");
          var awayHeading = $("<ul>").text(awayTeamBettings);
          awayHeading.attr("id", "away-heading");
          for (var i = 8; i < bettingsSites.length; i++) {
            //loop through betting sites for the fixture.
            var oddsSites = bettingsSites[i].site_nice; //name of betting site
            var headToHeadOdds = bettingsSites[i].odds.h2h; //odds
            var [win, lose, draw] = headToHeadOdds;
            console.log(headToHeadOdds);
            var winOdds = win.toString();
            var loseOdds = lose.toString();
            var drawOdds = draw.toString();
            console.log("headtohead", winOdds, drawOdds);
            bettingsSitesHeading.append($("<li>").text(oddsSites));
            homeHeading.append($("<li>").text(winOdds));
            awayHeading.append($("<li>").text(loseOdds));
            drawHeading.append($("<li>").text(drawOdds));
          }
          //create div for modal and the contents.
          var backgroundModal = $("<div>").addClass("bg-modal");
          var contentsModal = $("<div>").addClass("modal-contents");
          var modalTop = $("<div>").addClass("modal-top");
          var cardHeading = $("<h3>")
            .text(
              "Bettings Card: " + homeTeamBettings + " VS " + awayTeamBettings
            )
            .addClass("bettings-card-heading");
            dateDivTwo = dateDiv;
            dateDivTwo.attr("id", "date-div-two")

          modalTop.append(
            bettingsSitesHeading,
            homeHeading,
            awayHeading,
            drawHeading
          );
          var removeBtn = $(
            "<button class='btn btn-danger' type='button'><i id='remove-btn' class='far fa-times'></i></button>"
          );

          removeBtn.click(removeBettings);
          contentsModal.append(cardHeading, dateDivTwo, modalTop, removeBtn);
          backgroundModal.append(contentsModal);
          $("#main").append(backgroundModal);
          // $(".back-div").append(
          //   bettingsSitesHeading,
          //   homeHeading,
          //   drawHeading,
          //   awayHeading
          // );
          break; // break when loop has found both teams.
        } else {
          console.log("nope"); //log 'nope' until the loop finds both teams in array.
        }
      }
    });
  }
});
function removeBettings() {
  $(".bg-modal").remove();
}

