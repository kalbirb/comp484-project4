const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
let time = [5,10,50];


// Add leading zero to numbers 9 or below (purely for aesthetics):
function format(num) {
  return num < 10 ? "0" + num : num;
}

// Run a standard minute/second/hundredths timer:
window.onload = function () {
    timer();
};
function timer(){
    let [min, sec, hundredths] = time;
    var timer = setInterval(function(){
        theTimer.innerHTML= `${format(min)}:${format(sec)}:${format(hundredths)}`;
        hundredths--;
        if (min > 0 && sec === 0){
            min--;
            sec = 59;
        }

        if (sec > 0 && hundredths === 0) {
            sec--;
            hundredths = 99;
        }
        if (hundredths < 0) {
            clearInterval(timer);
        }
    }, 10);
}

// Match the text entered with the provided text on the page:
function checkInput() {

  let textMatch = originText.substring(0, testArea.value.length);

  if (testArea.value === originText) {
    //clearInterval(interval);
    testWrapper.style.borderColor = "green";
    saveScore();
  } else if (testArea.value === textMatch) {
    testWrapper.style.borderColor = "blue";
  } else {
    testWrapper.style.borderColor = "red";
    // errorCount++;
    // updateErrors();
  }
}

// Start the timer:
function startTyping() {
//   if (!timerRunning) {
//     interval = setInterval(runTimer, 10);
//     timerRunning = true;
//   }

  checkInput();
}


// Reset everything:
function reset(){
    
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("input", startTyping);
resetButton.addEventListener('click', reset);