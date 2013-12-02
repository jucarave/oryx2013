function Engine(){
	this.canvas = null;
	this.ctx = null;
	
	this.colorCanvas = null;
	this.colorCtx = null;
	
	this.images = [];
	
	this.createColorCanvas();
}

Engine.prototype.createColorCanvas = function(){
	this.colorCanvas = document.createElement("canvas");
	this.colorCanvas.width = 32;
	this.colorCanvas.height = 32;
	
	this.colorCtx = this.getContext(this.colorCanvas);
};

Engine.prototype.createCanvas = function(width, height, container){
	if ((typeof container) == "string") container = document.getElementById(container);
	
	this.canvas = document.createElement("canvas");
	this.canvas.width = width;
	this.canvas.height = height;
	
	container.appendChild(this.canvas);
	
	this.ctx = this.getContext(this.canvas);
};

Engine.prototype.getContext = function(canvas){
	var ctx = canvas.getContext("2d");
	ctx.width = canvas.width;
	ctx.height = canvas.height;
	
	return ctx;
};

Engine.prototype.loadImage = function(url, imgNum, vImgNum){
	var img = new Image();
	img.src = url;
	img.ready = false;
	img.imgNum = imgNum;
	img.vImgNum = vImgNum;
	
	Utils.addEvent(img, "load", function(){
		img.imgWidth = img.width / img.imgNum;
		img.imgHeight = img.height / img.vImgNum;
		img.ready = true;
	});
	
	this.images.push(img);
	return img;
};

Engine.prototype.imagesReady = function(){
	for (var i=0,len=this.images.length;i<len;i++){
		if (!this.images[i].ready)
			return false;
	}
	
	return true;
};

Engine.prototype.getImagesLoadedPercent = function(){
	if (this.images.length == 0) return 1;
	
	var per = 0;
	for (var i=0,len=this.images.length;i<len;i++){
		if (this.images[i].ready)
			per++;
	}
	
	return per / this.images.length;
};

Engine.prototype.drawImage = function(img, x, y, subImage, tiled){
	if (tiled){
		x = x * img.imgWidth;
		y = y * img.imgHeight;
	}
	
	this.ctx.drawImage(img,
		subImage.x * img.imgWidth, subImage.y * img.imgHeight, img.imgWidth, img.imgHeight,
		x, y, img.imgWidth, img.imgHeight
	);
};

Engine.prototype.drawLine = function(x1, y1, x2, y2, color){
	this.ctx.strokeStyle = color;
	this.ctx.beginPath();
	this.ctx.moveTo(x1,y1);
	this.ctx.lineTo(x2, y2);
	this.ctx.stroke();
};

Engine.prototype.colorizeImage = function(img, r, g, b){
	this.colorCanvas.width = img.width;
	this.colorCanvas.height = img.height;
	
	var ctx = this.colorCtx;
	
	ctx.clearRect(0,0,img.width,img.height);
	ctx.drawImage(img, 0, 0);
	
	if (!img.ready) throw "Image is not ready!";
	
	var imageData = ctx.getImageData(0,0,img.width,img.height);
	for (var i=0,len = imageData.data.length;i<len;i+=4) {
		if (imageData.data[i] == 255 && imageData.data[i+1] == 255 && imageData.data[i+2] == 255){
			imageData.data[i] = r;
			imageData.data[i+1] = g;
			imageData.data[i+2] = b;
		}else{
			imageData.data[i+3] = 0;
		}
	}
	
	ctx.clearRect(0,0,img.width,img.height);
	ctx.putImageData(imageData, 0, 0);
	
	var img = new Image();
	img.src = this.colorCanvas.toDataURL();
	
	ctx.clearRect(0,0,img.width,img.height);
	
	return img;
};
