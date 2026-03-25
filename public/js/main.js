// File for JS related to modals and other interactive elements on the page,
// including displaying the footer.ejs when the search results is being displayed, and hiding it when the search results is hidden.

// TODOs
// - Add loading state for the search button (e.g., show a FE spinner in #mainContent while waiting for the API response)
// - Add logic to display the footer.ejs when the search results is being displayed, and hiding it when the search results is hidden.

// input field dropdown menu
document.addEventListener('DOMContentLoaded', () => {
  // contextual placeholders
  const input = document.getElementById('searchInput');
  const select = document.getElementById('searchType');

  const placeholders = {
    name:     "Enter country name",
    alpha:    "Enter code - jp, usa, aus",
    capital:  "Enter capital city",
    region:   "Enter region - africa, europe, oceania",
    currency: "Enter currency - gbp, inr", /* TODO: verify if code or full curr name in api endpoint */
    language: "Enter language - spanish, swahili",
    demonym:  "Enter demonym - brazilian, nigerian"
  };

  select.addEventListener('change', () => {
    const type = select.value;
    input.placeholder = placeholders[type] || "Enter search term...";
    
    // clear input when changing type
    // input.value = '';
  });


  // Toggle auxiliary details
  const toggleButton = document.getElementById('toggleAuxiliary');
  const auxiliaryDetails = document.getElementById('auxiliaryDetails');
  const toggleIcon = document.getElementById('toggleIcon');

  if (!toggleButton || !auxiliaryDetails) return;

  toggleButton.addEventListener('click', () => {
    const isExpanded = (toggleButton.getAttribute('aria-expanded') === 'true');
    // OR
    // const isExpanded = (toggleButton.getAttribute('aria-expanded') === 'true') ? true : false; 
    
    toggleButton.setAttribute('aria-expanded', !isExpanded);
    auxiliaryDetails.classList.toggle('hidden');
    
    // Smooth height animation
    if (!isExpanded) {
      auxiliaryDetails.style.maxHeight = auxiliaryDetails.scrollHeight + 'px';
      // scrollHeight - predefined method returns total height of an element, including overflow-hidden content
      toggleIcon.style.transform = 'rotate(180deg)';
    } else {
      auxiliaryDetails.style.maxHeight = '0';
      toggleIcon.style.transform = 'rotate(0deg)';
    }
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  document.body.appendChild(backdrop);

  const cards = Array.from(document.querySelectorAll(".preview-card"));

  const setInactiveCards = (activeCard) => {
    cards.forEach(card => {
      if (card !== activeCard) {
        card.classList.toggle("opacity-40", !!activeCard);
        card.classList.toggle("pointer-events-none", !!activeCard);
        card.setAttribute("aria-hidden", !!activeCard ? "true" : "false");
      }
    });
  };

  const openModal = (card, details, button) => {
    card.classList.add("modal-active");
    card.setAttribute("aria-expanded", "true");
    details.classList.remove("hidden");
    details.setAttribute("aria-hidden", "false");
    button.setAttribute("aria-expanded", "true");
    backdrop.classList.add("active");
    document.body.classList.add("overflow-hidden");
    setInactiveCards(card);

    // reset scroll positions when modal opens
    card.scrollTop = 0;
    details.scrollTop = 0;
    const heading = card.querySelector("[aria-labelledby]");
    if (heading) heading.scrollIntoView({ block: "start", behavior: "instant" });

    // focus close button without scrolling the modal body
    const closeBtn = card.querySelector(".close-modal");
    if (closeBtn) {
      closeBtn.focus({ preventScroll: true });
    }
  };

  const closeModal = (card, details, button) => {
    card.classList.remove("modal-active");
    card.setAttribute("aria-expanded", "false");
    details.classList.add("hidden");
    details.setAttribute("aria-hidden", "true");
    button.setAttribute("aria-expanded", "false");
    backdrop.classList.remove("active");
    document.body.classList.remove("overflow-hidden");
    setInactiveCards(null);
    card.querySelector(".view-details-btn").focus();
  };

  cards.forEach(card => {
    const button = card.querySelector(".view-details-btn");
    const closeBtn = card.querySelector(".close-modal");
    const details = card.querySelector(".full-details");

    if (!button || !closeBtn || !details) return;

    button.addEventListener("click", () => openModal(card, details, button));
    closeBtn.addEventListener("click", () => closeModal(card, details, button));

    card.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && card.classList.contains("modal-active")) {
        closeModal(card, details, button);
      }
    });
  });

  backdrop.addEventListener("click", () => {
    const activeCard = document.querySelector(".preview-card.modal-active");
    if (!activeCard) return;
    const details = activeCard.querySelector(".full-details");
    const button = activeCard.querySelector(".view-details-btn");
    closeModal(activeCard, details, button);
  });
});