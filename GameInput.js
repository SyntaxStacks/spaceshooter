function GameInput() {
	var inputQueue = [];
	var inputCode = {
		right: 	39,
		left: 37,
		space: 32,
		touch: {
			left:  'left',
			right: 'right',
			shoot: 'shoot'
		}
	}
	this.get = getInputs;
	this.addInput = addInput;

	init();

	function init(){
		document.addEventListener('keydown', processInput, false);
		document.addEventListener('keyup', processInput, false);
	
		var leftElement = document.getElementById('left');
		var rightElement = document.getElementById('right');
		var topElement = document.getElementById('shoot');

	    var leftTouch = Hammer(leftElement).on("touch", processInput).on("release", processInput);
	    var rightTouch = Hammer(rightElement).on("touch", processInput).on("release", processInput);
	    var topTouch = Hammer(topElement).on("touch", processInput).on("release", processInput);

	}

	function getInputs() {
		return inputQueue
	}

	function addInput(event){
		for(var i = 0; i < inputQueue.length; i++){
			if(inputQueue[i].input == event.input){ return;	}
		}
		inputQueue.push(event);
	}

	function removeInput(event){
		for(var i = 0; i < inputQueue.length; i++){
			if(inputQueue[i].input == event.input)
				inputQueue.splice(i,1);
		}
	}

	function processInput(event){
		
		event.preventDefault();

		if(event.type == 'keydown') {
			if(event.keyCode == inputCode.right)
				addInput({input: "RIGHT"});

			if(event.keyCode == inputCode.left)
				addInput({input: "LEFT"});

			if(event.keyCode == inputCode.space)
				addInput({input: "SPACE"});
		}
		else if(event.type == 'keyup') {
			if(event.keyCode == inputCode.right)
				removeInput({input: "RIGHT"});
			if(event.keyCode == inputCode.left)
				removeInput({input: "LEFT"});
			if(event.keyCode == inputCode.space)
				removeInput({input: "SPACE"});
		}
		else if(event.type == 'touch') {
			event.gesture.preventDefault();
			if(event.srcElement.id == inputCode.touch.right)
				addInput({input: "RIGHT"});
			if(event.srcElement.id == inputCode.touch.left)
				addInput({input: "LEFT"});
			if(event.srcElement.id == inputCode.touch.shoot)
				addInput({input: "SPACE"});
		}
		else if(event.type == 'release') {
			if(event.srcElement.id == inputCode.touch.right)				
				removeInput({input: "RIGHT"});
			if(event.srcElement.id == inputCode.touch.left)
				removeInput({input: "LEFT"});
			if(event.srcElement.id == inputCode.touch.shoot)
				removeInput({input: "SPACE"});
		}

		console.log(inputQueue);
	};
}


define(['Hammer'], function(){ return GameInput; });
