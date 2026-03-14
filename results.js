import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabaseUrl = "https://indsorfjcozlnpgijamo.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluZHNvcmZqY296bG5wZ2lqYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0OTk1MjAsImV4cCI6MjA4OTA3NTUyMH0.upc8ooD0ndrWnQV0qnCyO04hMgBqTAepYAud_52OoBU"

const supabase = createClient(supabaseUrl, supabaseKey)

let finalScore = localStorage.getItem("finalScore")

document.getElementById("finalScore").textContent = finalScore

async function loadLeaderboard() {

const { data, error } = await supabase
.from("leaderboard")
.select("*")
.order("score", { ascending: false })
.limit(10)

let leaderboard = document.getElementById("leaderboard")

leaderboard.innerHTML = ""

data.forEach(player => {

let li = document.createElement("li")

li.textContent = player.name + " - " + player.score

leaderboard.appendChild(li)

})

}

loadLeaderboard()