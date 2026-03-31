// File for JS related to modals and other interactive elements on the page

// input field dropdown + autocomplete + modal behavior
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchType = document.getElementById('searchType');
  const dropdown = document.getElementById('autocompleteDropdown');
  const toggleButton = document.getElementById('toggleAuxiliary');
  const auxiliaryDetails = document.getElementById('auxiliaryDetails');
  const toggleIcon = document.getElementById('toggleIcon');

  const placeholders = {
    name: 'Enter country name',
    alpha: 'Enter code - jp, usa, aus',
    capital: 'Enter capital city',
    region: 'Enter region - africa, europe, oceania',
    currency: 'Enter currency - gbp, inr',
    language: 'Enter language - spanish, swahili',
    demonym: 'Enter demonym - brazilian, nigerian',
  };

  let allNames = [];

  async function fetchCountrySuggestions() {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
      const countries = await response.json();
      const names = new Set();

      countries.forEach((c) => {
        if (c.name?.common) names.add(c.name.common);
      });

      allNames = Array.from(names).sort();

      // fallback datalist if still used
      const datalist = document.getElementById('countrySuggestions');
      if (datalist) {
        allNames.forEach((name) => {
          const option = document.createElement('option');
          option.value = name;
          datalist.appendChild(option);
        });
      }
    } catch (err) {
      console.error('Failed to load country suggestions:', err);
    }
  }

  function closeDropdown() {
    if (!dropdown) return;
    dropdown.classList.add('closed');
    dropdown.classList.remove('open');
    dropdown.innerHTML = '';
  }

  function renderSuggestions(query) {
    if (!dropdown || !searchType) return;
    const normalized = (query || '').trim().toLowerCase();

    if (!normalized || searchType.value !== 'name') {
      closeDropdown();
      return;
    }

    const matches = allNames
      .filter((name) => name.toLowerCase().startsWith(normalized))
      .slice(0, 12);

    if (!matches.length) {
      closeDropdown();
      return;
    }

    dropdown.innerHTML = matches
      .map(
        (name) => `
          <button type="button" class="autocomplete-item" data-value="${name}">
            ${name}
          </button>`
      )
      .join('');

    dropdown.classList.add('open');
    dropdown.classList.remove('closed');
  }

  // load hints once
  fetchCountrySuggestions();

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderSuggestions(e.target.value);
    });

    searchInput.addEventListener('blur', () => {
      setTimeout(closeDropdown, 120);
    });
  }

  if (dropdown) {
    dropdown.addEventListener('click', (event) => {
      const btn = event.target.closest('button[data-value]');
      if (!btn) return;
      if (searchInput) {
        searchInput.value = btn.dataset.value;
        closeDropdown();
        searchInput.focus();
      }
    });
  }

  if (searchType) {
    searchType.addEventListener('change', () => {
      if (searchInput) {
        searchInput.placeholder = placeholders[searchType.value] || 'Enter search term...';
      }
      if (searchType.value !== 'name') closeDropdown();
    });
  }

  if (toggleButton && auxiliaryDetails && toggleIcon) {
    toggleButton.addEventListener('click', () => {
      const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
      toggleButton.setAttribute('aria-expanded', String(!isExpanded));
      auxiliaryDetails.classList.toggle('hidden');

      if (!isExpanded) {
        auxiliaryDetails.style.maxHeight = auxiliaryDetails.scrollHeight + 'px';
        toggleIcon.style.transform = 'rotate(180deg)';
      } else {
        auxiliaryDetails.style.maxHeight = '0';
        toggleIcon.style.transform = 'rotate(0deg)';
      }
    });
  }

  // Modal code (same as before)
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  document.body.appendChild(backdrop);

  const cards = Array.from(document.querySelectorAll('.preview-card'));

  const setInactiveCards = (activeCard) => {
    cards.forEach((card) => {
      if (card !== activeCard) {
        card.classList.toggle('opacity-40', !!activeCard);
        card.classList.toggle('pointer-events-none', !!activeCard);
        card.setAttribute('aria-hidden', !!activeCard ? 'true' : 'false');
      }
    });
  };

  const openModal = (card, details, button) => {
    card.classList.add('modal-active');
    card.setAttribute('aria-expanded', 'true');
    details.classList.remove('hidden');
    details.setAttribute('aria-hidden', 'false');
    button.setAttribute('aria-expanded', 'true');
    backdrop.classList.add('active');
    document.body.classList.add('overflow-hidden');
    setInactiveCards(card);

    card.scrollTop = 0;
    details.scrollTop = 0;
    const heading = card.querySelector('[aria-labelledby]');
    if (heading) heading.scrollIntoView({ block: 'start', behavior: 'instant' });

    const closeBtn = card.querySelector('.close-modal');
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  };

  const closeModal = (card, details, button) => {
    card.classList.remove('modal-active');
    card.setAttribute('aria-expanded', 'false');
    details.classList.add('hidden');
    details.setAttribute('aria-hidden', 'true');
    button.setAttribute('aria-expanded', 'false');
    backdrop.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
    setInactiveCards(null);
    card.querySelector('.view-details-btn')?.focus();
  };

  cards.forEach((card) => {
    const button = card.querySelector('.view-details-btn');
    const closeBtn = card.querySelector('.close-modal');
    const details = card.querySelector('.full-details');

    if (!button || !closeBtn || !details) return;

    button.addEventListener('click', () => openModal(card, details, button));
    closeBtn.addEventListener('click', () => closeModal(card, details, button));

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && card.classList.contains('modal-active')) {
        closeModal(card, details, button);
      }
    });
  });

  backdrop.addEventListener('click', () => {
    const activeCard = document.querySelector('.preview-card.modal-active');
    if (!activeCard) return;
    const details = activeCard.querySelector('.full-details');
    const button = activeCard.querySelector('.view-details-btn');
    closeModal(activeCard, details, button);
  });
});
