let creations = [];
let time = 0;
let population = 200;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	for(let i = 0; i < population; i++) {
		creations[i] = createThis(i);
	}
}

function draw() {
	background(0);
	
	for(let i = 0; i < creations.length; i++) {
		updateThis(creations[i]);
	}
	
	let j = findStartIndex();
	
	colorMode(HSB);
	for(let i = 0; i < creations.length; i++) {
		drawThis(creations[j]);
		j = findNextIndex(j, i);
	}
	colorMode(RGB);
	
	if (time >= 240 * PI) time = 0; 
	else time++;
		
}

function createThis(index) {
	let creation = {};
	creation.color = random(360);
	
	creation.size = 20;
	creation.initialSize = creation.size;
	
	creation.x = 1;
	creation.y = random(0 + creation.size / 2, height - creation.size / 2);
	
	creation.offset = (index / population) * 2 * PI;
	//if(index == 0 || index == population - 1) creation.initialSize = 70;
	
	return creation;
}

function updateThis(creation) {
	let waveFactor = ((time / 120) + creation.offset) % (2 * PI);
	creation.x = (width / 2) + 600 * cos(waveFactor);
	creation.size =  creation.initialSize * (1 +  0.45 * sin(waveFactor));
}
 
function findStartIndex() {
	let waveFactorZero = ((time / 120) + creations[0].offset) % (2 * PI);
	if(waveFactorZero <= 3*PI/2) {
		for(let i = 0; i < creations.length; i++) {
			let waveFactor = ((time / 120) + creations[i].offset) % (2 * PI);
			if(waveFactor > 3*PI/2) return i;
		}
	}
	else if(waveFactorZero > 3*PI/2) {
		for(let i = creations.length - 1; i >= 0; i--) {
			let waveFactor = ((time / 120) + creations[i].offset) % (2 * PI);
			if(waveFactor < 3*PI/2) return i;
		}
	}
	else {
		return 0;
	}
}

function findNextIndex(currentIndex, stepInLoop) {
	if(stepInLoop % 2 == 0) {
		if(currentIndex + (stepInLoop + 1) > creations.length - 1) return currentIndex + (stepInLoop + 1) - (creations.length - 1);
		else return currentIndex + (stepInLoop + 1);
	}
	else if(stepInLoop % 2 == 1) {
		if(currentIndex - (stepInLoop + 1) < 0) return currentIndex - (stepInLoop + 1) + (creations.length - 1);
		else return currentIndex - (stepInLoop + 1);
	}
	return 0;
}

function drawThis(creation) {
	fill(creation.color, 90, 90);
	circle(creation.x, creation.y, creation.size);
}