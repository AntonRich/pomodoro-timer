var startPauseText = document.getElementById("startPauseText");
var countdown = document.getElementById("countdown");
var timerType; //possible values = work, break

//initial display value of 25 minutes, type = work
window.onload = function(){
  countdown.textContent = "25:00";
  startPauseText.innerHTML = "Start"
};

function startTimer(duration) {
  startPauseText.innerHTML = "Pause";
  var minutes, seconds;
  minutes = Math.floor(duration / 60);
  seconds = duration % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds; //if seconds < 10, add a 0 before (i.e. display 2:01 rather than 2:1);
  countdown.innerHTML = minutes + ":" + seconds;
  duration = duration - 1;
  id = setTimeout(function () {
      startTimer(duration);
  }, 1000);
}

function pauseTimer() {
  startPauseText.textContent = "Start";
  clearTimeout(id);
}

function resetTimer(){
  pauseTimer();
  countdown.textContent = "25:00";
}

//multiple return statements less than ideal, but unsure how to handle this otherwise 
function handleStartPause(){
  var duration = convertToTime(countdown.innerHTML);
  if(startPauseText.textContent === "Start"){
    startTimer(duration);
    return;
  }
  if(startPauseText.textContent === "Pause"){
    pauseTimer();
    return;
  }
}

var startPauseButton = document.getElementById("startPause");
startPauseButton.addEventListener("click", function(){
  handleStartPause();
});

var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function(){
  resetTimer();
});

//input string is of the format xx : yy, returns duration in seconds
function convertToTime(str){
  var minutes = str.substring(0, 2);
  var seconds = str.substring(3, 5);
  var min = parseInt(minutes);
  var sec = parseInt(seconds);
  var duration = (min*60) + sec;
  return duration;
}
