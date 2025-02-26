function TextShape(imageObject)
{
	this.borderFinder=new PNGBorderFinder(imageObject);

	this.width=imageObject.offsetWidth;
	this.height=imageObject.offsetHeight;

	this.margin=15;
	this.image=imageObject;
}

TextShape.prototype.createDivShape=function (cssFloat, style) {

	if(typeof(style)=='undefined') {
		style='';
	}

	var rectangles=this.borderFinder.getRectangles();

	var shape=document.createElement('div');
	shape.className='shape';
	shape.style.cssText=style;

	for(var i=0; i<rectangles.length; i++) {
		var rectangle=rectangles[i];

		if(typeof(rectangles[i+1])!='undefined') {

			if(i==0) {
				shape.innerHTML+='<div class="textShape" style="float: '+cssFloat+'; height:'+rectangle.y+'px; width: 1px;"></div>';
				continue;
			}
			else {
				var marginTop=0;
			}
			var height=rectangles[i+1].y-rectangle.y;
			var width=rectangle.end-rectangle.start;

			if(cssFloat=='left') {
				var margin='margin-left:'+rectangle.start+'px;';
			}
			else {
				var margin='margin-right:'+(this.width-rectangle.end+this.margin*2)+'px;';
			}

			shape.innerHTML+='<div class="textShape" style="float: '+cssFloat+'; height:'+height+'px; width:'+width+'px; '+margin+'; margin-top:'+marginTop+'px"></div>';
		}
	}

	console.debug(shape.innerHTML);

	var oldImage=this.image.parentNode.replaceChild(shape, this.image);
	oldImage.style.position='absolute';
	if(cssFloat=='left') {
		oldImage.style.left=0;
	}
	else {
		oldImage.style.left='100%';
		oldImage.style.marginLeft='-'+this.width+'px';
	}

	oldImage.style.top=0;

	shape.appendChild(oldImage);

	//return shape;
}