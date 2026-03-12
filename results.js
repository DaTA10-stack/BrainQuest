let finalScore = localStorage.getItem("finalScore");

document.getElementById("finalScore").textContent = finalScore;

fetch("http://127.0.0.1:5000/leaderboard")

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