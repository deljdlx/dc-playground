<?php

// check is http method is POST

$history = json_decode(file_get_contents('history.json'));
$json = file_get_contents('php://input');
$match = json_decode($json);

$history[] = $match;
file_put_contents(
    'history.json',
    json_encode($history, JSON_PRETTY_PRINT)
);


echo json_encode($match, JSON_PRETTY_PRINT);

