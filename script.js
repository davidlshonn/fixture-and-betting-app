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
    "x-rapidapi-key": "249df56945271c12e44e90e5531878ba",
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
    fixturesDiv.attr("data-fixtureId", fixtureId );

    var homeTeamText = $("<h3>").text(homeTeam);
    var awayTeamText = $("<h3>").text(awayTeam);

  

    fixturesDiv.append(homeTeamText, awayTeamText)

  
    $("#main-div").append(fixturesDiv)

    
    //score goals
    // var halfTimeHome = matchesList[i].score.halftime.home;
    // var halfTimeAway = matchesList[i].score.halftime.away;
    // console.log(halfTimeHome);
    // var fullTimeHome = matchesList[i].score.fulltime.home;
    // var fullTimeAway = matchesList[i].score.fulltime.away;
    // console.log(fullTimeHome);



    // s

    //score, goals.

    //venue

    //id for predictions...
    console.log(fixture.id);
  }

  $(".fixture").click(function(){
    var clickedElement = $(this);
    var fixtureId = clickedElement.attr("data-fixtureId")



  })
}).catch((err) => console.error("I am the rror: ", err))
