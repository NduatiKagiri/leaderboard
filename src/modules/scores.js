const apiURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const gameID = 'PGm0dj8ouOmWqOTT75Kk';

const displayScores = (scores) => {
  document.getElementById('allScores').innerHTML = '';
  scores.forEach((score) => {
    document.getElementById('allScores').innerHTML += `
    <tr>
      <td>${score.user}: ${score.score}</td>
    </tr>
    `;
  });
};

const saveScores = async (playerName, playerScore, id) => {
  const response = await fetch(`${apiURL}/games/${id}/scores/`, {
    method: 'POST',
    body: JSON.stringify({
      user: playerName,
      score: Number(playerScore),
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  await response.json();
};

const getScores = async () => {
  const response = await fetch(`${apiURL}/games/${gameID}/scores/`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const scores = await response.json();
  displayScores(scores.result);
};

export default class Scores {
  constructor() {
    return null;
  }

  static addScores(playerName, playerScore, id) {
    saveScores(playerName, playerScore, id);
  }

  static requestScores() {
    getScores();
  }
}
