var startPauseText = document.getElementById("startPauseText");
var countdown = document.getElementById("countdown");
var duration;

//initial display value of 25 minutes, type = work
window.onload = function(){
  countdown.textContent = "25:00";
  startPauseText.innerHTML = "Start"
};

function startTimer(duration) {
  startPauseText.innerHTML = "Pause";

  var time = duration;
  var minutes, seconds;
  minutes = parseInt(time / 60, 10)
  seconds = parseInt(time % 60, 10);

  minutes = Math.floor(time / 60);
  seconds = time % 60;
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

function handleStartPause(){
  var duration = convertToTime(countdown.innerHTML);
  if(startPauseText.textContent === "Start"){
    console.log(duration);
    startTimer(duration);
    return;
  }

  if(startPauseText.textContent === "Pause"){
    duration = convertToTime(countdown.innerHTML);
    console.log(duration);
    pauseTimer();
    return;
  }
}

var startPauseButton = document.getElementById("startPause");
startPauseButton.addEventListener("click", function(){
  handleStartPause();
});


//input string is of the format xx : yy, returns duration in seconds
function convertToTime(str){
  var minutes = str.substring(0, 2);
  var seconds = str.substring(3, 5);
  console.log(str.length);
  var min = parseInt(minutes);
  var sec = parseInt(seconds);
  var duration = (min*60) + sec;
  return duration;
}
