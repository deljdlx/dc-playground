<!DOCTYPE html>
<html>
<head>
    <title>Playground and experimentations</title>
    <meta charset="UTF-8">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👑</text></svg>">
</head>
<body>

<ul>
<?php
    $experimentations = scandir(__DIR__);
    foreach ($experimentations as $experimentation) {
        if (is_dir($experimentation) && $experimentation !== '.' && $experimentation !== '..') {
            if(is_file($experimentation . '/index.php') || is_file($experimentation . '/index.html')) {
                echo '<li><a href="' . $experimentation . '/">' . $experimentation . '</a></li>';
            }
        }
    }
?>
</ul>
</body>
</html>