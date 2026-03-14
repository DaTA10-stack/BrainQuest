import { supabase } from "./database.js"
import { getUser } from "./auth.js"

export async function saveScore(score){

let user = await getUser()

if(!user){
alert("You must be logged in to save a score.")
return
}

const { data, error } = await supabase
.from("scores")
.insert([
{
user_id: user.id,
score: score
}
])

if(error){
console.error(error)
}
}