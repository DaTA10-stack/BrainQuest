let finalScore = localStorage.getItem("finalScore");

document.getElementById("finalScore").textContent = finalScore;

let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

let leaderboardElement = document.getElementById("leaderboard");

leaderboard.forEach(function(player){

let li = document.createElement("li");

li.textContent = player.name + " - " + player.score;

leaderboardElement.appendChild(li);

});