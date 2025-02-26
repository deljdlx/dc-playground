<?php
$json = json_decode(file_get_contents(__DIR__ . '/toilets.json'), true);
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Toilettes Publiques de Paris</title>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />

    <style>
        html,
        body {
            margin: 0;
            padding: 0;
            height: 100%;
        }

        #leaflet-map {
            height: 100vh;
        }

        #search-container {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    background: white;
    padding: 8px;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    display: flex; /* Aligne input et bouton sur une seule ligne */
    align-items: center;
    gap: 5px;
    width: 90%; /* Largeur adaptative */
    max-width: 400px; /* Ne dépasse pas cette largeur sur grand écran */
}

#search-container input {
    flex: 1; /* Permet à l'input de prendre tout l'espace disponible */
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

#search-container button {
    padding: 8px 10px;
    border: none;
    background: #007bff;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px; /* Taille fixe pour éviter les sauts */
}

/* Media query pour les petits écrans */
@media screen and (max-width: 480px) {
    #search-container {
        width: 70%;
        max-width: 70%;
    }
}

    </style>
</head>

<body>

    <!-- Barre de recherche -->
    <form onsubmit="searchAddress(event)">
        <div id="search-container">
            <input type="text" id="search" placeholder="Rechercher une adresse..." />
            <button type="submit">🔍</button>
        </div>
    </form>

    <div id="leaflet-map"></div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            let map = L.map('leaflet-map').setView([48.866667, 2.333333], 17);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            let markers = new Map(); // Stockage des marqueurs
            let searchMarker = null; // Marqueur de recherche

            function loadToilets(bounds) {
                fetch('toilets.json')
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(toilet => {
                            if (toilet.nom_de_la_commune !== "Paris") return;

                            let {
                                lat,
                                lon
                            } = toilet.coord_geo;
                            if (!bounds.contains([lat, lon])) return;

                            let key = `${lat},${lon}`;
                            if (markers.has(key)) return;

                            let marker = L.marker([lat, lon]).addTo(map)
                                .bindPopup(toilet.tarif || "Inconnu");

                            markers.set(key, marker);
                        });
                    })
                    .catch(error => console.error('Erreur de chargement JSON:', error));
            }

            map.on('moveend', () => loadToilets(map.getBounds()));
            loadToilets(map.getBounds());

            // Fonction de recherche d'adresse
            window.searchAddress = function(e) {
                e.preventDefault();
                let query = document.getElementById("search").value;
                if (!query) return;

                fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.features.length === 0) {
                            alert("Adresse non trouvée !");
                            return;
                        }

                        let {
                            coordinates
                        } = data.features[0].geometry;
                        let [lon, lat] = coordinates;

                        // Supprime l'ancien marqueur de recherche
                        if (searchMarker) {
                            map.removeLayer(searchMarker);
                        }

                        // Ajoute un marqueur sur l'adresse trouvée
                        searchMarker = L.marker([lat, lon], {
                                color: 'red'
                            })
                            .addTo(map)
                            .bindPopup(`📍 ${query}`)
                            .openPopup();

                        // Centre la carte sur l'adresse trouvée
                        map.setView([lat, lon], 15);
                    })
                    .catch(error => console.error('Erreur lors de la recherche:', error));
            };
        });
    </script>
</body>

</html>