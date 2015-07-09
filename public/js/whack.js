'use strict';

var userIndex = 0;
var success= [];



function playSound(sound){
    document.getElementById(sound).play();
}

$('#back').click(function(e){
	location.reload(true)
})

$('#go').click(function(e){
    playSound('start');
    success = [];
    $('#score').text('Score: '+ success.length);
    copy();
});

$('#md').click(function(e){
    playSound('start');
    success = [];
    $('#score').text('Score: '+ success.length);
    copy();
    copy();
});

$('#hard').click(function(e){
    playSound('start');
    success = [];
    $('#score').text('Score: '+ success.length);
    copy();
    setInterval(function(){
    	copy();
    },800)
});

function animateMole(id) {
    $('#' + id).addClass('active');
    setTimeout(function(){
        $('#' + id).removeClass('active');
    },800);
};

$('.square').click(function(e){
    var moleClicked = $(this);
    if (moleClicked.hasClass('active')){
        moleClicked.removeClass('active');
        userIndex += 1;
        success.push(userIndex);
        $('#score').text('Score: '+ success.length);
        playSound('moveOn');
        
        if (userIndex >= 1){
            userIndex = 0;

        }
        if(success.length == 25){
			alert('WINNER!');
			location.reload(true);
		}
	
    } else {
        playSound('fail');
        success.shift();
        $('#score').text('Score: '+ success.length);
        if (success.length <= 0) {
        	alert('fail');
       		location.reload(true)
        };
    }
    

});

function getRandomMole() {
	var intervalId = setInterval(function(){
	    var mole = $('.square');
	    var rand = Math.floor(Math.random()*9);
	    var buttonToAnimate = mole[rand];
	    var id = buttonToAnimate.getAttribute('id');
    
    	animateMole(id);
    },1500);

}

function copy() {
	var i = 0;
    getRandomMole();
};


(function(){
    var konamiCode = "38,38,40,40,37,39,37,39,66,65,13";
    var code = [];
    $(document).keyup(function(event){
        console.log(event.keyCode);
        code.push(event.keyCode);
        if (code.toString().indexOf(konamiCode) >= 0){
            playSound('woot');
        }
    })
})();
(function(){
    var konamiCode = "40,40,38,38,39,37,39,37,65,66,13";
    var code = [];
    $(document).keyup(function(event){
        console.log(event.keyCode);
        code.push(event.keyCode);
        if (code.toString().indexOf(konamiCode) >= 0){
            playSound('chipper');
        }
    })
})();