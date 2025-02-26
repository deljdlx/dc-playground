<?php

$slide = filter_input(INPUT_GET, 'slide', FILTER_VALIDATE_INT); //$_GET['slide']

if($slide === false) {
    echo json_encode([
        'content' => 'Invalid slide'
    ]);
    exit();
}

file_put_contents(
    __DIR__ . '/currentSlide.txt',
    $slide
);


$file = __DIR__ . '/slides/' . $slide . '.html';

if(is_file($file)) {
    $content = file_get_contents($file);
}
else {
    $content = "File not found";
}


echo json_encode([
    'content' => $content
]);
