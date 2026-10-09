// Counts come from the citation paragraphs, so adding an entry needs no counter edits.
const publicationList = document.getElementById('publicationList');
const controls = document.getElementById('publicationControls');
const searchInput = document.getElementById('publicationSearch');
const filterButtons = [...controls.querySelectorAll('[data-filter]')];
const noResults = document.getElementById('publicationNoResults');
let selectedCategory = 'all';

function updatePublications() {
  observer.disconnect();
  const counts = { all: 0 };
  const query = searchInput.value.trim().toLocaleLowerCase();
  let visibleCount = 0;

  publicationList.querySelectorAll('.publication-section').forEach(section => {
    const category = section.dataset.category;
    const entries = [...section.querySelectorAll('.publication-entry')];
    counts[category] = (counts[category] || 0) + entries.length;
    counts.all += entries.length;
    let sectionVisibleCount = 0;

    entries.forEach((entry, index) => {
      let number = entry.querySelector('.publication-number');
      if (!number) {
        // Accept newly pasted paragraphs with or without a typed number.
        if (entry.firstChild?.nodeType === Node.TEXT_NODE) {
          entry.firstChild.textContent = entry.firstChild.textContent.replace(/^\s*\d+\.\s*/, '');
        }
        number = document.createElement('span');
        number.className = 'publication-number';
        entry.prepend(number);
      }
      const value = section.dataset.numbering === 'ascending' ? index + 1 : entries.length - index;
      number.textContent = `${value}. `;
      const matchesCategory = selectedCategory === 'all' || selectedCategory === category;
      entry.hidden = !matchesCategory || !entry.textContent.toLocaleLowerCase().includes(query);
      if (!entry.hidden) sectionVisibleCount++;
    });
    section.hidden = sectionVisibleCount === 0;
    visibleCount += sectionVisibleCount;
  });

  filterButtons.forEach(button => {
    button.textContent = `${button.dataset.label} (${counts[button.dataset.filter] || 0})`;
    button.setAttribute('aria-pressed', String(button.dataset.filter === selectedCategory));
  });
  noResults.hidden = visibleCount > 0;
  controls.hidden = false;
  observer.observe(publicationList, { childList: true, subtree: true, characterData: true });
}

const observer = new MutationObserver(updatePublications);
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.filter;
    updatePublications();
  });
});
searchInput.addEventListener('input', updatePublications);
updatePublications();
