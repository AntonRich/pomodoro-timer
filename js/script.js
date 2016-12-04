//initial display value of 25 minutes, type = work
window.onload = function(){
  var countdown = document.getElementById("countdown");
  countdown.innerHTML = "25:00";
  var startPauseText = document.getElementById("startPauseText");
  startPauseText.innerHTML = "Start"
};

function startTimer(duration) {
  var startPauseText = document.getElementById("startPauseText");
  startPauseText.innerHTML = "Pause";

  var time = duration;
  var minutes, seconds;

  setInterval(function() {
    minutes = Math.floor(time / 60);
    seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds; //if seconds < 10, add a 0 before (i.e. display 2:01 rather than 2:1);
    countdown.innerHTML = minutes + ":" + seconds;
    time--;
  }, 1000);
}

function pauseTimer() {
  var countdown = document.getElementById("countdown");
  var currentTime = countdown.innerHTML;

  var startPauseText = document.getElementById("startPauseText");
  startPauseText.innerHTML = "Start";
}

function handleStartPause(){
  var startPauseText = document.getElementById("startPauseText");

  if(startPauseText.textContent === "Start"){
    startPauseText.textContent = "Pause";
    var countdown = document.getElementById("countdown");
    var duration = convertToTime(countdown.innerHTML);
    startTimer(duration);
    return;
  }
  if(startPauseText.textContent === "Pause"){
    pauseTimer();
  }
}

var startPauseButton = document.getElementById("startPause");
startPauseButton.addEventListener("click", function(){
  handleStartPause();
});


//input string is of the format xx : yy, returns duration in seconds
function convertToTime(str){
  var minutes = str.substring(0, 2);
  var seconds = str.substring(3, str.length - 1);
  var min = parseInt(minutes);
  var sec = parseInt(seconds);
  var duration = (min*60) + sec;
  return duration;
}
