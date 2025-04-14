let webManifest = {
    "name": "mObywatel",
    "short_name": "mObywatel",
    "theme_color": "#f5f6fb",
    "background_color": "#f5f6fb",
    "display": "standalone",
    "start_url": "/index.html"
};

try {
    let manifestElem = document.createElement('link');
    manifestElem.setAttribute('rel', 'manifest');
    manifestElem.setAttribute('href', 'data:application/manifest+json;base64,' + btoa(JSON.stringify(webManifest)));
    document.head.appendChild(manifestElem); // Użyj appendChild zamiast prepend, aby nie nadpisać istniejących elementów
} catch (error) {
    console.error("Błąd podczas generowania manifestu:", error);
}

function sendTo(url) {
    if (!url) {
        console.error("Brak atrybutu 'send' w elemencie.");
        return;
    }
    location.href = `${url}.html?` + params;
}