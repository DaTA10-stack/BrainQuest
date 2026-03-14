let scores = [];

export default function handler(req, res) {

if (req.method === "POST") {

const { name, score } = req.body;

scores.push({ name, score });

res.status(200).json({ status: "saved" });

}

}