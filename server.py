from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "BrainQuest Server Running"


@app.route("/submit-score", methods=["POST"])
def submit_score():

    data = request.get_json()

    name = data["name"]
    score = data["score"]

    conn = sqlite3.connect("brainquest.db")

    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO leaderboard (name, score) VALUES (?, ?)",
        (name, score)
    )

    conn.commit()

    conn.close()

    return jsonify({"status":"success"})


@app.route("/leaderboard")
def get_leaderboard():

    conn = sqlite3.connect("brainquest.db")

    cursor = conn.cursor()

    cursor.execute(
        "SELECT name, score FROM leaderboard ORDER BY score DESC LIMIT 10"
    )

    rows = cursor.fetchall()

    conn.close()

    leaderboard = []

    for row in rows:

        leaderboard.append({
            "name": row[0],
            "score": row[1]
        })

    return jsonify(leaderboard)


@app.route("/reset-db")
def reset_db():
    conn = sqlite3.connect("brainquest.db")
    cursor = conn.cursor()
    # This deletes all rows from the table
    cursor.execute("DELETE FROM leaderboard")
    conn.commit()
    conn.close()
    return "Leaderboard cleared successfully!"


def init_db():

    conn = sqlite3.connect("brainquest.db")

    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS leaderboard (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        score INTEGER
    )
    """)

    conn.commit()

    conn.close()

if __name__ == "__main__":

    init_db()

    app.run(debug=True, port=5000)