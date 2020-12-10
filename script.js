var leagueId = 39; // English Premier League

var todaysDate = moment();
var weekStart = todaysDate.clone().startOf("isoweek");

for (var i = 0; i <= 6; i++) {
  var weekResults = moment(weekStart).add(i, "days").format("YYYY-MM-DD");
}

$.ajax({
  url:
    "https://v3.football.api-sports.io/fixtures/?season=2020&league=" +
    leagueId +
    "&date=" +
    weekResults,
  weekResults,

  method: "GET",

  headers: {
    "x-rapidapi-key": "67f27e4f20f674f5d4d4d49ee4d1642e",
    "x-rapidapi-host": "v3.football.api-sports.io",
  },
}).then((res) => {
  console.log("I am th eresponse: ", res);
  var matchesList = res.response;
  console.log(matchesList);

  for (var i = 0; i < matchesList.length; i++) {
    var fixture = matchesList[i].fixture;
    var fixtureId = fixture.id;

    //home and away teams.
    var homeTeam = matchesList[i].teams.home.name;
    var awayTeam = matchesList[i].teams.away.name;

    ////////

    var fixturesDiv = $("<div>");
    fixturesDiv.attr("data-fixtureId", fixtureId);
    fixturesDiv.attr("id", "fixture-div");

    /////

    var homeTeamText = $("<h3>").text(homeTeam);
    homeTeamText.attr("id", "home-team-text");
    var awayTeamText = $("<h3>").text(awayTeam);
    awayTeamText.attr("id", "away-team-text");

    var homeLogoDiv = $("<div>");
    homeLogoDiv.attr("id", "home-logo-div");
    homeLogoDiv.addClass("mt-12");
    var awayLogoDiv = $("<div>");
    awayLogoDiv.attr("id", "away-logo-div");
    awayLogoDiv.addClass("mt-12");

    var homeLogo = matchesList[i].teams.home.logo;
    var awayLogo = matchesList[i].teams.away.logo;

    //logo
    var homeLogoImage = $("<img>").attr("src", homeLogo);
    homeLogoImage.attr("id", "image-home");
    homeLogoImage.addClass("m-auto w-4/12 h-2/6");
    var awayLogoImage = $("<img>").attr("src", awayLogo);
    awayLogoImage.attr("id", "image-away");
    awayLogoImage.addClass("m-auto w-4/12 h-2/6");

    homeLogoDiv.append(homeLogoImage);
    awayLogoDiv.append(awayLogoImage);

    /// Home div on the left to display logo and name, away on left \\\
    var homeTeamDiv = $("<div class='fixture-content'>");
    homeTeamDiv.attr("id", "home-team-div");
    homeTeamDiv.append(homeLogoDiv, homeTeamText);

    var awayTeamDiv = $("<div class='fixture-content'>");
    awayTeamDiv.append(awayLogoDiv, awayTeamText);
    awayTeamDiv.attr("id", "away-team-div");

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
    var dashText = $("<h6>").text("---");
    var awayGoalsText = $("<h3>").text(awayGoals);
    homeGoalsText.attr("id", "home-goals");
    awayGoalsText.attr("id", "away-goals");

    //div on top of goals to display time and date.
    var timeDateDiv = $("<div>");

    //venue
    var venue = matchesList[i].fixture.venue.name;
    var venueText = $("<h5>").text(venue);

    //div underneath to display info on match.
    var infoMatchDiv = $("<div class='info-fixture'>");
    infoMatchDiv.attr("id", "info-div");
    var leagueLogo = matchesList[i].league.logo;
    var leagueLogoImage = $("<img>").attr("src", leagueLogo);
    leagueLogoImage.attr("id", "league-logo");

    //button\\
    var buttonBettings = $("<button>").text("button");
    buttonBettings.attr("id", "button-bettings");
    buttonBettings.click(addBettings);

    //venue
    var venue = matchesList[i].fixture.venue.name;
    var venueText = $("<h5>").text(venue);
    infoMatchDiv.append(venueText);

    //central div to display goals.
    var centralDiv = $("<div class='fixture-content'>");
    centralDiv.attr("id", "central-div");
    centralDiv.append(
      homeGoalsText,
      dashText,
      awayGoalsText,
      infoMatchDiv,
      buttonBettings
    );

    /// bettings div
    var bettingsDiv = $("<div class='list-bettings'>");
    bettingsDiv.attr("id", "list-bettings-id");

    fixturesDiv.append(homeTeamDiv, centralDiv, awayTeamDiv, bettingsDiv);
    $("#main-div").append(fixturesDiv);
  }
  ////////////////////////////////////////////////////////////

  $(".fixture").click(function () {
    var clickedElement = $(this);
    var fixtureId = clickedElement.attr("data-fixtureId");

    $.ajax({
      url: "https://v3.football.api-sports.io/predictions?fixture=" + fixtureId,
      method: "GET",
      headers: {
        "x-rapidapi-key": "67f27e4f20f674f5d4d4d49ee4d1642e",
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    }).then((resp) => {
      console.log("I am the predictions ajax: ", resp);
    });
  });

  function addBettings(event) {
    var queryURL =
      "https://api.the-odds-api.com/v3/odds/?sport=soccer_epl&region=uk&apiKey=";
    apiKEY = "996e8a5064fd232fe8ffa1272584f8f3";

    //when button is pressed it gets the Central Div (parent element) then the previous sibling(Home div) then the name of team.
    var homeTeamBettings =
      event.target.parentElement.previousSibling.children[1].innerText;
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
      homeTeamBettings == "Leicester" ? "Leicester City" : homeTeamBettings;

    //when button is pressed it gets Central Div (parent element) then the next sibling (Away Div) then the name of team
    var awayTeamBettings =
      event.target.parentElement.nextSibling.children[1].innerText;

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

    $.ajax({
      url:
        "https://api.the-odds-api.com/v3/odds/?sport=soccer_epl&region=uk&apiKey=996e8a5064fd232fe8ffa1272584f8f3",
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

          var newBettingsDiv = event.target.parentElement.nextSibling.nextSibling;
          console.log(newBettingsDiv);

          for (var i = 8; i < bettingsSites.length; i++) {
            //loop through betting sites for the fixture.
            var oddsSites = bettingsSites[i].site_nice; //name of betting site
            var headToHeadOdds = bettingsSites[i].odds.h2h; //odds

            var oddsSitesText = $("<h6>").text(oddsSites);
            var headToHeadText = $("<p>").text(headToHeadOdds);

            newBettingsDiv.append(oddsSites, headToHeadOdds);
            
          }


          break; // break when loop has found both teams.
        } else {
          console.log("nope"); //log 'nope' until the loop finds both teams in array.
        }
      }
      
    });
  }
});
