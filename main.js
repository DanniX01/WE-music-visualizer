var smoothA = [];
var smoothB = [];
var smoothC = [];
var barSmooth = [];
var audioSample = [];
var particles = {};
var particleIndex = 0;
var particleNum = 4;
var bgImg = new Image();
var barColor = '#000';
var circleColor = '#000';
var particleFillbool = 'false';
var particleColor = '#000';
var particleBordercolor = '#000';
var barSize = 1;
var playbackincrement;
var centerstyle;

for (var i = 0; i < 128; i++) {
	smoothA[i] = 0;
	smoothB[i] = 0;
	smoothC[i] = 0;
	barSmooth[i] = 0;
	audioSample[i] = 0;
}

function printText(text,value,order){
	//ctx.fillStyle = "black";
	//ctx.fillText(text+' '+value,50,50+(order*10));
};
window.wallpaperPropertyListener = {
	applyUserProperties: function (properties) {
		if(properties.theme){
			if(properties.theme.value === 1){
				barColor = '#000';
				circleColor = '#000';
				particleColor = '#000';
				barSize = 1;
				bgImg.src = "00galaxy.jpg";
			}
			if (properties.theme.value === 0){
				barColor = '#000';
				circleColor = '#000';
				particleColor = '#000';
				barSize = 1;
				bgImg.src = '00galaxy.jpg';
			}
		}

		if (properties.customimage) {
			bgImg.src = '00galaxy.jpg';
			//bgImg.src = 'file:///' + properties.customimage.value;
		}
		
		if (properties.barcolor) {
			var a = properties.barcolor.value.split(' ');
			a = a.map(function (c) {
				return Math.ceil(c * 255);
			});
			barColor = 'rgb(' + a.join() + ')';
		}
		if (properties.circlecolor) {
			var a = properties.circlecolor.value.split(' ');
			a = a.map(function (c) {
				return Math.ceil(c * 255);
			});
			circleColor = 'rgb(' + a.join() + ')';
		}
		if (properties.particlecolor) {
			var a = properties.particlecolor.value.split(' ');
			a = a.map(function (c) {
				return Math.ceil(c * 255);
			});
			particleColor = 'rgb(' + a.join() + ')';
		}
		if (properties.particlebordercolor) {
			var a = properties.particlebordercolor.value.split(' ');
			a = a.map(function (c) {
				return Math.ceil(c * 255);
			});
			particleBordercolor = 'rgb(' + a.join() + ')';
		}
		if (properties.particlefillbool) {
			particleFillbool = properties.particlefillbool.value;
		}
		
		if (properties.barsize){
			barSize = properties.barsize.value;
		}
		if (properties.estilo){
			centerstyle = properties.estilo.value;
			var vidx = document.getElementById("v");
			var viddos = document.getElementById("v2");
			/*if(centerstyle == 0){
				
				viddos.src = "dxl4.webm";
				vidx.src = "dxl.webm";
			} else if(centerstyle == 1){
				
				viddos.src = "dx l_Glow.webm";
				vidx.src = "dxl5.1.webm";

			}*/
		}
		
	}
};

function wallpaperAudioListener(audioArray) {

	for(var i = 0; i < 64;i++){
		smoothA[i] = smoothB[i];
		smoothB[i] = smoothC[i];
		if(audioArray[i]>1){
			audioArray[i] = 1;
		}
		smoothC[i] = audioArray[i];
		barSmooth[i] = (smoothA[i] + smoothB[i] + smoothC[i]) / 3;
		barSmooth[64+i]= barSmooth[i];
	}
	audioSample = barSmooth;
}

function vel(vaa){
	var vid = document.getElementById("v");
	var vid2 = document.getElementById("v2");
	
	playbackincrement = vaa/5;
	/*if(vaa>=10){

		playbackincrement = 2+(vaa/20);
	}
	else if(vaa>=5){
		playbackincrement = 1+(vaa/20);

	}
	else {
		playbackincrement = 0.5+(vaa/20);

	}*/
	vid.playbackRate = playbackincrement;
	vid2.playbackRate = playbackincrement;
	printText("PlayBackRate",playbackincrement,3);
	
}

