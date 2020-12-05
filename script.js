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
})
  .then((res) => console.log("I am the res: ", res.response[0].fixture.id))
  .catch((err) => console.log);
