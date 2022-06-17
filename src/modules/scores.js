const apiURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const gameID = 'nCBklMtLnRcKVwLtTJh8';

const displayScores = (scores) => {
  scores.sort((a, b) => b.score - a.score);
  document.getElementById('allScores').innerHTML = `
  <tr class="tableHeader">
    <td>PLAYER NAME</td>
    <td>PLAYER SCORE</td>
  </tr>
  `;
  let oddEven = '';
  scores.forEach((score, index) => {
    if ((index + 1) % 2 === 0) {
      oddEven = '1';
    } else {
      oddEven = '0';
    }
    document.getElementById('allScores').innerHTML += `
    <tr class="oddEven${oddEven}">
      <td>${score.user}</td>
      <td>${score.score}</td>
    </tr>
    `;
  });

  const allScores = document.querySelectorAll('#allScores tr');
  allScores.forEach((score, index) => {
    score.style.animation = `displayRows 0.5s ease forwards ${index / 7 - 0.5}s`;
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
