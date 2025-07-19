let randomNumber = Math.floor(Math.random() * 100) + 1;
let guesses = [];
let remainingGuesses = 10;
let playGame = true;

const guessField = document.getElementById('guessField');
const submitButton = document.getElementById('subt');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const feedback = document.getElementById('feedback');
const resultParas = document.querySelector('.resultParas');
const themeToggle = document.getElementById('themeToggle');

function updateDisplay() {
  guessSlot.textContent = guesses.length > 0 ? guesses.join(', ') : 'None';
  remaining.textContent = remainingGuesses;
}

function showMessage(message, isWin = false) {
  lowOrHi.textContent = message;
  lowOrHi.style.color = isWin ? 'lightgreen' : 'var(--warn)';
}

function endGame(message, isWin = false) {
  guessField.disabled = true;
  submitButton.disabled = true;
  showMessage(message, isWin);

  const newGameBtn = document.createElement('p');
  newGameBtn.textContent = "🔁 Start New Game";
  newGameBtn.id = "newGame";
  resultParas.appendChild(newGameBtn);

  newGameBtn.addEventListener('click', () => {
    resetGame();
  });

  playGame = false;
}

function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  guesses = [];
  remainingGuesses = 10;
  playGame = true;

  guessField.disabled = false;
  submitButton.disabled = false;
  guessField.value = '';
  lowOrHi.textContent = '';
  feedback.textContent = '';
  const newGameBtn = document.getElementById('newGame');
  if (newGameBtn) newGameBtn.remove();

  updateDisplay();
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    feedback.textContent = 'Please enter a valid number.';
    return false;
  } else if (guess < 1 || guess > 100) {
    feedback.textContent = 'Enter a number between 1 and 100.';
    return false;
  }
  feedback.textContent = '';
  return true;
}

function handleGuess(e) {
  e.preventDefault();

  const guess = parseInt(guessField.value);
  if (!validateGuess(guess)) return;

  guesses.push(guess);
  remainingGuesses--;
  updateDisplay();

  if (guess === randomNumber) {
    endGame(`🎉 You guessed it right! The number was ${randomNumber}`, true);
  } else if (remainingGuesses === 0) {
    endGame(`💀 Game Over! The number was ${randomNumber}`);
  } else {
    showMessage(guess < randomNumber ? '📉 Too low! Try again.' : '📈 Too high! Try again.');
  }

  guessField.value = '';
}

if (playGame) {
  submitButton.addEventListener('click', handleGuess);
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

updateDisplay();
