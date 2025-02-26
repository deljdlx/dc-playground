
function PNGBorderFinder(imageObject)
{
	this.image=imageObject;
        this.height=this.image.offsetHeight || this.image.naturalWidth;
        this.width=this.image.offsetWidth || this.image.naturalHeight;
	
	this.alphaThreshold=10;
	this.yThreshold=2;
	this.xThreshold=2;
	this.angleThreshold=0.02;
	this.distanceThreshold=15;
	
	this.margin=10;
	
	this.dots=false;
	this.rectangles=false;
	
	
	
	this.canvas=document.createElement('canvas');
	this.canvas.width=this.width;
	this.canvas.height=this.height;
	
	this.canvasContext=this.canvas.getContext('2d');
	
	this.canvasContext.drawImage(this.image, 0, 0, this.width, this.height);
	this.imageData=this.canvasContext.getImageData(0, 0, this.width, this.height).data;

}

PNGBorderFinder.prototype.getColorAt=function(x, y) {
	var offset=((y)*this.width+(x))*4;
	return {
		r: this.imageData[offset],
		g: this.imageData[offset+1],
		b: this.imageData[offset+2],
		a: this.imageData[offset+3]
	};
}

PNGBorderFinder.prototype.getSideDots=function(side) {

		var lastDirection=false;
		var direction=false;
		var length=0;
		var lastX=null;
		var dots=[];
		var lastY=0;


		for(var y=0; y<this.height; y++) {
			if(side=='left') {
				var x=this.getXLineStart(y);
				if(x>lastX && (x<this.width)) {
					var direction='right';
				}
				else if(x<lastX) {
					var direction='left';
				}
			}
			else {
				var x=this.getXLineEnd(y);
				if(x<lastX && (x>0)) {
					var direction='right';
				}
				else if(x>lastX && (x>0)) {
					var direction='left';	
				}
			}


			if(direction && (
				direction!=lastDirection
				|| Math.abs(y-lastY)>this.yThreshold
				|| Math.abs(x-lastX)>this.xThreshold
				)
			) {
				dots.push({
					'y': y,
					'lastX': lastX,
					'x': x,
					'direction': direction,
					'side': side
				});
				
				lastX=x;
				lastY=y;
			}
			lastDirection=direction;
		}
		return dots;
	}



PNGBorderFinder.prototype.getXLineStart=function(y) {
	for(var x=0; x<this.width; x++) {
		var colorData=this.getColorAt(x, y);
		if(colorData.a>=this.alphaThreshold) {
			break;
		}
	}
	return x;
}

PNGBorderFinder.prototype.getXLineEnd=function(y) {
	for(var x=this.width-1; x>0; x--) {
		var colorData=this.getColorAt(x, y);
		if(colorData.a>=this.alphaThreshold) {
			break;
		}
	}
	return x;
}


PNGBorderFinder.prototype.filterByAngle=function(polygon) {
	var start=false;
	var polygon2=[];
	var lastAngle=false;
	
	for(var i=0; i<polygon.length; i++) {
		var dot=polygon[i];
	
		if(start) {
			var angle=Math.atan(
				Math.abs(start.x-dot.x)
				/Math.abs(start.y-dot.y)
			);
			
			if(Math.abs(lastAngle-angle)>this.angleThreshold || angle===false) {
				lastAngle=angle;
				polygon2.push(dot);
			}
		}
		else {
			start=dot;
		}
	}
	return polygon2;
}

PNGBorderFinder.prototype.filterByDistance=function(polygon) {
		
	var start=false;
	var polygon2=[];
	
	for(var i=0; i<polygon.length; i++) {
		var dot=polygon[i];
		
		if(start) {
			var distance=Math.sqrt(
				Math.pow(Math.abs(start.x-dot.x), 2)
				+Math.pow(Math.abs(start.y-dot.y), 2)
			);
			
			if(distance>this.distanceThreshold) {
				start=dot;
				polygon2.push(dot);
			}
		}
		else {
			polygon2.push(dot);
			start=dot;
		}
	}
	return polygon2;
}



PNGBorderFinder.prototype.computeDots=function() {

	var rightDots=this.getSideDots('right');
	var leftDots=this.getSideDots('left');

	var minX=false;
	
	for(var i=0; i<leftDots.length; i++) {
		var point=leftDots[i];
		
		if(minX===false || point['x']<minX) {
			minX=point['x'];
		}
		if(minX===false || point['lastX']<minX) {
			minX=point['lastX'];
		}
	}

	 var maxX=false;
	for(var i=0; i<rightDots.length; i++) {
	
		var point=rightDots[i];
	
		if(maxX===false || point['x']>maxX) {
			maxX=point['x'];
		}
		if(maxX===false || point['lastX']>maxX) {
			maxX=point['lastX'];
		}
	}
	
	
	var polygon=[];
	

	
	for(var i=0; i<leftDots.length; i++) {
		var point=leftDots[i];
		if(point['x']<maxX &&  point['lastX']<maxX) {
		
			polygon.push({
				'x': point['x'],
				'y': point['y'],
				'side': point['side']
			});
		}
	}
	
	rightDots=rightDots.reverse();
	for(var i=0; i<rightDots.length; i++) {
		var point=rightDots[i];
		if(point['x']>minX &&  point['lastX']>minX) {
			polygon.push({
				'x': point['x'],
				'y': point['y'],
				'side': point['side']
			});
		}
	}
	
	
	polygon=this.filterByAngle(polygon);
	polygon=this.filterByDistance(polygon);
	
	this.dots=polygon;
}



PNGBorderFinder.prototype.computeRectangles=function() {

	this.getDots();


	var rectangles=[];

	for(var i=0; i<this.dots.length; i++) {
		var dot=this.dots[i];
		
		if(dot.side=='left') {
			rectangles.push({
				'y': dot.y,
				'start': dot.x-this.margin,
				'end': this.getXLineEnd(dot.y)+this.margin
			});
		}
		else {
			rectangles.push({
				'y': dot.y,
				'start': this.getXLineStart(dot.y)-this.margin,
				'end': dot.x+this.margin
			});
		}
	}
	
	this.rectangles=rectangles.sort(function(item1, item2) {
		if(item1.y<item2.y) {
			return -1;
		}
		else {
			return 1;
		}
	});
}

PNGBorderFinder.prototype.getRectangles=function() {
	if(this.rectangles===false) {
		this.rectangles=[];
		this.computeRectangles();
	}
	return this.rectangles;
}



PNGBorderFinder.prototype.getDots=function() {
	if(this.dots===false) {
		this.dots=[];
		this.computeDots();
	}
	return this.dots;
}
