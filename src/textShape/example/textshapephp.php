<?php

include(__DIR__.'/../php/pngborderfinder.php');
include(__DIR__.'/../php/textshape.php');

if(!isset($_GET['image'])) {
	$image='cat-grumpy-icon.png';
}
else {
	$image=$_GET['image'];
}




/*
instanciate lile thas is also possible
$test=new TextShape($image);
*/


$borderFinder=new PNGBorderFinder($image);
$test=new TextShape($image, $borderFinder);



$cssDeclaration=$test->getCSSDivShapeDeclaration();
$shapes=$test->getDivShape('left');


?>

<!doctype html>
<html>
<head>
	<style>

	.container {
		max-width:800px;
		margin:auto;
		text-align: justify;
		font-family: arial;
	}

	<?php
		if(isset($_GET['debug'])) {
			echo 	'		.textShape {
				background-color:rgba(255,0,0,0.5);
				clear: both; 
			}';
		}

	?>



	<?php
	echo $cssDeclaration;
	?>
</style>
</head>
<body>



<div class="container">
	<?php echo $shapes; ?>
	<h1>Text Shape PHP demo</h1>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porttitor odio nec est vestibulum, in finibus arcu laoreet. Nam rutrum sagittis purus, in posuere massa dapibus vel. Duis non magna erat. Pellentesque imperdiet est at nibh interdum, sit amet ultrices eros iaculis. Nam sit amet imperdiet orci. Etiam lorem nulla, lobortis euismod fringilla eget, hendrerit et eros. Sed eget neque leo. Morbi eros dui, sagittis eget gravida vel, mattis eget justo. Quisque tempor rutrum felis, placerat aliquam dui. Maecenas scelerisque posuere fringilla. Aliquam erat volutpat. Cras venenatis arcu ut ex porttitor accumsan.
	</p><p>
	Integer libero velit, elementum sed elit id, porttitor convallis mi. Quisque dictum dolor eu porta ultrices. Nulla facilisi. Nunc in metus et velit porttitor blandit. Praesent lectus tortor, maximus in eros vel, tempor vestibulum velit. Sed bibendum eu nibh ac porttitor. Donec consectetur tristique ultrices. Quisque vitae tellus non urna facilisis gravida. Pellentesque venenatis erat elit, id iaculis tellus placerat vitae.
	</p><p>
	Proin convallis nibh libero, quis malesuada arcu tincidunt vel. Aenean vestibulum malesuada ex, quis tincidunt purus feugiat vel. Proin a convallis urna, quis sagittis ex. Aliquam nec tincidunt risus, at fringilla diam. Aenean vitae viverra nibh. Nam et auctor massa. Etiam interdum, risus ac tincidunt volutpat, mauris lectus luctus dui, ut cursus magna eros id metus. Mauris purus elit, euismod in dignissim condimentum, efficitur non erat. Proin eget tincidunt risus. Vestibulum sed sapien blandit, porttitor massa in, placerat nulla. Vestibulum tempus arcu ligula, sit amet condimentum turpis mollis sed. Donec interdum magna sed porttitor vestibulum. Vestibulum pharetra mattis metus, ornare rhoncus libero hendrerit non. Morbi quis felis vestibulum, volutpat magna vel, hendrerit mauris.
	</p><p>
	Suspendisse efficitur metus sed aliquam volutpat. Proin eleifend sed ipsum eget fringilla. Integer non ex interdum, consequat purus vitae, eleifend eros. Aenean ut felis vitae mi iaculis posuere eget id ante. Curabitur consectetur accumsan justo, eu vulputate odio dictum vitae. Curabitur tempus purus ut hendrerit interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
	</p><p>
	Phasellus quam diam, tempor nec ullamcorper non, tristique egestas ipsum. Curabitur id tristique tortor. Donec sollicitudin scelerisque congue. Aenean elit enim, luctus at libero ut, aliquet pretium turpis. Phasellus et accumsan nisl. Praesent in risus mollis, mattis nibh et, hendrerit neque. Duis sed tortor vitae elit tempor pellentesque ac vel libero. Nulla et consectetur lorem. Donec convallis varius massa sit amet ultrices. Morbi tincidunt orci vel gravida ornare. Vivamus non elit orci. Nullam eget aliquet mi. Mauris pellentesque velit non dui imperdiet tincidunt.
	</p>
</div>
</body>

<html>






