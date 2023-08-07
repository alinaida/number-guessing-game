// Generate a random number between 1 and 100 as the secret number
let secretNumber = Math.floor(Math.random() * 100) + 1;

// Initialize attempts counter, maximum attempts allowed, and an array to store previous guesses
let attempts = 0;
const maxAttempts = 5;
const previousGuesses = [];

// Array of confetti colors used when the user guesses the correct number
const confettiColors = ['#FFA726', '#4CAF50', '#FFD54F', '#03A9F4', '#E91E63', '#9C27B0'];

// Function to check the user's guess
function checkGuess() {
    // Get the user's guess from the input field
    const guessInput = document.getElementById("guessInput");
    const guess = parseInt(guessInput.value);

    // Check if the guess is valid (between 1 and 100)
    if (isNaN(guess) || guess < 1 || guess > 100) {
        setMessage("Please enter a valid number between 1 and 100.");
        return;
    }

    // Increment attempts counter and store the guess in the previousGuesses array
    attempts++;
    previousGuesses.push(guess);

    // Compare the guess with the secret number and display the appropriate message
    const message = compareGuess(guess);
    setMessage(message);

    // If the user guessed the correct number, show confetti and disable input and button
    if (guess === secretNumber) {
        showConfetti();
        disableInputAndButton();
        showRestartButton();
    }
    // If the maximum number of attempts is reached, disable input and button
    else if (attempts === maxAttempts) {
        disableInputAndButton();
        showRestartButton();
    }

    // Clear the input field after checking the guess
    clearInput();
}

// Function to compare the user's guess with the secret number and return the appropriate message
function compareGuess(guess) {
    if (guess === secretNumber) {
        return `Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts.`;
    } else if (attempts === maxAttempts) {
        return `Game Over! The secret number was ${secretNumber}.`;
    } else {
        const hint = guess > secretNumber ? "too high" : "too low";
        const remainingAttempts = maxAttempts - attempts;
        const attemptsText = remainingAttempts === 1 ? "attempt" : "attempts";
        const previousGuessesMessage = previousGuesses.join(", ");
        return `Wrong guess! Previous guesses: ${previousGuessesMessage}. Hint: Your guess is ${hint}. ${remainingAttempts} ${attemptsText} remaining.`;
    }
}

// Function to display a message to the user
function setMessage(message) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
}

// Function to disable the input field and submit button
function disableInputAndButton() {
    const guessInput = document.getElementById("guessInput");
    const submitButton = document.querySelector("button");
    guessInput.disabled = true;
    submitButton.disabled = true;
}

// Function to display confetti when the user guesses the correct number
function showConfetti() {
    const confettiContainer = document.getElementById("confetti-container");
    const numberOfConfetti = 100; // You can adjust the number of confetti particles

    for (let i = 0; i < numberOfConfetti; i++) {
        const confettiPiece = document.createElement("div");
        confettiPiece.classList.add("confetti");
        confettiPiece.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        confettiPiece.style.animationDuration = `${Math.random() * 3 + 1}s`; // Random falling speed
        confettiPiece.style.animationDelay = `${Math.random() * 2}s`; // Random delay before falling

        // Randomly select a color from the confettiColors array
        const randomColorIndex = Math.floor(Math.random() * confettiColors.length);
        confettiPiece.style.backgroundColor = confettiColors[randomColorIndex];

        confettiContainer.appendChild(confettiPiece);
    }
}

// Function to show the restart button when the game ends
function showRestartButton() {
    const restartButton = document.getElementById("restartButton");
    restartButton.style.display = "block";
}

// Function to restart the game when the restart button is clicked
function restartGame() {
    // Reset attempts and previous guesses, and generate a new secret number
    attempts = 0;
    previousGuesses.length = 0;
    secretNumber = Math.floor(Math.random() * 100) + 1;

    // Enable the input field and submit button, and reset the input field value and message
    const guessInput = document.getElementById("guessInput");
    const submitButton = document.querySelector("button");
    guessInput.disabled = false;
    submitButton.disabled = false;
    guessInput.value = "";
    setMessage("Guess a number between 1 and 100:");
    hideRestartButton();

    // Remove confetti if present
    const confettiContainer = document.getElementById("confetti-container");
    while (confettiContainer.firstChild) {
        confettiContainer.removeChild(confettiContainer.firstChild);
    }
}

// Function to hide the restart button
function hideRestartButton() {
    const restartButton = document.getElementById("restartButton");
    restartButton.style.display = "none";
}

// Add event listener for the "keyup" event on the input field
const guessInput = document.getElementById("guessInput");
guessInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

// Function to clear the input field
function clearInput() {
    guessInput.value = "";
}
