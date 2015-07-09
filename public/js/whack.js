'use strict';

var userIndex = 0;
var success= [];
var gameTimer = 30;

//sets timer, timer starts with click of difficulty selector
function timeIt(){
	var intervalId = setInterval(function(){
		gameTimer-=1;
		document.getElementById('timer').innerHTML = gameTimer.toString();
		if (gameTimer <= 0){
			alert('Game Over');
			location.reload(true);
		}
	},1000)
};

//sets sound function to be called in corresponding clicks
function playSound(sound){
    document.getElementById(sound).play();
}

//reset button refreshes
$('#back').click(function(e){
	location.reload(true)
})

//difficulty slectors
//normal
$('#go').click(function(e){
    playSound('start');
    success = [];
    //begins score at 0
    $('#score').text('Score: '+ success.length);
    copy();
    timeIt();
});
//medium
$('#md').click(function(e){
    playSound('start');
    success = [];
    $('#score').text('Score: '+ success.length);
    copy();
    copy();
    timeIt();
});
//hard mode, not timed
$('#hard').click(function(e){
    playSound('start');
    success = [];
    $('#score').text('Score: '+ success.length);
    copy();
    //increases speed and number of active moles
    setInterval(function(){
    	copy();
    },800)
});

//tells random moles how to animate
function animateMole(id) {
    $('#' + id).addClass('active');
    setTimeout(function(){
        $('#' + id).removeClass('active');
    },800);
};

//tells page to listen for click on activated moles and to act in appropriate manner
$('.square').click(function(e){
    var moleClicked = $(this);
    if (moleClicked.hasClass('active')){
        moleClicked.removeClass('active');
        //adds score
        userIndex += 1;
        success.push(userIndex);
        //keeps score
        $('#score').text('Score: '+ success.length);
        playSound('moveOn');
        if (userIndex >= 1){
            userIndex = 0;
        }
        //sets win conditions
        if(success.length == 15){
        	playSound('won')
			alert('WINNER!');
			location.reload(true);
		}
    } else {
        playSound('fail');
        //detracts points
        success.shift();
        $('#score').text('Score: '+ success.length);
        //set loss conditions
        if (success.length <= 0) {
        	playSound('lose')
        	alert('FAIL!!!!');
       		location.reload(true)
        };
    }
});

//gets mole and tells to animate
function getRandomMole() {
	var intervalId = setInterval(function(){
	    var mole = $('.square');
	    var rand = Math.floor(Math.random()*9);
	    var buttonToAnimate = mole[rand];
	    var id = buttonToAnimate.getAttribute('id');
    	animateMole(id);
    },1500);

}

//begins game upon clicking difficulty selectors
function copy() {
	var i = 0;
    getRandomMole();
};

//easter eggs
(function(){
    var konamiCode = "38,38,40,40,37,39,37,39,66,65,13";
    var code = [];
    $(document).keyup(function(event){
        console.log(event.keyCode);
        code.push(event.keyCode);
        if (code.toString().indexOf(konamiCode) >= 0){
            playSound('woot');
        };
    });
})();
(function(){
    var konamiCode = "40,40,38,38,39,37,39,37,65,66,13";
    var code = [];
    $(document).keyup(function(event){
        console.log(event.keyCode);
        code.push(event.keyCode);
        if (code.toString().indexOf(konamiCode) >= 0){
            playSound('chipper');
        };
    });
})();