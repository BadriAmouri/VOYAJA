export const matchPlaceholderHeight = () => {
    const cards = document.querySelectorAll('.agencyoffer-card');
    const placeholders = document.querySelectorAll('.agencyoffer-placeholder');
  
    if (cards.length > 0 && placeholders.length > 0) {
      const cardHeight = cards[0].offsetHeight; // Assuming all cards have the same height
      placeholders.forEach((placeholder) => {
        placeholder.style.height = `${cardHeight}px`;
      });
    }
  };