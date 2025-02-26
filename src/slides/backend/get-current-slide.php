<?php

// streamed response
header("Cache-Control: no-store");
header("Content-Type: text/event-stream");
// header('Transfer-Encoding', 'chunked');


while(true) {
    $currentSlide = file_get_contents(__DIR__ . '/currentSlide.txt');
    echo 'data: ' . json_encode([
        'currentSlide' => (int) $currentSlide
    ]) . "\n\n";
    ob_flush();
    flush();
    usleep(500000);
}
