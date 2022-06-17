import './style.css';
import Scores from './modules/scores.js';

const gameID = 'PGm0dj8ouOmWqOTT75Kk';

const gameForm = document.getElementById('gameForm');
const refreshBtn = document.getElementById('refresh');

gameForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let playerName = document.getElementById('playerName').value;
  let playerScore = document.getElementById('playerScore').value;

  Scores.addScores(playerName, playerScore, gameID);

  playerName = '';
  playerScore = '';
});

refreshBtn.addEventListener('click', Scores.requestScores);

Scores.requestScores();
