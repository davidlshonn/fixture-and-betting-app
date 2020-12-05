var leagueId = 39; // English Premier League

var todaysDate = moment().format("YYYY-MM-DD");

$.ajax({
  url:
    "https://v3.football.api-sports.io/fixtures/?season=2020&league=" +
    leagueId +
    "&date=" +
    todaysDate,
  method: "GET",
  headers: {
    "x-rapidapi-key": "5f62c561bc862ae51929f4974ecf3be8",
    "x-rapidapi-host": "v3.football.api-sports.io",
  },
}).then((res) => {
  var matchesList = res.response;
  console.log(matchesList);

  for (var i = 0; i < matchesList.length; i++) {
    var fixture = matchesList[i].fixture;
    console.log(fixture);

    //home and away teams.
    var homeTeams = matchesList[i].teams.home.name;
    console.log(homeTeams);
    var awayTeams = matchesList[i].teams.away.name;
    console.log(awayTeams);
    var homeTeamsText = $("<h3>").text(homeTeams);
    $("<h3>").text(homeTeams);
    var awayTeamsText = $("<h3>").text(awayTeams);

    //score goals
    var halfTimeHome = matchesList[i].score.halftime.home;
    var halfTimeAway = matchesList[i].score.halftime.away;
    console.log(halfTimeHome);
    var fullTimeHome = matchesList[i].score.fulltime.home;
    var fullTimeAway = matchesList[i].score.fulltime.away;
    console.log(fullTimeHome);



    $("#main-div").append(homeTeamsText, awayTeamsText);

    //score, goals.

    //venue

    //id for predictions...
    console.log(fixture.id);
  }
});
