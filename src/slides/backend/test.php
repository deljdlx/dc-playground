<?php

if (gettype( file('currentSlide.txt') !== 'integer')) {
    file_put_contents(
        __DIR__ . '/currentSlide.txt',
        0
    );
}
