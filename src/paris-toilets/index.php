<?php
$json = json_decode(file_get_contents(__DIR__ . '/toilets.json'), true);
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Pour iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Toilettes Paris">

    <!-- Pour Android (Chrome) -->
    <meta name="mobile-web-app-capable" content="yes">


    <title>Paris public toilets</title>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <link rel="stylesheet" href="styles.css">
    <style>
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
            display: flex;
            gap: 5px;
        }

        input, button {
            padding: 6px;
            border-radius: 3px;
            border: 1px solid #ccc;
        }

        button {
            cursor: pointer;
            background: #007bff;
            color: white;
            border: none;
        }
    </style>
</head>

<body>

    <form onsubmit="searchAddress(event)">
        <div id="search-container">
            <input type="text" id="search" placeholder="Search by address..." />
            <button type="submit">🔍</button>
            <button type="button" onclick="locateUser()">📍</button>
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
            let userMarker = null; // Marqueur de géolocalisation utilisateur

            function loadToilets(bounds) {
                fetch('toilets.json')
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(toilet => {
                            if (toilet.nom_de_la_commune !== "Paris") return;

                            let { lat, lon } = toilet.coord_geo;
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

                        let { coordinates } = data.features[0].geometry;
                        let [lon, lat] = coordinates;

                        // Supprime l'ancien marqueur de recherche
                        if (searchMarker) {
                            map.removeLayer(searchMarker);
                        }

                        // Ajoute un marqueur sur l'adresse trouvée
                        searchMarker = L.marker([lat, lon])
                            .addTo(map)
                            .bindPopup(`📍 ${query}`)
                            .openPopup();

                        // Centre la carte sur l'adresse trouvée
                        map.setView([lat, lon], 15);
                    })
                    .catch(error => console.error('Erreur lors de la recherche:', error));
            };

            // Fonction pour localiser l'utilisateur
            window.locateUser = function() {
                if (!navigator.geolocation) {
                    alert("Votre navigateur ne supporte pas la géolocalisation.");
                    return;
                }

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        let { latitude, longitude } = position.coords;

                        // Supprime l'ancien marqueur utilisateur
                        if (userMarker) {
                            map.removeLayer(userMarker);
                        }

                        // Ajoute un marqueur sur la position actuelle
                        userMarker = L.marker([latitude, longitude], { icon: L.icon({
                            iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png', 
                            iconSize: [30, 40], 
                            iconAnchor: [15, 40]
                        })})
                            .addTo(map)
                            .bindPopup("📍 Vous êtes ici")
                            .openPopup();

                        // Centre la carte sur la position actuelle
                        map.setView([latitude, longitude], 15);
                    },
                    (error) => {
                        console.error("Erreur de géolocalisation :", error);
                        alert("Impossible d'obtenir votre position.");
                    }
                );
            };
        });
    </script>
</body>

</html>
