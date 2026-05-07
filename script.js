const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
let originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const stats = document.querySelector("#stats");
let time = [0, 0, 0];
let complete = false;
let errorCount = 0;
let prevLength = 0;
const paragraphs = [
  "The quick brown fox jumps over the lazy dog without hesitation or fear of failure.",

  "Typing tests are a great way to improve speed, accuracy, and overall keyboard fluency over time.",

  "Consistency matters more than speed when learning any new skill, especially typing and programming.",

  "You should focus on accuracy first, then gradually increase your words per minute as you improve.",

  "Small habits practiced daily will compound into significant long-term improvements in performance."
];
// Add leading zero to numbers 9 or below (purely for aesthetics):
function format(num) {
  return num < 10 ? "0" + num : num;
}

window.onload = function () {
  document.querySelector("#origin-text p").innerHTML = getRandomParagraph();
  originText = document.querySelector("#origin-text p").innerHTML;
};
// Run a standard minute/second/hundredths timer:
function timer() {
  let [min, sec, hundredths] = time;
  var timer = setInterval(function () {
    theTimer.innerHTML = `${format(min)}:${format(sec)}:${format(hundredths)}`;
    const elapsedSecs = time[0] * 60 + time[1] + time[2] / 100;
    stats.innerText =
      (elapsedSecs > 0
        ? Math.round(testArea.value.length / 5 / (elapsedSecs / 60))
        : 0) +
      " WPM " +
      `Errors: ${errorCount}`;
    hundredths++;
    if (hundredths >= 100) {
      hundredths = 0;
      sec++;
      if (sec >= 60) {
        sec = 0;
        min++;
      }
    }
    time = [min, sec, hundredths];
    if (complete) {
      clearInterval(timer);
    }
  }, 10);
}

// Match the text entered with the provided text on the page:
function checkInput() {
  let textMatch = originText.substring(0, testArea.value.length);
  if (complete) return;
  timer();
  if (testArea.value === originText) {
    testWrapper.style.borderColor = "green";
    saveScore();
  } else if (testArea.value === textMatch) {
    testWrapper.style.borderColor = "blue";
    prevLength = testArea.value.length;
  } else {
    testWrapper.style.borderColor = "red";
    for (let i = 0; i < testArea.value.length; i++) {
      if (i >= prevLength && testArea.value[i] !== originText[i]) {
        errorCount++;
      }
    }
    prevLength = testArea.value.length;
  }
}
function saveScore() {
  complete = true;
  testArea.placeholder = "Why are you here? Hit Reset and try again";
  // Get existing scores from localStorage
  let scores = JSON.parse(localStorage.getItem("fastestScores")) || [];

  // Add new score
  scores.push(time);

  // Sort scores ascending (smaller time = faster)
  scores.sort((a, b) => {
    const timeA = a[0] * 60 * 100 + a[1] * 100 + a[2];
    const timeB = b[0] * 60 * 100 + b[1] * 100 + b[2];

    return timeA - timeB;
  });

  // Keep only top 3
  scores = scores.slice(0, 3);

  // Save back to localStorage
  localStorage.setItem("fastestScores", JSON.stringify(scores));

  // Refresh display
  displayScores();
}
function displayScores() {
  const scoreList = document.getElementById("score-list");

  // Get scores from localStorage
  const scores = JSON.parse(localStorage.getItem("fastestScores")) || [];

  // Clear existing list
  scoreList.innerHTML = "";

  // Display scores
  scores.forEach((score) => {
    const li = document.createElement("li");
    li.textContent = `${format(score[0])}:${format(score[1])}:${format(score[2])}`;
    scoreList.appendChild(li);
  });
}

// Start the timer:
function startTyping() {
  checkInput();
}
// Math Randomization Presentation
function getRandomParagraph() {
  const index = Math.floor(Math.random() * paragraphs.length);
  return paragraphs[index];
}

// Reset everything:
function reset() {
  // time = [0, 0, 0];
  // complete = false;
  // testArea.value = "";
  location.reload();
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("input", startTyping);
resetButton.addEventListener("click", reset);
// Paste prevention Presentation
testArea.addEventListener("paste", function (e) {
  e.preventDefault();
  alert("Pasting is not allowed.");
});
