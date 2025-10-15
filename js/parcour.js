const ligne = document.getElementById('ligne-directrice');
const walkingman = document.getElementById('walkingman');
const etapes = document.querySelectorAll('.etape');
const nbTirets = 300; // nombre de pointillés
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
    const vitesse = 1.5; // px par frame, ajuste pour la lenteur
    function step() {
        const distance = x - pos;
        if (Math.abs(distance) < vitesse) {
            walkingman.style.left = x + 'px';
            if (callback) callback();
            return;
        }
        // Toujours avancer d'une petite fraction de la distance restante pour ralentir naturellement
        pos += distance * 0.05; // 0.15 = facteur de ralentissement, ajuste pour la douceur
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
const left = (iconRect.left + iconRect.width / 2) - containerRect.left - (walkingman.offsetWidth / 2);        marcheVers(left, () => {
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