export function sortItems(data, sortOption) {
    switch (sortOption) {
      case 'Cheapest':
        return data.sort((a, b) => a.price - b.price);
      case 'Best':
        return data.sort((a, b) => b.rating - a.rating);  // Assuming higher rating is better
      case 'Quickest':
        return data.sort((a, b) => a.duration - b.duration);
      default:
        return data;
    }
  }
  