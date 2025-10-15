const ligne = document.getElementById('ligne-directrice');
const walkingman = document.getElementById('walkingman');
const etapes = document.querySelectorAll('.etape');
const nbTirets = 80; // nombre de pointillés
let currentTiret = 0;
let currentEtape = 0;

// Génère les spans pour chaque pointillé
function creerPointillets() {
    ligne.innerHTML = '';
    for (let i = 0; i < nbTirets; i++) {
        const span = document.createElement('span');
        span.className = 'pointillet';
        ligne.appendChild(span);
    }
}

// Animation progressive des pointillés
function afficherPointilletsUnParUn(callback) {
    const spans = ligne.querySelectorAll('.pointillet');
    let i = 0;
    function showNext() {
        if (i < spans.length) {
            spans[i].classList.add('visible');
            i++;
            setTimeout(showNext, 70); // vitesse d'apparition
        } else if (callback) {
            callback();
        }
    }
    showNext();
}

// Animation fluide du bonhomme (inchangée)
function marcheVers(x, callback) {
    let pos = parseFloat(walkingman.style.left) || 0;
    function step() {
        const distance = x - pos;
        // Vitesse diminue fortement à l'approche (max 2px, min 0.05px)
        const vitesse = Math.max(0.05, Math.abs(distance) * 0.12);
        if (Math.abs(distance) < 0.5) {
            walkingman.style.left = x + 'px';
            if (callback) callback();
            return;
        }
        pos += (distance > 0 ? vitesse : -vitesse);
        walkingman.style.left = pos + 'px';
        requestAnimationFrame(step);
    }
    step();
}

// Animation du parcours (inchangée)
function avancerEtape() {
    if (currentEtape < etapes.length) {
        const etape = etapes[currentEtape];
        const containerRect = document.querySelector('.parcours-container').getBoundingClientRect();
        const icon = etape.querySelector('.etape-icon');
        const iconRect = icon.getBoundingClientRect();
        const left = (iconRect.left + iconRect.width / 2) - containerRect.left - (walkingman.offsetWidth / 2);
        marcheVers(left, () => {
            etape.classList.add('active');
            setTimeout(() => {
                etape.classList.remove('active');
                currentEtape++;
                avancerEtape();
            }, 5000);
        });
    } else {
        setTimeout(() => {
            walkingman.style.opacity = 0;
        }, 800);
    }
}

// Lancement
window.onload = () => {
    creerPointillets();
    afficherPointilletsUnParUn(avancerEtape);
};