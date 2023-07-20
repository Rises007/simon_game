var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour); //In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
    //console.log(userClickedPattern);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {   //this is for checking when the user input array is equal to gamepattern array 
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startover();
  }
}


function startover() {
    level = 0;
    gamePattern = [];
    started = false;
}


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
    //Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed"); 
    setTimeout(function() {
            $("#" + currentColour).removeClass("pressed");
    }, 100);
}

