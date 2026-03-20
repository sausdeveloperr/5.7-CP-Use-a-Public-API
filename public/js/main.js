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


  // view details button in country preview cards
/*   document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('View details button clicked!');
      const card = btn.closest('.preview-card');
      card.classList.add('modal-active');
      document.body.classList.add('modal-open');
    });
  }); */

/*   document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.preview-card');
      card.classList.remove('modal-active');
      document.body.classList.remove('modal-open');
    });
  }); */
});