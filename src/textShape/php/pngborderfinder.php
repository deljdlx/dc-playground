<?php

class PNGBorderFinder
{

	public $width;
	public $height;
	public $margin;
	

	protected $image=null;
	protected $imageFile='';
	

	public function __construct($image, $margin=15, $threshold=5, $alphaThreshold=0.5) {
		$this->imageFile=$image;
		$this->image=imagecreatefrompng($image);
		$this->imageSize=getimagesize($image);

		$this->width=$this->imageSize[0];
		$this->height=$this->imageSize[1];
		
		$this->margin=$margin;
		
		
		$this->xThreshold=$threshold;
		$this->yThreshold=$threshold;
		


		$this->alphaThreshold=$alphaThreshold;
		
		$this->angleThreshold=0.01;
		$this->distanceThreshold=8;
		
		
		
		$this->rectangles=null;
		$this->dots=null;
		
	}



	public function getDots() {
		if($this->dots===null) {
			$this->computeDots();
		}
		return $this->dots;
	}
	
	public function getRectangles() {
		if($this->rectangles===null) {
			$this->computeRectangles();
		}
		return $this->rectangles;
	}
	
	
	protected function computeDots() {
		$rightDots=$this->getSideDots('right');
		$leftDots=$this->getSideDots('left');

		$minX=false;
		foreach($leftDots as $point) {
			if($minX===false || $point['x']<$minX) {
				$minX=$point['x'];
			}
			if($minX===false || $point['lastX']<$minX) {
				$minX=$point['lastX'];
			}
		}

		$maxX=false;
		foreach($rightDots as $point) {
			if($maxX===false || $point['x']>$maxX) {
				$maxX=$point['x'];
			}
			if($maxX===false || $point['lastX']>$maxX) {
				$maxX=$point['lastX'];
			}
		}
		
		
		$polygon=array();
		foreach($leftDots as $point) {
			if($point['x']<$maxX &&  $point['lastX']<$maxX) {
			
				$polygon[]=array(
					//'x'=>$point['x']-$this->xTreshold-$this->margin,
					'x'=>$point['x'],
					'y'=>$point['y'],
					'side'=>$point['side']
				);
			}
		}
		
		$rightDots=array_reverse($rightDots);
		foreach($rightDots as $point) {
			if($point['x']>$minX &&  $point['lastX']>$minX) {
				$polygon[]=array(
					//'x'=>$point['x']+$this->xTreshold+$this->margin,
					'x'=>$point['x'],
					'y'=>$point['y'],
					'side'=>$point['side']
				);
				
			}
		}
		
		//===================================================
		//suppression des noeuds avec ayant un angle proche
		$start=false;
		$polygon2=array();
		$lastAngle=false;
		
		foreach($polygon as $dot) {
		
			if($start) {
				$angle=atan(
					abs($start['x']-$dot['x'])
					/abs($start['y']-$dot['y'])
				);
				
				if(abs($lastAngle-$angle)>$this->angleThreshold || $angle===false) {
					$lastAngle=$angle;
					$polygon2[]=$dot;
				}
			}
			else {
				$final[]=$dot;
				$start=$dot;
			}
		}
		//===================================================
		//suppression des noeuds ayant des distance proches
		
		$start=false;
		$polygon3=array();
		
		foreach($polygon2 as $dot) {
			if($start) {
				$distance=sqrt(
					pow(abs($start['x']-$dot['x']), 2)
					+pow(abs($start['y']-$dot['y']), 2)
				);
				
				if($distance>$this->distanceThreshold) {
					$start=$dot;
					$polygon3[]=$dot;
				}
			}
			else {
				$polygon3[]=$dot;
				$start=$dot;
			}
		}
		$this->dots=$polygon3;
	}

	
	
	protected function computeRectangles() {
		if($this->dots===null) {
			$this->getDots();
		}
	
		$rectangles=array();
	
		foreach($this->dots as $dot) {
			
			
			
			if($dot['side']=='left') {
				$rectangles[$dot['y']]=array(
					'y'=>$dot['y'],
					'start'=>$dot['x']-$this->margin,
					'end'=>$this->getXLineEnd($dot['y'])+$this->margin
				);
			}
			else {
				$rectangles[$dot['y']]=array(
					'y'=>$dot['y'],
					'start'=>$this->getXLineStart($dot['y'])-$this->margin,
					'end'=>$dot['x']+$this->margin
				);
			}
		}
		ksort($rectangles);
		$this->rectangles=array_values($rectangles);
	}
	
	protected function getXLineStart($line) {
		for($x=0; $x<$this->width; $x++) {
			$colorData=imagecolorat($this->image, $x, $line);
			$opacity = (($colorData >> 24) & 0x7F);
			if($opacity<=$this->alphaThreshold) {
				break;
			}
		}
		return $x;
	}

	protected function getXLineEnd($line) {
		for($x=$this->width-1; $x>0; $x--) {
			$colorData=imagecolorat($this->image, $x, $line);
			$opacity = (($colorData >> 24) & 0x7F);
			if($opacity<=$this->alphaThreshold) {
				break;
			}
		}
		return $x;
	}

	protected function getSideDots($side='left') {
		$lastDirection=false;
		$direction=false;
		$length=0;
		$lastX=null;
		$dots=array();
		$lastY=0;


		for($y=0; $y<$this->height; $y++) {
			if($side=='left') {
				$x=$this->getXLineStart($y);
				if($x>$lastX && ($x<$this->width)) {
					$direction='right';
				}
				else if($x<$lastX) {
					$direction='left';
				}
			}
			else {
				$x=$this->getXLineEnd($y);
				if($x<$lastX && ($x>0)) {
					$direction='right';
				}
				else if($x>$lastX && ($x>0)) {
					$direction='left';	
				}
			}

			//si la direction est définie
			if($direction && (
				//et si la direction est a changée et que l'on se trouve au moins 5px en dessous
				$direction!=$lastDirection
				|| abs($y-$lastY)>$this->yThreshold
				//ou si le x à une variation > à n pixel (cas des ligne horizontales)
				|| abs($x-$lastX)>$this->xThreshold
				)
			) {
				$dots[]=array(
					'y'=>$y,
					'lastX'=>$lastX,
					'x'=>$x,
					'direction'=>$direction,
					'side'=>$side
				);
				
				$lastX=$x;
				$lastY=$y;
			}
			$lastDirection=$direction;
		}
		return $dots;
	}
}











