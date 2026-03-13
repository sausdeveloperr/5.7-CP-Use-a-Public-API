// File for JS related to modals and other interactive elements on the page,
// including displaying the footer.ejs when the search results is being displayed, and hiding it when the search results is hidden.

// TODOs
// - Add loading state for the search button (e.g., show a FE spinner in #mainContent while waiting for the API response)

document.addEventListener('DOMContentLoaded', () => {
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


