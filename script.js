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
      "flex flex-wrap -mx-1 overflow-hidden sm:-mx-1 md:-mx-1 lg:-mx-1 xl:-mx-1 shadow rounded-lg m-4 pt-8 px-6"
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
    var awayGoalsText = $("<h3>").text(awayGoals);
    homeGoalsText.attr("id", "home-goals");
    awayGoalsText.attr("id", "away-goals");

    homeGoalsText.addClass("text-4xl");
    awayGoalsText.addClass("text-4xl");

    //venue

    var venue = matchesList[i].fixture.venue.name;
    var venueText = $("<h5>").text(venue);

    //central div to display goals.
    var centralDiv = $("<div class='fixture-content'>");
    centralDiv.attr("id", "central-div");
    centralDiv.append(homeGoalsText, awayGoalsText);

    var middleSideDiv = $("<div class=middle-side-div>");
    middleSideDiv.attr("id", "middle-side-div");
    middleSideDiv.append(centralDiv);
    centralDiv.addClass(
      "my-1 px-1 w-1/3 overflow-hidden sm:my-1 sm:px-1 sm:w-1/3 md:my-1 md:px-1 md:w-1/3 lg:my-1 lg:px-1 lg:w-1/3 xl:my-1 xl:px-1 xl:w-1/3 flex flex-col content-center flex-wrap font-semibold"
    );

    //div underneath to display info on match.
    var infoMatchDiv = $("<div class='info-fixture'>");
    infoMatchDiv.attr("id", "info-div");
    var leagueLogo = matchesList[i].league.logo;
    var leagueLogoImage = $("<img>").attr("src", leagueLogo);
    leagueLogoImage.attr("id", "league-logo");

    //venue
    var venue = matchesList[i].fixture.venue.name;
    var venueText = $("<h5>").text(venue);

    venueText.addClass("h-24 w-44 font-normal text-xs pt-20 pb-4");

    infoMatchDiv.append(venueText);

    centralDiv.append(infoMatchDiv);
    fixturesDiv.append(homeTeamDiv, centralDiv, awayTeamDiv);
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
});
