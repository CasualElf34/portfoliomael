document.querySelectorAll('.artist-card form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const card = form.closest('.artist-card');
        const allCards = document.querySelectorAll('.artist-card');
        // Cache les autres cartes
        allCards.forEach(c => {
            if (c !== card) c.classList.add('hide');
        });

        // Récupère la position et la taille actuelle de la carte
        const rect = card.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

        // Fixe la carte à sa position actuelle (absolue)
        card.style.position = 'fixed';
        card.style.left = (rect.left + scrollLeft) + 'px';
        card.style.top = (rect.top + scrollTop) + 'px';
        card.style.width = rect.width + 'px';
        card.style.height = rect.height + 'px';
        card.style.margin = '0';
        card.style.zIndex = 4000;

        // Force le reflow pour que le navigateur prenne en compte les styles
        void card.offsetWidth;

        // Ajoute la classe selected pour centrer
        card.classList.add('selected');

        // Après la transition de centrage, zoom
        setTimeout(() => {
            card.classList.add('zoom');
        }, 400);

        // Redirige après le zoom
        setTimeout(() => {
            window.location.href = form.action;
        }, 1200);
    });
});
window.addEventListener('pageshow', () => {
  document.body.style.transform = 'none';
  document.body.style.transition = 'none';
  window.scrollTo(0, 0);

  // Si tu as un conteneur principal avec un effet de caméra :
  const main = document.querySelector('.main-container');
  if (main) {
    main.style.transform = 'none';
    main.style.transition = 'none';
  }

  // Tu peux aussi réinitialiser ton animation ici
  if (typeof initAnimations === 'function') initAnimations();
});