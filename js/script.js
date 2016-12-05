var startPauseText = document.getElementById("startPauseText");
var countdown = document.getElementById("countdown");
var title = document.getElementById("title");
var sessionLength = document.getElementById("sessionLength");
var breakLength = document.getElementById("breakLength");

var timerType; //possible values = session, break (default is session)
var id;
var initialSessionTime;
var initialBreakTime;


//initial display value of 25 minutes, type = session
window.onload = function(){
  countdown.textContent = "00:03";
  sessionLength.textContent = "25";
  initialSessionTime = countdown.textContent;

  breakLength.textContent = "10";
  initialBreakTime = "10:00";

  startPauseText.innerHTML = "Start"
  timerType = "session";
  loadType();
};

function loadType(){
  var main = document.getElementById("main");
  if(timerType === "session"){
    main.className = "session-mode";
    title.textContent = "Session";
  }
  if(timerType === "break"){
    main.className += " break-mode";
    title.innerHTML = "Break";
  }
}

function startTimer(duration) {
  startPauseText.innerHTML = "Pause";
  countdown.innerHTML = convertToString(duration);
  // var minutes, seconds;
  // minutes = Math.floor(duration / 60);
  // seconds = duration % 60;
  // minutes = minutes < 10 ? "0" + minutes : minutes;
  // seconds = seconds < 10 ? "0" + seconds : seconds; //if seconds < 10, add a 0 before (i.e. display 2:01 rather than 2:1);
  // countdown.innerHTML = minutes + ":" + seconds;
  duration = duration - 1;
  id = setTimeout(function () {
      startTimer(duration);
  }, 1000);

  if(timerType === "session" && (countdown.textContent === "00:00")){
    setTimeout(function(){
      pauseTimer();
      timerType = "break";
      loadType();
      countdown.textContent = initialBreakTime;
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
  if(timerType === "session"){
    countdown.textContent = initialSessionTime;
  }
  if(timerType === "break"){
    countdown.textContent = initialBreakTime;
  }
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
  timerType = "session";
  loadType();
});

//Add time, subtract time functions
var sessionPlus = document.getElementById("sessionPlus");
sessionPlus.addEventListener("click", function(){
  resetTimer();
  var currentValue = convertToTime(initialSessionTime);
  currentValue += 60;
  initialSessionTime = convertToString(currentValue);
  countdown.innerHTML = initialSessionTime;
  if(initialSessionTime.charAt(0) !== "0"){
    sessionLength.textContent = initialSessionTime.substring(0,2);
  } else {
    sessionLength.textContent = initialSessionTime.substring(1,2);
  }
});

var sessionMinus = document.getElementById("sessionMinus");
sessionMinus.addEventListener("click", function(){
  resetTimer();
  var currentValue = convertToTime(initialSessionTime);
  currentValue -= 60;
  initialSessionTime = convertToString(currentValue);
  countdown.innerHTML = initialSessionTime;
  if(initialSessionTime.charAt(0) !== "0"){
    sessionLength.textContent = initialSessionTime.substring(0,2);
  } else {
    sessionLength.textContent = initialSessionTime.substring(1,2);
  }
});

//Add time, subtract time functions
var breakPlus = document.getElementById("breakPlus");
breakPlus.addEventListener("click", function(){
  resetTimer();
  var currentValue = convertToTime(initialBreakTime);
  currentValue += 60;
  initialBreakTime = convertToString(currentValue);

  if(timerType === "break"){
    countdown.innerHTML = initialBreakTime;
  }

  if(initialBreakTime.charAt(0) !== "0"){
    breakLength.textContent = initialBreakTime.substring(0,2);
  } else {
    breakLength.textContent = initialBreakTime.substring(1,2);
  }
});

var breakMinus = document.getElementById("breakMinus");
breakMinus.addEventListener("click", function(){
  resetTimer();
  var currentValue = convertToTime(initialBreakTime);
  currentValue -= 60;
  initialBreakTime = convertToString(currentValue);

  if(timerType === "break"){
    countdown.innerHTML = initialBreakTime;
  }

  if(initialBreakTime.charAt(0) !== "0"){
    breakLength.textContent = initialBreakTime.substring(0,2);
  } else {
    breakLength.textContent = initialBreakTime.substring(1,2);
  }
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
//input number of seconds and convert that to a string formatted mm:ss
function convertToString(seconds){
  var min, sec;
  min = Math.floor(seconds / 60);
  sec = seconds % 60;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec; //if seconds < 10, add a 0 before (i.e. display 2:01 rather than 2:1);
  return min + ":" + sec;
}
