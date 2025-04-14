var params = new URLSearchParams(window.location.search);

function sendTo(url) {
    if (!url) {
        console.error("Brak atrybutu 'send' w elemencie.");
        return;
    }
    location.href = `${url}.html?` + params;
}

document.querySelectorAll(".bottom_element_grid").forEach((element) => {
    element.addEventListener('click', () => {
        const sendAttribute = element.getAttribute("send");
        if (sendAttribute) {
            sendTo(sendAttribute);
        } else {
            console.warn("Element nie posiada atrybutu 'send':", element);
        }
    });
});

function getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent)) {
        return 1; // Windows Phone
    }

    if (/android/i.test(userAgent)) {
        return 2; // Android
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 3; // iOS
    }

    return 4; // Inne
}

if (getMobileOperatingSystem() === 2) {
    const bottomBar = document.querySelector(".bottom_bar");
    if (bottomBar) {
        bottomBar.style.height = "70px";
    } else {
        console.warn("Nie znaleziono elementu '.bottom_bar'.");
    }
}