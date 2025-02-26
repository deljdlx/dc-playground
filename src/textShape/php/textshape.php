<?php


class TextShape
{


	public function __construct($imageFile, $borderFinder=null) {
	
		
	
		if($borderFinder) {
			$this->borderFinder=$borderFinder;
		}
		else {
			$this->borderFinder=new PNGBorderFinder($imageFile);
		}

		$this->imageFile=$imageFile;

		$this->imageSize=getimagesize($imageFile);

		$this->width=$this->imageSize[0];
		$this->height=$this->imageSize[1];

		$this->margin=15;
	}
	
	public function getDivShape($float='left', $style='') {
	
		$rectangles=$this->borderFinder->getRectangles();
		
		
		$buffer='<div class="shape" style="width:'.($this->width+$this->margin*2).'px;'.$style.';">';
		foreach($rectangles as $index=>$rectangle) {
			if(isset($rectangles[$index+1])) {
			
				if($index==0) {
					$buffer.='<div class="textShape" style="float: '.$float.'; height:'.$rectangle['y'].'px; width: 1px;"></div>';
					continue;
				}
				else {
					$marginTop=0;
				}
				$height=$rectangles[$index+1]['y']-$rectangle['y'];
				$width=$rectangle['end']-$rectangle['start'];
				
				if($float=='left') {
					$margin='margin-left:'.$rectangle['start'].'px;';
				}
				else {
					$margin='margin-right:'.($this->width-$rectangle['end']+$this->margin*2).'px;';
				}
				
				$buffer.='<div class="textShape" style="float: '.$float.'; height:'.$height.'px; width:'.$width.'px; '.$margin.'; margin-top:'.$marginTop.'px"></div>';
			}
		}
		$buffer.='</div>';
		return $buffer;
	}
	
	
	public function getCSSShape() {
		$polygon=$this->borderFinder->getDots();
		$buffer='';
		foreach($polygon as $dot) {
			$buffer.=$dot['x'].'px '.$dot['y'].'px,';
		}
		return substr($buffer, 0,-1);
	}




	public function getCSSDivShapeDeclaration() {

		return '
			.shape:before {
				left:0;
				content: url('.$this->imageFile.');
				position: absolute;
			}
			.shape {
				position: relative;
				background-color: rgba(0,0,255,0.2);
				position: relative;
				width:'.$this->width.'px;
			}
			.textShape {
				clear: both; 
			}
		';
	}


	public function getCSSShapeDeclaration($float='left') {

		return '
			.shape:before {
				left:0;
				content: url('.$this->imageFile.');
				position: absolute;
			}
			.shape {
				width:'.($this->width+($this->margin*2)).'px;
				height:'.($this->height+($this->margin*2)).'px;
				float: '.$float.';
				shape-margin:20px;
				shape-outside: polygon(
					'.$this->getCSSShape().'
				);
			}
		';
	}
}



