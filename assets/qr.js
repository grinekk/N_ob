// Pobieramy elementy
const whiteScreen = document.getElementById('whiteScreen');
const closeBtn = document.getElementById('closeWhiteScreen');
const countdownEl = document.getElementById('countdown');

// Funkcja odliczania czasu
function startCountdown() {
    let minutes = 2;
    let seconds = 30;
    
    const interval = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(interval);
                countdownEl.textContent = "Kod wygasł!";
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        
        countdownEl.textContent = `${minutes} min ${seconds} sek.`;
    }, 1000);
    
    return interval;
}

// Obsługa kliknięcia w "Pokaż kod QR"
document.getElementById('showQR').addEventListener('click', function() {
    whiteScreen.style.display = 'block';
    const countdownInterval = startCountdown();
    
    // Resetujemy odliczanie przy zamknięciu
    closeBtn.onclick = function() {
        whiteScreen.style.display = 'none';
        clearInterval(countdownInterval);
    };
});

// Pozostały kod obsługi błędów pozostaje bez zmian
document.querySelectorAll(".action:not(#showQR)").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".error").classList.add("error_open");
    });
});

document.querySelectorAll(".close").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".error").classList.remove("error_open");
    });
});