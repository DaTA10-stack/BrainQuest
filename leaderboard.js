document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("leaderboardList");

    // 1. Fetch data from your Flask server
    fetch("http://127.0.0.1:5000/leaderboard")
        .then(response => response.json())
        .then(data => {
            // 2. Clear any existing content
            list.innerHTML = "";

            // 3. Loop through the players and add them to the list
            data.forEach(entry => {
                const li = document.createElement("li");
                li.textContent = `${entry.name}: ${entry.score} pts`;
                list.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error loading leaderboard:", error);
            list.innerHTML = "<li>Could not load leaderboard.</li>";
        });
});
