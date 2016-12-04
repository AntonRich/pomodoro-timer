//initial display value of 25 minutes, type = work
window.onload = function(){
  var countdown = document.getElementById("countdown");
  countdown.innerHTML = "25:00";
  var startPauseText = document.getElementById("startPauseText");
  startPauseText.innerHTML = "Start"
};

var tick;

function startTimer(duration) {
  var startPauseText = document.getElementById("startPauseText");
  startPauseText.innerHTML = "Pause";

  var minutes, seconds;

  tick = setInterval(function() {
    minutes = parseInt(duration / 60, 10);
    seconds = parseInt(duration % 60, 10);
    seconds = seconds < 10 ? "0" + seconds : seconds; //if seconds < 10, add a 0 before (i.e. display 2:01 rather than 2:1);
    countdown.innerHTML = minutes + ":" + seconds;
    duration--;
  }, 1000);

  tick();

}

function pauseTimer() {
  clearTimeout(tick);
  var startPauseText = document.getElementById("startPauseText");
  startPauseText.innerHTML = "Start";
}

var startPauseButton = document.getElementById("startPause");
startPauseButton.addEventListener("click", function(){
  var startPauseText = document.getElementById("startPauseText");
  if(startPauseText.innerHTML === "Start"){
    var countdown = document.getElementById("countdown");
    var duration = convertToTime(countdown.innerHTML);
    startTimer(duration);
  }
  if(startPauseText.innerHTML === "Pause"){
    pauseTimer();
  }
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
