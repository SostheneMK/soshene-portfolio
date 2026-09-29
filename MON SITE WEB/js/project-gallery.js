(() => {
  const content = {
    fr: { habitat: ['Habitat contemporain — Étude conceptuelle', 'Une étude résidentielle qui privilégie la lumière naturelle, les volumes simples et le lien avec le paysage.'], cultural: ['Lumière et espace public', 'Un lieu pensé pour accueillir, se rencontrer et révéler les usages collectifs.'], material: ['Étude de matière', 'Une recherche sur les textures, les teintes minérales et la matérialité du bâti.'], house: ['Maison et paysage', 'Une maison ouverte sur son environnement, entre intimité, vues cadrées et confort quotidien.'], urban: ['Architecture urbaine', 'Une réflexion sur la densité, les mobilités et la place de l’architecture dans la ville.'], shadow: ['Jeu d’ombres', 'Une composition de lumière, de rythme et de contrastes pour enrichir l’expérience de l’espace.'], details: 'Détails' },
    en: { habitat: ['Contemporary home — Concept study', 'A residential study that prioritises natural light, simple volumes and a connection with the landscape.'], cultural: ['Light and public space', 'A place designed for gathering, meeting and revealing collective uses.'], material: ['Material study', 'A study of textures, mineral tones and the materiality of the built environment.'], house: ['House and landscape', 'A house open to its environment, balancing intimacy, framed views and everyday comfort.'], urban: ['Urban architecture', 'A reflection on density, mobility and architecture’s place in the city.'], shadow: ['Play of shadows', 'A composition of light, rhythm and contrast that enriches the experience of space.'], details: 'Details' }
  };
  const update = () => {
    const lang = document.documentElement.lang === 'en' ? 'en' : 'fr'; const text = content[lang];
    document.querySelectorAll('.gallery-item').forEach(item => {
      const project = item.dataset.project; const itemText = text[project]; if (!itemText) return;
      const card = item.closest('.gallery-card'); const note = card?.querySelector('.image-note'); const details = card?.querySelector('.image-details');
      item.dataset.caption = itemText[0]; item.dataset.description = itemText[1];
      if (details) details.innerHTML = `${text.details} <span>+</span>`;
      if (note) { const paragraphs = note.querySelectorAll('p'); if (paragraphs[0]) paragraphs[0].textContent = itemText[0]; if (paragraphs[1]) paragraphs[1].textContent = itemText[1]; note.style.backgroundImage = `linear-gradient(90deg,rgba(24,22,19,.92),rgba(24,22,19,.55)),url("${item.querySelector('img').src}")`; }
      item.onclick = () => { const lightbox = document.querySelector('.lightbox'); if (!lightbox) return; lightbox.querySelector('img').src = item.querySelector('img').src; lightbox.querySelector('img').alt = itemText[0]; lightbox.querySelector('p').textContent = itemText[0]; lightbox.classList.add('is-open'); lightbox.setAttribute('aria-hidden', 'false'); };
    });
  };
  document.addEventListener('DOMContentLoaded', () => { update(); new MutationObserver(update).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] }); const selected = new URLSearchParams(location.search).get('project'); if (selected) { const item = document.querySelector(`.gallery-item[data-project="${selected}"]`); const card = item?.closest('.gallery-card'); if (card) { setTimeout(() => { item.scrollIntoView({ behavior: 'smooth', block: 'center' }); card.classList.add('details-open'); }, 300); } } });
})();
