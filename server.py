from flask import Flask, request, jsonify

app = Flask(__name__)

leaderboard = []


@app.route("/")
def home():
    return "BrainQuest Server Running"


@app.route("/submit-score", methods=["POST"])
def submit_score():

    data = request.get_json()

    name = data["name"]
    score = data["score"]

    leaderboard.append({
        "name": name,
        "score": score
    })

    leaderboard.sort(key=lambda x: x["score"], reverse=True)

    return jsonify({"status": "success"})


@app.route("/leaderboard")
def get_leaderboard():

    return jsonify(leaderboard)


if __name__ == "__main__":
    app.run(debug=True)