function speedx(vaa){


	var viddiv = document.getElementById("vid");
	var vid = document.getElementById("v");
	//var lbl = document.getElementById("test");
	var vid2 = document.getElementById("v2");
	////lbl.innerHTML = vaa;
	vid.width = (480)+(vaa*30);
	vid2.width = (480)+(vaa*30);
	vid.align = "center";
	vid2.align = "center";
	vid2.style.opacity = 0;
	if(vaa>=5){
		vid2.style.opacity = vaa/10;
	}
	
	if(vaa>=2){
	var startX = 0,
      startY = 0,
      startAngle = 0;
	var randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  viddiv.style.transitionDuration = "0.03s";
	viddiv.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';
	var randomX = randomInt(-vaa*0.7, vaa*0.7);
      var randomY = randomInt(-vaa*0.7, vaa*0.7);
	viddiv.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';
	}
	
}
function run(){
	
	
	window.requestAnimationFrame(run);

	var x = canvas.width/2;
	var y = canvas.height/2;
	var r = 0;
	var radian= 0;
	var num = 0;
	var i = 0;
	var avg = (audioSample[0] + audioSample[1] + audioSample[2]) * 10 + 1;
	var maxHeight = 300;
	var minHeight = 80 + avg;
	var radius = 64 + avg;
	ctx.clearRect(0, 0, canvas.height, canvas.width);
	if (bgImg.src != 'file:///null' && bgImg.src != 'file:///' && bgImg.src != 'file:///undefined') {
		var intd = ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
	}
	else{
		ctx.beginPath();
		ctx.rect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "gray";
		ctx.fill();
	}
	//ctx.fillStyle = "black";
	//ctx.fillText('AudioVar: '+avg,50,50);
	//ctx.fillText('ParticleColor: '+particleBordercolor,50,90);
	/*for(var degree = 45; degree < 405; degree = degree + 2.8125){
		
		var radian = degree * Math.PI/180;
		var minRX= minHeight * Math.cos(radian);
		var minRY= minHeight * Math.sin(radian);

		var maxRX = maxHeight * Math.cos(radian);
		var maxRY = maxHeight * Math.sin(radian);

		var barSampleX = maxRX * audioSample[i];
		var barSampleY = maxRY * audioSample[i];
		
		ctx.beginPath();
		ctx.moveTo(x + minRX, y + minRY);
		ctx.lineTo(x + minRX + barSampleX, y + minRY + barSampleY);
		ctx.strokeStyle = barColor;
		ctx.lineWidth = barSize;
		//ctx.stroke();
		i++;
	}*/

	Particle.prototype.draw = function(){
		this.x += this.vx;
		this.y += this.vy;
		this.life++;
		
		if(this.life >= this.maxLife){
			delete particles[this.id];
		}

		ctx.beginPath();
		
		//if(this.id%2==0){
			ctx.arc(this.x , this.y, this.radius, 0, 2 * Math.PI);
			

		//}
		//else {
			//ctx.rect(this.x , this.y,this.radius,this.radius);
		//}
			//ctx.rect(this.x , this.y,3,this.radius,this.radius);
		/*if(particleFillbool){
			ctx.fillStyle = particleColor;
			ctx.fill();
		}*/
		
		ctx.strokeStyle = particleBordercolor;
		ctx.stroke();
		//1.0019
		
		if(((audioSample[0] + audioSample[1] + audioSample[2] + audioSample[3] + audioSample[4])) > 0.60){
			//1.111
			this.vx = this.vx * 1.111;
			this.vy = this.vy * 1.111;
			this.life = this.life + 4;
			//adition
			this.radius = this.radius * 1.0669
		}else if(((audioSample[29] + audioSample[30] + audioSample[31] + audioSample[32] + audioSample[33]) ) > 0.5){
			//1.0177
			this.vx = this.vx * 1.0177;
			this.vy = this.vy * 1.0177;
			this.life = this.life + 2;
			//adition
			this.radius = this.radius * 1.0235
		}else{
			//
			this.vx = this.vx * 1.0059;
			this.vy = this.vy * 1.0059;
			this.radius = this.radius * 1.0169;
		}
	}
	Particle.prototype.drawsquare = function(){
		this.x += this.vx;
		this.y += this.vy;
		this.life++;
		
		if(this.life >= this.maxLife){
			delete particles[this.id];
		}

		ctx.beginPath();
		
		//if(this.id%2==0){
			//ctx.arc(this.x , this.y, this.radius, 0, 2 * Math.PI);
		//}
		//else {
			
			ctx.rect(this.x, this.y,this.radius,this.radius);
		//}
			//ctx.rect(this.x , this.y,3,this.radius,this.radius);
		
		//ctx.fillStyle = particleColor;
		//ctx.fill();
		ctx.strokeStyle = "white";
		ctx.stroke();
		//1.0019
		
		if(((audioSample[0] + audioSample[1] + audioSample[2] + audioSample[3] + audioSample[4])) > 0.60){
			//1.111
			this.vx = this.vx * 1.111;
			this.vy = this.vy * 1.111;
			this.life = this.life + 4;
			//adition
			this.radius = this.radius * 1.0669
		}else if(((audioSample[29] + audioSample[30] + audioSample[31] + audioSample[32] + audioSample[33]) ) > 0.5){
			//1.0177
			this.vx = this.vx * 1.0177;
			this.vy = this.vy * 1.0177;
			this.life = this.life + 2;
			//adition
			this.radius = this.radius * 1.0235
		}else{
			//
			this.vx = this.vx * 1.0059;
			this.vy = this.vy * 1.0059;
			this.radius = this.radius * 1.0169;
		}
	}
	Particle.prototype.drawtriangle = function(){
		this.x += this.vx;
		this.y += this.vy;
		this.life++;
		
		if(this.life >= this.maxLife){
			delete particles[this.id];
		}

		ctx.beginPath();
		
		//if(this.id%2==0){
			//ctx.arc(this.x , this.y, this.radius, 0, 2 * Math.PI);
		//}
		//else {
			ctx.moveTo(this.x, this.y+this.radius);
			ctx.lineTo(this.x+(this.radius-(this.radius*2)),this.y + this.radius*3);
			ctx.lineTo(this.x+this.radius, this.y+this.radius*3);

			ctx.closePath();

			//ctx.rect(this.x , this.y,this.radius,this.radius);
		//}
			//ctx.rect(this.x , this.y,3,this.radius,this.radius);
		
		//ctx.fillStyle = particleColor;
		//ctx.fill();
		ctx.strokeStyle = particleBordercolor;
		ctx.stroke();
		//1.0019
		
		if(((audioSample[0] + audioSample[1] + audioSample[2] + audioSample[3] + audioSample[4])) > 0.60){
			//1.111
			this.vx = this.vx * 1.111;
			this.vy = this.vy * 1.111;
			this.life = this.life + 4;
			//adition
			this.radius = this.radius * 1.0669
		}else if(((audioSample[29] + audioSample[30] + audioSample[31] + audioSample[32] + audioSample[33]) ) > 0.5){
			//1.0177
			this.vx = this.vx * 1.0177;
			this.vy = this.vy * 1.0177;
			this.life = this.life + 2;
			//adition
			this.radius = this.radius * 1.0235;
		}else{
			//
			this.vx = this.vx * 1.0059;
			this.vy = this.vy * 1.0059;
			this.radius = this.radius * 1.0169;
		}
	}
	function Particle(){
		this.y = Math.random() * canvas.height;
		this.x = Math.random() * canvas.width;
		this.radius = Math.random() * 2;
		this.vx = 0;
		this.vy = 0;

		this.radians = Math.atan((canvas.height/2-this.y)/(canvas.width/2-this.x));
		this.vx = 1.5 * Math.cos(this.radians);
		this.vy = 1.5 * Math.sin(this.radians);

		if(this.x < canvas.width/2){
			this.vx = -this.vx;
			this.vy = -this.vy;
		}

		particleIndex++;
		particles[particleIndex] = this;
		this.id = particleIndex;
		this.life = 0;
		this.maxLife = 300;
	}

	for (var i = 0; i < particleNum; i++){
		new Particle();
	}
	
	for (var i in particles){
		if(i%2==0){
			particles[i].draw();
		}else if(i%3==0){
			particles[i].drawtriangle();
		}else{
			particles[i].drawsquare();
		}
		
	}

	//ctx.beginPath();
	//ctx.arc(x, y, radius, 0, Math.PI * 2);
	//ctx.fillStyle = circleColor;
	//ctx.fill();
	speedx(avg);
	vel(avg);
}



window.onload = function(){
	canvas = document.querySelector("#canvas");
	ctx = canvas.getContext("2d");
	canvas.width = canvas.scrollWidth;
	canvas.height = canvas.scrollHeight;

	
	window.wallpaperRegisterAudioListener(wallpaperAudioListener);
	window.requestAnimationFrame(run);
}

window.onresize = function() {
	location.reload();
}