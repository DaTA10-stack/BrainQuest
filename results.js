let finalScore = localStorage.getItem("finalScore");

document.getElementById("finalScore").textContent = finalScore;

fetch("/api/leaderboard")

.then(function(response){
return response.json();
})

.then(function(data){

let leaderboardElement = document.getElementById("leaderboard");

leaderboardElement.innerHTML = "";

data.forEach(function(player){

let li = document.createElement("li");

li.textContent = player.name + " : " + player.score;

leaderboardElement.appendChild(li);

});

});