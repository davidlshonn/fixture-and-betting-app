var leagueId = 39; // English Premier League

var todaysDate = moment();
var weekStart = todaysDate.clone().startOf("isoweek");

for(var i = 0; i <= 6; i++) {
var weekResults = moment(weekStart).add(i, 'days').format("YYYY-MM-DD");
}

$.ajax({
  url:
    "https://v3.football.api-sports.io/fixtures/?season=2020&league=" +
    leagueId +
    "&date=" +
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

    var fixturesDiv = $("<div class='fixture'>");
    fixturesDiv.attr("data-fixtureId", fixtureId);
    fixturesDiv.attr("id", "fixture-div");

    var homeTeamText = $("<h3>").text(homeTeam);
    var awayTeamText = $("<h3>").text(awayTeam);

    

    //half-time and full time scores.
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

    var homeLogo = matchesList[i].teams.home.logo;
    var awayLogo = matchesList[i].teams.away.logo;

    var homeLogoImage = $("<img>").attr("src", homeLogo);
    var awayLogoImage = $("<img>").attr("src", awayLogo)

    //venue 
    var venue = matchesList[i].fixture.venue.name;
    console.log(venue);



    fixturesDiv.append(homeTeamText, awayTeamText, homeGoalsText, awayGoalsText, homeLogoImage, awayLogoImage);

    $("#main-div").append(fixturesDiv);

    //venue
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
