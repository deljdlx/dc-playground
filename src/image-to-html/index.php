<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image to html</title>

    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧪</text></svg>">

    <!-- Styles -->
    <style>
        /* Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
        }

        /* Fond dégradé */
        body {
            background: linear-gradient(135deg, #1E293B, #0F172A);
            color: white;
            text-align: center;
            padding: 40px 20px;
        }

        /* Conteneur principal */
        .container {
            max-width: 900px;
            margin: auto;
        }

        /* Titre principal */
        h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
        }

        /* Section des expérimentations */
        .experiments {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        /* Carte */
        .experiment {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease-in-out;
        }

        .experiment:hover {
            transform: translateY(-5px);
        }

        /* Lien */
        .experiment a {
            color: #3B82F6;
            text-decoration: none;
            font-size: 1.2rem;
            font-weight: bold;
            display: block;
            margin-bottom: 10px;
        }

        /* Texte du README */
        .experiment p {
            font-size: 1rem;
            opacity: 0.8;
        }

        /* Responsive */
        @media (max-width: 600px) {
            h1 { font-size: 2rem; }
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>🚀 Image to html</h1>

        <div class="experiments">
            <?php
                $demos = scandir(__DIR__ . '/demo');

                foreach($demos as $demo) {
                    if($demo === '.' || $demo === '..') {
                        continue;
                    }

                    if(strpos($demo, '.html') === false) {
                        continue;
                    }

                    echo '<div class="experiment">';
                        echo '<a href="demo/' . $demo . '">' . $demo . '</a>';
                    echo '</div>';
                }
            ?>
        </div>
    </div>

</body>
</html>
