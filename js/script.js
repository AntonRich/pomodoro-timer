var startPauseText = document.getElementById("startPauseText");
var countdown = document.getElementById("countdown");
var timerType; //possible values = work, break (default is work)
var id;

//initial display value of 25 minutes, type = work
window.onload = function(){
  countdown.textContent = "00:03";
  startPauseText.innerHTML = "Start"
  timerType = "work";
};

function loadType(){
  var main = document.getElementById("main");
  if(timerType === "break"){
    main.className += " break-mode";
  }
  if(timerType === "work"){
    main.className = "work-mode";
  }
}

function startTimer(duration) {
  startPauseText.innerHTML = "Pause";
  var minutes, seconds;
  minutes = Math.floor(duration / 60);
  seconds = duration % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds; //if seconds < 10, add a 0 before (i.e. display 2:01 rather than 2:1);
  countdown.innerHTML = minutes + ":" + seconds;
  duration = duration - 1;
  id = setTimeout(function () {
      startTimer(duration);
  }, 1000);

  if(timerType === "work" && (countdown.textContent === "00:00")){
    setTimeout(function(){
      pauseTimer();
      timerType = "break";
      loadType();
      countdown.textContent = "10:00";
      var breaktime = convertToTime(countdown.textContent);
      startTimer(breaktime);
    }, 1000);
  }

}

function pauseTimer() {
  startPauseText.textContent = "Start";
  clearTimeout(id);
}

function resetTimer(){
  pauseTimer();
  countdown.textContent = "00:10";
  timerType = "work";
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
